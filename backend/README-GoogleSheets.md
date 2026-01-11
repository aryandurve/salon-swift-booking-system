# Salon Swift Backend - Google Sheets Integration

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Google Cloud Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or use existing one
3. Enable Google Sheets API
4. Enable Google Drive API
5. Create a Service Account
6. Download the JSON key file
7. Share your Google Sheet with the service account email

### 3. Create Google Sheet
1. Create a new Google Sheet
2. Name it "Salon Swift Bookings"
3. Add these headers in row 1:
   - A: ID
   - B: Customer Name
   - C: Email
   - D: Phone Number
   - E: Service
   - F: Preferred Date
   - G: Preferred Time
   - H: Total Price
   - I: Status
   - J: Booking Source
   - K: Staff Assigned
   - L: Estimated Duration
   - M: Actual Duration
   - N: Payment Status
   - O: Payment Method
   - P: Payment Amount
   - Q: Customer Notes
   - R: Internal Notes
   - S: Reminder Sent
   - T: Reminder Sent At
   - U: Follow Up Required
   - V: Follow Up Date
   - W: Follow Up Notes
   - X: Preferred Staff
   - Y: Service Preferences
   - Z: Allergic Reactions
   - AA: Skin Type
   - AB: Hair Type
   - AC: Customer Satisfaction
   - AD: Feedback
   - AE: Would Recommend
   - AF: Revisit Intent
   - AG: Rescheduling Reason
   - AH: Rescheduling Count
   - AI: Original Date
   - AJ: Original Time
   - AK: Cancellation Reason
   - AL: Cancelled At
   - AM: Cancelled By
   - AN: Call ID
   - AO: Call Transcript
   - AP: Call Summary
   - AQ: Call Duration
   - AR: Call Recording URL
   - AS: Call Status
   - AT: Call Outcome
   - AU: Notes
   - AV: Created At
   - AW: Updated At

4. Get the Sheet ID from the URL (the part between `/d/` and `/edit`)

### 4. Environment Configuration
Update your `.env` file:
```env
GOOGLE_SHEET_ID=your-sheet-id-here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_API_KEY=your-google-api-key-here
```

### 5. Start Server
```bash
npm run dev
```

## 📊 API Endpoints

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (with filters)
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id/reschedule` - Reschedule booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `PUT /api/bookings/:id/confirm` - Confirm booking
- `DELETE /api/bookings/:id` - Delete booking

### Enhanced Features
- `PUT /api/bookings/:id/call-update` - Update call information
- `PUT /api/bookings/:id/payment-update` - Update payment details
- `PUT /api/bookings/:id/feedback` - Add customer feedback
- `GET /api/bookings/stats/dashboard` - Get dashboard statistics

### Other
- `GET /api/services` - Get service prices
- `GET /api/health` - Health check

## 🧪 Add Jack's Booking

Run the script to add Jack Mills' booking:
```bash
node add-jack-booking-sheets.js
```

## 🔧 Features

### Call Integration
- Call ID tracking
- Full transcript storage
- AI-generated summaries
- Call duration and recording URLs
- Call status and outcomes

### Enhanced Booking
- Customer preferences (skin type, hair type)
- Staff assignment and preferences
- Payment tracking
- Follow-up management
- Customer feedback and satisfaction

### Analytics
- Dashboard statistics
- Revenue tracking
- Service popularity
- Booking source analysis

## 📈 Benefits of Google Sheets

- **No Database Setup** - Easy to configure
- **Real-time Collaboration** - Multiple users can access
- **Familiar Interface** - Easy for non-technical users
- **Cost Effective** - Free tier available
- **Data Export** - Easy to export and backup
