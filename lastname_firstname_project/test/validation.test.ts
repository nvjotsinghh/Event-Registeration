import { createEventSchema } from "../src/api/v1/validation/event.validation";

describe("Event Create Validation Schema", () => {
  const validPayload = {
    name: "Tech Conference 2024",
    description: "A great tech event for developers",
    date: "2024-12-01T10:00:00.000Z",
    location: "Delhi Convention Centre",
    capacity: 100,
    price: 500,
    category: "conference",
    organizerName: "John Doe",
    organizerEmail: "john@example.com",
  };

  it("should pass with a valid payload", () => {
    const { error } = createEventSchema.validate(validPayload);
    expect(error).toBeUndefined();
  });

  it("should fail when name is missing", () => {
    const { name, ...payload } = validPayload;
    const { error } = createEventSchema.validate(payload);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("name is required");
  });

  it("should fail when name is too short", () => {
    const { error } = createEventSchema.validate({ ...validPayload, name: "AB" });
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("name must be at least 3 characters");
  });

  it("should fail with an invalid category enum value", () => {
    const { error } = createEventSchema.validate({ ...validPayload, category: "party" });
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain("category must be one of");
  });

  it("should apply default status of 'upcoming' when not provided", () => {
    const { value } = createEventSchema.validate(validPayload);
    expect(value.status).toBe("upcoming");
  });

  it("should apply default isPublic of true when not provided", () => {
    const { value } = createEventSchema.validate(validPayload);
    expect(value.isPublic).toBe(true);
  });

  it("should fail when capacity is below 1", () => {
    const { error } = createEventSchema.validate({ ...validPayload, capacity: 0 });
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("capacity must be at least 1");
  });

  it("should fail when price is negative", () => {
    const { error } = createEventSchema.validate({ ...validPayload, price: -10 });
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("price must be at least 0");
  });
});