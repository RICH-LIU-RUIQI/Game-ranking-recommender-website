import numpy as np
import pathlib
from pandas import read_csv, Series, DataFrame, concat
import re
import time
import pickle
from datasketch import MinHash, MinHashLSHForest

#Number of Permutations
permutations = 128

#Number of Recommendations to return
num_recommendations = 20

# read games data
location_games = pathlib.Path(r'../../data/processed_data/processed_games.csv')
data_games = read_csv(location_games)

# read users data
location_users = pathlib.Path(r'../../data/test_data/steam_user_train.csv')  # data/purchase_play
data_users = read_csv(location_users)

# Construct a reverse map of indices and game names
indices = Series(data_games.index, index=data_games['Name']).drop_duplicates()

# get list of games we have info about
list_games = data_games['Name'].unique()
list_cleaned_games = data_games['cleaned_name'].unique()

# create dataframe for recommendations
col_names = list(map(str, range(1, num_recommendations + 1)))
col_names = ["user_id"] + col_names

#Preprocess will split a string of text into individual tokens/shingles based on whitespace.
def preprocess(text):
    if isinstance(text, float) == True:
        return None
    text = re.findall(r'\b\w+\b', text)
    tokens = [word.lower() for word in text]
    return tokens

def get_forest(test_column, data_games, perms):
    start_time = time.time()

    minhash = []

    for text in data_games[test_column]:
        tokens = preprocess(text)
        if tokens == None:
            continue
        m = MinHash(num_perm=perms)
        for s in tokens:
            m.update(s.encode('utf8'))
        minhash.append(m)

    forest = MinHashLSHForest(num_perm=perms)

    for i, m in enumerate(minhash):
        forest.add(i, m)

    forest.index()

    print('It took %s seconds to build forest.' % (time.time() - start_time))

    return forest

def predict(test_column, game_name, data_games, perms, num_recommendations, forest):
    start_time = time.time()
    
    if game_name not in list_games:
        return []
    
    idx = indices[game_name]

    if type(idx) is Series:
        return []

    tokens = preprocess(data_games.iloc[idx][test_column])
    if tokens == None:
        print('Failed')
        return []
    m = MinHash(num_perm=perms)
    for s in tokens:
        m.update(s.encode('utf8'))

    idx_array = np.array(forest.query(m, num_recommendations + 1))
    if len(idx_array) == 0:
        return []  # if your query is empty, return []

    result = data_games.iloc[idx_array]['Name']

    print('It took %s seconds to query forest.' % (time.time() - start_time))

    return result

def user_recommendations(user_id, game_list, game_user_have):
    if type(game_list) is not list or len(game_list) == 0:
        # return empty one
        return DataFrame(data=[[user_id] + [""] * num_recommendations], columns=col_names)

    # remove the games the user already has and order them by percentage_positive_review
    recommendation_positive_reviews = data_games.loc[data_games['Name'].isin(game_list)]
    recommendation_positive_reviews = recommendation_positive_reviews.loc[
        ~recommendation_positive_reviews['Name'].isin(game_user_have)]
    recommendation_positive_reviews = recommendation_positive_reviews.sort_values(by="percentage_positive_review",
                                                                                  ascending=False)

    if len(recommendation_positive_reviews.index) < num_recommendations:
        return DataFrame(data=[[user_id] + recommendation_positive_reviews["Name"].tolist() +
                               [""] * (num_recommendations - len(recommendation_positive_reviews.index))],
                         columns=col_names)
    else:
        return DataFrame(data=[[user_id] + recommendation_positive_reviews["Name"].tolist()[0:num_recommendations]],
                         columns=col_names)

def generate_recommendation_output(location_output_file, test_column, location_forest):
    with open(location_forest, 'rb') as f:
        forest = pickle.load(f)

    recommendation_user_data = DataFrame(columns=col_names)

    previous_user_id = ""
    list_recommendations = list()
    list_games_user_has = list()

    for index, row in data_users.iterrows():
        if previous_user_id != row["user_id"]:
            recommendation_user_data = concat([recommendation_user_data,
                                               user_recommendations(previous_user_id, list_recommendations,
                                                                    list_games_user_has)],
                                              ignore_index=True)
            previous_user_id = row["user_id"]
            list_recommendations = list()
            list_games_user_has = list()
        game_idx = data_games['cleaned_name'].isin([row["cleaned_name"]])
        game_name_in_data_games = data_games[game_idx]['Name'].values.tolist()
        if game_name_in_data_games == []:
            continue
        else:
            game_name_in_data_games = game_name_in_data_games[0]
        list_games_user_has.extend([game_name_in_data_games])
        list_recommendations.extend(predict(test_column, game_name_in_data_games, data_games, permutations, num_recommendations, forest))

    # add the last user
    recommendation_user_data = concat([recommendation_user_data,
                                       user_recommendations(previous_user_id, list_recommendations, list_games_user_has)],
                                      ignore_index=True)

    recommendation_user_data.to_csv(location_output_file, index=False)


def generate_recommendation_website(test_column, user_data, location_forest):
    with open(location_forest, 'rb') as f:
        forest = pickle.load(f)
    final_recommendations = list()
    for i in user_data:
        list_recommendations = predict(test_column, i, data_games, permutations, num_recommendations, forest)
        final_recommendations.extend(list_recommendations)

    final_recommendations = data_games.loc[data_games['Name'].isin(final_recommendations)]
    final_recommendations = final_recommendations.loc[~final_recommendations['Name'].isin(user_data)]
    final_recommendations = final_recommendations.sort_values(by="percentage_positive_review", ascending=False)

    if len(final_recommendations.index) < num_recommendations:
        final_recommendations = final_recommendations["Name"].tolist() + [""] * (num_recommendations - len(final_recommendations.index))
    else:
        final_recommendations = final_recommendations["Name"].tolist()[0:num_recommendations]

    idx = indices[final_recommendations]
    final_recommendations_appid = data_games.iloc[idx]['AppID'].tolist()
    print(final_recommendations_appid)
    print(len(final_recommendations))
    print(final_recommendations)


test_column = 'Developers'
test_column2 = 'Categories'
test_column3 = 'Tags'
test_column4 = 'developers_tags'
test_column5 = 'categories_tags'
test_column6 = 'developers_categories_tags'

location_forest = pathlib.Path(r'../../data/forest_data/developers_forest.pickle')
location_forest2 = pathlib.Path(r'../../data/forest_data/categories_forest.pickle')
location_forest3 = pathlib.Path(r'../../data/forest_data/tags_forest.pickle')
location_forest4 = pathlib.Path(r'../../data/forest_data/developers_tags_forest.pickle')
location_forest5 = pathlib.Path(r'../../data/forest_data/categories_tags_forest.pickle')
location_forest6 = pathlib.Path(r'../../data/forest_data/developers_categories_tags_forest.pickle')

forest = get_forest(test_column, data_games, permutations)
with open(location_forest, 'wb') as f:
    pickle.dump(forest, f)

forest2 = get_forest(test_column2, data_games, permutations)
with open(location_forest2, 'wb') as f:
    pickle.dump(forest2, f)

forest3 = get_forest(test_column3, data_games, permutations)
with open(location_forest3, 'wb') as f:
    pickle.dump(forest3, f)

forest4 = get_forest(test_column4, data_games, permutations)
with open(location_forest4, 'wb') as f:
    pickle.dump(forest4, f)

forest5 = get_forest(test_column5, data_games, permutations)
with open(location_forest5, 'wb') as f:
    pickle.dump(forest5, f)

forest6 = get_forest(test_column6, data_games, permutations)
with open(location_forest6, 'wb') as f:
    pickle.dump(forest6, f)

generate_recommendation_output(pathlib.Path(r'../../data/output_data/min_hash_lsh_output_developers.csv'), test_column, location_forest)
generate_recommendation_output(pathlib.Path(r'../../data/output_data/min_hash_lsh_output_categories.csv'), test_column2, location_forest2)
generate_recommendation_output(pathlib.Path(r'../../data/output_data/min_hash_lsh_output_tags.csv'), test_column3, location_forest3)
generate_recommendation_output(pathlib.Path(r'../../data/output_data/min_hash_lsh_output_developers_tags.csv'), test_column4, location_forest4)
generate_recommendation_output(pathlib.Path(r'../../data/output_data/min_hash_lsh_output_categories_tags.csv'), test_column5, location_forest5)
generate_recommendation_output(pathlib.Path(r'../../data/output_data/min_hash_lsh_output_developers_categories_tags.csv'), test_column6, location_forest6)
