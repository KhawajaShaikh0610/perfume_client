// Static fallback data for the landing page (used when API is unavailable)
export const fragranceDetails = [
  {
    name: 'Iris Noir',
    price: '₹130',
    tagline: 'The softness of iris, the depth of noir',
    image: '/img-1.png',
    description: 'The absolute softness of elegant iris concrete meets the dark, mysterious depth of black leather and patchouli. A sophisticated olfactory signature.',
    rating: '5.0',
    notes: {
      top: 'Violet Leaf, Pink Pepper',
      heart: 'Iris Concrete, Tuscan Suede',
      base: 'Black Patchouli, Vetiver, Amber'
    },
    profile: { floral: 70, woody: 85, spicy: 50, fresh: 30 }
  },
  {
    name: 'Fleur dOrchidée',
    price: '₹120',
    tagline: 'Solar orchids and warm vanilla whispers',
    image: 'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1200&auto=format&fit=crop',
    description: 'A delicate and radiant harmony where solar orchid flowers blend with warm vanilla and soft musk, capturing the essence of a sunlit garden.',
    rating: '4.8',
    notes: {
      top: 'Neroli, Sweet Bergamot',
      heart: 'Solar Orchid, Golden Ylang-Ylang',
      base: 'Vanilla Absolute, Soft Musk'
    },
    profile: { floral: 90, woody: 35, spicy: 15, fresh: 75 }
  },
  {
    name: 'Tubéreuse Blanche',
    price: '₹118',
    tagline: 'Intoxicating, creamy white floral velvet',
    image: 'https://images.unsplash.com/photo-1610113233329-1c73b6f7fe98?q=80&w=1200&auto=format&fit=crop',
    description: 'An intoxicating and creamy white floral composition, featuring rich tubereuse absolute layered with jasmine petals and a base of smooth coconut wood.',
    rating: '4.9',
    notes: {
      top: 'Green Leaves, Juicy Pear',
      heart: 'Tuberose Absolute, Night-Blooming Jasmine',
      base: 'Coconut Wood, Clean White Musk'
    },
    profile: { floral: 95, woody: 25, spicy: 10, fresh: 50 }
  },
  {
    name: 'Magnolia Cendrée',
    price: '₹120',
    tagline: 'Velvet petals wrapped in mysterious smoke',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
    description: 'A mysterious, smoky-floral fragrance. Velvet magnolia petals are contrasted with cold incense smoke and deep cedarwood, leaving a subtle, lingering trail.',
    rating: '4.7',
    notes: {
      top: 'Saffron Flower, Crushed Black Pepper',
      heart: 'Velvet Magnolia, Cold Frankincense',
      base: 'Smoky Cedarwood, White Amber'
    },
    profile: { floral: 65, woody: 80, spicy: 65, fresh: 25 }
  },
  {
    name: 'Nuit de Jasmin',
    price: '₹126',
    tagline: 'Nocturnal jasmine blooming in shadows',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop',
    description: 'A nocturnal, seductive fragrance capturing night-blooming jasmine under a starry sky, balanced by warm ambergris and dark patchouli.',
    rating: '4.9',
    notes: {
      top: 'Bitter Orange Blossom, Cardamom',
      heart: 'Night-Blooming Jasmine, Damask Rose',
      base: 'Warm Ambergris, Dark Patchouli, Sandalwood'
    },
    profile: { floral: 85, woody: 45, spicy: 40, fresh: 45 }
  }
];

export const bodyCare = [
  'Magnolia Cendrée',
  'Nuit de Jasmin',
  'Magnolia Blanche',
  'Tubéreuse Blanche',
  'Iris Noir',
  'Orchidée Noire',
  'Fleur Cendrée',
  'Jasmin Voilé'
];

/**
 * Transform a perfume record from the API into the shape the
 * landing-page components expect (price as "$120", notes object, profile object)
 */
export function apiPerfumeToDisplay(p) {
  const sizes = p.sizes || [];
  const minPrice = sizes.length > 0 ? Math.min(...sizes.map(s => parseFloat(s.price) || 0)) : 0;
  const totalStock = sizes.reduce((acc, s) => acc + (parseInt(s.stock) || 0), 0);

  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: sizes.length > 0 ? `From ₹${minPrice.toFixed(0)}` : 'N/A',
    numericPrice: minPrice,
    tagline: p.tagline || '',
    image: (p.imageUrls && p.imageUrls.length > 0) ? p.imageUrls[0] : '/img-1.png',
    images: p.imageUrls || [],
    videos: p.videoUrls || [],
    description: p.description || '',
    rating: p.rating ? String(p.rating) : '5.0',
    sizes: sizes,
    stock: totalStock,
    categoryId: p.categoryId,
    categoryName: p.category?.name || '',
    notes: (p.topNotes || p.heartNotes || p.baseNotes) ? {
      top: p.topNotes || '',
      heart: p.heartNotes || '',
      base: p.baseNotes || '',
    } : null,
    profile: (p.profileFloral || p.profileWoody || p.profileSpicy || p.profileFresh) ? {
      floral: p.profileFloral || 0,
      woody: p.profileWoody || 0,
      spicy: p.profileSpicy || 0,
      fresh: p.profileFresh || 0,
    } : null,
  };
}
