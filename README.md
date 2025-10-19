# YouTube Clone Backend

Minimal backend service for a YouTube-like application: authentication, video management, reactions, and comments.

## Tech stack
- Node.js, Express (or Fastify)
- Database: MongoDB (or PostgreSQL)
- Auth: JWT
- Storage: Local or cloud (S3, Cloudinary)
- Validation: Zod or Joi
- Docs: OpenAPI/Swagger

## Features
- User signup/login, JWT-based auth
- Upload videos, thumbnails, metadata
- Likes/dislikes, views, subscriptions
- Comments and replies
- Search and pagination
- Admin and rate limiting (optional)

## Getting started
- Prerequisites: Node.js LTS, npm or yarn, database instance
- Install: run `npm install`
- Environment: create `.env` with:
    - PORT=3000
    - DATABASE_URL=...
    - JWT_SECRET=...
    - STORAGE_BUCKET=... (optional)
    - CORS_ORIGIN=http://localhost:3000
- Run dev: `npm run dev`
- Run prod: `npm run build` then `npm start`
- Tests: `npm test`

## Scripts
- dev: start in watch mode
- build: compile TypeScript (if used)
- start: run production server
- lint/format: code quality

## API
- Swagger UI at `/docs` (if enabled)
- OpenAPI spec at `/docs/json`

## Project structure
- src/
    - app, routes, controllers, services, models, middlewares, utils
- prisma or migrations (if SQL)
- uploads/ (if local storage)
- tests/

## Notes
- Use chunked uploads for large files
- Enforce file size/type limits
- Generate thumbnails server-side or via workers

## License
- MIT (or your choice)