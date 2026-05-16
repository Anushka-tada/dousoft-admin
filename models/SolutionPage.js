import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema({

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
  type: String,
  required: true, // display name
},

  isPublished: { type: Boolean, default: true },

  order: { type: Number, default: 0 },

  // HERO SECTION
  hero: {
    title: String,
    description: String,
    breadcrumb: String,
  },

  // INTRO SECTION (Top content)
  introSection: {
    heading: String,
      highlightText: String,
    paragraphs: [String],
    image: String,
  },

  // APPROACH SECTION (Your 2 cards)
  approachSection: {
    heading: String,
      highlightText: String,

    cards: [
      {
        title: String,
        description: String,
        icon: String,
        pointHeading: String,

        points: [
          {
            text: String,
            icon: String
          }
        ],

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ]
  },

  // FRAMEWORK SECTION
  frameworkSection: {
    heading: String,
    description: String,

    steps: [
      {
        stepNumber: Number, // 1,2,3,4
        title: String,

        points: [String],
        icon: String,

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ],

    bottomText: String
  },

  // SERVICES SECTION
  servicesSection: {
    heading: String,

    services: [
      {
        title: String,
        description: String,
        image: String,

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ]
  },

  // BENEFITS SECTION
  benefitsSection: {
    heading: String,
      highlightText: String,

    benefits: [
      {
        title: String,
        icon: String,

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ]
  },

  // WHY CHOOSE US
  whyChooseSection: {
    heading: String, 
      highlightText: String,

    points: [
      {
        text: String,
        icon: String,

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ],

    image: String,
    bottomText: String
  },

  // CTA SECTION
  ctaSection: {
    heading: String,
    description: String,

    buttonText: String,
    buttonLink: String
  },

  // SEO
  seo: {
    title: String,
    description: String,
    keywords: [String],
    canonical: String
  }

}, { timestamps: true });

export default mongoose.models.Solution || mongoose.model("Solution", SolutionSchema);