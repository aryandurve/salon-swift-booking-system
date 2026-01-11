const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const moment = require('moment');

// Google Sheets configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE_NAME = 'Bookings!A:Z'; // Full sheet range

class GoogleSheetsService {
  constructor() {
    this.auth = null;
    this.sheets = null;
    this.initializeAuth();
  }

  async initializeAuth() {
    try {
      const auth = new GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: SCOPES,
      });

      this.auth = await auth.getClient();
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      
      console.log('✅ Google Sheets authenticated successfully');
    } catch (error) {
      console.error('❌ Google Sheets authentication error:', error);
      throw error;
    }
  }

  // Convert booking object to sheet row format
  bookingToRow(booking) {
    return [
      booking._id || '',
      booking.customerName || '',
      booking.email || '',
      booking.phoneNumber || '',
      booking.service || '',
      booking.preferredDate ? moment(booking.preferredDate).format('YYYY-MM-DD') : '',
      booking.preferredTime || '',
      booking.totalPrice || '',
      booking.status || '',
      booking.bookingSource || '',
      booking.staffAssigned || '',
      booking.estimatedDuration || '',
      booking.actualDuration || '',
      booking.paymentStatus || '',
      booking.paymentMethod || '',
      booking.paymentAmount || '',
      booking.customerNotes || '',
      booking.internalNotes || '',
      booking.reminderSent ? 'Yes' : 'No',
      booking.reminderSentAt ? moment(booking.reminderSentAt).format('YYYY-MM-DD HH:mm') : '',
      booking.followUpRequired ? 'Yes' : 'No',
      booking.followUpDate ? moment(booking.followUpDate).format('YYYY-MM-DD') : '',
      booking.followUpNotes || '',
      booking.preferredStaff || '',
      booking.servicePreferences || '',
      booking.allergicReactions || '',
      booking.skinType || '',
      booking.hairType || '',
      booking.customerSatisfaction || '',
      booking.feedback || '',
      booking.wouldRecommend ? 'Yes' : 'No',
      booking.revisitIntent || '',
      // Rescheduling
      booking.reschedulingReason || '',
      booking.reschedulingCount || 0,
      booking.originalDate ? moment(booking.originalDate).format('YYYY-MM-DD') : '',
      booking.originalTime || '',
      // Cancellation
      booking.cancellationReason || '',
      booking.cancelledAt ? moment(booking.cancelledAt).format('YYYY-MM-DD HH:mm') : '',
      booking.cancelledBy || '',
      // Call Integration
      booking.callId || '',
      booking.callTranscript || '',
      booking.callSummary || '',
      booking.callDuration || '',
      booking.callRecordingUrl || '',
      booking.callStatus || '',
      booking.callOutcome || '',
      // Timestamps
      booking.createdAt ? moment(booking.createdAt).format('YYYY-MM-DD HH:mm') : '',
      booking.updatedAt ? moment(booking.updatedAt).format('YYYY-MM-DD HH:mm') : ''
    ];
  }

  // Convert sheet row to booking object
  rowToBooking(row, index) {
    if (!row[0]) return null; // Skip empty rows
    
    return {
      _id: row[0],
      customerName: row[1],
      email: row[2],
      phoneNumber: row[3],
      service: row[4],
      preferredDate: row[5] ? new Date(row[5]) : null,
      preferredTime: row[6],
      totalPrice: row[7] ? parseFloat(row[7]) : 0,
      status: row[8],
      bookingSource: row[9],
      staffAssigned: row[10],
      estimatedDuration: row[11] ? parseInt(row[11]) : 0,
      actualDuration: row[12] ? parseInt(row[12]) : 0,
      paymentStatus: row[13],
      paymentMethod: row[14],
      paymentAmount: row[15] ? parseFloat(row[15]) : 0,
      customerNotes: row[16],
      internalNotes: row[17],
      reminderSent: row[18] === 'Yes',
      reminderSentAt: row[19] ? new Date(row[19]) : null,
      followUpRequired: row[20] === 'Yes',
      followUpDate: row[21] ? new Date(row[21]) : null,
      followUpNotes: row[22],
      preferredStaff: row[23],
      servicePreferences: row[24],
      allergicReactions: row[25],
      skinType: row[26],
      hairType: row[27],
      customerSatisfaction: row[28] ? parseInt(row[28]) : null,
      feedback: row[29],
      wouldRecommend: row[30] === 'Yes',
      revisitIntent: row[31],
      reschedulingReason: row[32],
      reschedulingCount: row[33] ? parseInt(row[33]) : 0,
      originalDate: row[34] ? new Date(row[34]) : null,
      originalTime: row[35],
      cancellationReason: row[36],
      cancelledAt: row[37] ? new Date(row[37]) : null,
      cancelledBy: row[38],
      callId: row[39],
      callTranscript: row[40],
      callSummary: row[41],
      callDuration: row[42] ? parseInt(row[42]) : 0,
      callRecordingUrl: row[43],
      callStatus: row[44],
      callOutcome: row[45],
      notes: row[46],
      createdAt: row[47] ? new Date(row[47]) : null,
      updatedAt: row[48] ? new Date(row[48]) : null
    };
  }

  // Create new booking
  async createBooking(bookingData) {
    try {
      const booking = {
        ...bookingData,
        _id: 'BK' + Date.now(), // Generate unique ID
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const row = this.bookingToRow(booking);
      
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE_NAME,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [row]
        }
      });

      if (response.data.updates.updatedRows > 0) {
        return { success: true, data: booking };
      } else {
        throw new Error('Failed to add booking to Google Sheets');
      }
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  }

  // Get all bookings
  async getBookings(filters = {}) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE_NAME
      });

      const rows = response.data.values || [];
      let bookings = [];

      // Convert rows to booking objects
      for (let i = 1; i < rows.length; i++) { // Skip header row
        const booking = this.rowToBooking(rows[i], i);
        if (booking) {
          // Apply filters
          if (filters.status && booking.status !== filters.status) continue;
          if (filters.date) {
            const bookingDate = moment(booking.preferredDate).format('YYYY-MM-DD');
            if (bookingDate !== filters.date) continue;
          }
          if (filters.search) {
            const search = filters.search.toLowerCase();
            if (!booking.customerName.toLowerCase().includes(search) &&
                !booking.email.toLowerCase().includes(search) &&
                !booking.phoneNumber.includes(search)) continue;
          }
          bookings.push(booking);
        }
      }

      // Sort by creation date (newest first)
      bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return bookings;
    } catch (error) {
      console.error('Get bookings error:', error);
      throw error;
    }
  }

  // Get single booking by ID
  async getBooking(id) {
    try {
      const bookings = await this.getBookings();
      return bookings.find(booking => booking._id === id);
    } catch (error) {
      console.error('Get booking error:', error);
      throw error;
    }
  }

  // Update booking
  async updateBooking(id, updateData) {
    try {
      const bookings = await this.getBookings();
      const bookingIndex = bookings.findIndex(booking => booking._id === id);
      
      if (bookingIndex === -1) {
        throw new Error('Booking not found');
      }

      const updatedBooking = { ...bookings[bookingIndex], ...updateData, updatedAt: new Date() };
      const row = this.bookingToRow(updatedBooking);
      
      // Update row (add 2 for header row)
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Bookings!A${bookingIndex + 2}:Z${bookingIndex + 2}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [row]
        }
      });

      return { success: true, data: updatedBooking };
    } catch (error) {
      console.error('Update booking error:', error);
      throw error;
    }
  }

  // Delete booking
  async deleteBooking(id) {
    try {
      const bookings = await this.getBookings();
      const bookingIndex = bookings.findIndex(booking => booking._id === id);
      
      if (bookingIndex === -1) {
        throw new Error('Booking not found');
      }

      // Delete row (add 2 for header row)
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: SPREADSHEET_ID,
        range: `Bookings!A${bookingIndex + 2}:Z${bookingIndex + 2}`
      });

      return { success: true, message: 'Booking deleted successfully' };
    } catch (error) {
      console.error('Delete booking error:', error);
      throw error;
    }
  }

  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const bookings = await this.getBookings();
      const today = moment().startOf('day');
      const thisMonth = moment().startOf('month');
      const thisYear = moment().startOf('year');

      const stats = {
        totalBookings: bookings.length,
        todayBookings: bookings.filter(b => moment(b.preferredDate).isSameOrAfter(today)).length,
        monthBookings: bookings.filter(b => moment(b.preferredDate).isSameOrAfter(thisMonth)).length,
        yearBookings: bookings.filter(b => moment(b.preferredDate).isSameOrAfter(thisYear)).length,
        
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
        completedBookings: bookings.filter(b => b.status === 'completed').length,
        cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
        
        totalRevenue: bookings
          .filter(b => b.status === 'completed' && b.paymentStatus === 'paid')
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
          
        callsCompleted: bookings.filter(b => b.callStatus === 'completed').length,
        averageCallDuration: bookings
          .filter(b => b.callDuration > 0)
          .reduce((sum, b, _, arr, index) => sum + b.callDuration, 0) / 
          bookings.filter(b => b.callDuration > 0).length || 1,
          
        bookingSources: this._countByField(bookings, 'bookingSource'),
        services: this._countByField(bookings, 'service')
      };

      return stats;
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw error;
    }
  }

  // Helper method to count by field
  _countByField(bookings, field) {
    const counts = {};
    bookings.forEach(booking => {
      const value = booking[field];
      counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ [field]: name, count }));
  }
}

module.exports = new GoogleSheetsService();
