# TimeSeriesDataCapture_BrowseData
Implementation of the BrowseData interface, described in TimeSeriesDataCapture 

![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Building

### Prerequisites

#### MongoDB Database
see [MongoDB Hosting](https://github.com/CMDT/TimeSeriesDataCapture#mongodb-hosting) and [MongoDB Creation](https://github.com/CMDT/TimeSeriesDataCapture#mongodb-creation)

### Auth0 Account
see [Auth0](https://github.com/CMDT/TimeSeriesDataCapture#auth0)

### Heroku
To build browse api on heroku simply click the deploy to heroku button above

### Localhost
To build browse locally first the API [swagger.yaml](https://github.com/CMDT/TimeSeriesDataCapture_BrowseData/blob/master/src/BrowseAPI/api/swagger.yaml) file must be modified.

Locate the host on `Line 10` and change `host: "timeseriesdatacapture-browse.herokuapp.com:443"` to `host: "localhost:8000"`

Locate the schemes on `Line 16` and change `- "https"` to `-http`

To start server run:

```
node index.js
```

## Environment Variables 
| Variable             | Example                                  | Description                              |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| -                    | -                                        | -                                        |
| AUTH_APP_NAME        | AppatellaSwaggerClient                   | Used by API service. Used to identify the app to the Auth0 authentication service. If you change this, you'll need to set up another app in the associated Auth0 Account. |
| AUTH_AUDIENCE        | https://www.appatella.org/user           | Held by the API service, and written to the SPWA configuration file on initialisation. Used by the SPWA in the browser, as interface identifier in the Auth0 implicit flow. Must be passed to Auth0 as a parameter. |
| AUTH_CLIENT_ID       | xxxxxxxxxxxx                             | Held by the API service, and written to the SPWA configuration file on initialisation. Used by the SPWA in the browser, as interface identifier in the Auth0 implicit flow. Must be passed to Auth0 as a parameter.Client ID associated with the App name in the Auth0 account. |
| AUTH_URL             | https://appatella.eu.auth0.com/authorize | Held by the API service, and written to the SPWA configuration file on initialisation. Used by the SPWA in the browser, as url to contact during implicit flow authentication. Set up in Auth0 account. |
| CONSUMER_API_ADDRESS | appatelladbapi.herokuapp.com             | this is the address the consumer app goes to to get course data from. Usually, the same address as the deployement api. The consumer API address is integrated into the deployment token for the course, telling the app where to get the course from. |
| CONSUMER_SECRET      | licorice fern                            | this is the app secret, used to provide the signature for the course deployment token. |
| DATABASE_URL         | postgres://x:y@z.eu-west-1.compute.amazonaws.com:5432/a | this is the access url for the database. It's a pretty standard postres URL, but this one is handled by heroku, and deployed to AWS. |
| DB_NEEDS_SSL         | true                                     | Used by the API service. True when the DB is remote (AWS) false when the DB is running on localhost. |
| DEBUG                | `*`                                      | Node debugging. Defines what components produce logging. Usually set to `*` |
| DISABLE_CLUSTERING   | true                                     | set to false to enable running on multiple cores. Currently set to true, because it's not yet tested. |
| PORT                 | 443                                      | Notionally, this variable is set to 443, but it simply exists as a placeholder for heroku. |
| RSI_URI              | https://appatella.eu.auth0.com/.well-known/jwks.json | Used by the API service. This url is used at the end of an implicit flow authentication to verify an RSA token. |
| SYSTEM_EXTERNAL_ID   | SYSTEM                                   | fbb69ea1-56ee-476d-be87-3360453bc7b5     |
| WEB_CONCURRENCY      | 4                                        | Number of cores to use.                  |
