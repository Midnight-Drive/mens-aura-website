import { BlogSection } from '@/components/BlogSection';
import { BookOpen } from 'lucide-react';

export function JournalPage() {
  return (
    <div className="pt-8 pb-20 space-y-16">
      {/* Journal Header */}
      <section className="relative text-center px-4 sm:px-8 py-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.25em] text-[#e5c583]">
          <BookOpen className="h-3.5 w-3.5 text-[#c5a059]" /> Male Wellness Journal & Science
        </div>
        <h1 className="font-editorial mx-auto mt-4 max-w-3xl text-4xl font-normal text-[#f4ede2] sm:text-6xl">
          SEO Research & <em className="text-gold-gradient italic">Herbal Science Journal.</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#9aa4b5] sm:text-base">
          Read in-depth research articles on Unani Raig Mahi, Eugenol bio-chemistry, and male vitality.
        </p>
      </section>

      {/* Blog Articles */}
      <BlogSection />
    </div>
  );
}
