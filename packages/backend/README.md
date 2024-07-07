# Node.js App

## Overview

This is a Node.js application that uses PostgreSQL for its database and includes the following features:
features such as user authentication and transaction management.

## Requirements

- Node.js version: 18.18
- PostgreSQL

## Setup

### Environment Variables for local development

Create a `.env` file in the root of your project and add the following environment variables:

PRICE_UPDATING_FEATURE=false
SERVER_PORT=3000
TOKEN_SECRET_KEY="testingsecretkey"
TOKEN_EXPIRATION_TIME="30m"
DB_HOST="localhost"
DB_PORT=5432
DB_USERNAME="finances"
DB_PASSWORD="testing123456"
DB_NAME="finances"
