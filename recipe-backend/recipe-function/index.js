const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const tableName = 'recipe-collab-recipes';
const bucketName = 'io.github.kev404xd.recipe-collab-images'; 

/**
 * GET /recipe/id
 * POST /recipe
 * PUT /recipe/id - delete will be a field in the body
 * 
 * {
 *  id: String,
 *  title: String,
 *  author: String,
 *  categories: Array,
 *  article: String,
 *  imgUrl: String,
 * }
 */
exports.handler = async (event) => {
    const { httpMethod, pathParameters, body } = event;

    try {
        switch (httpMethod) {
            case 'GET':
                if (pathParameters && pathParameters.id) {
                    return await getRecipe(pathParameters.id);
                }
                return response(400, { error: 'Recipe does not exist' });
            
            case 'POST':
                if (body) {
                    const recipeData = JSON.parse(body);
                    return await createRecipe(recipeData);
                }
                return response(400, { error: 'Invalid recipe data' });
            
            case 'PUT':
                if (pathParameters && pathParameters.id && body) {
                    const updatedData = JSON.parse(body);
                    return await updateRecipe(pathParameters.id, updatedData);
                }
                return response(400, { error: 'Invalid data for update' });
            
            default:
                return response(405, { error: 'Method Not Allowed' });
        }
    } catch (error) {
        return response(500, { error: 'Internal Server Error', details: error.message });
    }
};

const getRecipe = async (id) => {
    const params = {
        TableName: tableName,
        Key: { id }
    };

    try {
        const result = await dynamoDb.get(params).promise();
        console.log(result);
        if (result.Item) {
            return response(200, result.Item);
        } else {
            return response(404, { error: 'Recipe not found' });
        }
    } catch (error) {
        throw new Error(error);
    }
};

const createRecipe = async (recipeData) => {
    let imgUrl;
    try {
        // Upload the image to S3
        if (recipeData.img && recipeData.img.startsWith('data:image')) {
            imgUrl = await uploadImageToS3(recipeData.id, recipeData.img);
            recipeData.img = imgUrl; // Replace the image data with the S3 URL
        }
        
        const params = {
            TableName: tableName,
            Item: recipeData
        };

        await dynamoDb.put(params).promise();
        return response(201, { message: 'Recipe created successfully', recipe: recipeData });
    } catch (error) {
        throw new Error(error);
    }
};

const updateRecipe = async (id, updatedData) => {
    let imageUrl = updatedData.img; // Default to the existing image URL

    try {
        // If the image has been changed, it will be uploaded as base64 field
        if (updatedData.img && updatedData.img.startsWith('data:image')) {
            // overwrite the existing image, keep filename the same
            imageUrl = await uploadImageToS3(id, updatedData.img);
        }

        const params = {
            TableName: tableName,
            Key: { id },
            UpdateExpression: 'set #title = :title, #categories = :categories, #article = :article, #imgUrl = :imgUrl, #deleted = :deleted',
            ExpressionAttributeNames: {
                '#title': 'title',
                '#categories': 'categories',
                '#article': 'article',
                '#imgUrl': 'imgUrl',
                '#deleted': 'deleted'
            },
            ExpressionAttributeValues: {
                ':title': updatedData.name,
                ':categories': updatedData.categories,
                ':article': updatedData.article,
                ':imgUrl': imageUrl,
                ':deleted': updatedData.deleted || false
            },
            ReturnValues: 'ALL_NEW'
        };

        const result = await dynamoDb.update(params).promise();
        return response(200, { message: 'Recipe updated successfully', updatedRecipe: result.Attributes });
    } catch (error) {
        return response(500, { error: `Failed to update recipe: ${error.message}` });
    }
};

const uploadImageToS3 = async (id, base64Image) => {
    const buffer = Buffer.from(base64Image, 'base64');
    const params = {
        Bucket: bucketName,
        Key: `recipes/${id}.jpg`,
        Body: buffer,
        ContentType: 'image/jpeg',
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location; // Return the URL of the uploaded image
    } catch (error) {
        throw new Error(`Failed to upload image to S3: ${error.message}`);
    }
};


const response = (statusCode, body) => {
    return {
        statusCode,
        body: JSON.stringify(body)
    };
};
