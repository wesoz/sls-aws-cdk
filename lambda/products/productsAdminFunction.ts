import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    const method = event.httpMethod;
    const { awsRequestId: lambdaRequestId } = context;
    const { requestId: apiRequestId } = event.requestContext;

    console.log(`API Gatway RequestId: ${apiRequestId} - Lambda RequestId: ${lambdaRequestId}`);
    
    if (event.resource === '/products') {
        console.log('POST /products')
        return {
            statusCode: 201,
            body: 'POST /products',
        }
    } else if (event.resource === '/products/{id}') {
        const productId = event.pathParameters!.id as string;
        if (event.httpMethod === 'PUT') {
            console.log(`PUT /products/${productId}`)
            return {
                statusCode: 200,
                body: `PUT /products/${productId}`,
            };
        } else if (event.httpMethod === 'DELETE') {
            console.log(`DELETE /products/${productId}`)
            return {
                statusCode: 200,
                body: `DELETE /products/${productId}`,
            };
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'Bad Request',
        }),
    };
}