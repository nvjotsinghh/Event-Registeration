jest.mock("../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(),
    doc: jest.fn(),
  },
}));