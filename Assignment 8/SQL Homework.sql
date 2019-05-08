USE sakila;

SELECT first_name, last_name
FROM actor;

SELECT concat(first_name, ' ' ,last_name) AS "Actor Name"
FROM actor; 

SELECT actor_id AS "ID Number", first_name, last_name
FROM actor
WHERE first_name = "Joe";

SELECT last_name
FROM actor
WHERE last_name LIKE '%GEN%';

SELECT last_name, first_name
FROM actor
WHERE last_name LIKE '%LI%';

SELECT country_id
FROM country
WHERE country IN ('Afghanistan', 'Bangladesh', 'China');

ALTER TABLE actor
ADD COLUMN description BLOB NOT NULL;

ALTER TABLE actor
DROP description;

SELECT last_name, COUNT(last_name)
FROM actor
GROUP BY last_name;

SELECT last_name, COUNT(last_name)
FROM actor
GROUP BY last_name
HAVING COUNT(last_name) > 1;

UPDATE actor
SET first_name = "HARPO"
WHERE first_name = "GROUCHO" and last_name = "WILLIAMS";

UPDATE actor
SET first_name = "GROUCHO"
WHERE first_name = "HARPO" and last_name = "WILLIAMS";

CREATE TABLE Address
(address_id smallint(5) unsigned NOT NULL AUTO_INCREMENT,
address varchar(50) NOT NULL,
address2 varchar(50) NOT NULL,
district varchar(20) DEFAULT NULL,
city_id smallint(50) unsigned NOT NULL, 
postal_code varchar(10) DEFAULT NULL,
phone varchar(20) NOT NULL,
location geometry NOT NULL,
last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (address_id),
INDEX idx_fk_city_id (city_id ASC),
SPATIAL INDEX idk_location (location ASC),
CONSTRAINT fk_address_city FOREIGN KEY (city_id) REFERENCES city (city_id) ON UPDATE CASCADE)
ENGINE = InnoDB AUTO_INCREMENT = 606 DEFAULT CHARSET = utf8

SELECT address.address_id, staff.first_name, staff.last_name, address.address
FROM staff
INNER JOIN address ON
staff.address_id = address.address_id;

SELECT first_name, last_name, SUM(amount) AS 'Total Amount'
FROM staff JOIN payment
ON staff.staff_id = payment.staff_id
WHERE payment.payment_date LIKE '%2005-08%'
GROUP BY first_name, last_name;

SELECT film.title, COUNT(film_actor.actor_id) AS 'Number of Actors'
FROM film
INNER JOIN film_actor ON
film.film_id = film_actor.film_id
GROUP BY film.title;

SELECT film.title, COUNT(inventory.store_id) AS 'Total Stored'
FROM film
INNER JOIN inventory ON
film.film_id = inventory.film_id
WHERE film.title = 'Hunchback Impossible';

SELECT c.first_name, c.last_name, SUM(p.amount) AS 'Total Payment'
FROM customer c
INNER JOIN payment p ON
c.customer_id = p.customer_id
GROUP BY c.last_name;

SELECT title
FROM film
WHERE title LIKE 'K%'
OR title LIKE 'Q%'
AND language_id IN 
(SELECT language_id
FROM language
WHERE name = 'English');

SELECT actor_id, first_name, last_name
FROM actor
WHERE actor_id IN 
(SELECT actor_id
FROM film_actor
WHERE film_id IN 
(SELECT film_id
FROM film
WHERE title = 'Alone Trip'));

SELECT * 
FROM country con
INNER JOIN city ON
con.country_id=city.country_id
WHERE con.country = 'Canada';

SELECT *
FROM city
INNER JOIN address a ON
city.city_id = a.city_id
WHERE city.country_id = 20;

SELECT cus.first_name, cus.last_name, cus.email
FROM address a
INNER JOIN customer cus ON
a.address_id IN (481, 468, 1, 3, 193, 415, 441);

SELECT category.name, film.title
FROM film_category
INNER JOIN film ON film.film_id = film_category.film_id
INNER JOIN category ON category.category_id = film_category.category_id
WHERE category.name = 'Family'; 

SELECT film_id, title, rental_duration
FROM film
GROUP BY title
ORDER BY rental_duration DESC;

SELECT p.staff_id, SUM(p.amount) AS 'Income ($)'
FROM payment p
INNER JOIN store s ON
p.staff_id = s.manager_staff_id
GROUP BY p.staff_id;

SELECT *
FROM store
INNER JOIN address a ON
s.address_id = a.adrress_id;

SELECT c.city, con.country
FROM city c
INNER JOIN country con ON
c.country_id = con.country_id
WHERE c.country_id IN (20, 8) AND c.city_id IN (300, 576);

SELECT fc.category_id, c.name, COUNT(fc.category_id) AS 'Total'
FROM film_category fc
INNER JOIN category c ON
fc.category_id = c.category_id
GROUP BY fc.category_id
ORDER BY COUNT(fc.category_id) DESC;

CREATE VIEW Top_Five AS
SELECT fc.category_id, c.name, COUNT(fc.category_id)
FROM film_category fc, category c
WHERE fc.category_id = c.category_id
GROUP BY fc.category_id
ORDER BY COUNT(fc.category_id) DESC;

SELECT * FROM Top_Five;

DROP VIEW Top_Five;


























