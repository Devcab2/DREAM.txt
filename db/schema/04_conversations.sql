DROP TABLE IF EXISTS conversations CASCADE;

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE
);
