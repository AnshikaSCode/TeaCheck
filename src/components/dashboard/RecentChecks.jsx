import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";

const verdictConfig = {
  false: {
    label: "Likely False",
    icon: CircleAlert,
    className: "text-red-300",
  },
  supported: {
    label: "Supported",
    icon: CheckCircle2,
    className: "text-[#a8c686]",
  },
  misleading: {
    label: "Misleading",
    icon: CircleAlert,
    className: "text-amber-300",
  },
  unverified: {
    label: "Unverified",
    icon: HelpCircle,
    className: "text-sky-300",
  },
};

export default function RecentChecks({ history = [] }) {
  const recentChecks = history.slice(0, 5);

  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#101813] p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8c686]">
            Recent
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#f5f3ea]">
            Recent checks
          </h2>
        </div>

        {history.length > 0 && (
          <Link
            to="/history"
            className="group flex items-center gap-1 text-xs text-[#687268] transition hover:text-[#a8c686]"
          >
            View all
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </div>

      {recentChecks.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-white/[0.08] px-5 py-10 text-center">
          <p className="text-sm font-medium text-[#b7beb6]">
            No checks yet.
          </p>

          <p className="mt-2 text-xs leading-5 text-[#505850]">
            Your recent TeaCheck investigations will appear here.
          </p>

          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#a8c686] px-4 py-2.5 text-xs font-semibold text-[#07100c] transition hover:bg-[#c7e89a]"
          >
            Check your first claim
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-white/[0.06]">
          {recentChecks.map((item) => {
            const config =
              verdictConfig[item.verdictType] ||
              verdictConfig.unverified;

            const VerdictIcon = config.icon;

            return (
              <Link
                key={item.id}
                to={`/result/${encodeURIComponent(
                  item.id
                )}?claim=${encodeURIComponent(item.claim)}`}
                className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ${config.className}`}
                >
                  <VerdictIcon
                    size={16}
                    strokeWidth={1.7}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#dfe4dd] transition group-hover:text-[#c7e89a]">
                    {item.claim}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[#505850]">
                    <span>{config.label}</span>
                    <span>•</span>
                    <span>{formatDate(item.lastChecked)}</span>
                    <span>•</span>
                    <span>{item.confidence}% confidence</span>
                  </div>
                </div>

                <ArrowRight
                  size={15}
                  className="shrink-0 text-[#3e483f] transition group-hover:translate-x-1 group-hover:text-[#a8c686]"
                />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}