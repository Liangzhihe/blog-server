⚠️ **This is not production-ready software. This project is in active development ⚠️**

## About

this project is a backend server for sample-blog, was created by [Node.js](https://nodejs.org/en/) , [TypeScript](https://www.typescriptlang.org), [MySQL](https://www.mysql.com) and [Express](https://expressjs.com/).

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm run start`

Run the server in production mode.

### `npm run lint`

lint the code by eslint

## environment variables

DO NOT upload sensitive data to code management platform

use [dotenv](https://www.npmjs.com/package/dotenv) to configure environment variables

this project need to configure environment variables locally to connect to the database normally, the steps are as follows:

1. create env directory in the root directory
2. create environment variable configuration files for each environment under the env directory, including .env.development, .env.production, .env.test, etc.
3. configure the environment variables in the configuration file, for example:

```
DB_HostDB_HOST=your database host
DB_USER=your database user
DB_PASSWORD=your database password
DB_DATABASE=your database name
```

4. add the following code to the entry file of the project(server.ts), for example:

```
import dotenv from 'dotenv'

dotenv.config({ path: `env/.env.${process.env.NODE_ENV}` })
```
