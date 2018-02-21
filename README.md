[16:06, 21/2/2018] Marcos Defendi: # Login with Twitter

| URL             | Requires Auth | HTTP Method |
| :-------------- | :------------ | :---------- |
| `/api/v1/login` | `no`          | `POST`      |

## Payload

| Argument            | Example                         | Required | Description                                   |
| :------------------ | :------------------------------ | :------- | :-------------------------------------------- |
| `serviceName`       | `twitter`                       | Required | The desired OAuth service name                |
| `accessToken`       | `hash`                          | Required | Access token provided by twitter oauth        |
| `accessTokenSecret` | `hash`                          | Required | Access token secret provided by twitter oauth |
| `appSecret`         | `hash`                          | Required | The secret provided by twitter for app        |
| `appId`             | `hash`                          | Required | The id provided by twitter for app            |
| `expiresIn`         | `200`                           | Required | Lifetime of token(in seconds)                 |
| `identity`          | `{id: '1', name: 'rocket.cat'}` | Optional | Google user identity                          |

## Example Call - As JSON

bash
curl -H "Content-type:application/json" \
      http://localhost:3000/api/v1/login \
      -d '{ "serviceName": "google", accessToken": "hash", 
      "idToken": "hash", "expiresIn": 200, "scope": "profile" }'


## Result

json
{
  "status": "success",
  "data": {
      "authToken": "9HqLlyZOugoStsXCUfD_0YdwnNnunAJF8V47U3QHXSq",
      "userId": "aobEdbYhXfu5hkeqG"
   }
}
