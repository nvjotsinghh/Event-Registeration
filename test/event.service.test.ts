import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "../src/api/v1/services/event.service";
import * as repo from "../src/api/v1/repositories/event.repository";

jest.mock("../src/api/v1/repositories/event.repository");

const mockEvent = {
  id: "abc123",
  name: "Test Event",
  description: "A test event description here",
  date: "2024-12-01T10:00:00.000Z",
  location: "Test Location",
  capacity: 50,
  price: 0,
  status: "upcoming" as const,
  category: "meetup" as const,
  organizerName: "Jane Doe",
  organizerEmail: "jane@example.com",
  isPublic: true,
};

describe("Event Service", () => {
  it("should create an event", async () => {
    (repo.createEventRepo as jest.Mock).mockResolvedValue(mockEvent);
    const result = await createEventService(mockEvent);
    expect(result).toEqual(mockEvent);
    expect(repo.createEventRepo).toHaveBeenCalledWith(mockEvent);
  });

  it("should get all events", async () => {
    (repo.getAllEventsRepo as jest.Mock).mockResolvedValue([mockEvent]);
    const result = await getAllEventsService();
    expect(result).toHaveLength(1);
    expect(repo.getAllEventsRepo).toHaveBeenCalled();
  });

  it("should get event by id", async () => {
    (repo.getEventByIdRepo as jest.Mock).mockResolvedValue(mockEvent);
    const result = await getEventByIdService("abc123");
    expect(result).toEqual(mockEvent);
    expect(repo.getEventByIdRepo).toHaveBeenCalledWith("abc123");
  });

  it("should update an event", async () => {
    const updated = { ...mockEvent, name: "Updated Event" };
    (repo.updateEventRepo as jest.Mock).mockResolvedValue(updated);
    const result = await updateEventService("abc123", { name: "Updated Event" });
    expect(result?.name).toBe("Updated Event");
    expect(repo.updateEventRepo).toHaveBeenCalledWith("abc123", { name: "Updated Event" });
  });

  it("should delete an event", async () => {
    (repo.deleteEventRepo as jest.Mock).mockResolvedValue(true);
    const result = await deleteEventService("abc123");
    expect(result).toBe(true);
    expect(repo.deleteEventRepo).toHaveBeenCalledWith("abc123");
  });
});