import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Registration API",
      version: "1.0.0",
      description:
        "A RESTful API for managing event registrations built with Express, TypeScript, Joi validation, and Firebase Firestore.",
      contact: {
        name: "API Support",
        email: "support@eventapi.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Event: {
          type: "object",
          properties: {
            id: { type: "string", example: "abc123" },
            name: { type: "string", example: "Tech Conference 2024" },
            description: { type: "string", example: "A great tech event" },
            date: { type: "string", format: "date-time", example: "2024-12-01T10:00:00.000Z" },
            location: { type: "string", example: "Delhi Convention Centre" },
            capacity: { type: "integer", example: 100 },
            price: { type: "number", example: 500 },
            status: { type: "string", enum: ["upcoming", "ongoing", "completed", "cancelled"], example: "upcoming" },
            category: { type: "string", enum: ["conference", "workshop", "seminar", "meetup", "webinar", "other"], example: "conference" },
            organizerName: { type: "string", example: "John Doe" },
            organizerEmail: { type: "string", format: "email", example: "john@example.com" },
            tags: { type: "array", items: { type: "string" }, example: ["tech", "ai"] },
            isPublic: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateEventDto: {
          type: "object",
          required: ["name", "description", "date", "location", "capacity", "price", "category", "organizerName", "organizerEmail"],
          properties: {
            name: { type: "string", minLength: 3, maxLength: 100, example: "Tech Conference 2024" },
            description: { type: "string", minLength: 10, maxLength: 500, example: "A great tech event for developers" },
            date: { type: "string", format: "date-time", example: "2024-12-01T10:00:00.000Z" },
            location: { type: "string", minLength: 3, maxLength: 200, example: "Delhi Convention Centre" },
            capacity: { type: "integer", minimum: 1, maximum: 10000, example: 100 },
            price: { type: "number", minimum: 0, example: 500 },
            status: { type: "string", enum: ["upcoming", "ongoing", "completed", "cancelled"], default: "upcoming" },
            category: { type: "string", enum: ["conference", "workshop", "seminar", "meetup", "webinar", "other"], example: "conference" },
            organizerName: { type: "string", minLength: 2, maxLength: 100, example: "John Doe" },
            organizerEmail: { type: "string", format: "email", example: "john@example.com" },
            tags: { type: "array", items: { type: "string" }, example: ["tech", "ai"] },
            isPublic: { type: "boolean", default: true },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string", example: "Validation error message" },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            data: { $ref: "#/components/schemas/Event" },
          },
        },
      },
    },
  },
  apis: ["./src/api/v1/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };