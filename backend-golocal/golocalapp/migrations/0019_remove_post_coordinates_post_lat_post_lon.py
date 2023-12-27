# Generated by Django 4.2.1 on 2023-12-27 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('golocalapp', '0018_alter_post_lodging_alter_post_restaurant'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='coordinates',
        ),
        migrations.AddField(
            model_name='post',
            name='lat',
            field=models.FloatField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='lon',
            field=models.FloatField(blank=True, max_length=100, null=True),
        ),
    ]