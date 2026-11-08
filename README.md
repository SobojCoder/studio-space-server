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
| GET | `/my-listing/:email` | Get user listing |
| DELETE | `/my-bookings/:studioId` | Cancel a booking |


## Live Link
- Studio Space Web: https://studio-space-self.vercel.app/
- Client-site Repo: https://github.com/SobojCoder/studio-space
- Server-site Repo: https://github.com/SobojCoder/studio-space-server
