import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({


  isPublished: { type: Boolean, default: true },

  // HERO
  hero: {
    title: String,
    description: String,
    breadcrumb: String
  },

  // BASIC INFO (top card)
  projectInfo: {
    title: String,
    subtitle: String,
    website: String,
    location: String,
    industry: String,
    businessModel: String,
    tagline: String
  },

  // EXECUTIVE SUMMARY
  executiveSummary: {
    heading: String,
    paragraphs: [String],
    highlightText: String,
    image: String
  },

  // DIGITAL FOOTPRINT
  digitalFootprint: {
    title: String,
    points: [String],
    image: String,
    buttonText: String,
    buttonLink: String
  },

  // METRICS
  metricsSection: {
    heading: String,
    image: String,
  metrics: [
    {
      label: String,
      value: String,
      order: { type: Number, default: 0 }
    }
  ],
    },


  // SALES & REVENUE
  salesMetrics: {
    image: String,
    heading: String,

    kpis: [
      {
        label: String,
        value: String
      }
    ]
  },

  // CUSTOMER INSIGHTS
  customerInsights: {
    heading: String,
    image: String,
    points: [String],
  },

  // GROWTH
  growth: {
    heading: String,
    description: String,
    items: [
      {
        value: String,
        label: String
      }
    ]
  },

  // MARKETING CHANNELS
  marketingChannelsSection: {
    heading: String,
  marketingChannels: [String],
  },

  // PRODUCT PORTFOLIO
  productPortfolio: {
    heading: String,
    points: [String],
    image: String
  },

  // TECHNOLOGY STACK
  technology: [
    {
      label: String,
      value: String
    }
  ],

  // SEO
  seo: {
    title: String,
    description: String,
    keywords: [String],
    canonical: String
  }

}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);