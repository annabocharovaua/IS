const path = require('path');
const cache = require('memory-cache');
const express = require('express');
const app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
app.use(jsonParser);

// создание хранилища для сессий 
var sessionHandler = require('./session_handler');
var store = sessionHandler.createStore();

// создание сессии 
app.use(cookieParser());
//app.use(session({
//    store: store,
//    resave: false,
//    saveUninitialized: true,
//    secret: 'supersecret'
//}));

var handlers = require('./queries');
var signup = require('./signup');
var routes_hangler = 
require('./routes')(app);

app.get('/all', handlers.get_users);

app.post('/login', handlers.check_user);
app.post('/login', handlers.check_pass);

// регистрация пользователя 
app.post('/signup', signup.addUser);

// ограничение доступа к контенту на основе авторизации 
app.get('/check', function (req, res) {
    var username = cache.get("username")
    if (username) {
        res.send('hello, user ' + username);
   } else {
        res.send('Not logged in(');
    }
});




app.use(express.static(path.join(__dirname, 'pages')))
app.get('/', (request, response) => {
     res.sendFile(`${__dirname}/pages/index.html`);
});

const hostname = '127.0.0.1';
const port = 3333;
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Application listening on port ${port}!`);
});


const config = require('./config'); 

const mysql = require("mysql");
const mysql2 = require("mysql2/promise");

function ConnectToDB(config) {
     const connection = mysql.createConnection(config);
     connection.connect(function (err) {
          if (err) {
               return console.error("Помилка: " + err.message);
          }
          else {
               console.log("Підключення до серверу MySQL успішне");
          }
     });
     return connection;
}

function CloseConnectionToDB(connection) {
     connection.end(function (err) {
          if (err) {
               return console.log("Помилка: " + err.message);
          }
           console.log("Підключенння завершено");
     });
}
app.get('/getFilmsFromDB', (request, response) => {
    const connection = ConnectToDB(config);


    let film_genres = [];
    let query_genre = `SELECT fg.film_id, REPLACE(GROUP_CONCAT(g.name SEPARATOR ', '), ',', ', ') AS genre_names 
    FROM film_genres fg 
    JOIN genres g ON fg.genre_id = g.genre_id
    GROUP BY fg.film_id;`;

    connection.query(query_genre, (err, result, field) => {
        result.forEach(function (item, i, arr) {
            film_genres[item['film_id']] = item['genre_names'];
        });
        
    });

    let query = "SELECT * FROM films";
    let queryResult = {};

    connection.query(query, (err, result, field) => {
        queryResult = result;
        result.forEach(function (item, i, arr) {
            queryResult[i] = { "film_id": item['film_id'], "name": item['name'], "director": item['director'], "duration": item['duration'], 
            "description": item['description'], "poster": item['poster'], "trailer": item['trailer'], "rating": item['rating']
            , "count_ratings": item['count_ratings'], "film_genres": film_genres[item['film_id']]};
        });
        response.send(queryResult);
    });

    CloseConnectionToDB(connection);
});


app.get('/getPosterNewFilmsFromDB', (request, response) => {
    const connection = ConnectToDB(config);    

    let query = "SELECT film_id, name, poster FROM films;";
    let queryResult = {};

    connection.query(query, (err, result, field) => {
        queryResult = result;
        result.forEach(function (item, i, arr) {
            queryResult[i] = { "film_id": item['film_id'], "name": item['name'], "poster": item['poster']};
        });
       response.send(queryResult);
    });

    CloseConnectionToDB(connection);
});

app.get('/getFilmDetails/:filmId', (request, response) => {
    const filmId = request.params.filmId;
    console.log(filmId); 

    const connection = ConnectToDB(config);    

    let film_genres = "";
    let query_genre = `SELECT fg.film_id, REPLACE(GROUP_CONCAT(g.name SEPARATOR ', '), ',', ', ') AS genre_names 
    FROM film_genres fg 
    JOIN genres g ON fg.genre_id = g.genre_id
    WHERE fg.film_id = ${filmId}
    GROUP BY fg.film_id;`;

    connection.query(query_genre, (err, result, field) => {
        result.forEach(function (item, i, arr) {
            film_genres = item['genre_names'];
        });
        
    });


    let film_reviews = [];
    let query_reviews = `SELECT fr.review_id, fr.id_film, fr.id_user, fr.rating, fr.review_date, fr.review_text, u.first_name, u.last_name
    FROM film_reviews fr
    JOIN users1 u ON fr.id_user = u.user_id
    WHERE fr.id_film = ${filmId} AND fr.review_text IS NOT NULL AND TRIM(fr.review_text) != '';`

    connection.query(query_reviews, (err, result, field) => {
        if (err) {
            console.error(err);            
        } else {
            result.forEach(function (item, i, arr) {
                film_reviews.push(item);
            });
        }
        
    });

    let query = "SELECT * FROM films WHERE film_id = " + filmId + " ;";
    let queryResult = {};

    connection.query(query, (err, result, field) => {
        queryResult = result;
        result.forEach(function (item, i, arr) {
            queryResult[i] = { "film_id": item['film_id'], "name": item['name'], "director": item['director'], "duration": item['duration'], 
            "description": item['description'], "poster": item['poster'], "trailer": item['trailer'], "rating": item['rating']
            , "count_ratings": item['count_ratings'], "film_genres": film_genres, "film_reviews": film_reviews};
        });
        //console.log(queryResult);
        response.send(queryResult);
    });

    CloseConnectionToDB(connection);    
});

app.get('/getRatingFilmsFromDB', (request, response) => {
    const filmId = request.params.filmId;
    console.log(filmId); 

    const connection = ConnectToDB(config);    

    let query = "SELECT film_id, name, rating FROM films;";
    let queryResult = {};

    connection.query(query, (err, result, field) => {
        queryResult = result;
        result.forEach(function (item, i, arr) {
            queryResult[i] = { "film_id": item['film_id'], "name": item['name'], "rating": item['rating']};
        });
        //console.log(queryResult);
        response.send(queryResult);
    });

    CloseConnectionToDB(connection);    
});

app.get('/getRatingAllFilmsFromDB', (request, response) => {
    const filmId = request.params.filmId;
    console.log(filmId);

    const connection = ConnectToDB(config);    

    let film_genres = [];
    let query_genre = `SELECT fg.film_id, REPLACE(GROUP_CONCAT(g.name SEPARATOR ', '), ',', ', ') AS genre_names 
    FROM film_genres fg 
    JOIN genres g ON fg.genre_id = g.genre_id
    GROUP BY fg.film_id;`;

    connection.query(query_genre, (err, result, field) => {
        result.forEach(function (item, i, arr) {
            film_genres[item['film_id']] = item['genre_names'];
        });
        
    });


    let query = "SELECT film_id, name, poster, rating FROM films;";
    let queryResult = {};

    connection.query(query, (err, result, field) => {
        queryResult = result;
        result.forEach(function (item, i, arr) {
            queryResult[i] = { "film_id": item['film_id'], "name": item['name'], "rating": item['rating'], "poster": item['poster'], "film_genres": film_genres[item['film_id']] };
        });
        //console.log(queryResult);
        response.send(queryResult);
    });

    CloseConnectionToDB(connection);    
});


app.get('/getUsernameAndId', (request, response) => {
    let result;
    console.log("cache.get(username)", cache.get("username"));
    if (cache.get("username") == null)
        result = 0;
    else if (cache.get("username") == '')
        result = 0;
    else  
        result = { "id_username": cache.get("id_username"), "username": cache.get("username")};

    console.log("cache.get(result)", result);
    response.send(JSON.stringify(result));   
});


app.get('/getFirstAndLastName', (request, response) => {
    let result = "0";
    //console.log("cache.get(username)", cache.get("username"));
    if (cache.get("username") == null) {
        result = "0";
        response.send(result);
    }
    else if (cache.get("username") == '') {
        result = "0";
        response.send(result);
    }
    else  {
        const connection = ConnectToDB(config);  
        let query = "SELECT user_id, first_name, last_name FROM users1 WHERE user_id = " + cache.get("id_username") + ";";
        connection.query(query, (err, res, field) => {
            result = { "user_id": res[0]['user_id'], "first_name": res[0]['first_name'], "last_name": res[0]['last_name']};
            console.log("res::: ", result);
            console.log(err);   
            response.send(result);  
        });
        CloseConnectionToDB(connection);   
    }
});

app.post('/postReviewToDB', (req, res, next) =>  { 
    //console.log(req.body);
    var inserts = {
        film_id: req.body.film_id,
        user_id: req.body.user_id,
        grade: req.body.grade,
        comment: req.body.comment
    }; 

    const today = new Date().toISOString().slice(0, 10);
    //console.log("DATE-today: ", today);

    const connection = ConnectToDB(config);  
    let query = "INSERT INTO `cinemadb`.`film_reviews` (`id_film`, `id_user`, `rating`, `review_date`, `review_text`) VALUES ('" + inserts.film_id + "', '" + inserts.user_id + "', '" + inserts.grade + "', '" + today + "', '" + inserts.comment + "');"
    connection.query(query, (err, result, field) => {
        console.log("ERR", err);
        if (!err) {
            console.log(query);
            res.status(200).send('Your comment has been successfully added!'); 
        } 
        else {
            res.status(409).send('Error while making a comment!'); 
        } 
    });		
    CloseConnectionToDB(connection);
})