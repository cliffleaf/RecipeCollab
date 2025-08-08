const { OAuth2Client } = require('google-auth-library');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // stored in AWS Lambda environment variables, retrieve from Firebase - Authentication

exports.handler = async (event) => {
    let body;

    if (event.httpMethod === 'OPTIONS') {
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST',
          },
          body: JSON.stringify({}),
        };
      }

    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
         'Access-Control-Allow-Methods': 'OPTIONS,POST',
        },
        body: JSON.stringify({ error: 'Invalid request body' }),
      };
    }
    
    console.log("body", body);
    const token = body?.token;
  
    if (!token) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Token is missing' }),
      };
    }

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const email = payload['email'];
    const name = payload['email'];

    // Check if user exists in DynamoDB
    const params = {
        TableName: 'recipe-collab-users',
        FilterExpression: 'googleId = :googleId',
        ExpressionAttributeValues: {
          ':googleId': googleId,
        },
      };

      const result = await dynamoDb.scan(params).promise();
      const existingUser = result.Items[0];

    if (existingUser) {
      // User exists
      console.log('User exists: ', existingUser);
      return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST',
          },
        body: JSON.stringify({
          message: 'User logged in successfully',
          id: existingUser.id,
          email: existingUser.email,
        }),
      };
    } else {
      // Create a new user
      const userId = generateUniqueId(); // Implement a function to generate a unique ID

      const newUserParams = {
        TableName: 'recipe-collab-users',
        Item: {
          id: userId,
          googleId: googleId,
          email: email,
          username: name,
          communities: [],
        },
      };

      await dynamoDb.put(newUserParams).promise();

      return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST',
          },
        body: JSON.stringify({
          message: 'New user created and logged in successfully',
          userId: userId,
        }),
      };
    }
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
      body: JSON.stringify({ error: 'Invalid token' }),
    };
  }
};

// Example unique ID generator
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
