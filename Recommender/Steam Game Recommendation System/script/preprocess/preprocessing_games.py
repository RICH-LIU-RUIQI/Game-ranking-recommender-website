from pandas import read_csv
import pathlib
import re

# read games data, https://www.kaggle.com/datasets/fronkongames/steam-games-dataset?resource=download
location_games = pathlib.Path(r'../../data/raw_data/games.csv')
data_games = read_csv(location_games,
                      usecols=["AppID", "Name", "Release date", "Price", "Supported languages", "Positive", "Negative", "Developers", "Publishers", "Categories", "Genres", "Tags"])

# clean the required info
data_games['Name'] = data_games['Name'].fillna('')
data_games['Developers'] = data_games['Developers'].fillna('')
data_games['Categories'] = data_games['Categories'].fillna('')
data_games['Genres'] = data_games['Genres'].fillna('')
data_games['Tags'] = data_games['Tags'].fillna('')

for i, row in data_games.iterrows():
    clean = re.sub('[^A-Za-z0-9]+', '', row["Name"])
    clean = clean.lower()
    data_games.at[i, 'cleaned_name'] = clean

def clean_data(data):
    if isinstance(data, str):
        return data.replace(" ", "")
    else:
        print(data)
        return data

# remove spaces
data_games['Developers'] = data_games['Developers'].apply(clean_data)
data_games['Categories'] = data_games['Categories'].apply(clean_data)
data_games['Genres'] = data_games['Genres'].apply(clean_data)
data_games['Tags'] = data_games['Tags'].apply(clean_data)

# create new column
data_games["percentage_positive_review"] = data_games['Positive'] / (data_games['Positive'] + data_games['Negative']) * 100
data_games["developers_tags"] = data_games['Developers'] + ',' + data_games['Tags']
data_games["categories_tags"] = data_games['Categories'] + ',' + data_games['Tags']
data_games["developers_categories_tags"] = data_games['Developers'] + ',' + data_games['Categories'] + ',' + data_games['Tags']

data_games.to_csv(pathlib.Path(r'../../data/processed_data/processed_games.csv'), index=False)