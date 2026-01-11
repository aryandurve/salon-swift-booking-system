# Salon Swift Backend

## Setup
1. Install dependencies: `npm install`
2. Set up MongoDB
3. Configure .env file
4. Start server: `npm run dev`

## API Endpoints

### Bookings
- POST /api/bookings - Create booking
- GET /api/bookings - Get all bookings
- GET /api/bookings/:id - Get single booking
- PUT /api/bookings/:id/reschedule - Reschedule booking
- PUT /api/bookings/:id/cancel - Cancel booking
- PUT /api/bookings/:id/confirm - Confirm booking
- DELETE /api/bookings/:id - Delete booking

### Services
- GET /api/services - Get service prices

## Features
- Customer management (name, email, phone)
- Booking scheduling and rescheduling
- Cancellation with reasons
- Status tracking (pending, confirmed, completed, cancelled)
