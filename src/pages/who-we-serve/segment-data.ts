export type SegmentSlug = "banks" | "credit-unions" | "fintechs";

export type SegmentMetric = {
  label: string;
  value: string;
  desc: string;
  tone?: "blue" | "indigo" | "sky";
};

export type SegmentData = {
  slug: SegmentSlug;
  title: string;
  icon: string;
  badge?: string;
  /** "members" for credit unions, "users" for banks/fintechs */
  audienceTerm: "members" | "users";
  /** Hero kicker — category name front and center (Pinwheel-style) */
  heroKicker: string;
  /** Hero headline (main H1) */
  heroHeadline: string;
  /** Hero subline / value prop under headline */
  heroSubline: string;
  /** CTA section: headline that reinforces "this is for me" */
  ctaHeadline: string;
  /** CTA section: subline that drives adoption */
  ctaSubline: string;
  /** Show pre-integrated platforms bar (Q2, Alkami, etc.) under hero */
  showPlatforms: boolean;
  /** Credit unions: mention CUSO in hero */
  cusoMention?: boolean;
  bullets: string[];
  proof: string[];
  metrics: SegmentMetric[];
};

export const SEGMENTS: Record<SegmentSlug, SegmentData> = {
  banks: {
    slug: "banks",
    title: "Banks",
    icon: "lucide:building-2",
    badge: "Enterprise",
    audienceTerm: "users",
    heroKicker: "ScribeUp for Banking",
    heroHeadline: "Drive primacy and engagement with subscription management",
    heroSubline: "Embed an off-the-shelf best-in-class subscription management experience into your users' digital banking experience.",
    showPlatforms: true,
    ctaHeadline: "Built for banks like yours",
    ctaSubline: "See the embedded flow and rollout on your platforms.",
    bullets: [
      "Transaction feed + auto-detect users' cards on file",
      "Subscription management off the shelf—visibility, alerts, 1-click switch",
      "Cross-sell and 11% refinancing when we detect third-party loans",
    ],
    proof: [
      "11% conversion on refinancing (third-party loans detected)",
      "30–45 days on Q2, Alkami, Lumin, Banno, Candescent",
    ],
    metrics: [
      { label: "Card Primacy", value: "6+", desc: "Additional monthly card swipes" },
      { label: "User Retention", value: "+5%", desc: "Lift from deeper bill engagement" },
      { label: "Refinancing Leads", value: "11%", desc: "Click-through when we detect third-party loans" },
    ],
  },
  "credit-unions": {
    slug: "credit-unions",
    title: "Credit Unions",
    icon: "lucide:landmark",
    audienceTerm: "members",
    heroKicker: "ScribeUp for Credit Unions",
    heroHeadline: "Drive primacy and engagement with subscription management",
    heroSubline: "Embed an off-the-shelf best-in-class subscription management experience into your members' digital banking experience.",
    showPlatforms: true,
    cusoMention: true,
    ctaHeadline: "Built for credit unions like yours",
    ctaSubline: "See the embedded flow and rollout on your platforms.",
    bullets: [
      "Transaction feed + auto-detect members' cards on file",
      "Subscription management off the shelf—visibility, alerts, 1-click switch",
      "Cross-sell and 11% refinancing when we detect third-party loans",
    ],
    proof: [
      "11% conversion on refinancing (third-party loans detected)",
      "30–45 days on Q2, Alkami, Lumin, Banno, Candescent",
    ],
    metrics: [
      { label: "Card Primacy", value: "6+", desc: "Additional monthly card swipes" },
      { label: "Member Retention", value: "+5%", desc: "Lift from deeper bill engagement" },
      { label: "Refinancing Leads", value: "11%", desc: "Click-through when we detect third-party loans" },
    ],
  },
  fintechs: {
    slug: "fintechs",
    title: "Fintechs",
    icon: "lucide:cpu",
    audienceTerm: "users",
    heroKicker: "ScribeUp for Fintechs",
    heroHeadline: "Flexible bill management solutions that amplify your digital offering",
    heroSubline: "SDK, iFrame, or API. Drive engagement and cross-sell at key moments.",
    showPlatforms: false,
    ctaHeadline: "Built for fintechs like yours",
    ctaSubline: "See the embedded experience and integration path for your stack.",
    bullets: [
      "Premium upsell for calendar sync, 1-click cancellation",
      "Personal loans, EWA, insurance — your core products",
      "SDK, iFrame, or API",
    ],
    proof: [
      "11% conversion on personalized offers",
      "Embedded update + cancel, no redirects",
    ],
    metrics: [
      { label: "Premium plan conversion", value: "10%+", desc: "Calendar sync, 1-click cancel" },
      { label: "Retention", value: "5%+", desc: "Lift from deeper engagement" },
      { label: "Cross-sell conversion", value: "11%", desc: "Personal loans, EWA, insurance" },
    ],
  },
};

export function getSegmentBySlug(slug: string): SegmentData | null {
  return SEGMENTS[slug as SegmentSlug] ?? null;
}

export const SEGMENT_SLUGS: SegmentSlug[] = ["banks", "credit-unions", "fintechs"];
