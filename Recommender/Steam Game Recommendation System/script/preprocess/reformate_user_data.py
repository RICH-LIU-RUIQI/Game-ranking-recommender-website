import pandas as pd
import pathlib
import numpy as np
import re

# read user data, https://www.kaggle.com/datasets/tamber/steam-video-games
location_users = pathlib.Path(r'../../data/raw_data/steam-200k.csv')

steam = pd.read_csv(location_users, header=None, usecols=[0, 1, 2, 3], names=["user_id", "game_name", "behavior", "hours"])

# split purchase
steam['purchase'] = 1

# split play hours
steam['play'] = np.where(steam['behavior'] == 'play', 1, 0)
steam['hours'] = steam['hours'] + steam['play'] - 1

for i, row in steam.iterrows():
    clean = re.sub('[^A-Za-z0-9]+', '', row["game_name"])
    clean = clean.lower()
    steam.at[i, 'cleaned_name'] = clean

# clean data
clean_steam = steam.drop_duplicates(subset=['user_id', 'game_name'], keep='last')
clean_steam = clean_steam.drop(columns=['behavior'])

clean_steam.to_csv(r'../../data/processed_data/steam_user.csv', index=None)
