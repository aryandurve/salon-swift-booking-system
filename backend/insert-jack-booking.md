# Insert Jack Mills Booking

## 📋 Booking Details
- **Name**: Jack Mills
- **Phone**: 0123456789
- **Email**: jackmills@gmail.com
- **Services**: Haircut + Beard Trim
- **Date**: 14th January 2026
- **Time**: 6:00 PM

## 📞 Call Information
- **Call ID**: Auto-generated
- **Duration**: 3 minutes (180 seconds)
- **Status**: Completed
- **Outcome**: Booked
- **Transcript**: Full conversation included
- **Summary**: AI-generated summary included

## 💰 Pricing
- **Haircut**: ₹500
- **Beard Trim**: ₹300
- **Total**: ₹800

## 🚀 How to Add to MongoDB

### Method 1: Run Script
```bash
cd backend
node add-booking.js
```

### Method 2: MongoDB Shell
```javascript
// Connect to your MongoDB
use salon-swift

// Insert the booking
db.bookings.insertOne({
  customerName: "Jack Mills",
  email: "jackmills@gmail.com",
  phoneNumber: "0123456789",
  service: "Haircut + Styling",
  preferredDate: ISODate("2026-01-14T18:00:00Z"),
  preferredTime: "18:00",
  totalPrice: 800,
  estimatedDuration: 75,
  callId: "call_" + Date.now(),
  callTranscript: "AI: Hello. Thank you for calling Glow and Go Salon...",
  callSummary: "Jack called Glow and Go Salon to book a haircut...",
  callDuration: 180,
  callStatus: "completed",
  callOutcome: "booked",
  bookingSource: "phone",
  customerNotes: "Requested haircut and beard trim",
  internalNotes: "Customer called directly, booking confirmed via phone conversation",
  notes: "Customer requested both haircut and beard trim services",
  originalDate: ISODate("2026-01-14T18:00:00Z"),
  originalTime: "18:00",
  status: "confirmed",
  paymentStatus: "pending",
  createdAt: new Date(),
  updatedAt: new Date()
});
```

## ✅ Verification
After running, verify the booking was added:
```javascript
// Check the booking
db.bookings.find({customerName: "Jack Mills"}).pretty();
```
