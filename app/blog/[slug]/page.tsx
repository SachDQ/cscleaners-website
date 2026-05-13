import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import type { Metadata } from "next";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
};

const posts: BlogPost[] = [
  {
    slug: "end-of-lease-cleaning-checklist-melbourne",
    title: "The Complete End-of-Lease Cleaning Checklist (Melbourne 2025)",
    excerpt: "Everything you need to know to get your full bond back — room by room, based on the REIV inspection standard.",
    category: "Bond Cleaning",
    date: "May 2025",
    readTime: "6 min",
    content: (
      <div className="prose-content">
        <p className="lead">Moving out of a rental in Melbourne? The difference between getting your full bond back and losing hundreds of dollars often comes down to one thing: a thorough, methodical clean that meets the exact standard your real estate agent expects.</p>

        <p>Victoria&apos;s real estate agents use the REIV (Real Estate Institute of Victoria) standard as a benchmark. Here&apos;s exactly what they check — room by room.</p>

        <h2>Kitchen</h2>
        <ul>
          <li>Oven interior, grill, and trays: degreased and scrubbed clean (this is the #1 reason bonds are withheld)</li>
          <li>Rangehood filters: washed and dried</li>
          <li>All cupboards and drawers: wiped inside and out, including handles</li>
          <li>Sink and taps: descaled, polished, no watermarks</li>
          <li>Benchtops: degreased and sanitised</li>
          <li>Splashback: cleaned of any grease or residue</li>
          <li>Dishwasher (if present): cleaned inside, filter removed and rinsed</li>
          <li>Fridge (if included): defrosted, interior wiped, seals cleaned</li>
          <li>Exhaust fan: dusted and wiped</li>
          <li>Light fittings: dusted and wiped</li>
        </ul>

        <h2>Bathrooms & Ensuites</h2>
        <ul>
          <li>Shower screen: descaled, no soap scum or watermarks — this requires the right acid-based product</li>
          <li>Shower tiles and grout: scrubbed, mould treated</li>
          <li>Bath (if present): scrubbed including taps and drain</li>
          <li>Toilet: bowl, seat, lid, exterior base, and behind the cistern</li>
          <li>Vanity: inside cupboards, mirror polished</li>
          <li>Exhaust fan: cleaned</li>
          <li>Floor: mopped and dried</li>
        </ul>

        <h2>Bedrooms</h2>
        <ul>
          <li>Built-in wardrobes: interior shelves, rails, and tracks vacuumed and wiped</li>
          <li>Skirting boards: wiped — agents run a finger along these</li>
          <li>Window tracks and sills: vacuumed and wiped, no dust</li>
          <li>Ceiling fans: blades wiped (commonly missed)</li>
          <li>Light switches and power points: wiped</li>
          <li>Carpet: professionally steam cleaned if present</li>
        </ul>

        <h2>Living Areas</h2>
        <ul>
          <li>All surfaces dusted including shelves, TV units, and picture rail ledges</li>
          <li>Blinds: wiped or vacuumed depending on type</li>
          <li>Curtains: washed or dry cleaned (check your lease)</li>
          <li>Windows: interior cleaned, tracks vacuumed</li>
          <li>Floors: vacuumed and mopped or carpet steam cleaned</li>
        </ul>

        <h2>Outdoor Areas (if applicable)</h2>
        <ul>
          <li>Balcony or patio swept and mopped</li>
          <li>Garage swept, oil stains treated</li>
          <li>Bins emptied and cleaned</li>
          <li>Garden in the same state as the start of tenancy (check your condition report)</li>
        </ul>

        <h2>The Rooms Agents Always Check Twice</h2>
        <p>In our experience, the areas that cause bond disputes most often are:</p>
        <ol>
          <li><strong>The oven</strong> — agents open it first. If it&apos;s not spotless inside, expect a call.</li>
          <li><strong>The shower screen</strong> — calcium and soap scum require professional-grade descaler, not regular spray.</li>
          <li><strong>Skirting boards</strong> — classic white glove test area.</li>
          <li><strong>Window tracks</strong> — collect dust and dead insects, always checked.</li>
          <li><strong>Carpet</strong> — most Melbourne leases require professional steam cleaning with a receipt.</li>
        </ol>

        <h2>DIY vs. Professional Bond Clean</h2>
        <p>A proper end-of-lease clean for a standard 2BR apartment takes 8–12 hours if done thoroughly. Most people underestimate this and miss key areas that agents specifically check.</p>
        <p>A professional bond clean from Central Sea Cleaning comes with a 72-hour guarantee: if your agent raises any issue with our work, we return to fix it at no charge. That guarantee doesn&apos;t exist when you do it yourself.</p>
      </div>
    ),
  },
  {
    slug: "how-to-choose-a-cleaning-service-melbourne",
    title: "How to Choose a Cleaning Service in Melbourne (Without Getting Burned)",
    excerpt: "The 7 questions you should ask before booking any cleaner. Protect yourself from no-shows, price hikes and hidden fees.",
    category: "Guides",
    date: "April 2025",
    readTime: "5 min",
    content: (
      <div className="prose-content">
        <p className="lead">Melbourne has hundreds of cleaning companies — from solo operators running Facebook ads to large franchises. Choosing the wrong one can mean no-shows, damage to your home, or a bill that&apos;s double the quote. Here&apos;s how to protect yourself.</p>

        <h2>Question 1: Are your cleaners police checked?</h2>
        <p>This is non-negotiable. You&apos;re giving someone access to your home. Any reputable cleaning company will have police checks for all staff and be able to show you documentation. If they can&apos;t confirm this immediately, move on.</p>

        <h2>Question 2: Are you insured?</h2>
        <p>Public liability insurance protects you if a cleaner accidentally damages something in your home. Ask for proof of coverage. Solo operators often don&apos;t carry it; established companies always should.</p>

        <h2>Question 3: Is the quote fixed or hourly?</h2>
        <p>Hourly quotes sound cheap but can blow out significantly. A &quot;3-hour clean&quot; can become 5 hours if the cleaner works slowly. Fixed-price quotes give you certainty — you know exactly what you&apos;re paying before anyone arrives.</p>

        <h2>Question 4: What&apos;s included in the clean?</h2>
        <p>Ask for a written inclusions list. Does the oven get cleaned? Inside the fridge? Skirting boards? Window tracks? Vague answers are a red flag. Reputable companies publish their inclusions clearly.</p>

        <h2>Question 5: Do you have genuine reviews?</h2>
        <p>Look for Google reviews (not just testimonials on their own website). Check the reviewer profiles — are they real people, or do they all look freshly created? Look for volume and recency. A company with 200 reviews over 3 years is very different from one with 20 reviews all posted in the same month.</p>

        <h2>Question 6: What happens if I&apos;m not satisfied?</h2>
        <p>A confident cleaning company will offer a guarantee: come back and fix any issues at no charge. If they don&apos;t offer this, they&apos;re not confident in their work. Get it in writing before booking.</p>

        <h2>Question 7: Who actually does the cleaning?</h2>
        <p>Some companies are brokers — they take your booking and outsource it to whoever is available. This means inconsistent quality and no accountability. Ask: &quot;Are your cleaners employed by you, or are they subcontractors?&quot; Employed cleaners are vetted, trained, and covered under your insurer.</p>

        <h2>Red Flags to Avoid</h2>
        <ul>
          <li>No website or very thin online presence</li>
          <li>No fixed address or ABN</li>
          <li>Cash only, no receipt</li>
          <li>Pressure to book immediately</li>
          <li>No written quote or inclusions list</li>
          <li>Can&apos;t answer the 7 questions above</li>
        </ul>

        <p>At Central Sea Cleaning, we&apos;re transparent about all of this: police-checked staff, full public liability insurance, fixed pricing, a published inclusions list, genuine Google reviews, and a satisfaction guarantee on every clean.</p>
      </div>
    ),
  },
  {
    slug: "eco-cleaning-products-safe-kids-pets",
    title: "Are Your Cleaning Products Safe for Kids and Pets?",
    excerpt: "What to look for on labels, which chemicals to avoid, and why we switched to eco-friendly products across our entire service.",
    category: "Eco Cleaning",
    date: "April 2025",
    readTime: "4 min",
    content: (
      <div className="prose-content">
        <p className="lead">Most cleaning products work. But &quot;works&quot; isn&apos;t the only thing that matters when you have children crawling on the floor or a dog licking the kitchen tiles. Here&apos;s what&apos;s actually in your cleaning products — and what to watch out for.</p>

        <h2>The Chemicals That Concern Us Most</h2>

        <h3>Bleach (Sodium Hypochlorite)</h3>
        <p>Effective disinfectant, but the fumes are harsh. In enclosed spaces like bathrooms, the vapour can irritate airways, particularly in children and people with asthma. Direct contact causes skin and eye irritation. When mixed accidentally with ammonia-based products, it produces toxic chloramine gas.</p>

        <h3>Ammonia</h3>
        <p>Common in glass cleaners. Toxic if inhaled in concentrated form, and can trigger asthma attacks. Highly harmful to cats, whose kidneys cannot process it effectively.</p>

        <h3>Phosphates</h3>
        <p>Found in some dishwasher detergents. Not acutely toxic but contribute to waterway pollution — not something you want to be sending down the drain every week.</p>

        <h3>Synthetic Fragrances</h3>
        <p>That &quot;fresh&quot; smell often comes from a cocktail of chemical compounds, some of which are known irritants. Products labelled &quot;fragrance&quot; can legally contain hundreds of undisclosed ingredients.</p>

        <h3>Triclosan</h3>
        <p>An antibacterial agent that contributes to antibiotic resistance and is toxic to aquatic life. Increasingly phased out, but still found in some older products.</p>

        <h2>What to Look For on Labels</h2>
        <p>Truly safe products will be labelled:</p>
        <ul>
          <li><strong>Biodegradable</strong> — breaks down without harming the environment</li>
          <li><strong>Plant-based surfactants</strong> — cleaning agents derived from plants, not petrochemicals</li>
          <li><strong>Fragrance-free or essential oil scented</strong></li>
          <li><strong>pH-neutral</strong> for general-purpose cleaners</li>
          <li><strong>Australian Certified Organic (ACO) or GECA certified</strong></li>
        </ul>

        <h2>Why We Switched to Eco Products</h2>
        <p>When we started Central Sea Cleaning, we used the same commercial-grade chemicals most cleaning companies use. We switched to eco-certified products for three reasons:</p>
        <ol>
          <li>Our cleaners work with these products every day. We didn&apos;t want them breathing harsh fumes for hours at a stretch.</li>
          <li>Most of our clients have young children or pets. We wanted to be confident that a child touching a surface we&apos;d just cleaned wasn&apos;t being harmed.</li>
          <li>The eco products we trialled worked just as well. There was no trade-off in cleaning quality.</li>
        </ol>

        <h2>What We Use</h2>
        <p>All Central Sea Cleaning services use plant-based, biodegradable, Australian-made cleaning products. They are free from phosphates, chlorine bleach, synthetic fragrances, and ammonia. We carry our own products on every job — you don&apos;t need to supply anything.</p>

        <p>If you have specific product requirements or sensitivities, let us know when booking and we&apos;ll accommodate them.</p>
      </div>
    ),
  },
  {
    slug: "how-often-should-i-clean-my-home",
    title: "How Often Should You Really Clean Your Home?",
    excerpt: "A practical room-by-room schedule — what needs weekly attention, what can wait, and what most people forget entirely.",
    category: "Home Tips",
    date: "March 2025",
    readTime: "4 min",
    content: (
      <div className="prose-content">
        <p className="lead">There&apos;s a big gap between the Instagram-perfect home and a genuinely clean, healthy one. Here&apos;s a realistic cleaning schedule based on what actually matters — not what looks good on a checklist.</p>

        <h2>Daily (5–10 minutes)</h2>
        <p>These are the things that compound fast if ignored:</p>
        <ul>
          <li>Dishes: don&apos;t let them sit overnight — bacteria multiply quickly in residue</li>
          <li>Kitchen bench: wipe after cooking</li>
          <li>Bathroom basin: quick wipe after morning routine</li>
          <li>Floor: sweep or Roomba in high-traffic areas if you have pets or kids</li>
        </ul>

        <h2>Weekly</h2>
        <ul>
          <li><strong>Kitchen:</strong> full clean of benchtops, stovetop, sink; mop floor; empty and wipe inside bin</li>
          <li><strong>Bathrooms:</strong> toilet inside and out, shower, basin, floor mopped</li>
          <li><strong>Floors:</strong> vacuum throughout (including under couch cushions), mop hard floors</li>
          <li><strong>Bedding:</strong> change sheets weekly — dust mites thrive in bedding</li>
          <li><strong>Mirrors and glass:</strong> wipe any fingerprints</li>
        </ul>

        <h2>Fortnightly</h2>
        <ul>
          <li>Microwave interior</li>
          <li>Wipe light switches and door handles (high-touch, often overlooked)</li>
          <li>Skirting boards (dust accumulates fast)</li>
          <li>Window sills</li>
          <li>Under kitchen appliances (toaster, kettle — crumbs and grease)</li>
        </ul>

        <h2>Monthly</h2>
        <ul>
          <li>Oven interior (or after anything bubbles over)</li>
          <li>Fridge interior: remove everything, wipe shelves and seals</li>
          <li>Shower head: soak in white vinegar to remove calcium buildup</li>
          <li>Exhaust fans in bathrooms and kitchen: unscrew and wash the cover</li>
          <li>Ceiling fans: wipe blades — the dust there goes straight onto your face while you sleep</li>
          <li>Washing machine drum: run a hot cycle with a cleaning tablet</li>
        </ul>

        <h2>Every 3–6 Months</h2>
        <ul>
          <li>Windows inside and out</li>
          <li>Behind and under major appliances (fridge, washing machine)</li>
          <li>Blinds: vacuum or wipe each slat</li>
          <li>Mattress: vacuum and rotate</li>
          <li>Carpet: professional steam clean (especially if you have pets or allergies)</li>
        </ul>

        <h2>The Things Most People Forget Entirely</h2>
        <ul>
          <li>TV remote and keyboards — among the dirtiest surfaces in most homes</li>
          <li>Top of the fridge — collects dust and grease</li>
          <li>Inside the dishwasher filter</li>
          <li>Bathroom tiles and grout — mould starts before you can see it</li>
          <li>Pillows — should be washed every 3–4 months</li>
          <li>Dryer lint trap — a fire hazard if left too long</li>
        </ul>

        <h2>When a Professional Clean Makes Sense</h2>
        <p>Even consistent home cleaners benefit from a periodic deep clean by a professional — someone who brings industrial equipment, specialist products, and the time to do the things that get deprioritised. A professional deep clean once every 3–6 months maintains a baseline that&apos;s genuinely harder to achieve solo.</p>
      </div>
    ),
  },
  {
    slug: "carpet-cleaning-melbourne-guide",
    title: "Carpet Steam Cleaning in Melbourne: What to Expect",
    excerpt: "How professional carpet cleaning works, how long it takes to dry, and why it matters for your bond return.",
    category: "Specialist Cleaning",
    date: "March 2025",
    readTime: "5 min",
    content: (
      <div className="prose-content">
        <p className="lead">Carpet cleaning is one of the most searched cleaning services in Melbourne — and one of the most misunderstood. Here&apos;s exactly what happens, how long it takes, and how to make sure you actually get your bond back.</p>

        <h2>What Is Steam Cleaning, Really?</h2>
        <p>Despite the name, most professional carpet cleaning doesn&apos;t actually use steam. It uses a process called Hot Water Extraction (HWE): hot water mixed with cleaning solution is injected into the carpet fibres under high pressure, then immediately extracted along with the loosened dirt, allergens, and bacteria.</p>
        <p>This method penetrates deeper than surface cleaning or dry powder methods, and removes significantly more contaminants. It&apos;s the method recommended by most carpet manufacturers — and required by most Melbourne landlords for bond returns.</p>

        <h2>What Does Professional Carpet Cleaning Remove?</h2>
        <ul>
          <li>Dust mites and their waste (major allergen source)</li>
          <li>Pet dander and odour</li>
          <li>Bacteria tracked in from outside</li>
          <li>Stains from food, drink, and general use</li>
          <li>Embedded dirt that vacuuming can&apos;t reach</li>
          <li>Mould spores in humid environments</li>
        </ul>

        <h2>The Process: Step by Step</h2>
        <ol>
          <li><strong>Dry vacuum:</strong> Loose surface dirt is removed first so it doesn&apos;t become mud during the wet clean</li>
          <li><strong>Pre-treatment:</strong> A conditioning solution is applied to break down oils and stubborn stains, left to dwell for several minutes</li>
          <li><strong>Spot treatment:</strong> Specific stains are treated individually with targeted products</li>
          <li><strong>Hot water extraction:</strong> The machine injects hot water and extracts simultaneously, working in overlapping passes</li>
          <li><strong>Speed dry:</strong> Air movers or fans accelerate drying time</li>
        </ol>

        <h2>How Long Does It Take to Dry?</h2>
        <p>This is the question we get most. Under normal conditions:</p>
        <ul>
          <li><strong>2–4 hours</strong> to walk on lightly (in socks)</li>
          <li><strong>6–12 hours</strong> for full dry in most Melbourne weather</li>
          <li><strong>Up to 24 hours</strong> in winter or if airflow is limited</li>
        </ul>
        <p>Opening windows and using ceiling fans significantly speeds up drying. Avoid replacing furniture until fully dry — furniture legs on damp carpet can cause rust stains.</p>

        <h2>Does It Matter for My Bond?</h2>
        <p>Yes — significantly. Most Melbourne leases include a clause requiring professional carpet cleaning at the end of tenancy, often specifying that you must provide a receipt from a licensed carpet cleaner. An agent can legitimately withhold bond money to arrange cleaning themselves if this isn&apos;t done.</p>
        <p>At Central Sea Cleaning, our end-of-lease packages include professional carpet steam cleaning with a receipt you can provide to your agent.</p>

        <h2>What About Pet Odour?</h2>
        <p>Pet urine odour requires an enzyme-based pre-treatment that breaks down the uric acid crystals responsible for the smell. Standard extraction alone won&apos;t fully eliminate it — the enzyme treatment is essential. Let us know if pets are present when booking and we&apos;ll include this step.</p>
      </div>
    ),
  },
  {
    slug: "office-cleaning-melbourne-checklist",
    title: "The Office Cleaning Checklist Every Melbourne Business Needs",
    excerpt: "A clean office isn&apos;t just aesthetic — it affects productivity, health and the impression you make on clients.",
    category: "Commercial",
    date: "February 2025",
    readTime: "4 min",
    content: (
      <div className="prose-content">
        <p className="lead">Your office is often the first physical impression a client has of your business. Beyond appearances, a genuinely clean office reduces sick days, improves staff morale, and ensures you meet basic hygiene obligations as an employer. Here&apos;s what a proper commercial clean covers.</p>

        <h2>Daily Tasks (for high-traffic offices)</h2>
        <ul>
          <li>Vacuuming or mopping all floor areas</li>
          <li>Emptying all waste bins and replacing liners</li>
          <li>Cleaning and sanitising bathroom facilities: toilets, basins, mirrors, floors</li>
          <li>Restocking consumables: hand soap, paper towels, toilet paper</li>
          <li>Wiping kitchen benchtops, sink, and appliances</li>
          <li>Dishwasher loaded/unloaded (if applicable)</li>
          <li>Front entrance glass and floor wiped</li>
        </ul>

        <h2>Weekly Tasks</h2>
        <ul>
          <li>Desks and workstations wiped (with staff belongings moved)</li>
          <li>Computer monitors, keyboards, and phones disinfected (high-touch surfaces)</li>
          <li>Boardroom and meeting rooms: tables polished, chairs wiped</li>
          <li>Kitchen fridge: wipe interior, discard expired items (with staff notice)</li>
          <li>Microwave interior cleaned</li>
          <li>Window sills and ledges dusted</li>
          <li>Stairwells and lift interiors</li>
        </ul>

        <h2>Monthly or Periodic Tasks</h2>
        <ul>
          <li>Carpet deep clean or hard floor machine scrub</li>
          <li>Window glass exterior (where accessible)</li>
          <li>Blind and curtain dusting</li>
          <li>Ceiling vents and air conditioning filters vacuumed</li>
          <li>Light fittings dusted</li>
          <li>Behind and under fixed furniture</li>
          <li>Bathroom tile grout treated</li>
        </ul>

        <h2>The High-Touch Surfaces That Matter Most</h2>
        <p>Research consistently shows these surfaces carry the most bacteria in office environments:</p>
        <ul>
          <li>Keyboards (often dirtier than a toilet seat)</li>
          <li>Shared phones</li>
          <li>Door handles and push plates</li>
          <li>Light switches</li>
          <li>Lift buttons</li>
          <li>Kitchen taps and fridge handles</li>
          <li>Printer and photocopier buttons</li>
        </ul>
        <p>These should be disinfected at least weekly, daily during cold and flu season.</p>

        <h2>What to Look for in a Commercial Cleaning Contract</h2>
        <ul>
          <li><strong>Fixed pricing</strong> — know what you&apos;re paying each month</li>
          <li><strong>Police-checked staff</strong> — especially important for after-hours access</li>
          <li><strong>Public liability insurance</strong> — at least $20 million coverage</li>
          <li><strong>Flexibility</strong> — can they adjust frequency as your business grows?</li>
          <li><strong>Communication</strong> — a direct contact, not a call centre</li>
          <li><strong>Eco-friendly products</strong> — better for staff health and sustainability reporting</li>
        </ul>

        <p>Central Sea Cleaning offers tailored commercial cleaning contracts across Melbourne. We work after hours to avoid disruption, use eco-certified products, and provide a dedicated account contact. Get in touch for a free office cleaning quote.</p>
      </div>
    ),
  },
];

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)" }}>
          <div className="container mx-auto px-6 max-w-4xl text-white">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#FFD166", color: "#1A1A2E" }}>{post.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{post.title}</h1>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime} read</span>
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Article */}
              <article className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
                <style>{`
                  .prose-content p { margin-bottom: 1rem; color: #374151; line-height: 1.75; }
                  .prose-content p.lead { font-size: 1.125rem; color: #1A1A2E; font-weight: 500; margin-bottom: 1.5rem; }
                  .prose-content h2 { font-family: var(--font-syne), sans-serif; font-size: 1.4rem; font-weight: 700; color: #1A1A2E; margin-top: 2rem; margin-bottom: 0.75rem; }
                  .prose-content h3 { font-family: var(--font-syne), sans-serif; font-size: 1.1rem; font-weight: 700; color: #1A1A2E; margin-top: 1.5rem; margin-bottom: 0.5rem; }
                  .prose-content ul, .prose-content ol { padding-left: 1.5rem; margin-bottom: 1rem; color: #374151; }
                  .prose-content li { margin-bottom: 0.4rem; line-height: 1.7; }
                  .prose-content ul li { list-style-type: disc; }
                  .prose-content ol li { list-style-type: decimal; }
                  .prose-content strong { color: #1A1A2E; font-weight: 600; }
                `}</style>
                {post.content}
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* CTA */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Get a Free Quote</h3>
                  <p className="text-gray-500 text-sm mb-4">Fixed price in under 60 seconds. No phone calls required.</p>
                  <Link href="/quote" className="btn btn-primary w-full justify-center text-sm">Get My Price <ArrowRight size={13} /></Link>
                </div>

                {/* More posts */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <h3 className="font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>More Articles</h3>
                  <div className="space-y-4">
                    {otherPosts.map((p) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                        <p className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#0077B6] transition-colors leading-snug">{p.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{p.readTime} read · {p.category}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
