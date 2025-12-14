export class AffiliateService {
  constructor() {
    // Sample affiliate database
    this.affiliates = [
      {
        id: 1,
        company: 'Elite Limo Service',
        contact: 'John Smith',
        phone: '(310) 555-0100',
        email: 'john@elitelimo.com',
        location: 'Los Angeles, CA'
      },
      {
        id: 2,
        company: 'Premium Transportation',
        contact: 'Sarah Johnson',
        phone: '(310) 555-0101',
        email: 'sarah@premiumtrans.com',
        location: 'Beverly Hills, CA'
      },
      {
        id: 3,
        company: 'Luxury Coach Services',
        contact: 'Michael Brown',
        phone: '(818) 555-0200',
        email: 'michael@luxurycoach.com',
        location: 'Burbank, CA'
      },
      {
        id: 4,
        company: 'Executive Car Service',
        contact: 'Lisa Davis',
        phone: '(213) 555-0150',
        email: 'lisa@executivecar.com',
        location: 'Downtown LA, CA'
      },
      {
        id: 5,
        company: 'VIP Transportation Group',
        contact: 'Robert Wilson',
        phone: '(424) 555-0175',
        email: 'robert@viptrans.com',
        location: 'Santa Monica, CA'
      },
      {
        id: 6,
        company: 'Royal Limousine',
        contact: 'Jennifer Martinez',
        phone: '(626) 555-0220',
        email: 'jennifer@royallimo.com',
        location: 'Pasadena, CA'
      },
      {
        id: 7,
        company: 'Diamond Transportation',
        contact: 'David Garcia',
        phone: '(562) 555-0180',
        email: 'david@diamondtrans.com',
        location: 'Long Beach, CA'
      },
      {
        id: 8,
        company: 'First Class Car Service',
        contact: 'Amanda Rodriguez',
        phone: '(949) 555-0190',
        email: 'amanda@firstclasscar.com',
        location: 'Orange County, CA'
      },
      {
        id: 9,
        company: 'Prestige Limo Network',
        contact: 'Christopher Lee',
        phone: '(714) 555-0165',
        email: 'chris@prestigelimo.com',
        location: 'Anaheim, CA'
      },
      {
        id: 10,
        company: 'Golden State Transportation',
        contact: 'Michelle Taylor',
        phone: '(805) 555-0210',
        email: 'michelle@goldenstate.com',
        location: 'Ventura, CA'
      },
      {
        id: 11,
        company: 'Metro Luxury Transport',
        contact: 'James Anderson',
        phone: '(323) 555-0155',
        email: 'james@metroluxury.com',
        location: 'Hollywood, CA'
      },
      {
        id: 12,
        company: 'Coastal Coach Company',
        contact: 'Emily White',
        phone: '(310) 555-0185',
        email: 'emily@coastalcoach.com',
        location: 'Malibu, CA'
      }
    ];
  }

  getAllAffiliates() {
    return [...this.affiliates];
  }

  searchAffiliates(query) {
    if (!query || query.length < 2) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    return this.affiliates.filter(affiliate => 
      affiliate.company.toLowerCase().includes(searchTerm) ||
      affiliate.contact.toLowerCase().includes(searchTerm) ||
      affiliate.location.toLowerCase().includes(searchTerm) ||
      affiliate.email.toLowerCase().includes(searchTerm) ||
      affiliate.phone.includes(searchTerm)
    );
  }

  getAffiliateById(id) {
    return this.affiliates.find(affiliate => affiliate.id === id);
  }

  getAffiliateByCompany(companyName) {
    return this.affiliates.find(affiliate => 
      affiliate.company.toLowerCase() === companyName.toLowerCase()
    );
  }
}
