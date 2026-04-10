import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({

     isPublished: { type: Boolean, default: true },
  
  // HERO SECTION
  hero: {
    heading: String,
    subheading: String,
    description: String,
    primaryBtnText: String,
    primaryBtnLink: String,
    secondaryBtnText: String,
    secondaryBtnLink: String,
    trustText: String,
    image: String
  },

  // MARQUEE SERVICES
  marqueeServices: [String],

  // WHO WE ARE
  whoWeAre: {
    badge: String,
    heading: String,
    description: String,
    features: [
      {
        title: String,
        description: String,
        icon: String,
         order:       { type: Number, default: 0 },   // ← ADD
        isActive:    { type: Boolean, default: true } // ← ADD
      }
    ],
    buttonText: String,
    buttonLink: String
  },

  // WHY CHOOSE US (assumed)
  whyChooseUs: {
    heading: String,
    points: [
      {
        title: String,
        description: String,
        icon: String,
        img: String,
        type: String,
          order:       { type: Number, default: 0 },   // ← ADD
        isActive:    { type: Boolean, default: true } // ← ADD
      }
    ]
  },

futureSection: {
  badge: String,         
  heading: String,        
  highlightText: String,   

  description: String,

  services: [
    {
      name: String,
      icon: String,
      description: String,
      subtitle: String,
      points: [String],
      link: String,
       order:       { type: Number, default: 0 }, 
    }
  ],

  // LAST CTA CARD 
  ctaCard: {
    image: String,
    title: String,          
    description: String,
    buttonText: String,
    buttonLink: String
  }
},
  // STATS / COUNTER
  stats: [
    {
      label: String,
     value: { type: String, required: true },
      suffix: String,
       order:  { type: Number, default: 0 }, 
    }
  ],

  // INDUSTRIES
  industrySection: {
    badge: String,
    heading: String,
    highlightText: String,
    description: String,

  industries: [
    {
      name: String,
      description: String,
      image: String,
      link: String,
      btn: String,
       order:       { type: Number, default: 0 }, // ← ADD
        isActive:    { type: Boolean, default: true }, // ← ADD
    }
  ],
},

  // TECHNOLOGIES (TechOrbit)
techSection: {
  badge: String,              // "TECHNOLOGY"

  heading: String,            // "Accelerating Growth with"
  highlightText: String,      // "Cutting-Edge Tech"

  description: String,

  // FILTER TABS
  categories: [String],       // ["All", "Frontend", "Backend", "Mobile"]

  // TECHNOLOGIES
  technologies: [
    {
      name: String,
      logo: String,           // image path

      category: String,       // MUST match one of categories

      // ORBIT SETTINGS (important for animation)
      orbit: {
        rx: Number,           // ellipse width
        ry: Number,           // ellipse height
        duration: Number,     // animation speed
        delay: Number,     // spread delay
       
      },
        order:    { type: Number, default: 0 },    // ← ADD
        isActive: { type: Boolean, default: true } // ← ADD
    }
  ],

  // CENTER LOGO
  centerLogo: String
},

agileSection: {
  badge: String,           

  heading: String,         
  highlightText: String,    

  description: String,

  steps: [
    {
      title: String,
      description: String,

      color: String,         

      progress: Number  ,    
       order:       { type: Number, default: 0 },
    }
  ]
},

  // TESTIMONIALS
 testimonialSection: {
  badge: String,           
  heading: String,        

  
  featuredTestimonials: [
    {
      name: String,
      designation: String,
      company: String,

      image: String,         

      quote: String,
      
      title: String,         
      description: String,

      rating: Number,         // 1–5

      tagLine: String,        // bottom line text

      isVerified: Boolean,
       isActive:   { type: Boolean, default: true }, // ← ADD
        order:      { type: Number, default: 0 },     // ← ADD
    }
  ]
},

  // FAQ
 faqSection: {
  badge: String,            // "FAQ'S"
  heading: String,          // "Have a question? Look here"

  faqs: [
    {
      question: String,
      answer: String,

      // optional (recommended)
      isActive: Boolean,
      order: Number
    }
  ]
},

  // CTA SECTION
  cta: {
    icon: String,           // e.g. "bi bi-rocket"
    heading: String,
    description: String,
    primaryBtnText: String,
    primaryBtnLink: String,
    secondaryBtnText: String,
    secondaryBtnLink: String,
    features: [{
        title: String,
        icon: String,
    }],
  },

  // SEO (IMPORTANT)
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }

}, { timestamps: true });

export default mongoose.models.Home || mongoose.model("Home", HomeSchema);