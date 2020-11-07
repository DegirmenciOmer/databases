```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         5 | Ema           | 91 Pixar St    | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         6 | Fatima        | 56 8th Ave     | D00001004 | 2020-03-20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         7 | Gabor         | 54 Vivaldi St  | D00001005 | 2020-02-20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         8 | Hema          | 9 Peter St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+


1. How can you convert the table into 1NF ?

Each table cell should contains a single value.
Each record needs to be unique.

This table above is not in first normal form because the [food_code] and [food_description] columns contain multiple values.

+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1        | Curry            |
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C2        | Cake             |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1        | Soup             |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | C2        | Cake             |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | S1        | Soup             |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020-03-15  | B02        | Zoku Roof Top     | C2        | Cake             |
|         4 | Dan           | 89 John St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        | Pie              |
|         4 | Dan           | 89 John St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        | Tea              |
|         4 | Dan           | 89 John St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        | Mousse           |
|         5 | Ema           | 91 Pixar St    | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        | Pie              |
|         5 | Ema           | 91 Pixar St    | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        | Tea              |
|         5 | Ema           | 91 Pixar St    | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        | Mousse           |
|         6 | Fatima        | 56 8th Ave     | D00001004 | 2020-03-20  | B04        | Mama's Kitchen    | F1        | Falafal          |
|         6 | Fatima        | 56 8th Ave     | D00001004 | 2020-03-20  | B04        | Mama's Kitchen    | M1        | Mousse           |
|         7 | Gabor         | 54 Vivaldi St  | D00001005 | 2020-02-20  | B05        | Hungry Hungary    | G1        | Goulash          |
|         7 | Gabor         | 54 Vivaldi St  | D00001005 | 2020-02-20  | B05        | Hungry Hungary    | P2        | Pasca            |
|         8 | Hema          | 9 Peter St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | P1        | Pie              |
|         8 | Hema          | 9 Peter St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | T1        | Tea              |
|         8 | Hema          | 9 Peter St     | D00001003 | 2020-03-20  | B03        | Goat Farm         | M1        | Mousse           |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+



2. What are the super, candidate, primary keys in the table created in step (1)?

Super Keys      : member_id,    member_name,    member_address,     dinner_id,  food_code,  venue code

Candidate Keys  : member_id,    dinner_id,      food_code

Primary Keys    : member_id + food_code + dinner_id (composite key).


3. How can you develop the set of 2NF tables? (Think of relationships between different tables).
Rule 1- Be in 1NF
Rule 2- Single Column Primary Key

AS member_name and member_address are dependent on member_id we must create a new table.
Table 1: member_id(pk) | member_name | member_address


food_description is dependent on food_code but not on member_name. Thats why we need to create a separate table as well.
Table 2: food_code(pk) | food_description

<!-- We need to create a third table containing the remaining columns: dinner_id, dinner_date, venue_code, venue_description
We need to set  member_id and food_code as composite key since we can select each only this way. -->

Our third table could be set to describe dinner:
Table 3: dinner_id(pk) | dinner_date | venue_code(fk)

venue_code represents the venue_description:
Table 4: venue_code(pk)| venue_description

To check who had whch food at which dinner:
Table 5: member_id(pk) | dinner_id | food_code(fk)

One last table could be shaped as:
Table 6: dinner_id(pk) | member_id




4. How can you develop the set of 3NF tables?
Rule 1- Be in 2NF
Rule 2- Has no transitive functional dependencies

Actually it could be deduced that the set of 2NF tables provides us with 3NF
```
