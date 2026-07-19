import site from '@data/site.json';

const siteUrl = 'https://jirehcooler.com';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: site.businessName,
    image: `${siteUrl}/images/og/default-og.jpg`,
    url: siteUrl,
    telephone: site.phoneRaw,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Broward County, FL' },
      { '@type': 'AdministrativeArea', name: 'Palm Beach County, FL' },
    ],
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        description: 'Emergency service availability',
      },
    ],
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: new URL(opts.path, siteUrl).toString(),
    provider: {
      '@type': 'HVACBusiness',
      name: site.businessName,
      telephone: site.phoneRaw,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: 'US',
      },
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Broward County, FL' },
      { '@type': 'AdministrativeArea', name: 'Palm Beach County, FL' },
    ],
  };
}
