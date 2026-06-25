import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "../services/event.service";

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await createEventService(req.body);
    res.status(HTTP_STATUS.CREATED).json({ status: "success", data: event });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: "error", message: `${error}` });
  }
};

export const getAllEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await getAllEventsService();
    res.status(HTTP_STATUS.OK).json({ status: "success", data: events });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: "error", message: `${error}` });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await getEventByIdService(req.params.id);
    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ status: "error", message: "Event not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({ status: "success", data: event });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: "error", message: `${error}` });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await updateEventService(req.params.id, req.body);
    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ status: "error", message: "Event not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({ status: "success", data: event });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: "error", message: `${error}` });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await deleteEventService(req.params.id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ status: "error", message: "Event not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({ status: "success", message: "Event deleted successfully" });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ status: "error", message: `${error}` });
  }
};