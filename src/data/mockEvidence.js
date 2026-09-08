export const mockVerification = {
  id: "demo",

  claim:
    "A new law will give every citizen free smartphones.",

  verdict: "LIKELY FALSE",

  verdictType: "false",

  confidence: 87,

  summary:
    "We found strong evidence contradicting this claim. No credible official announcement or reliable news coverage confirms that every citizen will receive a free smartphone.",

  checkedSources: 18,

  supportingSources: 2,

  contradictingSources: 11,

  neutralSources: 5,

  lastChecked: "Just now",

  evidence: [
    {
      id: 1,
      type: "contradicting",
      source: "Government Information Portal",
      title:
        "No nationwide free smartphone scheme announced",
      description:
        "The official information portal contains no announcement matching the claim.",
      date: "Aug 28, 2026",
      reliability: 96,
    },

    {
      id: 2,
      type: "contradicting",
      source: "National News Network",
      title:
        "Viral smartphone claim lacks official confirmation",
      description:
        "Independent reporting found no evidence of a nationwide smartphone distribution program.",
      date: "Aug 29, 2026",
      reliability: 91,
    },

    {
      id: 3,
      type: "supporting",
      source: "Social Media",
      title:
        "Posts circulating about free smartphones",
      description:
        "Several social media posts repeat the claim, but provide no verifiable source.",
      date: "Aug 30, 2026",
      reliability: 28,
    },

    {
      id: 4,
      type: "neutral",
      source: "Technology Daily",
      title:
        "Government expands digital access initiatives",
      description:
        "The article discusses digital access programs but does not confirm free smartphones for all citizens.",
      date: "Aug 27, 2026",
      reliability: 88,
    },
  ],
};