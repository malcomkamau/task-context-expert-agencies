export const servicesDetails = [
  {
    id: 1,
    name: "Social Media Marketing",
    category: "Marketing",
    price: "$500 / month",
    description:
      "Manage your social media platforms to grow engagement and followers. Includes content planning, posting, and analytics tracking to maximize reach.",
    image: "/images/smm.jpeg",
    features: [
      "Platform strategy and planning",
      "Daily/weekly content scheduling",
      "Engagement and community management",
      "Analytics reporting and insights",
    ],
    testimonials: [
      {
        name: "Alice Johnson",
        role: "Startup Founder",
        testimonial:
          "Their social media strategy doubled our engagement in just two months!",
        image: "/images/testimonial1.jpeg",
      },
    ],
    relatedIds: [2, 3],
  },
  {
    id: 2,
    name: "SEO Optimization",
    category: "SEO",
    price: "$300 / month",
    description:
      "Improve your website's ranking on search engines and drive organic traffic. Includes keyword research, on-page optimization, and backlink building.",
    image: "/images/seo.jpeg",
    features: [
      "Keyword research and analysis",
      "On-page SEO optimization",
      "Link-building strategy",
      "SEO performance reporting",
    ],
    testimonials: [
      {
        name: "Bob Smith",
        role: "E-commerce Manager",
        testimonial:
          "After optimizing our site, organic traffic increased by 150%.",
        image: "/images/testimonial2.jpeg",
      },
    ],
    relatedIds: [1, 4],
  },
  {
    id: 3,
    name: "Content Creation",
    category: "Creative",
    price: "$400 / month",
    description:
      "Produce high-quality content tailored for your brand and audience. Includes blogs, social media posts, videos, and graphics.",
    image: "/images/cc.jpeg",
    features: [
      "Blog writing and editing",
      "Video and graphics creation",
      "Social media content production",
      "Brand storytelling",
    ],
    testimonials: [],
    relatedIds: [1, 4],
  },
  {
    id: 4,
    name: "Email Marketing",
    category: "Marketing",
    price: "$250 / month",
    description:
      "Design and send newsletters and campaigns that convert. Includes automation, segmentation, and performance analytics.",
    image: "/images/em.jpeg",
    features: [
      "Newsletter design",
      "Automated campaigns",
      "Audience segmentation",
      "Analytics and reporting",
    ],
    testimonials: [
      {
        name: "Clara Lee",
        role: "Marketing Director",
        testimonial:
          "Our email campaigns now convert leads into customers more efficiently.",
        image: "/images/testimonial3.jpeg",
      },
    ],
    relatedIds: [2, 3],
  },
];
