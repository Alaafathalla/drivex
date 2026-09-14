export const JOURNAL_POSTS = [
  {
    slug: 'uae-ev-ownership-guide',
    categoryKey: 'journal_post1_category',
    titleKey: 'journal_post1_title',
    excerptKey: 'journal_post1_excerpt',
    readTime: '6 min read',
    date: '2026-08-09',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1600&q=86',
    sections: [
      ['journal_post1_section1_title', 'journal_post1_section1_body'],
      ['journal_post1_section2_title', 'journal_post1_section2_body'],
      ['journal_post1_section3_title', 'journal_post1_section3_body'],
      ['journal_post1_section4_title', 'journal_post1_section4_body'],
    ],
  },
  {
    slug: 'compare-used-luxury-suvs',
    categoryKey: 'journal_post2_category',
    titleKey: 'journal_post2_title',
    excerptKey: 'journal_post2_excerpt',
    readTime: '8 min read',
    date: '2026-08-05',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=86',
    sections: [
      ['journal_post2_section1_title', 'journal_post2_section1_body'],
      ['journal_post2_section2_title', 'journal_post2_section2_body'],
      ['journal_post2_section3_title', 'journal_post2_section3_body'],
      ['journal_post2_section4_title', 'journal_post2_section4_body'],
    ],
  },
  {
    slug: 'summer-preventive-maintenance-checks',
    categoryKey: 'journal_post3_category',
    titleKey: 'journal_post3_title',
    excerptKey: 'journal_post3_excerpt',
    readTime: '5 min read',
    date: '2026-08-01',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=86',
    sections: [
      ['journal_post3_section1_title', 'journal_post3_section1_body'],
      ['journal_post3_section2_title', 'journal_post3_section2_body'],
      ['journal_post3_section3_title', 'journal_post3_section3_body'],
      ['journal_post3_section4_title', 'journal_post3_section4_body'],
      ['journal_post3_section5_title', 'journal_post3_section5_body'],
    ],
  },
]

export function getJournalPost(slug) {
  return JOURNAL_POSTS.find((post) => post.slug === slug) || null
}
