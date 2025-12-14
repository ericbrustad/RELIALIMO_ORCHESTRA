export class ReservationManager {
  constructor() {
    this.reservations = [];
    this.nextId = 1;
  }

  addReservation(reservationData) {
    const reservation = {
      id: this.nextId++,
      ...reservationData,
      createdAt: new Date().toISOString(),
      status: reservationData.status || 'pending'
    };
    
    this.reservations.push(reservation);
    return reservation;
  }

  getReservationById(id) {
    return this.reservations.find(r => r.id === id);
  }

  getAllReservations() {
    return [...this.reservations];
  }

  getReservationsByStatus(status) {
    return this.reservations.filter(r => r.status === status);
  }

  acceptReservation(id, driverName) {
    const reservation = this.getReservationById(id);
    if (reservation && reservation.status === 'pending') {
      reservation.status = 'accepted';
      reservation.driverName = driverName;
      reservation.acceptedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  completeReservation(id) {
    const reservation = this.getReservationById(id);
    if (reservation && reservation.status === 'accepted') {
      reservation.status = 'completed';
      reservation.completedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  updateReservation(id, updates) {
    const reservation = this.getReservationById(id);
    if (reservation) {
      Object.assign(reservation, updates);
      return true;
    }
    return false;
  }

  deleteReservation(id) {
    const index = this.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
      return true;
    }
    return false;
  }

  getVehicleTypeLabel(type) {
    const labels = {
      sedan: 'Sedan',
      suv: 'SUV Limousine',
      stretch: 'Stretch Limousine',
      luxury: 'Luxury Sedan'
    };
    return labels[type] || type;
  }

  getStatusColor(status) {
    const colors = {
      pending: '#ffa726',
      accepted: '#4caf50',
      completed: '#78909c'
    };
    return colors[status] || '#666';
  }
}
