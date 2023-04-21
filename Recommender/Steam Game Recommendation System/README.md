# Steam Game Recommendation System and Evaluation Part

It's a Python project, which is designed to implement a program to evaluate different parameters of local-sensitivity hash algorithm with MinHash. 

## Note!!!

If you only want to see the website. There is no need to read the following part.

## DESCRIPTION

This project is based on Python 3.11. The required packages are pandas, numpy, datasketch, pickle, pathlib, re, time.

## INSTALLATION

Please make sure that you have installed Python 3.11 and required packages above on your computer.

## EXECUTION

1. First you need to download the data from two websites: steam-200k.csv from https://www.kaggle.com/datasets/tamber/steam-video-games; games.csv from https://www.kaggle.com/datasets/fronkongames/steam-games-dataset?resource=download.
2. Put games.csv and steam-200k.csv under the directory: Steam Game Recommendation System/data/raw_data
2. Preprocess the data. Enter the directory: Steam Game Recommendation System/script/preprocess, run 

### `python3 preprocessing_games.py`
### `python3 reformate_user_data.py`
### `python3 split_test_data.py`

2. Generate the forest data and output data. Enter the directory: Steam Game Recommendation System/script/content_based, run 

### `python3 min_hash_lsh_forest.py`

3. Evaluate the data. Enter the directory: Steam Game Recommendation System/script, run

### `python3 evaluation.py`

4. You can see the output data and printed results to check.