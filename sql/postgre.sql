CREATE TABLE Bölüm (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    UNIQUE (id)
);

CREATE TABLE Öğrenci (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    deptid INT,
    counter INT,
    FOREIGN KEY (deptid) REFERENCES Bölüm(id),
    UNIQUE (deptid)
);