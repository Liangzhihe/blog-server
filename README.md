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

this project need to configure environment variables locally to connect to the database normally, the steps are as follows:

1. create env directory in the root directory
2. create environment variable configuration files for each environment under the env directory, including .env.development, .env.production, .env.test, etc.
3. configure the environment variables in the configuration file, for example:

```
# Description: xxx environment variables
# database config
DB_HOST=your database host
DB_PORT=your database port
DB_USER=your database user
DB_PASSWORD=your database password
DB_DATABASE=your database name

# super admin password
SUPER_ADMIN_PASSWORD=your super admin password

# jwt config
JWT_SECRET=your jwt access secret
JWT_REFRESH_SECRET=your jwt refresh secret

```

4. add the following code to the utils/database.ts file, for example:

```
import path from 'path'
import fs from 'fs'
import * as dotenv from 'dotenv'

...

// Load environment variables
const fileContent = fs.readFileSync(path.join(__dirname, `../../env/.env.${process.env.NODE_ENV}`), 'utf8')
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = dotenv.parse(fileContent)

...

```

## License

blog-server is licensed under the [MIT license](https://opensource.org/licenses/MIT).
