from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd

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

for region in regions.keys():
    driver = webdriver.Chrome()
    url = 'https://store.steampowered.com/charts/topselling/' + region
    driver.get(url)

    try:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "weeklytopsellers_GameName_1n_4-")))
    finally:
        games = driver.find_elements(By.CLASS_NAME, "weeklytopsellers_GameName_1n_4-")
        games = [game.text for game in games]
        ranks = [i+1 for i in range(100)]
        pages = driver.find_elements(By.CLASS_NAME, "weeklytopsellers_TopChartItem_2C5PJ")
        pages = [i.get_attribute('href') for i in pages]
        imgs_raw = driver.find_elements(By.CLASS_NAME, "weeklytopsellers_CapsuleArt_2dODJ")
        imgs = [i.get_attribute('src') for i in imgs_raw]

        df = pd.DataFrame({'Rank': ranks, 'Game': games, 'Page': pages})
        outputfile = './data/' + regions[region] + '.csv'
        df.to_csv(outputfile, index=False)