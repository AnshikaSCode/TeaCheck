import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Flame,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function TrendingCard({ claim }) {
  const navigate = useNavigate();

  const config =
    verdictConfig[claim.verdictType] ||
    verdictConfig.unverified;

  const VerdictIcon = config.icon;

  const handleCheck = () => {
  navigate(`/news/${claim.id}`);
};

  return (
    <article onClick={handleCheck} className="group rounded-2xl border border-white/[0.07] bg-[#101813] p-5 transition-all hover:border-[#a8c686]/20 hover:bg-[#111b14]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#687268]">
            {claim.category}
          </span>

          {claim.trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-400/10 px-2 py-1 text-[9px] font-medium text-orange-300">
              <Flame size={11} />
              Trending
            </span>
          )}
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] ${config.className}`}
        >
          <VerdictIcon size={11} strokeWidth={1.8} />
          {config.label}
        </span>
      </div>

      <h3 className="mt-5 text-base font-semibold leading-6 text-[#f5f3ea]">
        {claim.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#687268]">
        {claim.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#505850]">
          <span>{claim.confidence}% confidence</span>
          <span>•</span>
          <span>{claim.sources} sources</span>
          <span>•</span>
          <span>{claim.checked}</span>
        </div>

        <button
  type="button"
  onClick={(event) => {
    event.stopPropagation();
    handleCheck();
  }}
  className="group/button flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#a8c686] transition hover:text-[#c7e89a]"
>
  Read story
  <ArrowRight
    size={13}
    className="transition-transform group-hover/button:translate-x-1"
  />
</button>
      </div>
    </article>
  );
}