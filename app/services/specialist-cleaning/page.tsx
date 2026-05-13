import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Specialist Cleaning Melbourne | Oven, Carpet, Windows", description: "Specialist cleaning in Melbourne — oven, carpet steam, window cleaning, fridge and more. Book as a stand-alone service or add to any clean." };
export default function Page() {
  return <ServicePage
    title="Specialist Cleaning Melbourne"
    subtitle="The jobs that need specialist attention. Oven cleans, carpet steam, window cleaning, and more — available as stand-alone bookings or added to any service."
    description="Some cleaning jobs need more than a general clean — they need the right equipment, the right products, and someone who knows exactly what they're doing. Our specialist services are available on their own or as add-ons to any booking. No minimum booking required for most services."
    heroImage="/images/08_carpet_cleaning.png"
    price="From $45"
    priceNote="Each service priced individually. Bundle multiple services for a discount."
    includes={[
      "Oven deep clean — interior racks, glass, elements: from $89",
      "Carpet steam clean — professional equipment, per room: from $45",
      "Window cleaning (interior) — full house packages: from $79",
      "Window cleaning (exterior): from $119",
      "Fridge clean (interior): from $45",
      "Range hood deep clean: from $55",
      "Blind cleaning: from $15/blind",
      "Mattress steam clean: from $60/mattress",
      "Balcony or outdoor area: from $55",
    ]}
    addOns={[
      { label: "Add to any existing booking", price: "Save 10%" },
      { label: "Bundle 3+ specialist services", price: "Save 15%" },
    ]}
    faqs={[
      { q: "Can I book just an oven clean without a full house clean?", a: "Absolutely — all specialist services can be booked as stand-alone appointments. Minimum booking fee of $89 applies." },
      { q: "What does carpet steam cleaning actually do?", a: "Professional steam cleaning uses hot water extraction to remove deep-set dirt, allergens, pet dander and stains that vacuuming can't reach. It's the most effective way to refresh carpets and is the #1 item flagged in end-of-lease inspections." },
      { q: "How long does an oven clean take?", a: "Usually 1–1.5 hours for a standard oven. Double ovens and heavily soiled ovens take longer. We disassemble all removable parts and clean them individually." },
      { q: "Are your carpet cleaning products safe for kids and pets?", a: "Yes — we use eco-friendly, non-toxic products throughout. Safe to walk on within 2–4 hours of cleaning." },
    ]}
    upsell={{ title: "End-of-Lease Cleaning", href: "/services/end-of-lease-cleaning", price: "From $320 — includes REIV checklist + bond-back guarantee" }}
  />;
}
