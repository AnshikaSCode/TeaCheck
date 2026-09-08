import {
  ArrowUpRight,
  Check,
  Minus,
  X,
} from "lucide-react";

const typeConfig = {
  supporting: {
    label: "Supports",
    icon: Check,
    color: "#7bcb9b",
  },

  contradicting: {
    label: "Contradicts",
    icon: X,
    color: "#ff7a72",
  },

  neutral: {
    label: "Context",
    icon: Minus,
    color: "#e8c66a",
  },
};

export default function EvidenceCard({ evidence }) {
  const config =
    typeConfig[evidence.type] ||
    typeConfig.neutral;

  const Icon = config.icon;

  return (
    <article
      className="
        rounded-2xl
        border border-white/[0.07]
        bg-[#101813]
        p-5
        transition
        hover:border-white/[0.13]
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/20"
            style={{
              color: config.color,
            }}
          >
            <Icon size={17} />
          </div>

          <div>
            <p className="text-xs font-medium text-[#c2c8c0]">
              {evidence.source}
            </p>

            <p
              className="mt-0.5 text-[10px]"
              style={{ color: config.color }}
            >
              {config.label}
            </p>
          </div>
        </div>

        <span className="text-[10px] text-[#596159]">
          {evidence.date}
        </span>
      </div>

      {/* Content */}
      <h3 className="mt-5 text-sm font-medium leading-6 text-[#f5f3ea]">
        {evidence.title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[#737b73]">
        {evidence.description}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <div>
          <span className="text-[10px] text-[#596159]">
            Source reliability
          </span>

          <span className="ml-2 text-[10px] font-medium text-[#aeb5ad]">
            {evidence.reliability}%
          </span>
        </div>

        <button
          className="
            flex items-center gap-1
            text-[10px]
            text-[#737b73]
            transition
            hover:text-[#a8c686]
          "
        >
          View source
          <ArrowUpRight size={12} />
        </button>
      </div>
    </article>
  );
}