import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Flame,
  RefreshCw,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import TrendingCard from "../components/trending/TrendingCard";
import CategoryFilter from "../components/trending/CategoryFilter";
import { trendingClaims } from "../data/mockTrending";

const sortOptions = [
  {
    label: "Within 1 hour",
    value: 1,
  },
  {
    label: "Within 5 hours",
    value: 5,
  },
  {
    label: "Within 12 hours",
    value: 12,
  },
  {
    label: "Within 24 hours",
    value: 24,
  },
  {
    label: "This week",
    value: 168,
  },
];

export default function SachKaSamna() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortHours, setSortHours] = useState(168);
  const [trendingItems, setTrendingItems] = useState(
    trendingClaims
      .filter((claim) => claim.trending)
      .slice(0, 3)
  );
  const refreshTrending = () => {
  const availableClaims = trendingClaims.filter(
    (claim) => claim.trending
  );

  const shuffled = [...availableClaims].sort(
    () => Math.random() - 0.5
  );

  const nextTrending = shuffled.slice(0, 3);

  setTrendingItems(nextTrending);
};

  const filteredClaims = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return trendingClaims
      .filter((claim) => {
        const matchesCategory =
          activeCategory === "All" ||
          claim.category === activeCategory;

        const searchableText = `
  ${claim.title}
  ${claim.description}
  ${claim.category}
`.toLowerCase();

const matchesSearch =
  !normalizedSearch ||
  searchableText.includes(normalizedSearch);

        const matchesTime =
  claim.hoursAgo <= sortHours;

        return (
          matchesCategory &&
          matchesSearch &&
          matchesTime
        );
      })
      .sort(
        (a, b) => a.hoursAgo - b.hoursAgo
      );
  }, [
    search,
    activeCategory,
    sortHours,
  ]);

  return (
    <div className="min-h-screen bg-[#07100c] text-[#f5f3ea]">
      <Navbar />

      <main className="px-6 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-6xl">

          {/* Page heading */}
          <section>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
              Daily reality check
            </p>

            <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Sach Ka Samna
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#687268]">
                  The claims everyone's talking about,
                  checked against the receipts.
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-[#101813] px-4 py-2.5 text-xs font-medium text-[#b7beb6] transition hover:border-[#a8c686]/20 hover:text-[#a8c686]"
              >
                <RefreshCw size={14} />
                Refresh page
              </button>
            </div>
          </section>

          {/* SEARCH - FULL WIDTH */}
          <section className="mt-8 rounded-2xl border border-white/[0.07] bg-[#101813] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a8c686]/10 text-[#a8c686]">
                <Search size={17} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#a8c686]">
                  Search
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Search the tea
                </h2>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0c140f] px-4 py-4 focus-within:border-[#a8c686]/30">
              <Search
                size={17}
                className="shrink-0 text-[#505850]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search claims, headlines or topics..."
                className="w-full bg-transparent text-sm text-[#f5f3ea] outline-none placeholder:text-[#505850]"
              />
            </div>
          </section>

          {/* TRENDING */}
          <section className="mt-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <Flame
                    size={17}
                    className="text-orange-300"
                  />

                  <p className="text-[10px] uppercase tracking-[0.2em] text-orange-300">
                    Trending now
                  </p>
                </div>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  What's everyone talking about?
                </h2>
              </div>

              <button
                type="button"
                onClick={refreshTrending}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-[#101813] px-4 py-2.5 text-xs font-medium text-[#b7beb6] transition hover:border-[#a8c686]/20 hover:text-[#a8c686]"
              >
                <RefreshCw size={14} />
                Refresh trending
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {trendingItems.map((claim) => (
                <TrendingCard
                  key={claim.id}
                  claim={claim}
                />
              ))}
            </div>
          </section>

          {/* TODAY'S CLAIMS */}
          <section className="mt-12">

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8c686]">
                Today
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Today's claims
              </h2>

              <p className="mt-1 text-xs text-[#687268]">
                Fresh claims making the rounds.
              </p>
            </div>

            {/* Categories + Sort on same X axis */}
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0">
                <CategoryFilter
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>

              <div className="relative shrink-0">
                <div className="flex items-center gap-2">
                  <Clock
                  size={14}
                  className="text-[#505850]"
                  />

                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#505850]">
                    Time
                  </span>

                  <select
                    value={sortHours}
                    onChange={(event) =>
                      setSortHours(
                        Number(event.target.value)
                      )
                    }
                    className="rounded-xl border border-white/[0.08] bg-[#101813] px-3 py-2.5 text-xs text-[#b7beb6] outline-none transition focus:border-[#a8c686]/30"
                  >
                    {sortOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#101813]"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {filteredClaims.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-white/[0.08] bg-[#101813]/50 px-6 py-14 text-center">
                <Search
                  size={24}
                  className="mx-auto text-[#505850]"
                />

                <p className="mt-4 text-sm font-medium text-[#b7beb6]">
                  No claims found.
                </p>

                <p className="mt-2 text-xs text-[#505850]">
                  Try another category, search term or
                  time range.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filteredClaims.map((claim) => (
                  <TrendingCard
                    key={claim.id}
                    claim={claim}
                  />
                ))}
              </div>
            )}
          </section>

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-[#505850] transition hover:text-[#a8c686]"
            >
              <ArrowLeft size={13} />
              Back home
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}