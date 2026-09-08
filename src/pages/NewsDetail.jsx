import {
  ArrowLeft,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { trendingClaims } from "../data/mockTrending";

export default function NewsDetail() {
  const { id } = useParams();

  const claim = trendingClaims.find(
    (item) => item.id === id
  );

  if (!claim) {
    return (
      <div className="min-h-screen bg-[#07100c] text-[#f5f3ea]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a8c686]">
              TeaCheck
            </p>

            <h1 className="mt-3 text-2xl font-semibold">
              News not found
            </h1>

            <Link
              to="/sach-ka-samna"
              className="mt-6 inline-flex items-center gap-2 text-xs text-[#a8c686]"
            >
              <ArrowLeft size={14} />
              Back to Sach Ka Samna
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07100c] text-[#f5f3ea]">
      <Navbar />

      <main className="px-6 pb-20 pt-10 sm:pt-14">
        <article className="mx-auto max-w-4xl">

          <Link
            to="/sach-ka-samna"
            className="inline-flex items-center gap-2 text-xs text-[#687268] transition hover:text-[#a8c686]"
          >
            <ArrowLeft size={14} />
            Back to Sach Ka Samna
          </Link>

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#a8c686]/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#a8c686]">
                {claim.category}
              </span>

              {claim.trending && (
                <span className="rounded-full bg-orange-400/10 px-3 py-1.5 text-[10px] font-medium text-orange-300">
                  🔥 Trending
                </span>
              )}

              <span className="text-[10px] text-[#505850]">
                {claim.checked}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {claim.title}
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#8c958b] sm:text-base">
              {claim.longDescription}
            </p>
          </div>

          {/* Verdict */}
          <div className="mt-8 rounded-2xl border border-white/[0.07] bg-[#101813] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#505850]">
                  TeaCheck verdict
                </p>

                <p className="mt-2 text-xl font-semibold">
                  {claim.verdict}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-3xl font-semibold text-[#a8c686]">
                  {claim.confidence}%
                </p>

                <p className="text-[10px] text-[#505850]">
                  confidence
                </p>
              </div>
            </div>
          </div>

          {/* Sources */}
          <section className="mt-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8c686]">
                  Receipts
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Sources behind the story
                </h2>
              </div>

              <span className="text-xs text-[#505850]">
                {claim.sourceList.length} sources
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {claim.sourceList.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  onClick={(event) => {
                    if (source.url === "#") {
                      event.preventDefault();
                    }
                  }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-[#101813] p-5 transition hover:border-[#a8c686]/20"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-xs font-semibold text-[#a8c686]">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#505850]">
                      {source.name}
                    </p>

                    <h3 className="mt-1 text-sm font-medium text-[#dfe4dd]">
                      {source.title}
                    </h3>
                  </div>

                  <ExternalLink
                    size={15}
                    className="shrink-0 text-[#505850] transition group-hover:text-[#a8c686]"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Ask Questions */}
          <section className="mt-10 rounded-3xl border border-[#a8c686]/15 bg-[#a8c686]/[0.05] p-6 text-center sm:p-10">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a8c686]/10 text-[#a8c686]">
              <MessageCircle size={19} />
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              Ask questions about the news
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#687268]">
              Confused about something in this story?
              Soon you'll be able to ask TeaCheck about
              the claim, evidence and sources.
            </p>

            <button
              type="button"
              disabled
              className="mt-6 rounded-xl border border-white/[0.08] bg-[#101813] px-5 py-3 text-xs font-medium text-[#687268]"
            >
              Coming soon
            </button>
          </section>

        </article>
      </main>
    </div>
  );
}