import pathlib
import sys
from min_hash_lsh_forest import generate_recommendation_website

def main(user_data):
    test_column = 'developers_categories_tags'
    game_list = user_data.split(", ")
    location_forest = pathlib.Path(r'../springboot_Basic-master/src/main/RecSys/developers_categories_tags_forest.pickle')
    generate_recommendation_website(test_column, game_list, location_forest)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_data = sys.argv[1]
        main(user_data)
    else:
        print("Please provide userdata parameter.")