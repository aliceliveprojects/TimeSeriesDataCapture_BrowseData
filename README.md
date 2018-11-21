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

Locate the host on `Line 10` and change `host: <url>` to `host: "localhost:8000"`

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


**Important**

- The *Database URL* is the **[ url_id ].mlab.com/[ port_number ]**

- For example **ds225442.mlab.com:25442/heroku_z6lwh5bd** ==> **ds225442.mlab.com:25442**

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
| PORT                 | 443                                      | Notionally, this variable is set to 443, but it simply exists as a placeholder for heroku. When running locally use 8000 |
| RSI_URI              | *RSI_URI*                                | Used by the API service. This url is used at the end of an implicit flow authentication to verify an RSA token. |
| WEB_CONCURRENCY      | 4                                        | Number of cores to use.                  |


---

This project was funded via the [Marloes Peeters Research Group](https://www.marloespeeters.nl/) and mentored by [DigitalLabs@MMU](https://digitallabs.mmu.ac.uk/) as a [DigitalLabs Summer Project](https://digitallabs.mmu.ac.uk/what-we-do/teaching/). It is the work of [Yusof Bandar](https://github.com/YusofBandar).


<p align="center">
<img align="middle" src="https://trello-attachments.s3.amazonaws.com/5b2caa657bcf194b4d089d48/5b98c7ec64145155e09b5083/d2e189709d3b79aa1222ef6e9b1f3735/DigitalLabsLogo_512x512.png"  />
 </p>
 
 
<p align="center">
<img align="middle" src="https://trello-attachments.s3.amazonaws.com/5b2caa657bcf194b4d089d48/5b98c7ec64145155e09b5083/e5f47675f420face27488d4e5330a48c/logo_mmu.png" />
 </p>
