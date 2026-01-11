const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Customer Information
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
  },

  // Booking Details
  service: {
    type: String,
    required: [true, 'Service is required'],
    enum: ['Haircut', 'Haircut + Styling', 'Hair Spa', 'Beard Trim', 'Hair Coloring (Basic)', 'Facial']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required']
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
    validate: {
      validator: function(v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Please enter a valid time in HH:MM format'
    }
  },

  // Scheduling
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledDate: {
    type: Date,
    default: Date.now
  },

  // Rescheduling
  reschedulingReason: {
    type: String,
    maxlength: [500, 'Rescheduling reason cannot exceed 500 characters']
  },
  reschedulingCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 3
  },
  originalDate: Date,
  originalTime: String,

  // Cancellation
  cancellationReason: {
    type: String,
    maxlength: [500, 'Cancellation reason cannot exceed 500 characters']
  },
  cancelledAt: Date,
  cancelledBy: {
    type: String,
    enum: ['customer', 'salon']
  },

  // Additional Information
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },

  // Call Integration
  callId: {
    type: String,
    sparse: true, // Allows null/undefined values
    index: true
  },
  callTranscript: {
    type: String,
    maxlength: [10000, 'Transcript cannot exceed 10000 characters']
  },
  callSummary: {
    type: String,
    maxlength: [2000, 'Call summary cannot exceed 2000 characters']
  },
  callDuration: {
    type: Number, // Duration in seconds
    min: 0
  },
  callRecordingUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v);
      },
      message: 'Recording URL must be a valid URL'
    }
  },
  callStatus: {
    type: String,
    enum: ['not_called', 'incoming', 'outgoing', 'completed', 'missed', 'failed'],
    default: 'not_called'
  },
  callOutcome: {
    type: String,
    enum: ['pending', 'booked', 'rescheduled', 'cancelled', 'no_answer', 'callback_requested'],
    default: 'pending'
  },

  // Enhanced Booking Features
  bookingSource: {
    type: String,
    enum: ['website', 'phone', 'whatsapp', 'walk_in', 'voice_assistant'],
    default: 'website'
  },
  staffAssigned: {
    type: String,
    trim: true,
    maxlength: [100, 'Staff name cannot exceed 100 characters']
  },
  estimatedDuration: {
    type: Number, // Duration in minutes
    required: true,
    min: 15,
    max: 240
  },
  actualDuration: {
    type: Number, // Actual service duration in minutes
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'online', 'wallet'],
  },
  paymentAmount: {
    type: Number,
    min: 0
  },
  customerNotes: {
    type: String,
    maxlength: [1000, 'Customer notes cannot exceed 1000 characters']
  },
  internalNotes: {
    type: String,
    maxlength: [2000, 'Internal notes cannot exceed 2000 characters']
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderSentAt: Date,
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  followUpNotes: {
    type: String,
    maxlength: [1000, 'Follow-up notes cannot exceed 1000 characters']
  },

  // Customer Preferences
  preferredStaff: {
    type: String,
    trim: true,
    maxlength: [100, 'Preferred staff name cannot exceed 100 characters']
  },
  servicePreferences: {
    type: String,
    maxlength: [500, 'Service preferences cannot exceed 500 characters']
  },
  allergicReactions: {
    type: String,
    maxlength: [500, 'Allergic reactions cannot exceed 500 characters']
  },
  skinType: {
    type: String,
    enum: ['normal', 'dry', 'oily', 'combination', 'sensitive']
  },
  hairType: {
    type: String,
    enum: ['straight', 'wavy', 'curly', 'coily']
  },

  // Business Metrics
  customerSatisfaction: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    maxlength: [2000, 'Feedback cannot exceed 2000 characters']
  },
  wouldRecommend: {
    type: Boolean
  },
  revisitIntent: {
    type: String,
    enum: ['definitely', 'probably', 'maybe', 'probably_not', 'definitely_not']
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
bookingSchema.index({ customerName: 1 });
bookingSchema.index({ phoneNumber: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ preferredDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ callId: 1 });
bookingSchema.index({ callStatus: 1 });
bookingSchema.index({ bookingSource: 1 });
bookingSchema.index({ staffAssigned: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ preferredDate: 1, preferredTime: 1 }); // For scheduling conflicts

module.exports = mongoose.model('Booking', bookingSchema);
