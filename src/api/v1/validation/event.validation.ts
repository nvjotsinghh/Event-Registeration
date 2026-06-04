import Joi from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.min": "name must be at least 3 characters",
    "string.max": "name must be at most 100 characters",
    "any.required": "name is required",
  }),

  description: Joi.string().min(10).max(500).required().messages({
    "string.min": "description must be at least 10 characters",
    "string.max": "description must be at most 500 characters",
    "any.required": "description is required",
  }),

  date: Joi.string().isoDate().required().messages({
    "string.isoDate": "date must be a valid ISO 8601 date",
    "any.required": "date is required",
  }),

  location: Joi.string().min(3).max(200).required().messages({
    "string.min": "location must be at least 3 characters",
    "string.max": "location must be at most 200 characters",
    "any.required": "location is required",
  }),

  capacity: Joi.number().integer().min(1).max(10000).required().messages({
    "number.base": "capacity must be a number",
    "number.integer": "capacity must be an integer",
    "number.min": "capacity must be at least 1",
    "number.max": "capacity must be at most 10000",
    "any.required": "capacity is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "price must be a number",
    "number.min": "price must be at least 0",
    "any.required": "price is required",
  }),

  status: Joi.string()
    .valid("upcoming", "ongoing", "completed", "cancelled")
    .default("upcoming")
    .messages({
      "any.only": "status must be one of: upcoming, ongoing, completed, cancelled",
    }),

  category: Joi.string()
    .valid("conference", "workshop", "seminar", "meetup", "webinar", "other")
    .required()
    .messages({
      "any.only": "category must be one of: conference, workshop, seminar, meetup, webinar, other",
      "any.required": "category is required",
    }),

  organizerName: Joi.string().min(2).max(100).required().messages({
    "string.min": "organizerName must be at least 2 characters",
    "string.max": "organizerName must be at most 100 characters",
    "any.required": "organizerName is required",
  }),

  organizerEmail: Joi.string().email().required().messages({
    "string.email": "organizerEmail must be a valid email address",
    "any.required": "organizerEmail is required",
  }),

  tags: Joi.array().items(Joi.string()).optional(),

  isPublic: Joi.boolean().default(true),
});

export const updateEventSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(500),
  date: Joi.string().isoDate(),
  location: Joi.string().min(3).max(200),
  capacity: Joi.number().integer().min(1).max(10000),
  price: Joi.number().min(0),
  status: Joi.string().valid("upcoming", "ongoing", "completed", "cancelled"),
  category: Joi.string().valid("conference", "workshop", "seminar", "meetup", "webinar", "other"),
  organizerName: Joi.string().min(2).max(100),
  organizerEmail: Joi.string().email(),
  tags: Joi.array().items(Joi.string()),
  isPublic: Joi.boolean(),
}).min(1);

export const eventIdSchema = Joi.object({
  id: Joi.string().min(1).required().messages({
    "any.required": "id is required",
    "string.min": "id must not be empty",
  }),
});