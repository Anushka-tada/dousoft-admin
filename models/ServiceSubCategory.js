// import mongoose from "mongoose";

// const ServiceSubCategorySchema = new mongoose.Schema(
//   {
    
//     categoryId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "ServiceCategory",
//       required: true,
//       index: true,
//     },

//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     type: {
//       type: String,
//       enum: ["general", "city", "technology"],
//       required: true,
//       index: true,
//     },


//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//       index: true,
//     },

//     order: {
//       type: Number,
//       default: 1,
//     },
//      content: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );


// export default mongoose.models.ServiceSubCategory ||
//   mongoose.model("ServiceSubCategory", ServiceSubCategorySchema);

import mongoose from "mongoose";

const ServiceSubCategorySchema = new mongoose.Schema(
{
  // RELATION
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceCategory",
    required: true,
    index: true,
  },

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
    lowercase: true,
  },

  type: {
    type: String,
    enum: ["general", "city", "technology"],
    required: true,
    index: true,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    index: true,
  },

  order: {
    type: Number,
    default: 1,
  },

  isPublished: {
    type: Boolean,
    default: true,
  },

  /* =========================
     🔹 HERO SECTION
  ========================= */
  hero: {
    title: String,
    description: String,
    breadcrumb: String,
  },

  /* =========================
     🔹 BEST SERVICE SECTION
  ========================= */
  bestServiceSection: {
    title: String,
    paragraphs: [String],
    image: String,
    imagepara: String,
  },

  /* =========================
     🔹 CUSTOM SERVICE
  ========================= */
  customServiceSection: {
    title: String,
    paragraphs: [String],
    image: String,
  },

  /* =========================
     🔹 CAPABILITIES
  ========================= */
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

  /* =========================
     🔹 LEFT RIGHT SECTIONS
  ========================= */
  leftRightSections: [
    {
      title: String,
      image: String,
      imagePosition: {
        type: String,
        enum: ["left", "right"],
      },
      paragraphs: [String],
      bulletHead: String,
      bulletPoints: [String],
      extraText: String,
    },
  ],

  /* =========================
     🔹 GET STARTED SECTION
  ========================= */
  getStartedSection: {
    title: String,
    description: [String],
  },

  /* =========================
     🔹 FAQ SECTION
  ========================= */
  faqSection: [
    {
      question: String,
      answer: String,
    },
  ],

  /* =========================
     🔹 SEO
  ========================= */
  seo: {
    title: String,
    description: String,
    keywords: [String],
    canonical: String,
  },

},
{ timestamps: true }
);

export default mongoose.models.ServiceSubCategory ||
  mongoose.model("ServiceSubCategory", ServiceSubCategorySchema);
