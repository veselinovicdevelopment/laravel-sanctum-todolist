### Environment Setup

1. Clone the repository
```
```
2. Install required composer and npm packages
```
composer install

npm install
```
3. Create your .env file and then setup your database
```
cp .env.example .env
```
4. Generate application key
```
php artisan key:generate
```
5. Run the database migrations
```
php artisan migrate
```
6. Serve the Laravel app
```
php artisan serve
```
7. Compile the front end code
```
npm run watch
```
