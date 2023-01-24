import scipy
import scipy.optimize
import numpy as np
import pandas as pd
import random
from collections import defaultdict
import json
import re
from django.conf import settings
import os


class Solution:
    
    def __init__(self, user_data):
        print(user_data["data"]["state"])
        self.full = pd.read_csv(os.path.join(settings.DATA, "new_sorted_recipe_10000.csv"))
        #full = pd.read_csv("new_sorted_recipe_10000.csv")
        self.reviewsPerUser = defaultdict(list)
        self.reviewsPerItem = defaultdict(list)
        self.ratings = []
        self.dl = []
        self.K = 2

        for index,d in self.full.iterrows():
            item = self.full['RecipeId'][index]
            Auth = None
            for x in re.findall(r'\w+\': \w', self.full['reviews_in_dict'][index]):
                if "Rating" in x:
                    self.reviewsPerUser[Auth].append((Auth, item, x))
                    self.reviewsPerItem[item].append((Auth, item, x))
                    self.dl.append({
                        'user': Auth,
                        'item': item,
                        'rating': float(x[-1])
                    })
                    self.ratings.append(float(x[-1]))
                else:
                    Auth = x[-1]

            for item,rating in user_data["data"]["state"].items():
                    self.dl.append({
                        'user': "user",
                        'item': item,
                        'rating': float(rating)
                    })                
                    self.reviewsPerUser["user"].append(("user", item, float(rating)))
                    self.reviewsPerItem[item].append(("user", item, float(rating)))
        self.tr_df = pd.DataFrame.from_dict(self.dl)
        #for r in rows:
            #self.tr_df.loc[len(self.tr_df.index)] = ['Amy', 89, 93] 

        self.ratingMean = sum(self.ratings)/ len(self.ratings)
        self.alpha = self.ratingMean

        self.N = len(self.tr_df)
        self.nUsers = len(self.reviewsPerUser)
        self.nItems = len(self.reviewsPerItem)
        self.users = list(self.reviewsPerUser.keys())
        self.items = list(self.reviewsPerItem.keys())

        self.userBiases = defaultdict(float)
        self.itemBiases = defaultdict(float)
        self.userGamma = {}
        self.itemGamma = {}

    def MSE(self, predictions, labels):
        differences = [(x-y)**2 for x,y in zip(predictions,labels)]
        return sum(differences) / len(differences)


    def unpack(self, theta):
        global alpha
        global userBiases
        global itemBiases
        global userGamma
        global itemGamma
        index = 0
        self.alpha = theta[index]
        index += 1
        userBiases = dict(zip(self.users, theta[index:index+self.nUsers]))
        index += self.nUsers
        itemBiases = dict(zip(self.items, theta[index:index+self.nItems]))
        index += self.nItems
        for u in self.users:
            self.userGamma[u] = theta[index:index+self.K]
            index += self.K
        for i in self.items:
            self.itemGamma[i] = theta[index:index+self.K]
            index += self.K

    def inner(self, x, y):
        return sum([a*b for a,b in zip(x,y)])

    def prediction(self, user, item):
        return self.alpha + self.userBiases[user] + self.itemBiases[item] + self.inner(self.userGamma[user], self.itemGamma[item])

    def cost(self, theta, labels, lamb):
        self.unpack(theta)
        predictions = [self.prediction(self.tr_df['user'][index], self.tr_df['item'][index]) for index,d in self.tr_df.iterrows()]
        print(predictions[:4])
        print(labels[:4])
        cost = self.MSE(predictions, labels)
        print("MSE = " + str(cost))
        for u in self.users:
            cost += lamb*userBiases[u]**2
            for k in range(self.K):
                cost += lamb*self.userGamma[u][k]**2
        for i in self.items:
            cost += lamb*itemBiases[i]**2
            for k in range(self.K):
                cost += lamb*self.itemGamma[i][k]**2
        return cost


    def derivative(self, theta, labels, lamb):
        self.unpack(theta)
        N = len(self.tr_df)
        dalpha = 0
        dUserBiases = defaultdict(float)
        dItemBiases = defaultdict(float)
        dUserGamma = {}
        dItemGamma = {}
        for u in self.reviewsPerUser:
            dUserGamma[u] = [0.0 for k in range(self.K)]
        for i in self.reviewsPerItem:
            dItemGamma[i] = [0.0 for k in range(self.K)]
        for index,d in self.tr_df.iterrows():
            u,i = self.tr_df['user'][index], self.tr_df['item'][index]
            pred = self.prediction(u, i)
            diff = pred - self.tr_df['rating'][index]
            dalpha += 2/N*diff
            dUserBiases[u] += 2/N*diff
            dItemBiases[i] += 2/N*diff
            for k in range(self.K):
                dUserGamma[u][k] += 2/N*self.itemGamma[i][k]*diff
                dItemGamma[i][k] += 2/N*self.userGamma[u][k]*diff
        for u in userBiases:
            dUserBiases[u] += 2*lamb*userBiases[u]
            for k in range(self.K):
                dUserGamma[u][k] += 2*lamb*self.userGamma[u][k]
        for i in itemBiases:
            dItemBiases[i] += 2*lamb*itemBiases[i]
            for k in range(self.K):
                dItemGamma[i][k] += 2*lamb*self.itemGamma[i][k]
        dtheta = [dalpha] + [dUserBiases[u] for u in self.users] + [dItemBiases[i] for i in self.items]
        for u in self.users:
            dtheta += dUserGamma[u]
        for i in self.items:
            dtheta += dItemGamma[i]
        return np.array(dtheta)

    
    def get_top_recipes(self, K, user,lr):
        self.K =K
        for u in self.reviewsPerUser:
            self.userGamma[u] = [random.random() * 0.1 - 0.05 for k in range(K)]
        for i in self.reviewsPerItem:
            self.itemGamma[i] = [random.random() * 0.1 - 0.05 for k in range(K)]

        scipy.optimize.fmin_l_bfgs_b(self.cost, [self.alpha] + # Initialize alpha
                                        [0.0]*(self.nUsers+self.nItems) + # Initialize beta
                                            [random.random() * 0.1 - 0.05 for k in range(K*(self.nUsers+self.nItems))], # Gamma
                                        self.derivative, args = (list(self.tr_df['rating']), lr))
        ans_dict = {}
        for recipe in list(self.reviewsPerItem.keys()):
            ans_dict[recipe] = self.prediction('user', recipe)
        ans_dict_l = sorted(ans_dict.items(), key=lambda x: x[1], reverse=True) 
        l = []
        for d in ans_dict_l:
            l.append(d[0])
            if len(l)==20:
                break
        print(self.full.head(3))
        return pd.DataFrame({'RecipeId':l}).merge(self.full, how='left')