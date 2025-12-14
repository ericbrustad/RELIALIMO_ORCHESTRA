class SMSProvider {
  constructor() {
    this.providers = [
      {
        id: 'limo-anywhere',
        name: 'Limo Anywhere',
        isDefault: true
      }
    ];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkEmptyState();
  }

  setupEventListeners() {
    // Radio button changes
    document.querySelectorAll('input[name="defaultProvider"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.setDefaultProvider(e.target.value);
      });
    });

    // Sidebar navigation
    document.querySelectorAll('.settings-nav-subitem').forEach(item => {
      item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        if (href && href !== '#' && !href.includes('.html')) {
          e.preventDefault();
          alert(`Navigation to "${item.textContent.trim()}" is under construction`);
        }
      });
    });
  }

  setDefaultProvider(providerId) {
    // Update the providers array
    this.providers.forEach(provider => {
      provider.isDefault = provider.id === providerId;
    });
    
    console.log(`Default provider set to: ${providerId}`);
    // In a real implementation, this would save to the backend
  }

  checkEmptyState() {
    const tableWrapper = document.querySelector('.sms-providers-table-wrapper');
    const emptyState = document.getElementById('emptyState');
    
    if (this.providers.length === 0) {
      tableWrapper.style.display = 'none';
      emptyState.style.display = 'block';
    } else {
      tableWrapper.style.display = 'block';
      emptyState.style.display = 'none';
    }
  }

  renderProviders() {
    const tbody = document.getElementById('providersTableBody');
    tbody.innerHTML = '';

    this.providers.forEach(provider => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="radio-cell">
          <input type="radio" name="defaultProvider" value="${provider.id}" ${provider.isDefault ? 'checked' : ''} />
        </td>
        <td class="provider-name">${provider.name}</td>
        <td class="actions-cell">
          <a href="#" class="action-link" onclick="editProvider(event, '${provider.id}')">Edit</a>
          <a href="#" class="action-link delete-link" onclick="deleteProvider(event, '${provider.id}')">Delete</a>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Re-attach event listeners to new radio buttons
    document.querySelectorAll('input[name="defaultProvider"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.setDefaultProvider(e.target.value);
      });
    });

    this.checkEmptyState();
  }

  addProvider(provider) {
    this.providers.push(provider);
    this.renderProviders();
  }

  removeProvider(providerId) {
    this.providers = this.providers.filter(p => p.id !== providerId);
    
    // If we deleted the default provider, set the first one as default
    if (this.providers.length > 0 && !this.providers.some(p => p.isDefault)) {
      this.providers[0].isDefault = true;
    }
    
    this.renderProviders();
  }
}

// Global instance
let smsProviderManager;

// Global functions for onclick handlers
function addNewProvider() {
  const providerName = prompt('Enter SMS Provider Name:');
  
  if (providerName && providerName.trim()) {
    const newProvider = {
      id: providerName.toLowerCase().replace(/\s+/g, '-'),
      name: providerName.trim(),
      isDefault: smsProviderManager.providers.length === 0 // First provider becomes default
    };
    
    smsProviderManager.addProvider(newProvider);
    alert(`SMS Provider "${providerName}" added successfully!`);
  }
}

function editProvider(event, providerId) {
  event.preventDefault();
  
  const provider = smsProviderManager.providers.find(p => p.id === providerId);
  if (!provider) return;
  
  alert(`Edit SMS Provider: ${provider.name}\n\nIn a full implementation, this would open a configuration form for:\n- Provider Name\n- API Credentials\n- Phone Number\n- Settings & Options\n- Testing & Verification`);
}

function deleteProvider(event, providerId) {
  event.preventDefault();
  
  const provider = smsProviderManager.providers.find(p => p.id === providerId);
  if (!provider) return;
  
  if (confirm(`Are you sure you want to delete the SMS provider "${provider.name}"?\n\nThis action cannot be undone.`)) {
    smsProviderManager.removeProvider(providerId);
    alert(`SMS Provider "${provider.name}" has been deleted.`);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  smsProviderManager = new SMSProvider();
});
