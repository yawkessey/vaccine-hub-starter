CREATE TABLE users (
    -- serial is auto incrementing primary key
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    location        TEXT NOT NULL,
    date            TIMESTAMP NOT NULL DEFAULT NOW()
);