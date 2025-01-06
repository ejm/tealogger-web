CREATE TABLE tea_log (
    id INTEGER PRIMARY KEY,
    datetime INTEGER NOT NULL,
    temperature TEXT NOT NULL,
    tea_type TEXT NOT NULL,
    lat TEXT,
    lon TEXT,
    place TEXT
);