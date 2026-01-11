const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const moment = require('moment');

// Load environment variables
dotenv.config();

// Import Google Sheets service
const googleSheetsService = require('./googleSheetsService');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Service prices
const servicePrices = {
  'Haircut': 500,
  'Haircut + Styling': 700,
  'Hair Spa': 1200,
  'Beard Trim': 300,
  'Hair Coloring (Basic)': 2000,
  'Facial': 1500
};

// Get service prices
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: servicePrices
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Salon Swift API is running with Google Sheets',
    timestamp: new Date().toISOString()
  });
});

// Bookings routes
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      customerName,
      email,
      phoneNumber,
      service,
      preferredDate,
      preferredTime,
      notes,
      // Enhanced fields
      bookingSource,
      staffAssigned,
      customerNotes,
      internalNotes,
      preferredStaff,
      servicePreferences,
      allergicReactions,
      skinType,
      hairType,
      // Call integration fields
      callId,
      callTranscript,
      callSummary,
      callDuration,
      callRecordingUrl,
      callStatus,
      callOutcome
    } = req.body;

    // Validate required fields
    if (!customerName || !email || !phoneNumber || !service || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if service is valid
    if (!servicePrices[service]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service selected'
      });
    }

    // Get service duration (in minutes)
    const serviceDurations = {
      'Haircut': 30,
      'Haircut + Styling': 45,
      'Hair Spa': 60,
      'Beard Trim': 20,
      'Hair Coloring (Basic)': 90,
      'Facial': 60
    };

    // Create booking object
    const bookingData = {
      customerName,
      email,
      phoneNumber,
      service,
      preferredDate: new Date(preferredDate),
      preferredTime,
      notes,
      totalPrice: servicePrices[service],
      estimatedDuration: serviceDurations[service] || 30,
      originalDate: new Date(preferredDate),
      originalTime: preferredTime,
      
      // Enhanced fields
      bookingSource: bookingSource || 'website',
      staffAssigned: staffAssigned || '',
      customerNotes: customerNotes || '',
      internalNotes: internalNotes || '',
      preferredStaff: preferredStaff || '',
      servicePreferences: servicePreferences || '',
      allergicReactions: allergicReactions || '',
      skinType: skinType || '',
      hairType: hairType || '',
      
      // Call integration fields
      callId: callId || null,
      callTranscript: callTranscript || '',
      callSummary: callSummary || '',
      callDuration: callDuration || 0,
      callRecordingUrl: callRecordingUrl || '',
      callStatus: callStatus || 'not_called',
      callOutcome: callOutcome || 'pending'
    };

    const result = await googleSheetsService.createBooking(bookingData);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      date,
      search
    } = req.query;

    // Build filters
    const filters = {};
    if (status) filters.status = status;
    if (date) filters.date = date;
    if (search) filters.search = search;

    const bookings = await googleSheetsService.getBookings(filters);
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedBookings = bookings.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedBookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: bookings.length,
        pages: Math.ceil(bookings.length / limit)
      }
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// Get single booking
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await googleSheetsService.getBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
});

// Reschedule booking
app.put('/api/bookings/:id/reschedule', async (req, res) => {
  try {
    const { preferredDate, preferredTime, reschedulingReason } = req.body;

    if (!preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide new date and time'
      });
    }

    const booking = await googleSheetsService.getBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot reschedule cancelled booking'
      });
    }

    if (booking.reschedulingCount >= 3) {
      return res.status(400).json({
        success: false,
        message: 'Maximum rescheduling limit reached (3 times)'
      });
    }

    // Update booking
    const updateData = {
      originalDate: booking.preferredDate,
      originalTime: booking.preferredTime,
      preferredDate: new Date(preferredDate),
      preferredTime,
      reschedulingReason,
      reschedulingCount: booking.reschedulingCount + 1
    };

    const result = await googleSheetsService.updateBooking(req.params.id, updateData);

    res.json({
      success: true,
      message: 'Booking rescheduled successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Reschedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reschedule booking',
      error: error.message
    });
  }
});

// Cancel booking
app.put('/api/bookings/:id/cancel', async (req, res) => {
  try {
    const { cancellationReason, cancelledBy = 'customer' } = req.body;

    const booking = await googleSheetsService.getBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed booking'
      });
    }

    // Update booking
    const updateData = {
      status: 'cancelled',
      cancellationReason,
      cancelledAt: new Date(),
      cancelledBy
    };

    const result = await googleSheetsService.updateBooking(req.params.id, updateData);

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Cancel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
});

// Confirm booking
app.put('/api/bookings/:id/confirm', async (req, res) => {
  try {
    const booking = await googleSheetsService.getBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending bookings can be confirmed'
      });
    }

    const updateData = {
      status: 'confirmed'
    };

    const result = await googleSheetsService.updateBooking(req.params.id, updateData);

    res.json({
      success: true,
      message: 'Booking confirmed successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Confirm error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm booking',
      error: error.message
    });
  }
});

// Delete booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await googleSheetsService.getBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const result = await googleSheetsService.deleteBooking(req.params.id);

    res.json(result);

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message
    });
  }
});

// Update call information
app.put('/api/bookings/:id/call-update', async (req, res) => {
  try {
    const {
      callId,
      callTranscript,
      callSummary,
      callDuration,
      callRecordingUrl,
      callStatus,
      callOutcome
    } = req.body;

    const updateData = {
      callId,
      callTranscript,
      callSummary,
      callDuration,
      callRecordingUrl,
      callStatus,
      callOutcome
    };

    const result = await googleSheetsService.updateBooking(req.params.id, updateData);

    res.json({
      success: true,
      message: 'Call information updated successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Call update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update call information',
      error: error.message
    });
  }
});

// Update payment information
app.put('/api/bookings/:id/payment-update', async (req, res) => {
  try {
    const { paymentStatus, paymentMethod, paymentAmount } = req.body;

    const updateData = {
      paymentStatus,
      paymentMethod,
      paymentAmount
    };

    const result = await googleSheetsService.updateBooking(req.params.id, updateData);

    res.json({
      success: true,
      message: 'Payment information updated successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Payment update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment information',
      error: error.message
    });
  }
});

// Add customer feedback
app.put('/api/bookings/:id/feedback', async (req, res) => {
  try {
    const { customerSatisfaction, feedback, wouldRecommend, revisitIntent } = req.body;

    const updateData = {
      customerSatisfaction,
      feedback,
      wouldRecommend,
      revisitIntent
    };

    const result = await googleSheetsService.updateBooking(req.params.id, updateData);

    res.json({
      success: true,
      message: 'Feedback added successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add feedback',
      error: error.message
    });
  }
});

// Get dashboard statistics
app.get('/api/bookings/stats/dashboard', async (req, res) => {
  try {
    const stats = await googleSheetsService.getDashboardStats();

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Google Sheets Integration: Active`);
  console.log(`📅 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💈 Services: http://localhost:${PORT}/api/services`);
});
