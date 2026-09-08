import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  HelpCircle,
  MinusCircle,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";

const verdictConfig = {
  false: {
    label: "Likely False",
    icon: CircleAlert,
    className: "text-red-300 bg-red-400/10 border-red-400/20",
  },
  supported: {
    label: "Supported",
    icon: CheckCircle2,
    className: "text-[#a8c686] bg-[#a8c686]/10 border-[#a8c686]/20",
  },
  misleading: {
    label: "Misleading",
    icon: CircleAlert,
    className: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  },
  unverified: {
    label: "Unverified",
    icon: HelpCircle,
    className: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  },
};

export default function HistoryItem({ item, onDelete }) {
  const navigate = useNavigate();

  const config =
    verdictConfig[item.verdictType] || {
      label: item.verdict || "Unverified",
      icon: MinusCircle,
      className:
        "text-[#b7beb6] bg-white/[0.04] border-white/[0.08]",
    };

  const VerdictIcon = config.icon;

  const handleOpen = () => {
    navigate(
      `/result/${encodeURIComponent(item.id)}?claim=${encodeURIComponent(
        item.claim
      )}`
    );
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(item.id);
  };

  return (
    <article
      onClick={handleOpen}
      className="group cursor-pointer rounded-2xl border border-white/[0.07] bg-[#101813]/70 p-5 transition-all hover:border-[#a8c686]/20 hover:bg-[#101813]"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${config.className}`}
            >
              <VerdictIcon size={12} strokeWidth={1.8} />
              {config.label}
            </span>

            <span className="text-[11px] text-[#505850]">
              {formatDate(item.lastChecked)}
            </span>
          </div>

          <h3 className="mt-4 text-base font-medium leading-6 text-[#f5f3ea] transition group-hover:text-[#c7e89a]">
            {item.claim}
          </h3>

          {item.summary && (
            <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-[#687268]">
              {item.summary}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-[#505850]">
            <span>{item.checkedSources || 0} sources checked</span>

            <span>
              {item.confidence || 0}% confidence
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete history item"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-[#505850] transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300"
          >
            <Trash2 size={15} strokeWidth={1.7} />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-[#505850] transition group-hover:border-[#a8c686]/20 group-hover:text-[#a8c686]">
            <ArrowRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </article>
  );
}