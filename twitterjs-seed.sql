TRUNCATE TABLE Users, Tweets;

INSERT INTO Users (name, pictureUrl) VALUES ('Tom Hanks',           'http://i.imgur.com/XDjBjfu.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Beyonce',             'http://i.imgur.com/1uTV9v2.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Justin Bieber',       'http://i.imgur.com/bI1zf2b.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Ash Ketchum',         'http://i.imgur.com/n7VJIua.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('E.T.',                'http://i.imgur.com/Rs7b2FA.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('William Shakespeare', 'http://i.imgur.com/7d10la4.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Grace Hopper',        'http://i.imgur.com/fHmZW3G.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Kanye West',          'http://i.imgur.com/MItGWVS.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Taylor Swift',        'http://i.imgur.com/JKInSVz.jpg');

INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Tom Hanks'),           'Life is like an array of chocolates.');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Beyonce'),             'If you like it then you should have put a Promise on it.');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Justin Bieber'),       'Is it too late now to say sorry? Cuz I''m missing more than just your <body></body>.');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Ash Ketchum'),         'char mander, I choose you!');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='E.T.'),                'E.T. Slack Home.');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='William Shakespeare'), 'to.be or to.not.be, that is the question.');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Grace Hopper'),        'It''s easier to ask forgiveness than it is to get permission.');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Kanye West'),          'I''ma let you finish coding, but…');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Taylor Swift'),        'I knew you were trouble when you logged in.');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Kanye West'),          'I think what Kanye West is going to mean is something similar to what Steve Jobs means.');
INSERT INTO Tweets (userId, content) VALUES ((SELECT id from Users where name='Taylor Swift'),        'I''ve got some whitespace baby — and I''ll write your `.name`');
