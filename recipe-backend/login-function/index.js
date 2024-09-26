const { OAuth2Client } = require('google-auth-library');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const token = body.token;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID',
    });

    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];

    // Check if user exists in DynamoDB
    const params = {
      TableName: 'Users',
      Key: {
        googleId: googleId,
      },
    };

    const existingUser = await dynamoDb.get(params).promise();

    if (existingUser.Item) {
      // User exists
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'User logged in successfully',
          userId: existingUser.Item.userId,
        }),
      };
    } else {
      // Create a new user
      const userId = generateUniqueId(); // Implement a function to generate a unique ID

      const newUserParams = {
        TableName: 'Users',
        Item: {
          userId: userId,
          googleId: googleId,
          email: email,
          name: name,
        },
      };

      await dynamoDb.put(newUserParams).promise();

      return {
        statusCode: 200,
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
      body: JSON.stringify({ error: 'Invalid token' }),
    };
  }
};

// Example unique ID generator
function generateUniqueId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}
