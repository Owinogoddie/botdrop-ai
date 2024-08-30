'use client'
import CTA from "./_components/cta";
import DetailedFeatures from "./_components/detailed-features";
import FAQ from "./_components/faqs";
import Features from "./_components/features";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Hero from "./_components/hero";
import HowItWorks from "./_components/how-it-works";
import Pricing from "./_components/pricing";
import Testimonials from "./_components/testimonials";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <DetailedFeatures />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}