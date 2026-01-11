const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const moment = require('moment');

// Service prices
const servicePrices = {
  'Haircut': 500,
  'Haircut + Styling': 700,
  'Hair Spa': 1200,
  'Beard Trim': 300,
  'Hair Coloring (Basic)': 2000,
  'Facial': 1500
};

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', async (req, res) => {
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

    // Create booking
    const booking = new Booking({
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
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking
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

// @route   GET /api/bookings
// @desc    Get all bookings with filters
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      date,
      search
    } = req.query;

    // Build query
    let query = {};

    if (status) {
      query.status = status;
    }

    if (date) {
      const startOfDay = moment(date).startOf('day').toDate();
      const endOfDay = moment(date).endOf('day').toDate();
      query.preferredDate = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
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

// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

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

// @route   PUT /api/bookings/:id/reschedule
// @desc    Reschedule a booking
router.put('/:id/reschedule', async (req, res) => {
  try {
    const { preferredDate, preferredTime, reschedulingReason } = req.body;

    if (!preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide new date and time'
      });
    }

    const booking = await Booking.findById(req.params.id);

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
    booking.originalDate = booking.preferredDate;
    booking.originalTime = booking.preferredTime;
    booking.preferredDate = new Date(preferredDate);
    booking.preferredTime = preferredTime;
    booking.reschedulingReason = reschedulingReason;
    booking.reschedulingCount += 1;
    booking.updatedAt = new Date();

    const updatedBooking = await booking.save();

    res.json({
      success: true,
      message: 'Booking rescheduled successfully',
      data: updatedBooking
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

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
router.put('/:id/cancel', async (req, res) => {
  try {
    const { cancellationReason, cancelledBy = 'customer' } = req.body;

    const booking = await Booking.findById(req.params.id);

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
    booking.status = 'cancelled';
    booking.cancellationReason = cancellationReason;
    booking.cancelledAt = new Date();
    booking.cancelledBy = cancelledBy;
    booking.updatedAt = new Date();

    const cancelledBooking = await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: cancelledBooking
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

// @route   PUT /api/bookings/:id/confirm
// @desc    Confirm a booking
router.put('/:id/confirm', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

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

    booking.status = 'confirmed';
    booking.updatedAt = new Date();

    const confirmedBooking = await booking.save();

    res.json({
      success: true,
      message: 'Booking confirmed successfully',
      data: confirmedBooking
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

// @route   DELETE /api/bookings/:id
// @desc    Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message
    });
  }
});

// @route   PUT /api/bookings/:id/call-update
// @desc    Update call information for a booking
router.put('/:id/call-update', async (req, res) => {
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

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update call information
    if (callId !== undefined) booking.callId = callId;
    if (callTranscript !== undefined) booking.callTranscript = callTranscript;
    if (callSummary !== undefined) booking.callSummary = callSummary;
    if (callDuration !== undefined) booking.callDuration = callDuration;
    if (callRecordingUrl !== undefined) booking.callRecordingUrl = callRecordingUrl;
    if (callStatus !== undefined) booking.callStatus = callStatus;
    if (callOutcome !== undefined) booking.callOutcome = callOutcome;
    
    booking.updatedAt = new Date();

    const updatedBooking = await booking.save();

    res.json({
      success: true,
      message: 'Call information updated successfully',
      data: updatedBooking
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

// @route   PUT /api/bookings/:id/payment-update
// @desc    Update payment information
router.put('/:id/payment-update', async (req, res) => {
  try {
    const { paymentStatus, paymentMethod, paymentAmount } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update payment information
    if (paymentStatus !== undefined) booking.paymentStatus = paymentStatus;
    if (paymentMethod !== undefined) booking.paymentMethod = paymentMethod;
    if (paymentAmount !== undefined) booking.paymentAmount = paymentAmount;
    
    booking.updatedAt = new Date();

    const updatedBooking = await booking.save();

    res.json({
      success: true,
      message: 'Payment information updated successfully',
      data: updatedBooking
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

// @route   PUT /api/bookings/:id/feedback
// @desc    Add customer feedback
router.put('/:id/feedback', async (req, res) => {
  try {
    const { customerSatisfaction, feedback, wouldRecommend, revisitIntent } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update feedback information
    if (customerSatisfaction !== undefined) booking.customerSatisfaction = customerSatisfaction;
    if (feedback !== undefined) booking.feedback = feedback;
    if (wouldRecommend !== undefined) booking.wouldRecommend = wouldRecommend;
    if (revisitIntent !== undefined) booking.revisitIntent = revisitIntent;
    
    booking.updatedAt = new Date();

    const updatedBooking = await booking.save();

    res.json({
      success: true,
      message: 'Feedback added successfully',
      data: updatedBooking
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

// @route   GET /api/bookings/stats/dashboard
// @desc    Get dashboard statistics
router.get('/stats/dashboard', async (req, res) => {
  try {
    const today = moment().startOf('day');
    const thisMonth = moment().startOf('month');
    const thisYear = moment().startOf('year');

    const stats = {
      totalBookings: await Booking.countDocuments(),
      todayBookings: await Booking.countDocuments({ createdAt: { $gte: today.toDate() } }),
      monthBookings: await Booking.countDocuments({ createdAt: { $gte: thisMonth.toDate() } }),
      yearBookings: await Booking.countDocuments({ createdAt: { $gte: thisYear.toDate() } }),
      
      pendingBookings: await Booking.countDocuments({ status: 'pending' }),
      confirmedBookings: await Booking.countDocuments({ status: 'confirmed' }),
      completedBookings: await Booking.countDocuments({ status: 'completed' }),
      cancelledBookings: await Booking.countDocuments({ status: 'cancelled' }),
      
      totalRevenue: await Booking.aggregate([
        { $match: { status: 'completed', paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]).then(result => result[0]?.total || 0),
      
      callsCompleted: await Booking.countDocuments({ callStatus: 'completed' }),
      averageCallDuration: await Booking.aggregate([
        { $match: { callDuration: { $gt: 0 } } },
        { $group: { _id: null, avgDuration: { $avg: '$callDuration' } } }
      ]).then(result => result[0]?.avgDuration || 0),
      
      bookingSources: await Booking.aggregate([
        { $group: { _id: '$bookingSource', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
      services: await Booking.aggregate([
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    };

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

module.exports = router;
