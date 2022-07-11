CREATE TABLE accounts (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULl, email VARCHAR(100) NOT NULL, password VARCHAR(500), color varchar(10));

CREATE TABLE transactions (id SERIAL PRIMARY KEY, email  VARCHAR(100) NOT NULL,payee varchar(30) NOT NULL,remitter  varchar(30) NOT NULL,note varchar(200),amount integer not null,date varchar(30) not null,foreign key (email) references accounts(email));

CREATE TABLE daily_transactions (id SERIAL PRIMARY KEY, email  VARCHAR(100) NOT NULL,payee varchar(30) NOT NULL,remitter  varchar(30) NOT NULL,note varchar(200),amount integer not null, date varchar(30) not null,foreign key (email) references accounts(email));
