from django.urls import path
from . import views

urlpatterns = [
    path("watchlist/symbols/", views.WatchlistView.as_view(), name="watchlist"),
]