import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import ClaimInput from "../components/common/ClaimInput";
import useAuth from "../hooks/useAuth";

const recommendedClaims = [
  {
    category: "Trending",
    title: "A viral claim making rounds online",
    description:
      "See how TeaCheck breaks down a claim before you believe or share it.",
  },
  {
    category: "Politics",
    title: "A headline that needs more context",
    description:
      "Compare what a headline says with what the available evidence actually shows.",
  },
  {
    category: "Internet",
    title: "A screenshot everyone's sharing",
    description:
      "Don't rely on the screenshot alone. Check where the information came from.",
  },
];

const howItWorks = [
  {
    number: "01",
    title: "Submit",
    description:
      "Paste a headline, claim, article or URL you want to investigate.",
  },
  {
    number: "02",
    title: "Search",
    description:
      "TeaCheck looks for relevant sources and available evidence.",
  },
  {
    number: "03",
    title: "Analyze",
    description:
      "The evidence is compared with the original claim for consistency.",
  },
  {
    number: "04",
    title: "Verify",
    description:
      "You get a clear verdict with receipts you can actually inspect.",
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#07100c] text-[#f5f3ea]">
      <Navbar />

      <main id="top">

        {/* =====================================================
            HERO + CHECK TEA
        ====================================================== */}
        <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pb-28 sm:pt-28">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-[#a8c686]/[0.05] blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#a8c686]/15 bg-[#a8c686]/[0.04] px-3 py-1.5">
              <Sparkles
                size={13}
                strokeWidth={1.7}
                className="text-[#a8c686]"
              />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8fa873]">
                AI-assisted fact checking
              </span>
            </div>

            {/* Main heading */}
            <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[#f5f3ea] sm:text-6xl md:text-7xl">
              What's the tea?{" "}
              <span className="text-[#a8c686]">👀</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#737b73] sm:text-lg">
              Don't just believe it.{" "}
              <span className="text-[#b9c0b8]">
                Check the receipts.
              </span>
            </p>

            {/* =================================================
                MAIN CLAIM INPUT
            ================================================== */}
            <div className="mt-10">
              <ClaimInput />
            </div>

            {/* Small helper text */}
            <p className="mt-4 text-[11px] text-[#505850]">
              Headlines · viral claims · articles · URLs
            </p>

            {/* =================================================
                TEACHECK RULE
                Merged into hero instead of separate section
            ================================================== */}
            <div className="mx-auto mt-16 max-w-2xl">
              <div className="h-px bg-white/[0.06]" />

              <div className="pt-10">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
                  The TeaCheck rule
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#f5f3ea] sm:text-3xl">
                  Don't just scroll. Know.
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#687268]">
                  Before you believe, repost or forward something,
                  take a moment to check what the evidence actually says.
                </p>
              </div>
            </div>

            {/* =================================================
                TRUST POINTS
            ================================================== */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-[11px] text-[#555e56] sm:gap-6">
              <div className="flex items-center gap-2">
                <Search
                  size={14}
                  strokeWidth={1.7}
                />
                <span>Multiple sources</span>
              </div>

              <div className="hidden h-1 w-1 rounded-full bg-[#39423b] sm:block" />

              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={14}
                  strokeWidth={1.7}
                />
                <span>Evidence-backed</span>
              </div>

              <div className="hidden h-1 w-1 rounded-full bg-[#39423b] sm:block" />

              <div className="flex items-center gap-2">
                <Sparkles
                  size={14}
                  strokeWidth={1.7}
                />
                <span>AI-assisted</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RECOMMENDED SECTION
        ====================================================== */}
        <section className="border-t border-white/[0.05] px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">

            {/* Section heading */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
                  Explore
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#f5f3ea]">
                  Recommended for you
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#687268]">
                  A few things worth checking when you're not sure
                  what to believe.
                </p>
              </div>

              {/* Only authenticated users see this */}
              {isAuthenticated && (
                <Link
                  to="/sach-ka-samna"
                  className="group inline-flex items-center gap-2 text-xs font-medium text-[#a8c686] transition hover:text-[#c7e89a]"
                >
                  Explore more

                  <ArrowRight
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              )}
            </div>

            {/* Cards */}
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {recommendedClaims.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/[0.07] bg-[#101813] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#a8c686]/20"
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8fa873]">
                    {item.category}
                  </span>

                  <h3 className="mt-4 text-lg font-medium leading-7 text-[#f5f3ea]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#687268]">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#a8c686]">
                    Check the tea

                    <ArrowRight
                      size={14}
                      strokeWidth={1.8}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW TEACHECK WORKS
            Moved to the bottom
        ====================================================== */}
        <section className="border-t border-white/[0.05] px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">

            {/* Heading */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
                Simple by design
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#f5f3ea] sm:text-4xl">
                How TeaCheck works
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#687268]">
                No complicated dashboards. Just a simple path from
                questionable claim to clearer context.
              </p>
            </div>

            {/* Steps */}
            <div className="mt-12 grid gap-4 md:grid-cols-4">
              {howItWorks.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-white/[0.07] bg-[#101813] p-6 transition-colors hover:border-[#a8c686]/15"
                >
                  <span className="text-xs font-medium text-[#a8c686]">
                    {step.number}
                  </span>

                  <h3 className="mt-5 text-lg font-medium text-[#f5f3ea]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#687268]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section className="border-t border-white/[0.05] px-6 py-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#a8c686]/10 bg-[#101813] px-6 py-14 text-center sm:px-10">

            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
              Ready?
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#f5f3ea] sm:text-4xl">
              Got something suspicious?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#687268]">
              Bring the claim. We'll help you look at the receipts.
            </p>

            <a
              href="#top"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#a8c686] px-5 py-3 text-sm font-semibold text-[#07100c] transition hover:bg-[#c7e89a]"
            >
              Check the Tea

              <ArrowRight
                size={16}
                strokeWidth={1.9}
              />
            </a>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-white/[0.05] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-[#505850] sm:flex-row sm:text-left">
          <span>
            © 2026 TeaCheck
          </span>

          <span>
            Don't just believe it. Check the receipts.
          </span>
        </div>
      </footer>
    </div>
  );
}