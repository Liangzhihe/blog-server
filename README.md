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

## husky+commitlint+commitizen

#### install husky, commitlint and commitizen
```bash
npm install --save-dev husky @commitlint/{config-conventional,cli} commitizen
```
  
#### init husky
```bash
npx husky install
```

#### init commitlint
##### make .commitlintrc.json file and add the following code
```json
{
  "extends": ["@commitlint/config-conventional"]
}
```
##### or js file, just run the following code
```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > .commitlintrc.js
```

#### update pkg.json
```json
"scripts": {
  "commit": "cz"
},
"config": {
  "commitizen": {
    "path": "cz-conventional-changelog"
  }
}
```

#### add husky hook
```bash
npx husky add .husky/pre-commit "npx --no -- commitlint --from=main --quiet"
```

#### when commit, use `npm run commit` instead of `git commit`
```bash
npm run commit
```

## License

blog-server is licensed under the [MIT license](https://opensource.org/licenses/MIT).
