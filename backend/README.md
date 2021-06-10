# demoApp backend

This repository contains the backend code of a demoApp Just like the React.js frontend, the backend is a working prototype and still in development. It uses MongoDB as NoSQL database

## How to use

### Clone repo and install dependencies

Install all dependencies by moving to the root folder of the Node app and execute

```
git clone https://github.com/RapTho/demoApp.git
cd demoApp/backend
npm install
```

### Start either DEV, TEST or PROD

DEV

```
npm run dev
```

TEST

```
npm run test
```

PROD

```
npm start
```

### On Windows

DEV

```
npm run dev:windows
```

PROD

```
npm start:windows
```

### Environment variables

The backend needs a [.env](/env) file for DEV, TEST and PROD. When deployed to production, secrets and other environment variables should be handled differently! Place the following key-value pairs in your .env files:

```
PORT=5000
MONGODBURL=mongodb+srv://demoApp:superSecure@dev.gbaj5.mongodb.net/demoApp-dev?retryWrites=true&w=majority
JWT_SECRET=yaGdDH3ONGnbU7Z3tYVezW7pAT3BdBRSj7df3dwE43gLoLENBBVQBl2nVVeuhAEW
```

## APIs

The following APIs work and are already implemented in the frontend:

- [Login](#login-sample-request)
- [Logout](#logout-sample-request)
- [Create user](#CreateUser-sample-request)
- [Update user](#updateUser-sample-request)
- [Delete user](#DeleteUser-sample-request)
- [Get user profile](#GetUser-sample-request)
- [Create thing](#CreateThing-sample-request)
- [Update thing](#UpdateThing-sample-request)
- [Delete thing](#DeleteThing-sample-request)
- [Get a specific number of things](#GetRandomThings-sample-request)
- [Get all things of authenticated user](#GetMyThings-sample-request)
- [Get things near location XY](#GetThingsNearLocation-sample-request)
- [Get things with a certain name or description](#GetThingByText-sample-request)

## Base URL

This example shows the base URL for deployment on a local machine. This might vary depending on your host. Set the "PORT" environment variable to change the default port 5000.

```
http://localhost:5000
```

## login sample request

Endpoint =

```
/api/auth/login
```

Method = POST

Headers =

```json
{
  "Content-Type": "application/json"
}
```

Body

```json
{
  "email": "raphael@test.ch",
  "password": "superSecure"
}
```

A sample response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMyN2MzM2IzMjBhZTU0MDRmMGQ0OGYiLCJsb2NhdGlvbiI6eyJjb29yZGluYXRlcyI6WzguMTc0Njc4LDQ3LjEzNTQ5ODddLCJ0eXBlIjoiUG9pbnQifSwidXNlcm5hbWUiOiJSYXBoYWVsIiwiZW1haWwiOiJyYXBoYWVsQHRlc3QuY2giLCJpYXQiOjE2MjMzNTg1MjksImV4cCI6MTYyMzYxNzcyOX0.opXXeDa6gj2vXObXzgugvgjJS__xGOm19O-UmkSNd_o",
  "expirationTime": 1623617729
}
```

## logout sample request

Endpoint =

```
/api/auth/logout
```

Method = GET

Headers =

```json
{
  "Authorization": "Bearer YOUR_JWT"
}
```

A sample response

```
OK
```

## CreateUser sample request

Endpoint =

```
/api/user/createUser
```

Method = POST

Headers =

```json
{
  "Content-Type": "application/json"
}
```

Body

The password must contain at least 8 characters including: lower-case, upper-case and special characters and a digit. The coordinates array first takes the longitude and then the latitute.

```json
{
  "username": "Raphael",
  "email": "raphael@test.ch",
  "password": "superSecure9$",
  "location": {
    "type": "Point",
    "coordinates": [8.174678, 47.1354987]
  }
}
```

A sample response

```json
{
  "location": {
    "coordinates": [8.174678, 47.1354987],
    "type": "Point"
  },
  "_id": "60c27c33b320ae5404f0d48f",
  "username": "Raphael",
  "email": "raphael@test.ch",
  "__v": 0
}
```

## UpdateUser sample request

Endpoint =

```
/api/user/me
```

Method = PATCH

Headers =

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_JWT"
}
```

Body

Parameters that are not declared in the update request will not change

```json
{
  "username": "Raphi"
}
```

A sample response

```
ok

```

## DeleteUser sample request

Endpoint =

```
/api/user/me
```

Method = DELETE

Headers =

```json
{
  "Authorization": "Bearer YOUR_JWT"
}
```

**!!! ATTENTION!!!** All things that the user (co-)owns will be deleted

A sample response

```
ok

```

## GetUser sample request

Endpoint =

```
/api/user/me
```

Method = GET

Headers =

```json
{
  "Authorization": "Bearer YOUR_JWT"
}
```

A sample response

```json
{
  "_id": "60c27c33b320ae5404f0d48f",
  "location": {
    "type": "Point",
    "coordinates": [8.174678, 47.1354987]
  },
  "username": "Raphael",
  "email": "raphael@test.ch"
}
```

## CreateThing sample request

Endpoint =

```
/api/thing/createThing
```

Method = POST

Headers =

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_JWT"
}
```

Body

```json
{
  "name": "iMac",
  "description": "Very fancy device",
  "location": {
    "type": "Point",
    "coordinates": [8.17463, 47.13548]
  }
}
```

A sample response

```json
{
  "ownerIDs": ["60c27c33b320ae5404f0d48f"],
  "_id": "60c27ea61bca720ca858f0e3",
  "name": "iMac",
  "description": "Very fancy device",
  "location": {
    "type": "Point",
    "coordinates": [8.17463, 47.13548]
  },
  "__v": 0
}
```

## UpdateThing sample request

Endpoint =

```
/api/thing/updateThing
```

Method = PATCH

Headers =

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_JWT"
}
```

Body

```json
{
  "thingId": "60c27ea61bca720ca858f0e3",
  "name": "iPad",
  "ownerIDs": ["60c27c33b320ae5404f0d48f", "NEW_CO-OWNER_ID"]
}
```

A sample response

```
ok

```

## DeleteThing sample request

Endpoint =

```
/api/thing/deleteThing?thingId=YOUR_THING_ID
```

Method = DELETE

Headers =

```json
{
  "Authorization": "Bearer YOUR_JWT"
}
```

URL parameter

```
thingId: 60c12b04fe9c52177c89022e
```

A sample response

```
OK
```

## GetRandomThings sample request

Endpoint =

```
/api/thing/getRandomThings?number=1
```

Method = GET

Headers =

```json
{
  "Authorization": "Bearer YOUR_JWT"
}
```

URL parameter

```json
number: 1
```

A sample response

```json
[
  {
    "_id": "60c279550685f92a0827731d",
    "ownerIDs": ["60c2793f0685f92a0827731c"],
    "name": "iPad",
    "description": "Very fancy iPad",
    "location": {
      "type": "Point",
      "coordinates": [8.17463, 47.13548]
    },
    "__v": 0
  }
]
```

## GetMyThings sample request

This request queries all things that he/she owns (which contain his/her userId in the ownerIDs array)
<br>
<br>
Endpoint =

```
/api/thing/getMyThings
```

Method = GET

Headers =

```json
{
  "Authorization": "Bearer YOUR_JWT"
}
```

A sample response

```json
[
  {
    "_id": "60c27ea61bca720ca858f0e3",
    "ownerIDs": ["60c27c33b320ae5404f0d48f", "NEW_CO-OWNER_ID"],
    "name": "iPad",
    "description": "Very fancy device",
    "location": {
      "type": "Point",
      "coordinates": [8.17463, 47.13548]
    },
    "__v": 0
  }
]
```

## GetThingsNearLocation sample request

Endpoint =

```
/api/thing/getThingsNearLocation?lat=YOUR_LATITUDE&long=YOUR_LONGITUDE&radius=YOUR_RADIUS_IN_METERS
```

Method = GET

Headers =

```json
{
  "Authorization": "Bearer YOUR_JWT"
}
```

URL parameter

```json
lat: 47.392853,
long: 8.476000,
radius 200000
```

A sample response

```json
[
  {
    "_id": "60c27ea61bca720ca858f0e3",
    "ownerIDs": ["60c27c33b320ae5404f0d48f", "NEW_CO-OWNER_ID"],
    "name": "iPad",
    "description": "Very fancy device",
    "location": {
      "type": "Point",
      "coordinates": [8.17463, 47.13548]
    },
    "__v": 0
  }
]
```

## GetThingByText sample request

Endpoint =

```
/api/thing/getThingsByText?text=Very%20fancy
```

Method = GET

Headers =

```json
{
  "Authorization": "Bearer YOUR_JWT"
}
```

URL parameter<br>
Make sure to **URL encode** your string!

```json
text: Very fancy
```

A sample response

```json
[
  {
    "_id": "60c27ea61bca720ca858f0e3",
    "ownerIDs": ["60c27c33b320ae5404f0d48f", "NEW_CO-OWNER_ID"],
    "name": "iPad",
    "description": "Very fancy device",
    "location": {
      "type": "Point",
      "coordinates": [8.17463, 47.13548]
    },
    "__v": 0
  }
]
```

## Contributor

[Raphael Tholl](https://github.com/RapTho)

## License

[MIT](/LICENSE)
