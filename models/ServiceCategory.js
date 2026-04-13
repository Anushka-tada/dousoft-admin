// import mongoose from "mongoose";

// const ServiceCategorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
    
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },

//     order: {
//       type: Number,
//       default: 0,
//     },

//     description: {
//      type: String,
//       required: true,
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.models.ServiceCategory ||
//   mongoose.model("ServiceCategory", ServiceCategorySchema);

import mongoose from "mongoose";

const ServiceCategorySchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    order: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      required: true,
    },

    // HERO SECTION
    hero: {
      title: String,
      description: String,
      breadcrumb: String,
    },

    // BEST SERVICE SECTION
    bestServiceSection: {
      title: String,
      paragraphs: [String],
      image: String,
      imagepara: String,
    },

    // CUSTOM SERVICE SECTION

    customServiceSection: {
      title: String,
      paragraphs: [String],
      image: String,
    },

    // CAPABILITIES SECTION
    capabilities: {
      heading: String,
      subHeading: String,
      cards: [
        {
          name: String,
          para: String,
          img: String,
        },
      ],
    },

    // WHY TOP COMPANY
    whyTopCompany: {
      heading: String,
      description: String,
      cards: [
        {
          title: String,
          desc: String,
          icon: String,
        },
      ],
    },

    // LEFT RIGHT SECTIONS
    leftRightSections: [
      {
        title: String,
        paragraphs: [String],
        image: String,

        imagePosition: {
          type: String,
          enum: ["left", "right"],
        },

        bulletHead: String,
        bulletPoints: [String],
        extraText: String,
      },
    ],

    // 🔥 INDUSTRIES
    industries: {
      heading: String,
      description: String,
      list: [
        {
          name: String,
          icon: String,
        },
      ],
    },

    // 🔥 PROCESS SECTION
    process: {
      heading: String,
      description: String,
      steps: [
        {
          name: String,
          icon: String,
          img: String,
        },
      ],
    },

    // 🔥 SEO
    seo: {
      title: String,
      description: String,
      keywords: [String],
      canonical: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ServiceCategory ||
  mongoose.model("ServiceCategory", ServiceCategorySchema);
