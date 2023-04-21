from pandas import read_csv
import pathlib

n_recommendation = 20

location_test = pathlib.Path(r'../data/test_data/steam_user_test.csv')
data_test = read_csv(location_test)


def evaluate(alg, location_algo_output_file, eval_output_file):
    data_outputs = read_csv(location_algo_output_file)

    data_outputs["number_of_games_user_has_in_test"] = 0
    data_outputs["number_of_recommendation_user_has"] = 0
    data_outputs["ratio"] = 0

    for i, row in data_outputs.iterrows():
        user_games = data_test[data_test["user_id"] == row["user_id"]]["game_name"].tolist()
        data_outputs.at[i, 'number_of_games_user_has_in_test'] = len(user_games)
        count = 0
        for j in range(1, n_recommendation + 1):
            if row[j] in user_games:
                count += 1
        data_outputs.at[i, "number_of_recommendation_user_has"] = count
        if len(user_games) != 0:
            data_outputs.at[i, "ratio"] = float(count / len(user_games))
    print(alg)
    print(data_outputs["ratio"].describe(include=[float]))
    print(data_outputs["number_of_recommendation_user_has"].describe(include=[float]))
    print(data_outputs["number_of_games_user_has_in_test"].describe(include=[float]))
    data_outputs.to_csv(eval_output_file,
                        columns=["user_id", "ratio", "number_of_recommendation_user_has",
                                 "number_of_games_user_has_in_test"], index=False)

evaluate("min_hash_lsh_forest with developer",
         pathlib.Path(r'../data/output_data/min_hash_lsh_output_developers.csv'),
         pathlib.Path(r'../data/evaluation_data/min_hash_lsh_evaluation_developers.csv'))

evaluate("min_hash_lsh_forest with categories",
         pathlib.Path(r'../data/output_data/min_hash_lsh_output_categories.csv'),
         pathlib.Path(r'../data/evaluation_data/min_hash_lsh_evaluation_categories.csv'))

evaluate("min_hash_lsh_forest with tags",
         pathlib.Path(r'../data/output_data/min_hash_lsh_output_tags.csv'),
         pathlib.Path(r'../data/evaluation_data/min_hash_lsh_evaluation_tags.csv'))

evaluate("min_hash_lsh_forest with developer, tags",
         pathlib.Path(r'../data/output_data/min_hash_lsh_output_developers_tags.csv'),
         pathlib.Path(r'../data/evaluation_data/min_hash_lsh_evaluation_developers_tags.csv'))

evaluate("min_hash_lsh_forest with categories, tags",
         pathlib.Path(r'../data/output_data/min_hash_lsh_output_categories_tags.csv'),
         pathlib.Path(r'../data/evaluation_data/min_hash_lsh_evaluation_categories_tags.csv'))

evaluate("min_hash_lsh_forest with developers, categories, tags",
         pathlib.Path(r'../data/output_data/min_hash_lsh_output_developers_categories_tags.csv'),
         pathlib.Path(r'../data/evaluation_data/min_hash_lsh_evaluation_developers_categories_tags.csv'))

