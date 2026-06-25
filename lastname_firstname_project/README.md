# Event Registration API

A RESTful API built with Express, TypeScript, Joi validation, and Firebase Firestore.

## Setup
1. Clone the repo
2. Run `npm install`
3. Add `serviceAccountKey.json` to project root
4. Run `npm run dev`

## Endpoints
- `GET /health` - Health check
- `POST /api/v1/events` - Create event
- `GET /api/v1/events` - Get all events
- `GET /api/v1/events/:id` - Get event by ID
- `PUT /api/v1/events/:id` - Update event
- `DELETE /api/v1/events/:id` - Delete event

## Testing
Run `npm test`


## Tech Stack
- Node.js + Express
- TypeScript
- Joi (validation)
- Firebase Firestore
- Jest (testing)
- GitHub Actions (CI/CD)