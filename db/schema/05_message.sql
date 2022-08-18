DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  convers_id INTEGER REFERENCES conversation(id) ON DELETE CASCADE,
  message VARCHAR(255) NOT NULL
);