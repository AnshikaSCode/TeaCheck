import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Clock3,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import HistoryItem from "../components/history/HistoryItem";

import {
  clearHistory,
  getHistory,
  removeFromHistory,
} from "../data/historyStorage";

export default function History() {
  const [history, setHistory] = useState(() => getHistory());
  const [search, setSearch] = useState("");

  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return history;
    }

    return history.filter((item) =>
      item.claim.toLowerCase().includes(query)
    );
  }, [history, search]);

  const handleDelete = (id) => {
    const updatedHistory = removeFromHistory(id);

    setHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your entire verification history?"
    );

    if (!confirmed) {
      return;
    }

    clearHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#07100c] text-[#f5f3ea]">
      <Navbar />

      <main className="px-6 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-5xl">

          {/* =================================================
              TOP
          ================================================== */}
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 text-xs text-[#687268] transition hover:text-[#f5f3ea]"
            >
              <ArrowLeft
                size={15}
                strokeWidth={1.8}
                className="transition-transform group-hover:-translate-x-1"
              />

              Dashboard
            </Link>

            <div className="flex items-center gap-2 text-[#505850]">
              <Clock3
                size={14}
                strokeWidth={1.7}
              />

              <span className="text-[10px] uppercase tracking-[0.18em]">
                {history.length} checks
              </span>
            </div>
          </div>

          {/* =================================================
              HEADER
          ================================================== */}
          <section className="mt-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
              Your activity
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-[#f5f3ea] sm:text-5xl">
              History
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#687268]">
              Every claim you've checked with TeaCheck,
              all in one place.
            </p>
          </section>

          {/* =================================================
              SEARCH + CLEAR
          ================================================== */}
          <section className="mt-10 flex flex-col gap-3 sm:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={17}
                strokeWidth={1.7}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#505850]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search your checks..."
                aria-label="Search your verification history"
                className="w-full rounded-xl border border-white/[0.08] bg-[#101813] py-3.5 pl-11 pr-4 text-sm text-[#f5f3ea] outline-none placeholder:text-[#505850] focus:border-[#a8c686]/30"
              />
            </div>

            {/* Clear */}
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-xs font-medium text-[#687268] transition hover:border-red-400/10 hover:bg-red-400/[0.03] hover:text-red-300"
              >
                <Trash2
                  size={15}
                  strokeWidth={1.7}
                />

                Clear history
              </button>
            )}
          </section>

          {/* =================================================
              HISTORY LIST
          ================================================== */}
          <section className="mt-8">

            {filteredHistory.length > 0 ? (
              <div className="space-y-3">
                {filteredHistory.map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : history.length === 0 ? (
              /* Empty state */
              <div className="rounded-3xl border border-white/[0.07] bg-[#101813] px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a8c686]/10">
                  <Clock3
                    size={22}
                    strokeWidth={1.6}
                    className="text-[#a8c686]"
                  />
                </div>

                <h2 className="mt-6 text-xl font-semibold text-[#f5f3ea]">
                  No checks yet.
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#687268]">
                  Your verification history will appear here
                  after you check your first claim.
                </p>

                <Link
                  to="/"
                  className="mt-7 inline-flex items-center rounded-xl bg-[#a8c686] px-5 py-3 text-sm font-semibold text-[#07100c] transition hover:bg-[#c7e89a]"
                >
                  Check the Tea
                </Link>
              </div>
            ) : (
              /* No search results */
              <div className="rounded-3xl border border-white/[0.07] bg-[#101813] px-6 py-14 text-center">
                <Search
                  size={22}
                  strokeWidth={1.6}
                  className="mx-auto text-[#505850]"
                />

                <h2 className="mt-5 text-lg font-semibold text-[#f5f3ea]">
                  Nothing found.
                </h2>

                <p className="mt-2 text-sm text-[#687268]">
                  Try searching with a different phrase.
                </p>
              </div>
            )}
          </section>

          {/* =================================================
              BOTTOM CTA
          ================================================== */}
          {history.length > 0 && (
            <section className="mt-12 rounded-3xl border border-[#a8c686]/10 bg-[#101813] px-6 py-10 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
                Keep checking
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#f5f3ea]">
                Got another claim?
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#687268]">
                Keep the investigation going.
              </p>

              <Link
                to="/"
                className="mt-6 inline-flex items-center rounded-xl bg-[#a8c686] px-5 py-3 text-sm font-semibold text-[#07100c] transition hover:bg-[#c7e89a]"
              >
                Check the Tea
              </Link>
            </section>
          )}

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
            Don't just believe it. Check the receipts.
          </span>
        </div>
      </footer>
    </div>
  );
}