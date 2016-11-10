'use strict';
var express = require('express');
var router = express.Router();
var client = require('../db');

module.exports = function makeRouterWithSockets (io) {

  // a reusable function
  function respondWithAllTweets (req, res, next){
    client.query('SELECT name, content, tweets.id as tweetID FROM tweets INNER JOIN users ON users.id = tweets.userid', function(err, results){
      if (err) return next(err);
      var tweets = results.rows;
      console.log(tweets);
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweets,
        showForm: true
      });
    })
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){
    client.query('SELECT * FROM tweets INNER JOIN users ON users.id = tweets.userid WHERE name = $1', [req.params.username], function(err, results) {
      if (err) return next(err);
      var tweetsForName = results.rows;
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweetsForName,
        showForm: true,
        username: req.params.username
      });
    });
  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    client.query('SELECT * FROM tweets INNER JOIN users ON users.id = tweets.userid WHERE tweets.id = $1', [Number(req.params.id)], function(err, results) {
      if (err) return next(err);
      var tweetsWithThatId = results.rows;
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweetsWithThatId
      });
    });
  });

  function insertIntoTweets(userid, name, content, res){
    client.query('INSERT INTO tweets (userid, content) VALUES ($1, $2)', [userid, content], function(err, results){
        if (err) return next(err);
        var newTweet = {name, content};
        io.sockets.emit('new_tweet', newTweet);
        res.redirect('/');
    })
  }

  // create a new tweet
  router.post('/tweets', function(req, res, next){
    client.query('SELECT id FROM users WHERE name = $1', [req.body.name], function(err, results){
      if (err) return next(err);
      if (results.rows.length) {
        var userid = results.rows[0].id;
        insertIntoTweets(userid, req.body.name, req.body.content, res);
      } else {
        client.query('INSERT INTO users (name) VALUES ($1) RETURNING id', [req.body.name], function(err, results){
            if (err) return next(err);
            var userid = results.rows[0].id;
            insertIntoTweets(userid, req.body.name, req.body.content, res);
        })
      }
    })
  });

  router.post('/delete/:id', function(req, res, next){
    client.query('DELETE FROM tweets WHERE id = $1', [req.params.id], function(err, results){
      if (err) return next(err);
      res.redirect('/');
    })
  });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}
