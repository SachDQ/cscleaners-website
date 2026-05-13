import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Builders Clean Melbourne | Post-Construction Cleaning", description: "Professional post-construction and builders cleaning in Melbourne. New builds, renovations, final handover cleans. Get a quote." };
export default function Page() {
  return <ServicePage
    title="Builders Clean Melbourne"
    subtitle="Post-construction cleaning that gets your project handover-ready. We handle the dust, the debris, and the detail so your build looks the way it should."
    description="Building sites leave behind a specific kind of mess — construction dust, plaster residue, adhesive stickers on windows, paint overspray, and debris in every crevice. Our builders clean teams are trained specifically for post-construction environments and know what it takes to prepare a property for handover or occupancy."
    heroImage="/images/05_residential_clean.png"
    price="Custom Quote"
    priceNote="Priced by property size and construction type. Most builds quoted within 2 hours."
    includes={[
      "Full construction dust removal from all surfaces",
      "Window glass cleaned — remove stickers, paint, dust",
      "Hard floor cleaning — tile grouting, polishing",
      "Bathroom and kitchen deep clean post-fit",
      "Removal of plaster, silicone and adhesive residues",
      "All cabinetry and built-ins wiped inside and out",
      "Light fittings cleaned and checked",
      "Final inspection sweep before handover",
      "Waste and debris removal (quoted separately if required)",
    ]}
    addOns={[
      { label: "Carpet steam clean", price: "From $45/room" },
      { label: "External pressure wash", price: "From $149" },
      { label: "Pool surrounds clean", price: "From $99" },
    ]}
    faqs={[
      { q: "What's the difference between a rough clean and final clean?", a: "A rough clean (during construction) removes major debris so trades can continue working. A final clean is a detailed finish clean done immediately before handover — the one that makes it look move-in ready." },
      { q: "How soon can you get to site?", a: "We try to accommodate build schedules with short notice. Contact us with your handover date and we'll work around it." },
      { q: "Do you work with builders and developers directly?", a: "Yes — we work with residential builders, developers, and renovation contractors. Volume pricing available for multiple properties." },
      { q: "Are you insured for construction sites?", a: "Yes — $10M+ public liability insurance, and our staff follow site safety protocols." },
    ]}
    upsell={{ title: "Commercial Cleaning", href: "/services/commercial-cleaning", price: "Ongoing office & retail cleaning from $180/visit" }}
  />;
}
