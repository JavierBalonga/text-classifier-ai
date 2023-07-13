import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Text Classifier AI API",
      version: "0.0.1",
      summary: "A simple API to classify text using AI",
    },
  },
  apis: ["./**/routes/**/*.{js,ts}"],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
