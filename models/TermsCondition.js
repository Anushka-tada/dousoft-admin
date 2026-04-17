import mongoose from "mongoose";

const TermsSchema = new mongoose.Schema({

  isPublished: { type: Boolean, default: true },

  // HERO SECTION (Herosection2)
  hero: {
    title: String,           // "Terms and Conditions"
    description: String,     // subtitle
    breadcrumb: String       // "Home > Term Conditions"
  },

  // INTRO TEXT (top paragraph)
  introduction: String,

  // ALL SECTIONS (dynamic)
  sections: [
    {
      id: String,            // about, intellectual, services, etc.

      title: String,         // h2
      subTitle: String,      // h3 (optional)

      content: [String],     // paragraphs

      // OPTIONAL LISTS (for "You may / may not")
      lists: [
        {
          title: String,     // "You may:" / "You may not:"
          items: [String]
        }
      ]
    }
  ],

  // CONTACT SECTION (last part)
  contactSection: {
    title: String,
    description: String,
    buttonText: String,
    buttonLink: String
  },

  // SEO
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }

}, { timestamps: true });

export default mongoose.models.Terms || mongoose.model("Terms", TermsSchema);