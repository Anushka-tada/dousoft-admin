import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({

  isPublished: { type: Boolean, default: true },

  // HERO SECTION
  hero: {
    title: String,
   
    description: String,
    breadcrumb: String,
  },

  // WHO WE ARE
  whoWeAre: {
    badge: String,
      highlightText: String,
    heading: String,
    description: [String],

    features: [
      {
        title: String,
        icon: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ],

    image: String
  },

  // STATS / COUNTER
  stats: [
    {
      label: String,
      value: String,   // "98"
      suffix: String,  // "%"
      order: { type: Number, default: 0 }
    }
  ],

  // MISSION / VISION / VALUES (TABS)
  missionVisionSection: {

    intro: {
      heading: String,
        highlightText: String,
      highlightText: String,
      description: String,
      image: String
    },

    tabs: [
      {
        type: {
          type: String, // "mission" | "vision" | "about"
        },

        items: [
          {
            heading: String,
            image: String,
            paragraphs: [String],

            order: { type: Number, default: 0 },
            isActive: { type: Boolean, default: true }
          }
        ]
      }
    ]
  },

  // TIMELINE (Journey So Far)
  timelineSection: {
    badge: String,
    heading: String,

    timelines: [
      {
        year: String,
        title: String,
        description: String,

        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
      }
    ]
  },

  // SEO
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }

}, { timestamps: true });

export default mongoose.models.About || mongoose.model("About", AboutSchema);