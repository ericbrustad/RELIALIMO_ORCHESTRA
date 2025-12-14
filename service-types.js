class ServiceTypes {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add New button
    const addNewBtn = document.querySelector('.btn-add-new');
    if (addNewBtn) {
      addNewBtn.addEventListener('click', () => {
        this.addNewServiceType();
      });
    }

    // Service type links
    document.querySelectorAll('.service-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = e.target.textContent;
        this.editServiceType(serviceName);
      });
    });

    // Checkboxes
    document.querySelectorAll('.service-types-table input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const row = e.target.closest('tr');
        const serviceName = row.querySelector('.service-link')?.textContent || '';
        console.log(`Service type "${serviceName}" ${e.target.checked ? 'enabled' : 'disabled'}`);
      });
    });

    // Company selector
    const companySelect = document.querySelector('.form-select-small');
    if (companySelect) {
      companySelect.addEventListener('change', (e) => {
        console.log('Company changed to:', e.target.value);
      });
    }

    // Sidebar navigation
    document.querySelectorAll('.settings-nav-subitem').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const subitem = e.target;
        
        // Remove active class from all subitems
        document.querySelectorAll('.settings-nav-subitem').forEach(si => {
          si.classList.remove('active');
        });
        
        // Add active class to clicked item
        subitem.classList.add('active');
        
        // Handle navigation
        const text = subitem.textContent.trim();
        this.navigateToSubsection(text);
      });
    });
  }

  addNewServiceType() {
    alert('Add New Service Type dialog would open here.\n\nIn a full implementation, this would open a modal or form to create a new service type with fields for:\n- Name\n- Code\n- Pricing Type\n- Custom Label\n- Agreement\n- Default settings');
  }

  editServiceType(serviceName) {
    alert(`Edit Service Type: ${serviceName}\n\nIn a full implementation, this would open a form to edit:\n- Name\n- Code\n- Pricing Type\n- Custom Label\n- Agreement\n- Default settings\n- Active status`);
  }

  navigateToSubsection(subsection) {
    console.log('Navigate to:', subsection);
    
    // In a real implementation, you would navigate to different pages
    if (subsection === 'System Mapping') {
      // Navigate to system mapping page
      window.location.href = 'system-mapping.html';
    } else if (subsection === 'Service Types') {
      // Already on this page
      console.log('Already on Service Types page');
    } else {
      alert(`Navigation to "${subsection}" is under construction`);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ServiceTypes();
});
