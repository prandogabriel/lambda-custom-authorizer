import {
  APIGatewayAuthorizerResult,
  APIGatewayAuthorizerResultContext,
  Context,
  APIGatewayTokenAuthorizerEvent
} from "aws-lambda";

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent,
  context: Context
) => {
  console.log(`Method ARN: ${event.methodArn}`);
  console.log("event", event);
  console.log("context", context);

  if (event.authorizationToken !== "Bearer test") {
    throw new Error("Unauthorized");
  }

  const contextResponse = {
    property: "example"
  } as APIGatewayAuthorizerResultContext;

  return {
    context: contextResponse,
    policyDocument: {
      Version: "2012-10-17",
      Id: "some-logical-id",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: event.methodArn
        }
      ]
    },
    principalId: "anonymous"
  } as APIGatewayAuthorizerResult;
};

export default handler;
