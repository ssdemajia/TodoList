from django.conf.urls import url
import views
urlpatterns = [
    url('^$', views.index, name='index'),
    url('tasks', views.TasksBox.as_view(), name='task')
]