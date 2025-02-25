# Generated by Django 5.1.1 on 2024-10-11 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='friends',
        ),
        migrations.RemoveField(
            model_name='user',
            name='friends_count',
        ),
        migrations.RemoveField(
            model_name='user',
            name='people_you_may_know',
        ),
        migrations.RemoveField(
            model_name='user',
            name='posts_count',
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('Formation Sanitaire', 'Formation Sanitaire'), ('Administrateur', 'Administrateur'), ('Super Administrateur', 'Super Administrateur')], default='Formation Sanitaire', max_length=20),
        ),
    ]
