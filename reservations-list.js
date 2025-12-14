class ReservationsList {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupTabSwitching();
  }

  setupTabSwitching() {
    // Handle tab switching
    document.querySelectorAll('.window-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        
        // Update active state
        document.querySelectorAll('.window-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        // Hide all tab content
        document.getElementById('newReservationsTab').style.display = 'none';
        document.getElementById('onlineEfarmInTab').style.display = 'none';
        document.getElementById('unfinalizedTab').style.display = 'none';
        document.getElementById('deletedTab').style.display = 'none';
        document.getElementById('importTab').style.display = 'none';
        
        // Show selected tab
        switch(tabName) {
          case 'new-reservations':
            document.getElementById('newReservationsTab').style.display = 'flex';
            break;
          case 'online-efarm-in':
            document.getElementById('onlineEfarmInTab').style.display = 'block';
            break;
          case 'unfinalized':
            document.getElementById('unfinalizedTab').style.display = 'block';
            break;
          case 'deleted':
            document.getElementById('deletedTab').style.display = 'block';
            break;
          case 'import':
            document.getElementById('importTab').style.display = 'block';
            break;
        }
      });
    });
  }

  setupEventListeners() {
    // Main navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const button = e.target.closest('.nav-btn');
        const section = button.dataset.section;
        
        if (section === 'office') {
          window.location.href = 'my-office.html';
        } else if (section === 'reservations') {
          // Already on reservations page
        } else {
          alert(`${section} section coming soon!`);
        }
      });
    });

    // View buttons (window-actions)
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        
        if (action === 'user-view') {
          window.location.href = 'index.html?view=user';
        } else if (action === 'driver-view') {
          window.location.href = 'index.html?view=driver';
        } else if (action === 'reservations') {
          // Already on reservations page
        } else if (action === 'farm-out') {
          window.location.href = 'index.html?view=reservations';
        } else if (action === 'new-reservation') {
          window.location.href = 'reservation-form.html';
        }
      });
    });

    // Search button
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.performSearch();
      });
    }

    // Conf # links
    document.querySelectorAll('.conf-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        // Navigate to reservation form with this reservation ID
        const confNumber = e.target.textContent;
        window.location.href = `reservation-form.html?conf=${confNumber}`;
      });
    });

    // Select links
    document.querySelectorAll('.select-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const row = e.target.closest('tr');
        const confNumber = row.querySelector('.conf-link').textContent;
        this.selectReservation(confNumber);
      });
    });
  }

  performSearch() {
    // Get search values
    const searchFor = document.querySelector('.search-input').value;
    const searchIn = document.querySelector('.search-select').value;
    
    console.log('Searching for:', searchFor, 'in:', searchIn);
    
    // Implement search logic here
    // This would filter the table based on search criteria
    alert('Search functionality will filter reservations based on your criteria');
  }

  selectReservation(confNumber) {
    console.log('Selected reservation:', confNumber);
    // Navigate to the reservation details
    window.location.href = `reservation-form.html?conf=${confNumber}`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ReservationsList();
});
