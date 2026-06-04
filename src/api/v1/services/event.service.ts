import {
  createEventRepo,
  getAllEventsRepo,
  getEventByIdRepo,
  updateEventRepo,
  deleteEventRepo,
} from "../repositories/event.repository";
import { CreateEventDto, UpdateEventDto, Event } from "../models/event.model";

export const createEventService = async (data: CreateEventDto): Promise<Event> => {
  try {
    return await createEventRepo(data);
  } catch (error) {
    throw new Error(`Failed to create event: ${error}`);
  }
};

export const getAllEventsService = async (): Promise<Event[]> => {
  try {
    return await getAllEventsRepo();
  } catch (error) {
    throw new Error(`Failed to get events: ${error}`);
  }
};

export const getEventByIdService = async (id: string): Promise<Event | null> => {
  try {
    return await getEventByIdRepo(id);
  } catch (error) {
    throw new Error(`Failed to get event: ${error}`);
  }
};

export const updateEventService = async (
  id: string,
  data: UpdateEventDto
): Promise<Event | null> => {
  try {
    return await updateEventRepo(id, data);
  } catch (error) {
    throw new Error(`Failed to update event: ${error}`);
  }
};

export const deleteEventService = async (id: string): Promise<boolean> => {
  try {
    return await deleteEventRepo(id);
  } catch (error) {
    throw new Error(`Failed to delete event: ${error}`);
  }
};