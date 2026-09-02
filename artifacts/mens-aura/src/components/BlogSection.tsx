import { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { Card3D } from './Card3D';

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  keywords: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
    }[];
    conclusion: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'raig-mahi-clove-science',
    title: 'The Science of Raig Mahi & Clove Oil for Natural Male Stamina in Pakistan',
    category: 'Herbal Science & Formulations',
    readTime: '5 min read',
    date: 'August 28, 2026',
    keywords: ['Raig Mahi Benefits', 'Clove Oil Massage', 'Natural Male Vitality Oil Pakistan'],
    excerpt:
      'Discover how ancient Unani apothecary principles combine Raig Mahi bio-lipids with cold-pressed Clove Eugenol to awaken localized blood circulation naturally without steroids.',
    content: {
      intro:
        'For centuries, traditional practitioners across South Asia have revered Raig Mahi (Sand Lizard Oil extract) and Syzygium aromaticum (Clove essential oil) as the pinnacle of male vitality formulations. Unlike modern chemical alternatives that produce systemic strain, these cold-pressed natural bio-actives work directly through transdermal application.',
      sections: [
        {
          heading: '1. What is Raig Mahi and How Does It Benefit Male Tissue?',
          body: 'Raig Mahi is a legendary Unani botanical ingredient rich in natural bio-lipids and essential fatty acids. When formulated in cold-pressed carrier oils, it deeply penetrates localized skin layers to support tissue elasticity, firmness, and natural warmth.',
        },
        {
          heading: '2. The Role of Clove Eugenol in 60-Second Thermal Heat Activation',
          body: 'Clove essential oil contains over 90% pure Eugenol—a organic compound known for its therapeutic warming properties. Upon contact with localized skin, Eugenol gently stimulates micro-vascular dilation, bringing soothing warmth and invigorating sensory awakening within 60 seconds.',
        },
        {
          heading: '3. Why Ostrich & Extra Virgin Olive Oils are Essential Bio-Carriers',
          body: 'Pure botanical extracts require high-glide, non-comedogenic carrier oils to ensure smooth massage without friction. Ostrich oil possesses essential omega fatty acids that mirror human skin lipids, allowing the active compounds to absorb cleanly without leaving greasy residue.',
        },
      ],
      conclusion:
        'By combining these 5 authentic ingredients into Midnight Drive, men in Pakistan can experience natural stamina, restored energy, and unhurried confidence without synthetic chemicals or side effects.',
    },
  },
  {
    id: 'transdermal-vs-pills',
    title: 'Why Cold-Pressed Transdermal Massage Oils Outperform Synthetic Pills',
    category: 'Transdermal Male Wellness',
    readTime: '4 min read',
    date: 'August 25, 2026',
    keywords: ['Transdermal Massage Oil', 'No Side Effects', 'Safe Male Wellness'],
    excerpt:
      'Oral pills cause liver strain, headaches, and systemic side effects. Explore why external transdermal absorption delivers direct thermal warmth right where it is needed.',
    content: {
      intro:
        'When men face fatigue, stress, or declining intimate confidence, many turn to oral synthetic pills. However, oral supplements must pass through the digestive system and liver, often causing unwanted side effects such as elevated blood pressure, facial flushing, and stomach distress.',
      sections: [
        {
          heading: '1. The Mechanism of Transdermal Absorption',
          body: 'Transdermal delivery allows botanical bio-actives to bypass the stomach and liver entirely. Applied directly to localized areas, the cold-pressed active oils absorb into skin micro-vessels, providing localized benefits exactly where required.',
        },
        {
          heading: '2. Zero Organ Burden & 100% Herbal Safety',
          body: 'Because Midnight Drive contains 0% parabens, 0% mineral paraffin, and 0% synthetic steroids, it is hypoallergenic and non-irritating. You get pure therapeutic thermal warmth without compromising your internal health.',
        },
        {
          heading: '3. Mindful Evening Application & Stress Relief',
          body: 'The act of a 3-minute nightly massage ritual itself helps lower cortisol (stress hormone) levels. The warm herbaceous scent of wild rosemary and clove calms the mind while preparing the body for unhurried intimacy.',
        },
      ],
      conclusion:
        'Transdermal male wellness represents a safer, more sustainable choice for long-term health and vitality.',
    },
  },
  {
    id: '3-step-night-ritual-guide',
    title: 'The Ultimate 3-Step Night Application Ritual for Maximum Male Vigor',
    category: 'Application Ritual Guide',
    readTime: '6 min read',
    date: 'August 20, 2026',
    keywords: ['How to use Midnight Drive', 'Night Massage Ritual', 'Male Energy Oil'],
    excerpt:
      'A complete step-by-step evening guide on how to dispense 4–6 drops of Midnight Drive, warm between palms, and glide for maximum cumulative vigor.',
    content: {
      intro:
        'To achieve the best cumulative results with Midnight Drive, consistent and proper application is key. Following this simple 3-step nightly ritual ensures deep transdermal absorption and maximum thermal warmth.',
      sections: [
        {
          heading: 'Step 1: Cleanse & Awaken Skin Pores',
          body: 'Cleanse the target area with warm water and dry thoroughly. Warm water opens skin pores and prepares the skin to receive the cold-pressed botanical essences.',
        },
        {
          heading: 'Step 2: Calibrated Dropper Dose & Upward Glide',
          body: 'Dispense 4 to 6 drops of Midnight Drive golden oil onto clean palms. Gently rub your hands together for 10 seconds to warm the oil with body temperature, then massage smoothly using upward circular strokes for 3 to 5 minutes.',
        },
        {
          heading: 'Step 3: Overnight Absorption for Cumulative Vigor',
          body: 'Feel the soothing thermal warmth activate within 60 seconds. Do not wash off immediately—allow the natural bio-actives to nourish deep tissue overnight. For peak firmness and stamina, continue daily for 14 to 21 days.',
        },
      ],
      conclusion:
        'Make room for the moment. Incorporate Midnight Drive into your unhurried evening routine and feel the difference from night one.',
    },
  },
];

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section
      id="blogs"
      className="border-t border-[#c5a059]/15 bg-gradient-to-b from-[#070b12] via-[#090e17] to-[#070b12] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
            <BookOpen className="h-3.5 w-3.5 text-[#c5a059]" /> The Men's Aura Wellness Journal
          </div>
          <h2 className="font-editorial mx-auto mt-4 max-w-3xl text-4xl font-normal text-[#f4ede2] sm:text-5xl lg:text-6xl">
            Scientific Insights & <em className="text-gold-gradient italic">SEO Articles.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#9aa4b5]">
            Explore expert guides on Raig Mahi, transdermal male absorption, and natural stamina routines formulated for the modern gentleman.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Card3D key={post.id} depth={8}>
              <div className="glass-obsidian-card flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:border-[#c5a059]/50">
                <div>
                  <div className="flex items-center justify-between font-mono-ui text-[10px] uppercase tracking-wider text-[#8c97a8]">
                    <span className="rounded-full bg-[#c5a059]/10 px-3 py-1 text-[#e5c583] border border-[#c5a059]/20">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#c5a059]" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-editorial mt-6 text-xl font-semibold leading-snug text-[#f4ede2]">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-xs leading-relaxed text-[#8c97a8]">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {post.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded bg-[#070b12] px-2 py-0.5 font-mono-ui text-[9px] text-[#c5a059]/70 border border-[#c5a059]/10"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-[#c5a059]/15 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="group inline-flex items-center gap-2 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#e5c583] transition-colors hover:text-[#ffffff]"
                    data-testid={`read-blog-${post.id}`}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#c5a059]/40 bg-[#090e17] p-6 sm:p-10 shadow-[0_25px_90px_rgba(0,0,0,0.95)] text-[#f4ede2]">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/30 bg-[#0d1422] text-[#e5c583] hover:bg-[#c5a059] hover:text-[#0b0f17] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="inline-block rounded-full bg-[#c5a059]/10 px-3.5 py-1 font-mono-ui text-[10px] uppercase tracking-widest text-[#e5c583] border border-[#c5a059]/30">
              {selectedPost.category}
            </span>

            <h2 className="font-editorial mt-4 text-2xl sm:text-4xl font-semibold text-[#f4ede2] leading-tight">
              {selectedPost.title}
            </h2>

            <div className="mt-4 flex items-center gap-4 font-mono-ui text-xs text-[#8c97a8] border-b border-[#c5a059]/15 pb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#c5a059]" /> {selectedPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#c5a059]" /> {selectedPost.readTime}
              </span>
            </div>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#c7d0de]">
              <p className="text-base text-[#e5c583] font-medium leading-relaxed bg-[#0d1422] p-4 rounded-xl border border-[#c5a059]/20">
                {selectedPost.content.intro}
              </p>

              {selectedPost.content.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-editorial text-xl font-semibold text-[#f4ede2]">
                    {sec.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9aa4b5]">
                    {sec.body}
                  </p>
                </div>
              ))}

              <div className="rounded-2xl border border-[#c5a059]/30 bg-[#0d1422] p-6">
                <h4 className="font-editorial text-lg font-semibold text-[#f4ede2] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#c5a059]" /> Key Takeaway
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#9aa4b5]">
                  {selectedPost.content.conclusion}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#c5a059]/15 pt-6">
              <a
                href="https://wa.me/923110355309?text=Hello%20The%20Men's%20Aura%20Support%2C%20I%20read%20your%20article%20and%20want%20to%20order%20Midnight%20Drive"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-glow-button flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl px-6 py-3 font-mono-ui text-xs font-bold uppercase tracking-wider text-[#0b0f17]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Order via WhatsApp (+92 311 0355 309)</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="font-mono-ui text-xs uppercase tracking-wider text-[#8c97a8] hover:text-[#f4ede2]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
