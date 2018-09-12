# TimeSeriesDataCapture_BrowseData
Implementation of the BrowseData interface, described in TimeSeriesDataCapture 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Building

### Prerequisites

#### MongoDB Database
see [MongoDB Hosting](https://github.com/CMDT/TimeSeriesDataCapture#mongodb-hosting) and [MongoDB Creation](https://github.com/CMDT/TimeSeriesDataCapture#mongodb-creation)

### Auth0 Account
see [Auth0](https://github.com/CMDT/TimeSeriesDataCapture#auth0)

### Heroku
To build the Browse API on heroku simply click the Deploy To Heroku button above

### Localhost
To build browse locally first the API [swagger.yaml](https://github.com/CMDT/TimeSeriesDataCapture_BrowseData/blob/master/src/BrowseAPI/api/swagger.yaml) file must be modified.

Locate the host on `Line 10` and change `host: "timeseriesdatacapture-browse.herokuapp.com:443"` to `host: "localhost:8000"`

Locate the schemes on `Line 16` and change `- "https"` to `-http`

To start server run:

```
node index.js
```

## Environment Variables 

### Auth0
*Auth App Name* and *Auth Client ID* can be located on the [Auth0 Dashboard](https://manage.auth0.com) under the application Settings tab. 

*Auth Audience* and *Auth URL* can be located under the application Settings tab, under Show Advanced Setting, under the Endpoints tab

*For help see [Auth0](https://github.com/CMDT/TimeSeriesDataCapture#auth0)*

### Database
*Database URL*, *Database Username*, *Database Password* and *Database Name* can be all found within the mLab dashboard

*For help see [MongoDB](https://github.com/CMDT/TimeSeriesDataCapture#mongodb-hosting)*

| Variable             | Example                                  | Description                              |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| AUTH_APP_NAME        | *AUTH APP NAME*                          | Used by API service. Used to identify the app to the Auth0 authentication service. If you change this, you'll need to set up another app in the associated Auth0 Account. |
| AUTH_AUDIENCE        | *Auth AUDIENCE*                          | Held by the API service, and written to the SPWA configuration file on initialisation. Used by the SPWA in the browser, as interface identifier in the Auth0 implicit flow. Must be passed to Auth0 as a parameter.                           |
| AUTH_CLIENT_ID       | *AUTH CLIENT ID*                         | Held by the API service, and written to the SPWA configuration file on initialisation. Used by the SPWA in the browser, as interface identifier in the Auth0 implicit flow. Must be passed to Auth0 as a parameter.Client ID associated with the App name in the Auth0 account. |
| AUTH_URL             | *Auth_URL*                               | Held by the API service, and written to the SPWA configuration file on initialisation. Used by the SPWA in the browser, as url to contact during implicit flow authentication. Set up in Auth0 account.                                          |
| CONSUMER_API_ADDRESS | *CONSUMER API ADDRESS*                    | this is the address the consumer app goes to to get course data from. Usually, the same address as the deployement api. The consumer API address is integrated into the deployment token for the course, telling the app where to get the course from.     |
| DATABASE_URL         | *DATABASE URL*                           | this is the access url for the  MongoDB database. |
| DATABASE_USERNAME    | *DATABASE USERNAME*                      | this is the username for the  MongoDB database. |
| DATABASE_PASSWORD    | *DATABASE PASSWORD*                      | this is the password for the  MongoDB database. |
| DATABASE_NAME        | *DATABASE NAME*                          | this is the database name|
| DEBUG                | `*`                                      | Node debugging. Defines what components produce logging. Usually set to `*` |
| DISABLE_CLUSTERING   | true                                     | set to false to enable running on multiple cores. Currently set to true, because it's not yet tested. |
| PORT                 | 443                                      | Notionally, this variable is set to 443, but it simply exists as a placeholder for heroku. |
| RSI_URI              | *RSI_URI*                                | Used by the API service. This url is used at the end of an implicit flow authentication to verify an RSA token. |
| SYSTEM_EXTERNAL_ID   | SYSTEM                                   | fbb69ea1-56ee-476d-be87-3360453bc7b5     |
| WEB_CONCURRENCY      | 4                                        | Number of cores to use.                  |
