#!/bin/bash
openssl genrsa -out mailer_key.pem
openssl req -new -x509 -extensions v3_ca -key mailer_key.pem -config cert.cnf -out mailer_cert.pem -days 3650
