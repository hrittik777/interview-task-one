# NodeJS and PostgreSQL App for Bank Data

## App fetches details regarding Banks and Branches from Database and serves requested data through respective API endpoints.

### INSTRUCTIONS:
1. Install PostgreSQL
2. Create the necessary Tables and Views
```
CREATE TABLE banks (
name character varying(49),
id bigint NOT NULL
);

CREATE TABLE branches (
  ifsc character varying(11) NOT NULL,
  bank_id bigint,
  branch character varying(74),
  address character varying(195),
  city character varying(50),
  district character varying(50),
  state character varying(26)
);

CREATE VIEW bank_branches AS
SELECT branches.ifsc,
  branches.bank_id,
  branches.branch,
  branches.address,
  branches.city,
  branches.district,
  branches.state,
  banks.name AS bank_name
 FROM (branches
   JOIN banks ON ((branches.bank_id = banks.id)));
```
3. Populate Table 'banks' with data provided in the banks.csv file
```
COPY banks(name,id) FROM '<PATH_TO banks.csv>' DELIMITER ',' CSV HEADER;
```
4. Populate Table 'branches' with data provided in the branches.csv file
```
COPY branches (ifsc, bank_id, branch, address, city, district, state) FROM '<PATH_TO branches.csv>' DELIMITER ',' CSV HEADER;
```
5. Database is ready

### APPLICATION:
1. Install dependencies `npm install`
2. Start the Server using `npm run start` 
3. The application serves the following API endpoints:
  * Retrieve Auth Token: 
  ```
  curl -X POST "http://localhost:3000/user"
  ```
  * Retrieve all Banks in DB: http://localhost:3000/bank
  ```
  curl http://localhost:3000/bank
  ```
  * Retrieve all Branches in DB: http://localhost:3000/branch
  ```
  curl http://localhost:3000/branch
  ```
  * Retrieve Branch details based on IFSC Code: http://localhost:3000/branch/:ifsc
  ```
  curl --header "Authorization: Bearer <Auth Token>" http://localhost:3000/branch/<IFSC Code>
  ```
  * Retrieve all Bank Branches based on Bank Name, City and Limit & Offset values for results: http://localhost:3000/bank/:bank_name&:city&:limit&:offset
  ```
  curl --header "Authorization: Bearer <Auth Token>" http://localhost:3000/bank/<Bank Name>\&<City>\&<Limit>\&<Offset>
  ```
