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

