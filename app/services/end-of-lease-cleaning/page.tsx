import ServicePage from "@/components/ServicePage";
export const metadata = { title: "End-of-Lease Cleaning Melbourne | Bond Clean Guarantee", description: "Bond-back guaranteed end-of-lease cleaning in Melbourne. REIV checklist, free 7-day re-clean, fixed pricing. Get your full bond returned." };
export default function Page() {
  return <ServicePage
    title="End-of-Lease Cleaning Melbourne"
    subtitle="Get your full bond back — guaranteed. Our REIV-standard bond cleans are specifically designed to meet real estate agent requirements across Melbourne."
    description="Moving out is stressful enough without worrying about your bond. Our end-of-lease clean follows the same checklist that Melbourne real estate agents use for their inspections — so nothing gets missed and nothing costs you part of your deposit. We offer a written 7-day re-clean guarantee: if your agent flags anything, we come back and fix it for free."
    heroImage="/images/06_end_of_lease.png"
    price="From $320"
    priceNote="Fixed price based on bedrooms, bathrooms & furnished status. No hidden charges."
    includes={[
      "Full REIV-standard inspection checklist completed",
      "Kitchen: oven exterior, stovetop, rangehood, benches, sink, cupboards inside & out",
      "Bathrooms & toilets: full descale, grout scrub, shower screens, mirrors",
      "All rooms: walls wiped, skirting boards, light switches, door handles, ceiling fans",
      "Windows: inside glass and tracks throughout",
      "All floors vacuumed and mopped",
      "Cupboards and wardrobes cleaned inside and out",
      "Laundry: sink, machine exterior, shelves",
      "Written 7-day bond-back re-clean guarantee",
    ]}
    addOns={[
      { label: "Oven deep clean (inside)", price: "+$89" },
      { label: "Carpet steam clean (per room)", price: "+$45" },
      { label: "Exterior windows", price: "+$79" },
      { label: "Furnished property", price: "+$100" },
      { label: "Heavily soiled condition", price: "+20%" },
    ]}
    faqs={[
      { q: "What's your bond-back guarantee exactly?", a: "If your real estate agent or property manager identifies any cleaning issues within 7 days of your clean, we return and re-clean those specific areas at no charge. We just need the agent's written feedback." },
      { q: "Do I need to be at the property?", a: "No — you just need to arrange access. Many clients hand over keys on moving day and we clean while they finalise their move." },
      { q: "Do you follow the REIV checklist?", a: "Yes. Our cleaning checklist is aligned with the REIV (Real Estate Institute of Victoria) standard — the same one agents use to assess properties for bond return." },
      { q: "What if my property is in poor condition?", a: "We can handle it. If the property is heavily soiled a small surcharge applies, which we'll tell you upfront before booking." },
      { q: "How soon can you come?", a: "We often have availability within 24–48 hours. Same-day bookings are possible — call us to check." },
    ]}
    upsell={{ title: "Carpet Steam Cleaning", href: "/services/specialist-cleaning", price: "From $45/room — most common reason for bond deductions" }}
  />;
}
