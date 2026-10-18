export const site = {
  name: 'Delegis',
  url: (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) || 'https://www.delegis.be').replace(/\/$/, ''),
  email: 'hello@delegis.be',
  // Placeholders: replace with the real registered offices before going live.
  offices: [
    {
      id: 'brussels',
      city: 'Bruxelles',
      street: 'Avenue Louise 000',
      postalCode: '1050',
      country: 'BE',
      phone: '+32 2 000 00 00',
      lat: 50.8263,
      lng: 4.3626,
    },
    {
      id: 'casablanca',
      city: 'Casablanca',
      street: 'Boulevard d’Anfa 000',
      postalCode: '20000',
      country: 'MA',
      phone: '+212 5 22 00 00 00',
      lat: 33.5883,
      lng: -7.6114,
    },
  ],
  vat: 'BE 0000.000.000',
  social: { linkedin: 'https://www.linkedin.com/company/delegis' },
};
