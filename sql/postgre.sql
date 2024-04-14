CREATE TABLE bolum (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    UNIQUE (id)
);

CREATE TABLE ogrenci (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    deptid INT,
    counter INT,
    FOREIGN KEY (deptid) REFERENCES bolum(id),
    UNIQUE (deptid)
);

CREATE TABLE ogrenci_sayac (
    sayac INTEGER DEFAULT 0,
);
