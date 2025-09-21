// SEO and Structured Data utilities

// Organization structured data
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LA Marketing",
    "alternateName": "LA Marketing Agency",
    "url": "https://www.lamarketingae.com",
    "logo": "https://www.lamarketingae.com/src/assets/logo.png",
    "description": "Leading digital marketing agency in Dubai, UAE. Specializing in influencer marketing, social media management, brand development, and digital transformation for businesses across the Middle East.",
    "foundingDate": "1996",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "22 Hady Street Mohandseen",
        "addressLocality": "Giza",
        "addressCountry": "EG",
        "postalCode": "12655"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+201202020213",
        "contactType": "customer service",
        "areaServed": ["AE", "EG"],
        "availableLanguage": ["English", "Arabic"]
    },
    "sameAs": [
        "https://www.linkedin.com/company/la-marketing1/",
        "https://www.instagram.com/lamarekting2",
        "https://www.facebook.com/profile.php?id=61565095627341",
        "https://www.youtube.com/@lamarekting"
    ],
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 25.2048,
            "longitude": 55.2708
        },
        "geoRadius": "2000000"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Marketing Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Influencer Marketing",
                    "description": "Connect your brand with the right voices across the MENA region and beyond"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Media Production",
                    "description": "From concept to screen, transform ideas into impactful visuals"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Event Management",
                    "description": "Create unforgettable experiences that engage audiences and elevate brands"
                }
            }
        ]
    }
};

// Website structured data
export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LA Marketing",
    "url": "https://www.lamarketingae.com",
    "description": "Leading digital marketing agency in Dubai, UAE",
    "publisher": {
        "@type": "Organization",
        "name": "LA Marketing",
        "url": "https://www.lamarketingae.com"
    },
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.lamarketingae.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

// Local Business structured data
export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.lamarketingae.com/#organization",
    "name": "LA Marketing",
    "image": "https://www.lamarketingae.com/src/assets/logo.png",
    "description": "Leading digital marketing agency in Dubai, UAE",
    "url": "https://www.lamarketingae.com",
    "telephone": "+201202020213",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "22 Hady Street Mohandseen",
        "addressLocality": "Giza",
        "addressCountry": "EG",
        "postalCode": "12655"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.0444,
        "longitude": 31.2357
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
    },
    "priceRange": "$$",
    "currenciesAccepted": "EGP, AED, USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer"
};

// Page-specific SEO data
export const seoData = {
    home: {
        title: "LA Marketing - Digital Marketing Agency UAE | Influencer Marketing Dubai",
        description: "Leading digital marketing agency in Dubai, UAE. Specializing in influencer marketing, social media management, brand development, and digital transformation for businesses across the Middle East.",
        keywords: "digital marketing Dubai, influencer marketing UAE, social media management, brand development, marketing agency UAE, Dubai marketing, MENA marketing",
        structuredData: [organizationSchema, websiteSchema, localBusinessSchema]
    },
    about: {
        title: "About LA Marketing - Leading Digital Marketing Agency in Dubai",
        description: "Learn about LA Marketing's mission, values, and expertise in digital marketing, influencer marketing, and brand development across the MENA region.",
        keywords: "about LA Marketing, digital marketing agency Dubai, marketing team UAE, company mission, brand development Dubai",
        structuredData: [organizationSchema]
    },
    influencers: {
        title: "Influencer Network - Connect with Top Influencers in MENA | LA Marketing",
        description: "Discover our extensive network of influencers across the MENA region. Connect your brand with the right voices for authentic engagement and measurable results.",
        keywords: "influencer network MENA, Dubai influencers, UAE influencers, influencer marketing, social media influencers, brand partnerships",
        structuredData: [organizationSchema]
    },
    contact: {
        title: "Contact LA Marketing - Get in Touch with Our Digital Marketing Experts",
        description: "Contact LA Marketing for your digital marketing needs. Get in touch with our experts in influencer marketing, social media management, and brand development in Dubai, UAE.",
        keywords: "contact LA Marketing, digital marketing consultation Dubai, marketing agency contact UAE, business inquiry",
        structuredData: [organizationSchema, localBusinessSchema]
    }
};

// Breadcrumb structured data generator
export const generateBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
});

// FAQ structured data generator
export const generateFAQSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

// Service structured data generator
export const generateServiceSchema = (service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
        "@type": "Organization",
        "name": "LA Marketing",
        "url": "https://www.lamarketingae.com"
    },
    "areaServed": {
        "@type": "Country",
        "name": "United Arab Emirates"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": service.name,
        "itemListElement": service.features?.map(feature => ({
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": feature
            }
        }))
    }
});
