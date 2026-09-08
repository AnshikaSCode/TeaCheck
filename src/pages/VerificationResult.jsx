import { useEffect, useMemo } from "react";
import {ArrowLeft, Bookmark,Share2,} from "lucide-react";
import {Link, useSearchParams,} from "react-router-dom";
import Navbar from "../components/layout/Navbar";

import VerdictCard from "../components/verification/VerdictCard";
import EvidenceSummary from "../components/verification/EvidenceSummary";
import EvidenceCard from "../components/verification/EvidenceCard";
import NextCheck from "../components/verification/NextCheck";

import { mockVerification } from "../data/mockEvidence";
import { saveToHistory } from "../data/historyStorage";

export default function VerificationResult() {
  const [searchParams] = useSearchParams();

  const claimFromUrl = searchParams.get("claim");
    const verification = useMemo(() => {
    const claim =
      claimFromUrl?.trim() || mockVerification.claim;

    const generatedId = `check-${encodeURIComponent(
      claim.toLowerCase()
    )}`;

    return {
      ...mockVerification,
      id: generatedId,
      claim,
    };
  }, [claimFromUrl]);
  /*
   * Automatically save the completed verification
   * to the user's local history.
   */
  useEffect(() => {
    saveToHistory(verification);
  }, [verification]);

  /*
   * Share result.
   *
   * If Web Share API is available, open the native
   * sharing menu.
   *
   * Otherwise copy the current URL.
   */
  const handleShare = async () => {
    const shareText = `TeaCheck result: ${verification.claim}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "TeaCheck Result",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled the share dialog.
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Result link copied.");
    } catch {
      alert("Unable to copy the result link.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07100c] text-[#f5f3ea]">

      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <Navbar />

      <main className="px-6 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-5xl">

          {/* =================================================
              TOP NAVIGATION
          ================================================== */}
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-xs text-[#687268] transition hover:text-[#f5f3ea]"
            >
              <ArrowLeft
                size={15}
                strokeWidth={1.8}
                className="transition-transform group-hover:-translate-x-1"
              />

              Back to Home
            </Link>

            <span className="text-right text-[10px] font-medium uppercase tracking-[0.2em] text-[#505850]">
              Verification Result
            </span>
          </div>

          {/* =================================================
              CLAIM
          ================================================== */}
          <section className="mt-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
              Claim checked
            </p>

            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#f5f3ea] sm:text-4xl md:text-5xl">
              {verification.claim}
            </h1>

            <p className="mt-4 text-xs text-[#505850]">
              Last checked: {verification.lastChecked}
            </p>
          </section>

          {/* =================================================
              VERDICT
          ================================================== */}
          <section className="mt-10">
            <VerdictCard
              verdict={verification.verdict}
              verdictType={verification.verdictType}
              confidence={verification.confidence}
              summary={verification.summary}
            />
          </section>

          {/* =================================================
              EVIDENCE SUMMARY
          ================================================== */}
          <section className="mt-6">
            <EvidenceSummary
              checkedSources={verification.checkedSources}
              supportingSources={
                verification.supportingSources
              }
              contradictingSources={
                verification.contradictingSources
              }
              neutralSources={
                verification.neutralSources
              }
            />
          </section>

          {/* =================================================
              THE RECEIPTS
          ================================================== */}
          <section className="mt-14">

            {/* Section heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
                  Evidence
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#f5f3ea] sm:text-3xl">
                  The receipts
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#687268]">
                  Here&apos;s what the available evidence says
                  about this claim.
                </p>
              </div>

              <span className="text-xs text-[#505850]">
                {verification.evidence.length} highlighted sources
              </span>
            </div>

            {/* Evidence cards */}
            <div className="mt-7 space-y-4">
              {verification.evidence.map((item) => (
                <EvidenceCard
                  key={item.id}
                  evidence={item}
                />
              ))}
            </div>
          </section>

          {/* =================================================
              ACTION BUTTONS
          ================================================== */}
          <section className="mt-8 flex flex-col gap-3 sm:flex-row">

            {/* Save */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#101813] px-5 py-3 text-sm font-medium text-[#b7beb6] transition hover:border-[#a8c686]/20 hover:text-[#f5f3ea]"
            >
              <Bookmark
                size={16}
                strokeWidth={1.7}
              />

              Save this check
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#101813] px-5 py-3 text-sm font-medium text-[#b7beb6] transition hover:border-[#a8c686]/20 hover:text-[#f5f3ea]"
            >
              <Share2
                size={16}
                strokeWidth={1.7}
              />

              Share result
            </button>
          </section>

          {/* =================================================
              DISCLAIMER
          ================================================== */}
          <section className="mt-10 rounded-2xl border border-white/[0.06] bg-[#101813]/60 p-5">
            <p className="text-xs leading-5 text-[#687268]">
              TeaCheck is an AI-assisted verification tool.
              Results should be treated as evidence summaries,
              not absolute truth. Always review important claims
              independently.
            </p>
          </section>

          {/* =================================================
              CONTINUOUS CHECKING
          ================================================== */}
          <NextCheck />

        </div>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-white/[0.05] px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-xs text-[#505850] sm:flex-row sm:text-left">

          <span>
            © 2026 TeaCheck
          </span>

          <span>
            Don&apos;t just believe it. Check the receipts.
          </span>

        </div>
      </footer>
    </div>
  );
}