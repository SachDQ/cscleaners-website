import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Residential Cleaning Melbourne", description: "Regular home cleaning in Melbourne. Same cleaner every visit, eco products, satisfaction guaranteed. Get an instant fixed-price quote." };
export default function Page() {
  return <ServicePage
    title="Residential Cleaning Melbourne"
    subtitle="Your home, kept spotless — week after week. We match you with a dedicated cleaner who knows your space, your preferences, and your standards."
    description="Life's busy. That's why we make it easy to keep your home in perfect condition without lifting a finger. Our residential cleaning service covers everything from kitchen benches to skirting boards, bathrooms to bedrooms. All products and equipment are supplied — you just need to let us in."
    heroImage="/images/05_residential_clean.png"
    price="From $210"
    priceNote="Fixed price based on bedrooms & bathrooms. No surprises."
    includes={[
      "All living areas vacuumed and mopped",
      "Kitchen benches, stovetop, splashback & sink cleaned",
      "Bathrooms & toilets thoroughly scrubbed",
      "Dusting of all surfaces, shelves & ceiling fans",
      "Skirting boards, light switches & door handles wiped",
      "Internal windows cleaned",
      "Rubbish bins emptied",
      "Eco-friendly, non-toxic products used throughout",
    ]}
    addOns={[
      { label: "Oven deep clean", price: "+$89" },
      { label: "Fridge clean (inside)", price: "+$45" },
      { label: "Carpet steam (per room)", price: "+$45" },
      { label: "Exterior windows", price: "+$79" },
    ]}
    faqs={[
      { q: "Will I get the same cleaner every time?", a: "Yes. We match you with a dedicated cleaner and keep them assigned to your home. They'll learn your preferences and you'll get consistent results every visit." },
      { q: "Do I need to be home during the clean?", a: "Not at all. Most of our regular clients give us a key or access code. We're fully police-checked and insured, so you can go about your day." },
      { q: "What if I'm not happy with the clean?", a: "We'll come back within 48 hours and re-clean anything that didn't meet the standard — at no extra cost. No arguments, no hassle." },
      { q: "How far in advance do I need to book?", a: "We recommend booking 3–5 days in advance for regular cleans, but we often have last-minute availability. Give us a call or book online to check." },
    ]}
    upsell={{ title: "End-of-Lease Cleaning", href: "/services/end-of-lease-cleaning", price: "From $320" }}
  />;
}
