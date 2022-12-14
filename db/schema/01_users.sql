
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone_num VARCHAR(25),
  user_type VARCHAR(25) NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  book_title VARCHAR(255) NOT NULL,
  book_author VARCHAR(255),
  description TEXT,
  year_of_publication INTEGER NOT NULL,
  genre VARCHAR(255) NOT NULL,
  rating FLOAT,
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  image_url_s VARCHAR(255),
  image_url_m VARCHAR(255),
  image_url_l VARCHAR(255)
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  convers_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  message VARCHAR(255) NOT NULL
);
