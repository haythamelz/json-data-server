# JSON Data Service

## Quick Start up with local integration test run

1) Ensure to have an AWS S3 bucket but don't worry about uploading an object.
2) Define environment variables as explained under `Local Setup` and choose an object name in the `CONFIG_KEY` variable.
3) docker compose up the solution as described in `Local Setup`.
4) Run k6 integration tests with the command defined under `k6 Integration tests`. If environment variables aren't specified then `EXECUTION` and `OPTIONS_SET` have default values of `local` and `integration` respectively. 

## Local Setup

Create .env file in root directory with environment variables

```bash
CONFIG_BUCKET_NAME=
CONFIG_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

Run docker container with below command to pass these variables
`docker compose --env-file .env up -d`

## Testing

Due to time limitation there is currently no Swagger docs, below is a temporary view of the different REST ops when running with localhost:

### GET all
`GET (http://localhost:8087/json-data/app)`, success status `200`

#### Response body:

```
{"apps": [
  {"appId": "string",
  "appName": "string",
  "appPath": "string",
  "owner": "string",
  "isValid": "boolean"}
]}
```

### GET appId
`GET (http://localhost:8087/json-data/app/{appId})`, success status `200`

#### Response body:

```
{"appId": "string",
"appName": "string",
"appPath": "string",
"owner": "string",
"isValid": "boolean"}
```

### POST create new
`POST (http://localhost:8087/json-data/create-app)`, success status `201`

#### Request body:

```
{"appName": "string", (required)
"appPath": "string", (required)
"owner": "string", (required)
"isValid": "boolean" (optional - if not added field will return as false)}
```

#### Response body:

```
{"appId": "string",
"appName": "string",
"appPath": "string",
"owner": "string",
"isValid": "boolean"}
```

### PUT update
`PUT (http://localhost:8087/json-data/update-app)`, success status `200`

#### Request body:

```
{"appName": "string", (not allowed)
"appPath": "string", (not allowed)
"owner": "string", (required)
"isValid": "boolean" (optional - if not added field will return as false)}
```

#### Response body:

```
{"appId": "string",
"appName": "string",
"appPath": "string",
"owner": "string",
"isValid": "boolean"}
```

### DELETE
`DELETE (http://localhost:8087/json-data/delete-app/{appId})`, success status `200`

## k6 Integration tests

Create .env file in test-k6 directory with environment variables

```bash
EXECUTION=
OPTIONS_SET=
```

EXECUTION options are `local` or `test`. If you wish to run against local environment, start up the service locally using docker compose as described above.
OPTIONS_SET options are `integration` or `peak` or `soak`. Only use `integration`, as there are not testsuites set up for non-functional tests.

To run k6 integration tests run:
`npm run k6`
