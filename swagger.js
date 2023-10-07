const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Task-Management API",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for the Task-Management platform.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://puzzled-flip-flops-wasp.cyclic.app",
        description: "Deployed server",
      },
    ],
  },
  apis: ["./swagger.yaml"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
