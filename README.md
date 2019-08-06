# Primer Node App

## Run App

In first terminal window, start Mongo DB
```
mongod
```
It's ready when something like `waiting for connections on port 27017` is displayed

In second terminal window, start node app
```
npm run appStart
```

This sets the required secret values and runs the app using nodemon with DEBUG level set to `app:*`

## Common issues

### No token provided

#### Error message

```Access denied. No token provided.```

#### Explanation

You have not provided a JWT.

#### Solution

Add `x-auth-token` header with a JWT as the value.

### Invalid token provided

#### Error message

```Invalid token```

#### Explanation

You have provided an invalid JWT.

#### Solution

Get a valid JWT with `POST http://localhost:3000/api/auth` providing a registered username and password in the body, the token is returned in the response.

Example JSON body:

```
{
  "email": "email@test.aaa",
  "password": "12345"
}
```

If no valid user exists, create one with `POST http://localhost:3000/api/users` providing registration details in the body, the token is returned in the headers as `x-auth-token`.

```
{
  "name": "John Doe"
  "email": "email@test.aaa",
  "password": "12345"
}
```
