# Generated by Django 4.2.5 on 2023-10-05 21:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('golocalapp', '0012_alter_post_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='image',
        ),
    ]
