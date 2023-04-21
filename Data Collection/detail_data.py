import requests
import json
import pandas as pd
import re
import time

# Replace <YOUR_API_KEY> with your actual Steam API Key
API_KEY = "CC9BC14D9AF51F59EFD45A923910FBE3"

regions = {'global':'global',
             'DK':'Denmark', 
             'RU':'Russia',
             'CA':'Canada',
             'TW':'Taiwan',
             'TR':'Turkey',
             'AT':'Austria',
             'BR':'Brazil',
             'DE':'Germany',
             'IT':'Italy',
             'NO':'Norway',
             'CZ':'Czech Republic',
             'SG':'Singapore',
             'NZ':'New Zealand',
             'JP':'Japan',
             'BE':'Belgium',
             'FR':'France',
             'PL':'Poland',
             'TH':'Thailand',
             'AU':'Australia',
             'SE':'Sweden',
             'CH':'Switzerland',
             'US':'United State',
             'FI':'Finland',
             'GB':'Britain',
             'NL':'Netherlands',
             'ES':'Spain',
             'KR':"Korea",
             'HK':'Hongkong'}

for region in regions.values():
    print(region)
    df_region = pd.read_csv("./data/" + region + ".csv")
    new_df_region = pd.DataFrame(columns=['required_age', 'is_free', 'header_image', 'website', 'release_date', 'categories'])
    for index, row in df_region.iterrows():
        rank = row['Rank']
        game = row['Game']
        page = row['Page']

        pattern = r'/app/(\d+)/'

        match = re.search(pattern, page)
        appid = match.group(1)
        game_url = f"http://store.steampowered.com/api/appdetails/?appids={appid}&key={API_KEY}"

        game_response = requests.get(game_url)
        game_data = json.loads(game_response.text)
        game_details = game_data[str(appid)]['data']

        categories = game_details['categories']
        compressed_categories = []
        
        for category in categories:
            compressed_categories.append(category['description'])

        selected_dict = {'required_age': game_details['required_age'],
                        'is_free': game_details['is_free'],
                        'header_image': game_details['required_age'],
                        'website':game_details['website'],
                        'release_date':game_details['release_date'],
                        'categories': compressed_categories}

        df = pd.DataFrame.from_dict(selected_dict, orient='index').T

        pd.concat([new_df_region, df])
    
    new_df_region = pd.concat([df_region, new_df_region], axis=1)
    new_df_region.to_csv("./data/" + region + "_detailed.csv")
    time.sleep(300)