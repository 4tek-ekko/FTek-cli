/*
 * Code generated by Microsoft (R) AutoRest Code Generator 0.17.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

var util = require('util');
var msRest = require('ms-rest');
var WebResource = msRest.WebResource;

/**
 * @class
 * Repositories
 * __NOTE__: An instance of this class is automatically created for an
 * instance of the AppCenterClient.
 * Initializes a new instance of the Repositories class.
 * @constructor
 *
 * @param {AppCenterClient} client Reference to the service client.
 */
function Repositories(client) {
  this.client = client;
}

/**
 * Gets the repositories available from the source code host
 *
 * @param {string} sourceHost The source host. Possible values include:
 * 'github', 'bitbucket', 'vsts'
 * 
 * @param {string} ownerName The name of the owner
 * 
 * @param {string} appName The name of the application
 * 
 * @param {object} [options] Optional Parameters.
 * 
 * @param {string} [options.vstsAccountName] Filter repositories only for
 * specified account and project, "vstsProjectId" is required
 * 
 * @param {string} [options.vstsProjectId] Filter repositories only for
 * specified account and project, "vstsAccountName" is required
 * 
 * @param {string} [options.form] The selected form of the object. Possible
 * values include: 'lite', 'full'
 * 
 * @param {object} [options.customHeaders] Headers that will be added to the
 * request
 * 
 * @param {function} callback
 *
 * @returns {function} callback(err, result, request, response)
 *
 *                      {Error}  err        - The Error object if an error occurred, null otherwise.
 *
 *                      {object} [result]   - The deserialized result object.
 *
 *                      {object} [request]  - The HTTP Request object if an error did not occur.
 *
 *                      {stream} [response] - The HTTP Response stream if an error did not occur.
 */
Repositories.prototype.list = function (sourceHost, ownerName, appName, options, callback) {
  var client = this.client;
  if(!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }
  if (!callback) {
    throw new Error('callback cannot be null.');
  }
  var vstsAccountName = (options && options.vstsAccountName !== undefined) ? options.vstsAccountName : undefined;
  var vstsProjectId = (options && options.vstsProjectId !== undefined) ? options.vstsProjectId : undefined;
  var form = (options && options.form !== undefined) ? options.form : undefined;
  // Validate
  try {
    if (sourceHost === null || sourceHost === undefined || typeof sourceHost.valueOf() !== 'string') {
      throw new Error('sourceHost cannot be null or undefined and it must be of type string.');
    }
    if (vstsAccountName !== null && vstsAccountName !== undefined && typeof vstsAccountName.valueOf() !== 'string') {
      throw new Error('vstsAccountName must be of type string.');
    }
    if (vstsProjectId !== null && vstsProjectId !== undefined && typeof vstsProjectId.valueOf() !== 'string') {
      throw new Error('vstsProjectId must be of type string.');
    }
    if (form !== null && form !== undefined && typeof form.valueOf() !== 'string') {
      throw new Error('form must be of type string.');
    }
    if (ownerName === null || ownerName === undefined || typeof ownerName.valueOf() !== 'string') {
      throw new Error('ownerName cannot be null or undefined and it must be of type string.');
    }
    if (appName === null || appName === undefined || typeof appName.valueOf() !== 'string') {
      throw new Error('appName cannot be null or undefined and it must be of type string.');
    }
  } catch (error) {
    return callback(error);
  }

  // Construct URL
  var baseUrl = this.client.baseUri;
  var requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'v0.1/apps/{owner_name}/{app_name}/source_hosts/{source_host}/repositories';
  requestUrl = requestUrl.replace('{source_host}', encodeURIComponent(sourceHost));
  requestUrl = requestUrl.replace('{owner_name}', encodeURIComponent(ownerName));
  requestUrl = requestUrl.replace('{app_name}', encodeURIComponent(appName));
  var queryParameters = [];
  if (vstsAccountName !== null && vstsAccountName !== undefined) {
    queryParameters.push('vstsAccountName=' + encodeURIComponent(vstsAccountName));
  }
  if (vstsProjectId !== null && vstsProjectId !== undefined) {
    queryParameters.push('vstsProjectId=' + encodeURIComponent(vstsProjectId));
  }
  if (form !== null && form !== undefined) {
    queryParameters.push('form=' + encodeURIComponent(form));
  }
  if (queryParameters.length > 0) {
    requestUrl += '?' + queryParameters.join('&');
  }

  // Create HTTP transport objects
  var httpRequest = new WebResource();
  httpRequest.method = 'GET';
  httpRequest.headers = {};
  httpRequest.url = requestUrl;
  // Set Headers
  if(options) {
    for(var headerName in options['customHeaders']) {
      if (options['customHeaders'].hasOwnProperty(headerName)) {
        httpRequest.headers[headerName] = options['customHeaders'][headerName];
      }
    }
  }
  httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
  httpRequest.body = null;
  // Send Request
  return client.pipeline(httpRequest, function (err, response, responseBody) {
    if (err) {
      return callback(err);
    }
    var statusCode = response.statusCode;
    if (statusCode !== 200 && statusCode !== 400) {
      var error = new Error(responseBody);
      error.statusCode = response.statusCode;
      error.request = msRest.stripRequest(httpRequest);
      error.response = msRest.stripResponse(response);
      if (responseBody === '') responseBody = null;
      var parsedErrorResponse;
      try {
        parsedErrorResponse = JSON.parse(responseBody);
        if (parsedErrorResponse) {
          if (parsedErrorResponse.error) parsedErrorResponse = parsedErrorResponse.error;
          if (parsedErrorResponse.code) error.code = parsedErrorResponse.code;
          if (parsedErrorResponse.message) error.message = parsedErrorResponse.message;
        }
      } catch (defaultError) {
        error.message = util.format('Error "%s" occurred in deserializing the responseBody ' + 
                         '- "%s" for the default response.', defaultError.message, responseBody);
        return callback(error);
      }
      return callback(error);
    }
    // Create Result
    var result = null;
    if (responseBody === '') responseBody = null;
    // Deserialize Response
    if (statusCode === 200) {
      var parsedResponse = null;
      try {
        parsedResponse = JSON.parse(responseBody);
        result = JSON.parse(responseBody);
        if (parsedResponse !== null && parsedResponse !== undefined) {
          var resultMapper = {
            required: false,
            serializedName: 'parsedResponse',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'SourceRepositoryElementType',
                  type: {
                    name: 'Composite',
                    className: 'SourceRepository'
                  }
              }
            }
          };
          result = client.deserialize(resultMapper, parsedResponse, 'result');
        }
      } catch (error) {
        var deserializationError = new Error(util.format('Error "%s" occurred in deserializing the responseBody - "%s"', error, responseBody));
        deserializationError.request = msRest.stripRequest(httpRequest);
        deserializationError.response = msRest.stripResponse(response);
        return callback(deserializationError);
      }
    }
    // Deserialize Response
    if (statusCode === 400) {
      var parsedResponse = null;
      try {
        parsedResponse = JSON.parse(responseBody);
        result = JSON.parse(responseBody);
        if (parsedResponse !== null && parsedResponse !== undefined) {
          var resultMapper = new client.models['ValidationErrorResponse']().mapper();
          result = client.deserialize(resultMapper, parsedResponse, 'result');
        }
      } catch (error) {
        var deserializationError1 = new Error(util.format('Error "%s" occurred in deserializing the responseBody - "%s"', error, responseBody));
        deserializationError1.request = msRest.stripRequest(httpRequest);
        deserializationError1.response = msRest.stripResponse(response);
        return callback(deserializationError1);
      }
    }

    return callback(null, result, httpRequest, response);
  });
};


module.exports = Repositories;
