// import mongoose from "mongoose";

// const PricingSchema = new mongoose.Schema({

//   isPublished: { type: Boolean, default: true },

//   // HERO SECTION
//   hero: {
//     title:       { type: String },
//     description: { type: String },
//     breadcrumb:  { type: String },
//     image:       { type: String },
//   },

//   // LEFT CONTENT (grid section above tabs)
//   leftContent: {
//     heading: { type: String },
//     btnText: { type: String },
//     btnLink:  { type: String },
//     image:   { type: String },
//   },

//   // INTRO TEXT (above pricing tabs)
//   intro: {
//     heading:     { type: String },
//     description: { type: String },
//   },

//   // PRICING TABS (Google Ads, SEO, Meta Ads, SMO)
//   tabs: [
//     {
//       tabKey:   { type: String },  // "google-ads", "seo", "meta-ads", "smo"
//       label:    { type: String },  // "Google Ads", "SEO"
//       icon:     { type: String },  // "assets/images/packages/icon_1.webp"
//       order:    { type: Number, default: 0 },
//       isActive: { type: Boolean, default: true },

//     plans: [
//   {
//     name: String, // Basic, Standard, etc
//     price: String,
//     isPopular: Boolean,
//     order: Number
//   }
// ],

// features: [
//   {
//     title: String,
//     values: [String], // values aligned with plans index
//     order: Number
//   }
// ]
//     }
//   ],

//   // BILLING SECTION
//   billing: {
//   heading: { type: String },

//   toggle: {
//     yearlyLabel: { type: String },   // "Billed Yearly"
//     monthlyLabel: { type: String },  // "Billed Monthly"
//     savingsBadge: { type: String },  // "Save 20%"
//   },

//   cards: [
//     {
//       title: { type: String },     // Starter
//       subtitle: { type: String },  // Ideal for startups
//       iconClass: { type: String },

//       isFeatured: { type: Boolean, default: false },

//       featureHeading: { type: String }, // "Includes" ✅ IMPORTANT

//       btnText: { type: String },
//       btnLink: { type: String },

//       order: { type: Number, default: 0 },
//       isActive: { type: Boolean, default: true },

//       features: [
//         {
//           text: { type: String },
//           included: { type: Boolean, default: true },
//           order: { type: Number, default: 0 },
//         }
//       ],
//     }
//   ],
// },
//   // SEO
//   seo: {
//     title:       { type: String },
//     description: { type: String },
//     keywords:    [String],
//   },

// }, { timestamps: true });

// export default mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);



import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema({

  isPublished: { type: Boolean, default: true },

  // HERO SECTION
  hero: {
    title:       { type: String },
    description: { type: String },
    breadcrumb:  { type: String },
    image:       { type: String },
  },

  // LEFT CONTENT (grid section above tabs)
  leftContent: {
    heading: { type: String },
    btnText: { type: String },
    btnLink:  { type: String },
    image:   { type: String },
  },

  // INTRO TEXT
  intro: {
    heading:     { type: String },
    description: { type: String },
  },

  // PRICING TABS 
  tabs: [
    {
      tabKey:   { type: String },
      label:    { type: String },
      icon:     { type: String },
      order:    { type: Number, default: 0 },
      isActive: { type: Boolean, default: true },

      // ── COLUMNS (fully dynamic) ─────────────────────────
      // Admin se add/remove/rename kar sako
      columns: [
        {
          key:       { type: String },  // "basic", "standard", "premium" — unique per tab
          label:     { type: String },  // "Basic", "Standard", "Premium" — display name
          isPopular: { type: Boolean, default: false },  // "Most Popular" badge
          order:     { type: Number, default: 0 },
        }
      ],

      // ── ROWS (each row = one feature) ──────────────────
      rows: [
        {
          feature: { type: String },  // "Pricing", "Scope of Work"
          order:   { type: Number, default: 0 },

          // values = { "basic": "₹3,000", "standard": "₹5,000", "premium": "₹8,000" }
          // key matches columns[].key
          values: {
            type: Map,
            of: String,
          },
        }
      ],

      cta: {
        btnText: { type: String, default: "Select Plan" },
        btnLink: { type: String, default: "/contact-us" },
      },
    }
  ],

  // BILLING SECTION
  billing: {
  heading: { type: String },

  toggle: {
    yearlyLabel: { type: String },   // "Billed Yearly"
    monthlyLabel: { type: String },  // "Billed Monthly"
    savingsBadge: { type: String },  // "Save 20%"
  },

  cards: [
    {
      title: { type: String },     // Starter
      subtitle: { type: String },  // Ideal for startups
      iconClass: { type: String },

      isFeatured: { type: Boolean, default: false },

      featureHeading: { type: String }, // "Includes" ✅ IMPORTANT

      btnText: { type: String },
      btnLink: { type: String },

      order: { type: Number, default: 0 },
      isActive: { type: Boolean, default: true },

      features: [
        {
          text: { type: String },
          included: { type: Boolean, default: true },
          order: { type: Number, default: 0 },
        }
      ],
    }
  ],
},
  // SEO
  seo: {
    title:       { type: String },
    description: { type: String },
    keywords:    [String],
  },

}, { timestamps: true });

export default mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);