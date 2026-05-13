import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Deep Cleaning Melbourne", description: "Intensive one-off deep clean for Melbourne homes. Top-to-bottom, every surface. Perfect for move-in, spring clean or post-renovation." };
export default function Page() {
  return <ServicePage
    title="Deep Cleaning Melbourne"
    subtitle="When a regular clean isn't enough. Our deep clean is a full-scale reset — every corner, every surface, every forgotten spot tackled in one visit."
    description="Perfect for homes that haven't been professionally cleaned in a while, properties you're moving into, post-renovation dust removal, or homes that just need a serious refresh. We go well beyond the surface — inside cupboards, behind appliances, window tracks, grout lines, and all the spots a regular clean skips."
    heroImage="/images/05_residential_clean.png"
    price="From $280"
    priceNote="Larger homes quoted individually. Includes all products & equipment."
    includes={[
      "Everything in our regular clean, plus:",
      "Inside all cupboards and drawers wiped out",
      "Behind & under appliances cleaned",
      "Window tracks and sill grooves scrubbed",
      "Grout lines in bathrooms and kitchen cleaned",
      "Wall marks and scuffs removed",
      "Light fittings dusted and cleaned",
      "Deep clean of oven exterior (interior available as add-on)",
      "Detailed bathroom descaling — tiles, grout, shower screens",
    ]}
    addOns={[
      { label: "Oven deep clean (inside)", price: "+$89" },
      { label: "Carpet steam (per room)", price: "+$45" },
      { label: "Exterior windows", price: "+$79" },
      { label: "Garage/balcony", price: "+$55" },
    ]}
    faqs={[
      { q: "How long does a deep clean take?", a: "A 3-bedroom home typically takes 4–6 hours. We don't rush — the job is done when it's done properly." },
      { q: "Is a deep clean the same as an end-of-lease clean?", a: "Similar, but not the same. An end-of-lease clean follows a specific REIV checklist and comes with a bond-back guarantee. A deep clean is more flexible and suited to occupied homes." },
      { q: "Do I need to do anything before the cleaners arrive?", a: "Just a light declutter so we can access all surfaces. We handle everything else." },
      { q: "How often should I get a deep clean?", a: "Most clients get a deep clean once or twice a year alongside regular fortnightly maintenance cleans. It's a great way to reset your home seasonally." },
    ]}
    upsell={{ title: "Specialist Cleaning Add-Ons", href: "/services/specialist-cleaning", price: "From $45 per service" }}
  />;
}
