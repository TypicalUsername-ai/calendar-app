#!/bin/bash
psql -U root -d postgres -c "ALTER ROLE authenticator WITH PASSWORD '${AUTH_PASS}'"

