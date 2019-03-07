# TimeSeriesDataCapture_BrowseData
Implementation of the BrowseData interface, described in TimeSeriesDataCapture 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Building

## Prerequisites

- [Import API](https://github.com/CMDT/TimeSeriesDataCapture_ImportSource)

- [MongoDB Database](https://github.com/CMDT/TimeSeriesDataCapture#mongodb-hosting) and [MongoDB Creation](https://github.com/CMDT/TimeSeriesDataCapture#mongodb-creation)

- [Auth0 Account](https://github.com/CMDT/TimeSeriesDataCapture#auth0)

## Deployment
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

| Variable             | Example                                  | Description                              |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| DEBUG | * | Node debugging. Defines what components produce logging. Usually set to *|                                    
| PORT  |443 | Notionally, this variable is set to 443, but it simply    exists as a placeholder for heroku. When running locally use 8000|
| AUTH_CLIENTID|*AUTH CLIENT ID*|Must be passed to Auth0 as a parameter.Client ID associated with the App name in the Auth0 account.|
| AUTH_APP_NAME|*AUTH APP NAME*|Auth0 application name|
|RSA_URI|*RSA_URI*|Auth0 /jwks.json endpoint|
|AUTH_URL| *AUTH_URL*| Auth0 /authorize endpoint|
|AUTH_AUDIENCE|*AUTH AUDIENCE*| Auth0 /user endpoint|
|IMPORT_URI|*IMPORT URI*|The URI of the Import API|
|DATABASE_HOSTNAME|*DATABASE HOSTNAME*|MongoDB database hostname (ds34237452745.mlab.com)|
|DATABASE_PORT|*DATABASE PORT*|MongoDB database port number|
|DATABASE_NAME|*DATABASE NAME*|MongoDB database name|
|DATABASE_USERNAME|*DATABASE USERNAME*|MongoDB database user username|
|DATABASE_PASSWORD|*DATABASE PASSWORD*|MongoDB database user password|
|API_SCHEME|*API SCHEME*|Scheme for api (either http or https)|
|API_DOMAIN|*API DOMAIN*|Domain for api|
|API_PORT|*API PORT*|Port for api|


**Auth0**

*Auth App Name*,*Auth Client ID*,*RSA URI* and *AUTH URL* can be located on your Auth0 dashboard, Single Page Application.

*Auth Audience*  can be located  on your Auth0 dashboard, API section.

*For help see [Auth0](https://github.com/CMDT/TimeSeriesDataCapture#auth0)*

**Database**

*Database URL*, *Database Username*, *Database Password* and *Database Name* can be all found within the mLab dashboard

---

This project was funded via the [Marloes Peeters Research Group](https://www.marloespeeters.nl/) and mentored by [DigitalLabs@MMU](https://digitallabs.mmu.ac.uk/) as a [DigitalLabs Summer Project](https://digitallabs.mmu.ac.uk/what-we-do/teaching/). It is the work of [Yusof Bandar](https://github.com/YusofBandar).


<p align="center">
<img align="middle" src="https://trello-attachments.s3.amazonaws.com/5b2caa657bcf194b4d089d48/5b98c7ec64145155e09b5083/d2e189709d3b79aa1222ef6e9b1f3735/DigitalLabsLogo_512x512.png"  />
 </p>
 
 
<p align="center">
<img align="middle" src="https://trello-attachments.s3.amazonaws.com/5b2caa657bcf194b4d089d48/5b98c7ec64145155e09b5083/e5f47675f420face27488d4e5330a48c/logo_mmu.png" />
 </p>
