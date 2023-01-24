from rest_framework.views import APIView
from rest_framework.response import Response
from .apps import ApiConfig
import numpy as np
from ml.code.Solution import Solution
from threading import Thread
import concurrent.futures

class TopRecipes(APIView):
    def get(self, request):
        dict_top = ApiConfig.dataframe.head(12).replace(np.nan,0).to_dict('records')
        return Response(dict_top, status=200)

class SampleRecipes(APIView):
    def get(self, request):
        dict_sample = ApiConfig.dataframe.sample(frac=0.002).replace(np.nan,0).to_dict('records')
        return Response(dict_sample, status=200)

class GetRecommendations(APIView):
    
    def start_new_thread(function):
        def decorator(*args, **kwargs):
            t= Thread(target=function, args=args, kwargs=kwargs)
            t.daemon = True
            t.start()
        return decorator

    def getRec(self,request):
        sol = Solution(request.data)
        df1 = sol.get_top_recipes(2, 'user', 0.05)
        return Response(df1.replace(np.nan,0).to_dict('records'), status=200)

    def post(self, request):
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(self.getRec, request)
            return future.result()


