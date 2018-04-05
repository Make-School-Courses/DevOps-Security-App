--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE User (name TEXT, login TEXT, password TEXT);

INSERT INTO User (name, login, password) VALUES ('Cool Admin', 'admin@site.com', 'pass');
INSERT INTO User (name, login, password) VALUES ('Other User', 'user@site.com', 'a$1sB!095$21!');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE User;
