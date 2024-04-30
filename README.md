## Description

This package is a single middleware function that will read and parse a ```JWT``` token given some options, and check that a specific property value is included in the ```JWT``` token and matches another given value for authorization purposes.

## Requirements

Some way to be able to read cookies, like the ```cookie-parser``` package.

## How to use the middleware function

```
app.use(authorize('admin', {
    rolePropertyName: 'userType',
    cookieName: '_auth',
    secret: 'secret'
}));
```

## Parameters

### role

This parameter is the name of the role to authorize.

### rolePropertyName

This parameter is the name of the property inside the ```JWT``` token that should be matched against the first parameter. This is by default set to ```'userType'```.

### cookieName

This parameter is the name of the ```JWT``` token that should be evaluated. This is by default set to ```_auth```.

### secret

This parameter is the secret that is used to decrypt the ```JWT``` token. This should of course be the same as the secret that was used to encrypt it, otherwise it won't work. If no secret is provided explicitly, it will by default look for ```AUTH_SECRET``` in the ```.env``` file.

## Example setup

```
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use(authorize('admin', {
    rolePropertyName: 'userType',
    cookieName: '_auth',
    secret: 'secret'
}));

app.get('/secret-route', (req, res) => {
    res.send({ msg: 'This is a secret route' });
});

const PORT = 8080;

app.listen(PORT, () => console.log('Server is listening on port', PORT));
```

In the above example, you wont be able to access the route, unless your ```JWT``` token is

1. Named ```_auth```
2. Contains a property called ```userType```
3. The value of ```userType``` is equal to ```'admin'```

## JWT claims

The claims contained in the ```JWT``` token is added to the request object, inside a property called ```userClaims```. An example on how access these claims is shown below.

```
app.get('/secret-route', (req, res) => {
    console.log(req.userClaims) 
    // Outputs an object including all the key-value pairs
    from the parsed token

    res.send({ msg: 'This is a secret route' });
});

```

### Example ```userClaims``` object
```
{
  "userId": "66139452ae508f89bf34a201",
  "userType": "admin",
  "firstName": "John",
  "lastName": "Doe",
  "email": "JohnDoe@gmail.com"
}
```


