const googleSheetsService = require('./googleSheetsService');

// Add Jack Mills booking to Google Sheets
const addJackBooking = async () => {
  try {
    console.log('🚀 Adding Jack Mills booking to Google Sheets...');
    
    // Service prices
    const servicePrices = {
      'Haircut': 500,
      'Beard Trim': 300
    };

    // Calculate total price
    const totalPrice = servicePrices['Haircut'] + servicePrices['Beard Trim'];

    // Create booking with all provided information
    const bookingData = {
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
      notes: 'Customer requested both haircut and beard trim services',
      
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
      originalDate: new Date('2026-01-14'),
      originalTime: '18:00',
      
      // Timestamps
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add booking to Google Sheets
    const result = await googleSheetsService.createBooking(bookingData);
    
    if (result.success) {
      console.log('✅ Jack Mills booking added successfully to Google Sheets!');
      console.log('📋 Customer:', result.data.customerName);
      console.log('📞 Phone:', result.data.phoneNumber);
      console.log('📧 Email:', result.data.email);
      console.log('💈 Services:', result.data.service);
      console.log('📅 Date:', result.data.preferredDate.toLocaleDateString());
      console.log('🕐 Time:', result.data.preferredTime);
      console.log('💰 Total Price:', '₹' + result.data.totalPrice);
      console.log('📞 Call Duration:', result.data.callDuration + ' seconds');
      console.log('🆔 Booking ID:', result.data._id);
      console.log('📊 Google Sheets Integration: Active');
    } else {
      console.error('❌ Failed to add booking to Google Sheets');
    }
    
  } catch (error) {
    console.error('❌ Error adding Jack booking:', error);
  }
};

// Run the function
addJackBooking();
