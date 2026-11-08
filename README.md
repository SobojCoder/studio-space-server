# StudioSpace Server

## Description
StudioSpace Server is the backend API for StudioSpace, a creative space booking platform. It manages studio listings, user bookings, authentication, and booking conflict prevention using Node.js, Express.js, and MongoDB.

## Routes

| Method | Route | Description |
|---|---|---|
| GET | `/studios` | Get all studios |
| GET | `/studio/:studioId` | Get studio details |
| POST | `/add-studio` | Add a new studio |
| POST | `/bookings` | Create a booking |
| GET | `/my-bookings/:email` | Get user bookings |
| DELETE | `/my-bookings/:studioId` | Cancel a booking |
