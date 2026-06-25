import { db } from "../../../../config/firebaseConfig";
import { Event, CreateEventDto, UpdateEventDto } from "../models/event.model";

const COLLECTION = "events";

export const createEventRepo = async (data: CreateEventDto): Promise<Event> => {
  const now = new Date().toISOString();
  const docRef = await db.collection(COLLECTION).add({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { id: docRef.id, ...data, createdAt: now, updatedAt: now };
};

export const getAllEventsRepo = async (): Promise<Event[]> => {
  const snapshot = await db.collection(COLLECTION).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

export const getEventByIdRepo = async (id: string): Promise<Event | null> => {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Event;
};

export const updateEventRepo = async (
  id: string,
  data: UpdateEventDto
): Promise<Event | null> => {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;
  const updatedAt = new Date().toISOString();
  await docRef.update({ ...data, updatedAt });
  return { id, ...doc.data(), ...data, updatedAt } as Event;
};

export const deleteEventRepo = async (id: string): Promise<boolean> => {
  const docRef = db.collection(COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;
  await docRef.delete();
  return true;
};