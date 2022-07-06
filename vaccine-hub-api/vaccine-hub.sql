-- Letting the user know that we will be deleting the whole database
\echo 'Delete and recreate the database?'
\prompt 'Return for yes or conctrol-C to cancel >' answer

DROP DATABSE  vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub;

-- executes sql from file and creates table with schema
\i vaccine-hub-schema.sql