import mongoose from "mongoose";

const CareerPageSchema = new mongoose.Schema({

  isPublished: { type: Boolean, default: true },

  // HERO SECTION
  hero: {
    heading: String,
    description: String,
    breadcrumb: String,
  },

  // INTRO / JOIN TEAM SECTION
  intro: {
    heading: String,
    paragraphs: [String],
    buttonText: String,
    buttonLink: String,
    image: String
  },

  // VALUES SECTION
  valuesSection: {
    heading: String,
    subheading: String,

    values: [
      {
        title: String,
        icon: String,
        points: [String],

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ]
  },

  // BENEFITS SECTION
  benefitsSection: {
    heading: String,

    benefits: [
      {
        title: String,
        description: String,
        icon: String,

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ]
  },

  // HIRING PROCESS (FAQ STYLE)
  hiringProcess: {
    heading: String,
    subheading: String,

    steps: [
      {
        question: String,
        answer: String,

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ]
  },

  // JOIN CTA SECTION
  joinCTA: {
    heading: String,
    description: String,

    email: String,
    address: String,

    bottomText: String
  },

  // SEO
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }

}, { timestamps: true });

export default mongoose.models.Career || mongoose.model("CareerPage", CareerSchemaPage);