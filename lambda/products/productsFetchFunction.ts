import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    const method = event.httpMethod;
    const { awsRequestId: lambdaRequestId } = context;
    const { requestId: apiRequestId } = event.requestContext;

    console.log(`API Gatway RequestId: ${apiRequestId} - Lambda RequestId: ${lambdaRequestId}`);
    
    if (event.resource === '/products') {
        if (method === 'GET') {
            console.log('GET');
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'GET Products - OK',
                }),
            }
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'Bad Request',
        }),
    };
}