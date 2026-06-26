# Event Registration API

## Project Overview

A RESTful API for managing event registrations, built with Express.js and TypeScript. It handles full CRUD operations for events with robust Joi input validation, Firebase Firestore persistent storage, and production-grade security via Helmet.js and CORS.

Designed for event organizers and platforms that need a reliable backend to create, retrieve, update, and delete events with enforced data integrity.

## Tech Stack
- Node.js + Express
- TypeScript
- Joi (validation)
- Firebase Firestore
- Helmet.js (security headers)
- CORS
- Swagger/OpenAPI (documentation)
- Jest (testing)
- GitHub Actions (CI/CD)

## Installation

### Prerequisites
- Node.js v18+
- npm v9+
- Firebase project with Firestore enabled

### Steps

```bash
git clone https://github.com/nvjotsinghh/Event-Registeration.git
cd Event-Registeration
npm install
```

Copy the environment file:
```bash
cp .env.example .env
```

Add your Firebase service account key as `serviceAccountKey.json` in the project root.

Start the server:
```bash
npm run dev
```

## API Request Examples

### 1. Create Event
```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference 2024",
    "description": "A great tech event for developers in Delhi",
    "date": "2024-12-01T10:00:00.000Z",
    "location": "Delhi Convention Centre",
    "capacity": 100,
    "price": 500,
    "category": "conference",
    "organizerName": "John Doe",
    "organizerEmail": "john@example.com"
  }'
```
**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": "abc123",
    "name": "Tech Conference 2024",
    "status": "upcoming",
    "isPublic": true
  }
}
```

### 2. Get All Events
```bash
curl -X GET http://localhost:3000/api/v1/events
```
**Response (200):**
```json
{
  "status": "success",
  "data": [...]
}
```

### 3. Delete Event
```bash
curl -X DELETE http://localhost:3000/api/v1/events/abc123
```
**Response (200):**
```json
{
  "status": "success",
  "message": "Event deleted successfully"
}
```

## Documentation

- **Local:** http://localhost:3000/api-docs
- **Public:** https://nvjotsinghh.github.io/Event-Registeration/