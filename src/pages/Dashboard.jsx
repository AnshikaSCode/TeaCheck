import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Search,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";

import Navbar from "../components/layout/Navbar";
import StatCard from "../components/dashboard/StatCard";
import ActivityChart from "../components/dashboard/ActivityChart";
import RecentChecks from "../components/dashboard/RecentChecks";

import useAuth from "../hooks/useAuth";
import { getHistory } from "../data/historyStorage";

export default function Dashboard() {
  const { user } = useAuth();
  useEffect(() => {
  if (user?.isNewUser) {
    const updatedUser = {
      ...user,
      isNewUser: false,
    };

    localStorage.setItem(
      "teacheck_user",
      JSON.stringify(updatedUser)
    );
  }
}, [user]);

  const history = useMemo(() => {
    return getHistory();
  }, []);

  const stats = useMemo(() => {
    const total = history.length;

    const falseCount = history.filter(
      (item) => item.verdictType === "false"
    ).length;

    const supportedCount = history.filter(
      (item) => item.verdictType === "supported"
    ).length;

    const averageConfidence =
      total > 0
        ? Math.round(
            history.reduce(
              (sum, item) =>
                sum + Number(item.confidence || 0),
              0
            ) / total
          )
        : 0;

    return {
      total,
      falseCount,
      supportedCount,
      averageConfidence,
    };
  }, [history]);

  const firstName =
    user?.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-[#07100c] text-[#f5f3ea]">
      <Navbar />

      <main className="px-6 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <section>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
              Your TeaCheck
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {user?.isNewUser
                ? `Welcome, ${firstName}. 👋`
                : `Welcome back, ${firstName}. 👋`}
                </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#687268]">
              Here's a look at what you've been checking
              and how your investigation history is shaping up.
            </p>
          </section>

          {/* Quick Actions */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              to="/"
              className="group rounded-2xl border border-[#a8c686]/15 bg-[#a8c686]/[0.06] p-5 transition hover:border-[#a8c686]/30 hover:bg-[#a8c686]/[0.09]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8c686]/10 text-[#a8c686]">
                  <Search size={18} />
                </div>

                <ArrowRight
                  size={17}
                  className="text-[#687268] transition group-hover:translate-x-1 group-hover:text-[#a8c686]"
                />
              </div>

              <h2 className="mt-5 text-base font-semibold">
                Check new tea
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#687268]">
                Got a headline or viral claim? Check the
                receipts.
              </p>
            </Link>

            <Link
              to="/sach-ka-samna"
              className="group rounded-2xl border border-white/[0.07] bg-[#101813] p-5 transition hover:border-[#a8c686]/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-[#a8c686]">
                  <Sparkles size={18} />
                </div>

                <ArrowRight
                  size={17}
                  className="text-[#687268] transition group-hover:translate-x-1 group-hover:text-[#a8c686]"
                />
              </div>

              <h2 className="mt-5 text-base font-semibold">
                Sach Ka Samna 🔥
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#687268]">
                See today's trending claims and viral tea.
              </p>
            </Link>
          </section>

          {/* Stats */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Checks made"
              value={stats.total}
              description="Total claims you've checked"
              icon={Search}
            />

            <StatCard
              label="Likely false"
              value={stats.falseCount}
              description="Claims flagged as likely false"
              icon={CircleAlert}
            />

            <StatCard
              label="Supported"
              value={stats.supportedCount}
              description="Claims supported by evidence"
              icon={CheckCircle2}
            />

            <StatCard
              label="Avg. confidence"
              value={`${stats.averageConfidence}%`}
              description="Average verification confidence"
              icon={Sparkles}
            />
          </section>

          {/* Activity */}
          <section className="mt-8">
            <ActivityChart history={history} />
          </section>

          {/* Recent */}
          <section className="mt-8">
            <RecentChecks history={history} />
          </section>

          {/* Bottom CTA */}
          <section className="mt-12 rounded-3xl border border-white/[0.07] bg-[#101813]/70 px-6 py-10 text-center sm:px-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
              Keep questioning
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Don't just believe it.
              <br />
              Check the receipts.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#687268]">
              The internet moves fast. Your verification should
              be just as easy.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#a8c686] px-5 py-3 text-sm font-semibold text-[#07100c] transition hover:bg-[#c7e89a]"
            >
              Check the Tea
              <ArrowRight size={16} />
            </Link>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/[0.05] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-[#505850] sm:flex-row sm:text-left">
          <span>© 2026 TeaCheck</span>
          <span>
            Don't just believe it. Check the receipts.
          </span>
        </div>
      </footer>
    </div>
  );
}