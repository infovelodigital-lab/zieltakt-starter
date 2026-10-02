import type { Business } from "../content.config";

/**
 * schema.org LocalBusiness JSON-LD, built only from business.yaml.
 * Pass the result to BaseLayout's `jsonLd` prop.
 */
export function localBusinessSchema(business: Business, site: URL | undefined) {
	const { address, geo } = business;

	return {
		"@context": "https://schema.org",
		"@type": business.schemaType,
		name: business.name,
		description: business.seo.description,
		url: site?.href,
		telephone: business.phone.href.replace(/^tel:/, ""),
		email: business.email,
		address: {
			"@type": "PostalAddress",
			streetAddress: address.street,
			postalCode: address.postalCode,
			addressLocality: address.city,
			addressRegion: address.region,
			addressCountry: address.country,
		},
		geo: geo && { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
		hasMap: business.mapsUrl,
		areaServed: business.areaServed.length ? business.areaServed.map((name) => ({ "@type": "City", name })) : undefined,
		openingHoursSpecification: business.openingHours.length
			? business.openingHours.map((h) => ({
					"@type": "OpeningHoursSpecification",
					dayOfWeek: h.dayOfWeek,
					opens: h.opens,
					closes: h.closes,
				}))
			: undefined,
		priceRange: business.priceRange,
		foundingDate: business.foundingYear?.toString(),
		sameAs: business.social.length ? business.social.map((s) => s.href) : undefined,
	};
}
