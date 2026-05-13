import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Commercial Cleaning Melbourne | Office & Retail", description: "Professional commercial and office cleaning across Melbourne. No lock-in contracts, reliable teams, flexible scheduling. Get a quote today." };
export default function Page() {
  return <ServicePage
    title="Commercial Cleaning Melbourne"
    subtitle="A clean workplace is a productive workplace. Reliable, professional commercial cleaning for offices, retail spaces, and businesses across Melbourne — on your schedule."
    description="We work around your business hours — early mornings, evenings, weekends. Our commercial cleaning teams are discreet, professional, and equipped to handle everything from small boutique offices to multi-floor corporate spaces. No lock-in contracts — just consistent quality that keeps your team and your clients happy."
    heroImage="/images/07_commercial_office.png"
    price="From $180/visit"
    priceNote="Priced by space size and frequency. Volume discounts for regular contracts."
    includes={[
      "All desks, surfaces and workstations wiped down",
      "Kitchen and breakroom cleaned — benches, sink, appliances",
      "Bathrooms and toilets thoroughly cleaned and restocked",
      "Floors vacuumed and mopped throughout",
      "Bins emptied and relined",
      "Reception and common areas presented to standard",
      "Glass partitions and entry doors cleaned",
      "Lift interiors and lobbies (where applicable)",
      "Secure key/fob access available",
    ]}
    addOns={[
      { label: "Window cleaning (interior)", price: "From $79" },
      { label: "Carpet steam clean", price: "From $45/room" },
      { label: "Kitchen deep clean", price: "+$89" },
      { label: "After-hours or weekend", price: "+15%" },
    ]}
    faqs={[
      { q: "Do you work outside business hours?", a: "Yes — most of our commercial clients prefer early morning (5–7am) or evening cleans so we don't disrupt the workday. Weekend cleaning is also available." },
      { q: "Is there a minimum contract length?", a: "No lock-in contracts. We earn your business month to month. That said, most clients stick with us long-term once they see the consistency." },
      { q: "How do you handle key and security access?", a: "We have a secure key management process. All staff are police-checked and we carry full public liability insurance ($10M+)." },
      { q: "Can you clean medical or food-handling spaces?", a: "Yes — we have experience with medical practices, childcare centres, and food-handling environments. Higher-hygiene protocols apply and pricing reflects this." },
    ]}
    upsell={{ title: "Specialist Cleaning", href: "/services/specialist-cleaning", price: "Add carpet steam or window cleaning to your contract" }}
  />;
}
