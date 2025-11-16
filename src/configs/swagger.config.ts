import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce Market Place API",
      version: "1.0.0",
      description:
        "API documentation for E-Commerce Market Place application with comprehensive endpoints for user management, products, orders, and more.",
      contact: {
        name: "API Support",
        email: "support@ecommerce.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8088",
        description: "Development server",
      },
      {
        url: "https://e-commercial-market-place.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
        RefreshToken: {
          type: "apiKey",
          in: "cookie",
          name: "refresh_token",
          description: "Refresh token stored in httpOnly cookie",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              example: 400,
            },
            message: {
              type: "string",
              example: "Error message",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              example: 200,
            },
            message: {
              type: "string",
              example: "Success",
            },
            data: {
              type: "object",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Access",
        description: "Authentication and authorization endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Products",
        description: "Product management endpoints",
      },
      {
        name: "Cart",
        description: "Shopping cart endpoints",
      },
      {
        name: "Orders",
        description: "Order management endpoints",
      },
      {
        name: "Articles",
        description: "Blog articles endpoints",
      },
      {
        name: "Favorites",
        description: "User favorites endpoints",
      },
      {
        name: "Feedback",
        description: "Product feedback and reviews endpoints",
      },
      {
        name: "Media",
        description: "Media upload and management endpoints",
      },
      {
        name: "Vouchers",
        description: "Voucher and discount management endpoints",
      },
      {
        name: "OTP",
        description: "OTP verification endpoints",
      },
    ],
  },
  // Path to the API routes files
  apis: ["./src/routes/v1/*.ts", "./src/models/**/*.ts", "./src/docs/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
