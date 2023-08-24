# Generator Profili

### Steps to run in docker

- Build docker `docker-compose build`
- Start the application `docker-compose up`
- Run seed `docker-compose run backend python manage.py seed`
- Application will run on `http://localhost:8000`


### Steps to run locally

- Copy config environment variables from `env.template` to `.env`
- Install required dependencies `pip install -r requirements.txt`
- Run migrations `python manage.py migrate`
- Run seed command `python manage.py seed`
- Optional run `python manage.py loaddata example_data.json`
- Run the application `python manage.py runserver`
- Application will run on `http://localhost:8000`

## Environment Variables

- `SQL_DATABASE`: name of database for postgres database
- `SQL_USER`: user for postgres database
- `SQL_PASSWORD`: password for postgres database
- `SQL_HOST`: host for postgres database
- `SQL_PORT`: port for postgres database

