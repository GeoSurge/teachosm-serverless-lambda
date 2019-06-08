'use strict';

var AWS = require('aws-sdk');
var queryString = require('query-string');

// Create new S3 instance to handle our request for a new upload URL.
  // using signatureVersion v4 allows authenticating inbound API requests to AWS services
  const s3 = new AWS.S3({
    signatureVersion: 'v4'
  });

module.exports.requestUploadURL_pics = (event, context, callback) => {

  console.log('print event headers');
  console.log(event.headers);
  console.log('print Content-Type');
  console.log(event.headers['content-type']);

  var contentType = event.headers['content-type'];

  // Parse out the parameters of the file the client would like to upload.

  //only for application/x-www-form-urlencoded content type
  //var params = queryString.parse(event.body)

  if (contentType.includes('application/json')) {
    var params = JSON.parse(event.body);
  } else {
    var params = queryString.parse(event.body);
  }
  

  // Assemble a dictionary of parameters to hand to S3: the S3 bucket name, the file name, the file type, and permissions.  Other paramters like expiration can be specified here.  See the documentation for this method for more details.
  var s3Params = {
    Bucket: 'teachosm-project-pics',
    //Key:  params.name,
    Key:  params.name,
    ACL: 'public-read',
  };

  // Ask S3 for a temporary URL that the client can use.
  var uploadURL = s3.getSignedUrl('putObject', s3Params);

  // Return success message to the client, with the upload URL in the payload.
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials' : true,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}


module.exports.requestUploadURL_content = (event, context, callback) => {

  console.log('print event headers');
  console.log(event.headers);
  console.log('print Content-Type');
  console.log(event.headers['content-type']);

  var contentType = event.headers['content-type'];

  // Parse out the parameters of the file the client would like to upload.

  //only for application/x-www-form-urlencoded content type
  //var params = queryString.parse(event.body)

  if (contentType.includes('application/json')) {
    var params = JSON.parse(event.body);
  } else {
    var params = queryString.parse(event.body);
  }
  

  // Assemble a dictionary of parameters to hand to S3: the S3 bucket name, the file name, the file type, and permissions.  Other paramters like expiration can be specified here.  See the documentation for this method for more details.
  var s3Params = {
    Bucket: 'teachosm-project-content',
    //Key:  params.name,
    Key:  params.name,
    ACL: 'public-read',
  };

  // Ask S3 for a temporary URL that the client can use.
  var uploadURL = s3.getSignedUrl('putObject', s3Params);

  // Return success message to the client, with the upload URL in the payload.
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials' : true,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}