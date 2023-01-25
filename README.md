# FoodRecommendationWebApp

This is a web application that recommends personalized
recipes to users based on user preferences using latent factor collaborative
filtering. First the user rates few random items, and these are used with other ratings to predict ratings by the user for other recipes. These are then sorted to obtain the top few recommended recipes.

The frontend application is based on reactJS, and the backend application is a multithreaded Django application. The services are hosted in AWS. Specifically, the frontend code is hosted using s3 static web hosting and the django application runs in an EC2 instance.
Security groups and bucket policies must be configured properly. Using an elastic IP could be useful.

To execute the frontend in local, **npm start** could be used.
For the backend application, python manage.py runserver would work.

The application can be viewed at: http://sangeereciperecommendationsystem.link.s3-website-us-west-2.amazonaws.com/