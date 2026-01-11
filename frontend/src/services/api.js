const API_BASE_URL = 'http://localhost:5000/api';

// API service for backend communication
export const api = {
  // Bookings
  async createBooking(bookingData) {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create booking');
    }
    
    return response.json();
  },

  async getBookings(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/bookings?${queryString}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    
    return response.json();
  },

  async getBooking(id) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
    
    if (!response.ok) {
      throw new Error('Booking not found');
    }
    
    return response.json();
  },

  async rescheduleBooking(id, data) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/reschedule`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reschedule booking');
    }
    
    return response.json();
  },

  async cancelBooking(id, data) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to cancel booking');
    }
    
    return response.json();
  },

  async confirmBooking(id) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/confirm`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to confirm booking');
    }
    
    return response.json();
  },

  async deleteBooking(id) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete booking');
    }
    
    return response.json();
  },

  // Services
  async getServices() {
    const response = await fetch(`${API_BASE_URL}/services`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    return response.json();
  },

  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error('Backend is not available');
    }
    
    return response.json();
  }
};
