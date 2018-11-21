'use strict';

var libjwt = require('jsonwebtoken');
var libjwks = require('jwks-rsa');
var authParser = require('auth-header');
var error = require('../error/error');


const supported_algorithms = {
    rsa: "RS256",
};

const supportedScopes = {
    admin: "admin", // create and deploy courses, CRUD owned oganisations, CRUD members from owned organisations, CRUD courses, CRUD plans.
}

const adminAuthorisedScopes = {
    admin: "admin"
}

var jwks_client = null;

var initialise = function (rsa_uri) {

    jwks_client = libjwks({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5, // Default value
        jwksUri: rsa_uri
    });


};

var get_access_token = function (req) {

    var authHeader = req.headers.authorization;
    var auth = authParser.parse(authHeader);
    var token = null;
    if (auth.scheme == "Bearer") {
        token = auth.token;
    }
    return token;
}

// attempt to verify the RSA signature of the access token, and then decode it.
var validate_RSA_access_token = function (token, kid, callback) {
    jwks_client.getSigningKey(kid, (err, key) => {
        if (!err) {
            const signingKey = key.publicKey || key.rsaPublicKey;
            libjwt.verify(
                token,
                signingKey,
                function(err, decoded){
                    callback(err, decoded);
                }
            );
        } else {
            callback(err,null);
        }
    });
}

var createOptions = function(externalId, scopes){
    return {
        externalId: externalId,
        scopes: scopes
    }
}

var createConsumerOptions = function (deploymentId, deploymentState, scopes, token){
    return {
        deploymentId: deploymentId,
        deploymentState: deploymentState,
        scopes: scopes,
        token: token
    }
}

var hasAuthorisedScope = function (scopeString, authorisedScopes) {
    return true;
}

/**
 * returns unauthenticated header information.
 * Use only if the request has been authenticated previously.
 */
var getHeaderInfo = function(req){

    var result = null;
    var access_token = get_access_token(req);
    // the access token is JWT - Base64 encoded, with signature
    if(access_token){
        var decoded_token = libjwt.decode(access_token, { complete: true });
        if (decoded_token) {
            result = createOptions(decoded_token.payload.sub, decoded_token.payload.scope);
        }
    }
    return result;

}


/**
 * returns unauthenticated header information.
 * Use only if the request has been authenticated previously.
 */
var getConsumerHeaderInfo = function(req){
    
        var result = null;
        var access_token = get_access_token(req);
        // the access token is JWT - Base64 encoded, with signature
        if(access_token){
            var decoded_token = libjwt.decode(access_token, { complete: true });
            if (decoded_token) {
                result = createConsumerOptions(
                    decoded_token.payload.deployment_id,
                    decoded_token.payload.deployment_state, 
                    decoded_token.payload.scope,
                    access_token
                );
            }
        }
        return result;
    
    }




var timeseries_admin_auth = function (req, def, scopes, callback) {
    
    var err = null;
    console.log(req);
    // get the access token from the incoming request
    var access_token = get_access_token(req);

    if (access_token) {
        // the access token is JWT - Base64 encoded, with signature
        var decoded_token = libjwt.decode(access_token, { complete: true });

        if (decoded_token) {
            if (decoded_token.header.alg == supported_algorithms.rsa) {
                // the authorizing authority has defined the API as requiring RSA security

                // get the key id to pass to the RSA endpoint during validation
                var kid = decoded_token.header.kid;
                
                validate_RSA_access_token(
                    access_token,
                    kid,
                    function (err, valid_token) {
                        if (!err) {
                            if(hasAuthorisedScope(valid_token.scope, adminAuthorisedScopes)){
                                callback(null, valid_token);
                            }else{
                                callback(error.create401Error("admin scope is required for this service."));  
                            }
                        }else{
                            callback(error.create401Error(err.message));
                        }
                    });

            } else {
                callback(error.create401Error("unsupported JWT algorithm"));
            }
        } else {
            callback(error.create401Error("could not decode token"));
        }
    } else {
        callback(error.create401Error("token not found"));
    }
}


var createConsumerToken = function (consumerApiAddress,deploymentId, deploymentState){
    var result = null;
    var payload = {
        api: consumerApiAddress,
        deployment_id: deploymentId,
        deployment_state: deploymentState,
        scope: supportedScopes.consumer
    };

    var payloadAsString = JSON.stringify(payload);
    
    var result = libjwt.sign(
        payloadAsString,
        hsa_secret,
        {
            algorithm: supported_algorithms.hsa
        }
    );

    return result;

};




module.exports = {
    SUPPORTED_SCOPES: supportedScopes,
    initialise :initialise,
    createOptions: createOptions,
    getHeaderInfo: getHeaderInfo,
    getConsumerHeaderInfo: getConsumerHeaderInfo,
    timeseries_admin_auth: timeseries_admin_auth,
    createConsumerToken: createConsumerToken
};