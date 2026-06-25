import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";
import { validateBody, validateParams } from "../middleware/validate.middleware";
import { createEventSchema, updateEventSchema, eventIdSchema } from "../validation/event.validation";

const router = Router();

router.post("/", validateBody(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", validateParams(eventIdSchema), getEventById);
router.put("/:id", validateParams(eventIdSchema), validateBody(updateEventSchema), updateEvent);
router.delete("/:id", validateParams(eventIdSchema), deleteEvent);

export default router;