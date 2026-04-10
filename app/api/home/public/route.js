import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Home from "@/models/Home";

export async function GET() {
  try {
    await connectDB();

    const home = await Home.findOne({ isPublished: true }).lean();

    if (!home) {
      return NextResponse.json({ success: false, data: null });
    }

    /* ---------------- SORT + FILTER ---------------- */

    // WHO WE ARE
    home.whoWeAre.features = home.whoWeAre.features
      ?.filter(f => f.isActive)
      ?.sort((a, b) => a.order - b.order);

    // WHY CHOOSE US
    home.whyChooseUs.points = home.whyChooseUs.points
      ?.filter(p => p.isActive)
      ?.sort((a, b) => a.order - b.order);

    // FUTURE SERVICES
    home.futureSection.services =
      home.futureSection.services?.sort((a, b) => a.order - b.order);

    // INDUSTRIES
    home.industrySection.industries =
      home.industrySection.industries
        ?.filter(i => i.isActive)
        ?.sort((a, b) => a.order - b.order);

    // TECHNOLOGIES
    home.techSection.technologies =
      home.techSection.technologies
        ?.filter(t => t.isActive)
        ?.sort((a, b) => a.order - b.order);

    // AGILE STEPS
    home.agileSection.steps =
      home.agileSection.steps?.sort((a, b) => a.order - b.order);

    // TESTIMONIALS
    home.testimonialSection.featuredTestimonials =
      home.testimonialSection.featuredTestimonials
        ?.filter(t => t.isActive)
        ?.sort((a, b) => a.order - b.order);

    // FAQ
    home.faqSection.faqs =
      home.faqSection.faqs
        ?.filter(f => f.isActive)
        ?.sort((a, b) => a.order - b.order);

    return NextResponse.json({
      success: true,
      data: home,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}