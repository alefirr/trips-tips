-- CREATE DATABASE "trips-tips";

CREATE TABLE CONTINENTS (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "text" VARCHAR(200)
);

CREATE TABLE TAGS (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL
);

CREATE TABLE COUNTRIES (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "text" VARCHAR(200),
  "continent_id" INT REFERENCES CONTINENTS NOT NULL
);

CREATE TABLE CITIES (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "text" VARCHAR(200),
  "country_id" INT REFERENCES COUNTRIES,
  "is_capital" BOOLEAN NOT NULL,
  "population" INT
);

CREATE TABLE SIGHTS (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "text" VARCHAR(200),
  "city_id" INT REFERENCES CITIES
);

CREATE TABLE SIGHTS_TAGS (
	"sight_id" INT REFERENCES SIGHTS,
	"tag_id" INT REFERENCES TAGS
);

-- INSERT DATA

INSERT INTO CONTINENTS ("name", "text")
VALUES
('Africa', 'Central continent'),
('Europe', 'Continent with rich history');

INSERT INTO TAGS ("name")
VALUES 
('Cathedral'),
('Monument'),
('Architecture'),
('Historical'),
('Museum'),
('Park'),
('Natural');

INSERT INTO COUNTRIES ("name", "text", "continent_id")
VALUES 
('France', 'Lovely kitchen, wines and nature', 2);

INSERT INTO CITIES ("name", "text", "country_id", "is_capital", "population")
VALUES
('Paris', 'The city of love', 1, true, 4000000);

INSERT INTO SIGHTS ("name", "text", "city_id")
VALUES
('Eiffel Tower', 'The most famous tower in the world', 1);

INSERT INTO SIGHTS_TAGS ("sight_id", "tag_id")
VALUES 
(1,2), (1,3), (1,4);
