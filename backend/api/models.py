from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Watchlist(models.Model):
    symbol = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchlists')

    def __str__(self):
        return self.symbol 