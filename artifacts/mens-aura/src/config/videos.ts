/**
 * THE MEN'S AURA - CENTRALIZED VIDEO CONFIGURATION
 * 
 * To change or add videos for any section, simply place your video file 
 * in the corresponding folder under `public/videos/` and update the paths below!
 */

export const VIDEO_CONFIG = {
  // 1. HERO SECTION BACKGROUND VIDEO
  hero: {
    backgroundVideo: '/videos/hero/hero-bg.mp4',
    fallbackVideo: '/videos/main1.mp4',
  },

  // 2. WHY MIDNIGHT DRIVE SECTION (Sales Point Multi-Reels)
  whyMidnightDrive: [
    {
      id: 'amber-bottle',
      title: '3D Gold Dropper & Pure Formulation',
      subtitle: 'Amber apothecary glass preserving cold-pressed botanical potency.',
      src: '/videos/why-midnight-drive/amber-bottle.mp4',
      badge: '100% Pure Cold-Pressed',
    },
    {
      id: 'brand-film',
      title: 'Sensorial Velvet Glide & Heat Activation',
      subtitle: 'Experience the 60-second thermal warmth awakening deep tissue vitality.',
      src: '/videos/why-midnight-drive/brand-film.mp4',
      badge: '60-Second Thermal Heat',
    },
    {
      id: 'stallion-intro',
      title: 'Emblem of Unhurried Strength & Vigor',
      subtitle: 'Crafted for gentlemen who demand uncompromised performance.',
      src: '/videos/why-midnight-drive/stallion-intro.mp4',
      badge: 'Steroid-Free Vitality',
    },
  ],

  // 3. APPLICATION RITUAL & HOW TO USE (Private Sensitive Guide)
  ritualGuide: {
    instructionalVideo: '/videos/ritual-guide/massage-ritual.mp4',
  },

  // 4. DOCTOR & MEDICAL EXPERT AI HIGHLIGHTS
  doctorInsights: [
    {
      id: 'doc-1',
      title: 'Herbal Science & Formulator Insight',
      subtitle: 'Botanical Pharmacology Commentary',
      quote: '"Transdermal absorption of Eugenol from Clove oil combined with Raig Mahi bio-lipids naturally accelerates micro-vascular circulation without synthetic steroids or harmful chemicals."',
      src: '/videos/doctor-insights/doctor-review1.mp4',
      badge: '100% Steroid-Free',
    },
    {
      id: 'doc-2',
      title: 'Unani Male Wellness Insight',
      subtitle: 'Traditional Herbalist Commentary',
      quote: '"Ostrich oil\'s rich essential fatty acid profile acts as an organic bio-carrier, carrying botanical warmth deep into male tissue safely and restoring natural vigor."',
      src: '/videos/doctor-insights/doctor-review2.mp4',
      badge: 'Natural Bio-Carriers',
    },
  ],

  // 5. 4K CINEMATIC PRODUCT FILM SHOWCASE
  filmShowcase: {
    defaultVideo: '/videos/film-showcase/midnight-drive.mp4',
  },
};
