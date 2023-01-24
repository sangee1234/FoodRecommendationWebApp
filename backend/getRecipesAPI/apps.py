import os
# import joblib
import pandas  as pd
from django.apps import AppConfig
from django.conf import settings

class ApiConfig(AppConfig):
    name = 'api'
    dataframe = pd.read_csv(os.path.join(settings.DATA, "sorted_recipe_10000.csv"))