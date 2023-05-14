CREATE DATABASE "trips-tips";

CREATE TABLE "CONTINENTS" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "text" VARCHAR(200),
);

CREATE TABLE "TYPES" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
);

CREATE TABLE "COUNTRIES" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "text" VARCHAR(200),
  "continent_id" INT REFERENCES "CONTINENTS" NOT NULL,
);

CREATE TABLE "CITIES" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "text" VARCHAR(200),
  "country_id" INT REFERENCES "COUNTRIES",
  "is_capital" BOOLEAN NOT NULL,
  "population" INT,
);

CREATE TABLE "SIGTHS" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "text" VARCHAR(200),
  "city_id" INT REFERENCES "CITIES",
);

-- INSERT DATA

INSERT INTO "CONTINENTS" ("name", "text")
VALUES
('Africa', 'Central continent')
('Europe', 'Continent with rich history'),

INSERT INTO "TYPES" ("name")
VALUES 
('Cathedral'),
('Monument'),
('Architecture'),
('Historical'),
('Museum'),
('Park'),
('Natural')

INSERT INTO "COUNTRIES" ("name", "text", "continent_id")
VALUES 
('France', 'Lovely kitchen, wines and nature', 2);

INSERT INTO "CITIES" ("name", "text", "country_id", "is_capital", "population")
VALUES
('Paris', 'The city of love', 1, true, 4000000);

INSERT INTO "SIGTHS" ("name", "text", "city_id")
VALUES
('Eiffel Tower', 'The most famous tower in the world', 1);

INSERT INTO "SIGHTS_TYPES" ("sight_id", "type_id")
VALUES 
(1,2), (1,3), (1,4);
