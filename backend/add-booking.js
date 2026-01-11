const mongoose = require('mongoose');
const Booking = require('./models/Booking');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  addBooking();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

const addBooking = async () => {
  try {
    // Service prices
    const servicePrices = {
      'Haircut': 500,
      'Beard Trim': 300
    };

    // Calculate total price
    const totalPrice = servicePrices['Haircut'] + servicePrices['Beard Trim'];

    // Create the booking with all provided information
    const booking = new Booking({
      // Customer Information
      customerName: 'Jack Mills',
      email: 'jackmills@gmail.com',
      phoneNumber: '0123456789',
      
      // Service Information
      service: 'Haircut + Styling', // Combined service
      preferredDate: new Date('2026-01-14'),
      preferredTime: '18:00',
      totalPrice: totalPrice,
      estimatedDuration: 75, // 45 min haircut + 30 min beard trim
      
      // Call Integration
      callId: 'call_' + Date.now(),
      callTranscript: `AI: Hello. Thank you for calling Glow and Go Salon. How may I assist you today?
User: Yeah. I would like to book an appointment for 14th jan at six PM for haircut.
AI: Thank you for choosing Glow and Go Salon. I can help you with that. May I have your full name and email address to proceed with the booking?
User: jack mill at gmail dot com.
AI: Thank you, Jack. To confirm, you would like to book an appointment for a haircut tomorrow at five PM. Is that correct?
User: Yes.
AI: Great. Your appointment for a haircut on 14th jan at six PM is confirmed. You will receive a confirmation email shortly, and a reminder will be sent one hour before your appointment. Thank you for choosing Glow and Go Salon. We look forward to seeing you soon. Goodbye.
User: Yes.`,
      callSummary: 'Jack called Glow and Go Salon to book a haircut and beard trim appointment for 14th jan at 6 PM. The salon confirmed the booking for Jack Mills, stating a confirmation email and a reminder would be sent.',
      callDuration: 180, // 3 minutes in seconds
      callStatus: 'completed',
      callOutcome: 'booked',
      
      // Enhanced Features
      bookingSource: 'phone',
      customerNotes: 'Requested haircut and beard trim',
      internalNotes: 'Customer called directly, booking confirmed via phone conversation',
      
      // Additional fields
      notes: 'Customer requested both haircut and beard trim services',
      
      // Original booking details
      originalDate: new Date('2026-01-14'),
      originalTime: '18:00',
      
      // Timestamps
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Save the booking
    const savedBooking = await booking.save();
    
    console.log('✅ Booking added successfully:');
    console.log('📋 Customer:', savedBooking.customerName);
    console.log('📞 Phone:', savedBooking.phoneNumber);
    console.log('📧 Email:', savedBooking.email);
    console.log('💈 Services:', savedBooking.service);
    console.log('📅 Date:', savedBooking.preferredDate.toLocaleDateString());
    console.log('🕐 Time:', savedBooking.preferredTime);
    console.log('💰 Total Price:', '₹' + savedBooking.totalPrice);
    console.log('📞 Call Duration:', savedBooking.callDuration + ' seconds');
    console.log('🆔 Booking ID:', savedBooking._id);
    
    console.log('\n🎉 Booking successfully added to MongoDB!');
    console.log('📊 You can verify by checking your bookings collection');
    
    // Close connection
    mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Error adding booking:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};
