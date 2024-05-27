CREATE SCHEMA api;
-- Create a role with a default password
CREATE ROLE authenticator WITH LOGIN PASSWORD 'default_pass';
CREATE ROLE gotrue_agent;

-- Alter the password using an environment variable
CREATE ROLE web_anon nologin;
GRANT web_anon TO authenticator;
CREATE ROLE client;
GRANT client TO authenticator;
CREATE ROLE admin;
GRANT client TO admin;
GRANT admin TO authenticator;

GRANT USAGE ON SCHEMA api TO authenticator;
GRANT USAGE ON SCHEMA api TO client;
GRANT USAGE ON SCHEMA api TO admin;
GRANT USAGE ON SCHEMA api TO web_anon;
