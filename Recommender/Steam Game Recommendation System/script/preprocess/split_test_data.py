from pandas import read_csv
import pathlib

# read data
locationUsersFile = pathlib.Path(r'../../data/processed_data/steam_user.csv')
dataUsers = read_csv(locationUsersFile)

# select 20% of random elements for test data
testUsers = dataUsers.sample(frac=0.2, replace=False)

# select the remaining elements for training data
trainUsers = dataUsers[~dataUsers.isin(testUsers)].dropna()

# output
testUsers.to_csv(pathlib.Path(r'../../data/test_data/steam_user_test.csv'), index=False)
trainUsers.to_csv(pathlib.Path(r'../../data/test_data/steam_user_train.csv'), index=False)
