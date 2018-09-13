from django.db import models

# Create your models here.


class Task(models.Model):
    content = models.CharField(max_length=300)
    complete = models.BooleanField()
    expire_time = models.IntegerField()

    def __str__(self):
        return self.content

    def __unicode__(self):
        return u'{content}'.format(content=self.content)
