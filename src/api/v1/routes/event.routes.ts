import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";
import { validateBody, validateParams } from "../middleware/validate.middleware";
import {
  createEventSchema,
  updateEventSchema,
  eventIdSchema,
} from "../validation/event.validation";

const router = Router();

/**
 * @openapi
 * /api/v1/events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     description: Creates a new event with Joi validation. Status defaults to "upcoming" and isPublic defaults to true.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDto'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
router.post("/", validateBody(createEventSchema), createEvent);

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get all events
 *     description: Retrieves all events from Firestore
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllEvents);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Firestore document ID
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", validateParams(eventIdSchema), getEventById);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Update an event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDto'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Event not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", validateParams(eventIdSchema), validateBody(updateEventSchema), updateEvent);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Delete an event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete("/:id", validateParams(eventIdSchema), deleteEvent);

export default router;