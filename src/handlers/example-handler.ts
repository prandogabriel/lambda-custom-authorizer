import { APIGatewayEvent, Handler } from "aws-lambda";

export const handler: Handler = async (event: APIGatewayEvent, context) => {
  console.log("event", event);
  console.log("context", context);

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "example" })
  };
};

export default handler;
