import type { AWS } from "@serverless/typescript";

const configuration: AWS = {
  service: "lambda-custom-authorizer",
  frameworkVersion: "3",
  functions: {
    example: {
      handler: "src/handlers/example-handler.handler",
      events: [
        {
          http: {
            method: "GET",
            path: "/example",
            authorizer: "customAuthorizer"
          }
        }
      ]
    },
    customAuthorizer: {
      handler: "src/handlers/custom-authorizer-handler.handler"
    }
  },
  provider: {
    name: "aws",
    logRetentionInDays: 30,
    stackName: "${self:service}-${self:custom.stage}-stack",
    timeout: 30,
    stackTags: {
      Service: "${self:service}",
      Environment: "${self:custom.stage}"
    },
    runtime: "nodejs18.x",
    stage: "${self:custom.stage}",
    region: "us-east-1",
    versionFunctions: false,
    tracing: {
      apiGateway: false,
      lambda: true
    },
    environment: {
      SERVICE_NAME: "${self:service}",
      STAGE: "${self:custom.stage}"
    },
    iam: { role: { statements: [] } }
  },
  custom: {
    stage: "${opt:stage,'dev'}",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [], // aws-sdk
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10
    },
    "serverless-offline": {
      httpPort: 4000,
      lambdaPort: 8080
    }
  },
  resources: { Resources: {} },
  package: {
    individually: true,
    excludeDevDependencies: true
  },
  plugins: ["serverless-esbuild", "serverless-offline"]
};

module.exports = configuration;
