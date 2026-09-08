import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Info,
} from "lucide-react";

const verdictConfig = {
  false: {
    icon: AlertTriangle,
    label: "Likely False",
    description:
      "The available evidence strongly contradicts this claim.",
    color: "#ff7a72",
    background: "bg-[#ff7a72]/[0.06]",
    border: "border-[#ff7a72]/20",
  },

  supported: {
    icon: CheckCircle2,
    label: "Supported",
    description:
      "The available evidence supports this claim.",
    color: "#7bcb9b",
    background: "bg-[#7bcb9b]/[0.06]",
    border: "border-[#7bcb9b]/20",
  },

  misleading: {
    icon: Info,
    label: "Misleading",
    description:
      "The claim contains some truth but lacks important context.",
    color: "#f5a65b",
    background: "bg-[#f5a65b]/[0.06]",
    border: "border-[#f5a65b]/20",
  },

  unverified: {
    icon: HelpCircle,
    label: "Unverified",
    description:
      "There isn't enough reliable evidence to reach a conclusion.",
    color: "#e8c66a",
    background: "bg-[#e8c66a]/[0.06]",
    border: "border-[#e8c66a]/20",
  },
};

export default function VerdictCard({
  verdictType,
  confidence,
  summary,
}) {
  const config =
    verdictConfig[verdictType] ||
    verdictConfig.unverified;

  const Icon = config.icon;

  return (
    <section
      className={`
        rounded-3xl
        border
        ${config.border}
        ${config.background}
        p-6
        sm:p-8
      `}
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

        {/* Verdict */}
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-black/20
              "
            >
              <Icon
                size={24}
                style={{ color: config.color }}
                strokeWidth={1.7}
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#737b73]">
                TeaCheck verdict
              </p>

              <h2
                className="mt-1 text-2xl font-semibold sm:text-3xl"
                style={{ color: config.color }}
              >
                {config.label}
              </h2>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[#aeb5ad]">
            {summary}
          </p>
        </div>

        {/* Confidence */}
        <div className="shrink-0 text-center">
          <div
            className="
              flex h-28 w-28
              flex-col
              items-center
              justify-center
              rounded-full
              border border-white/[0.08]
              bg-[#07100c]/40
            "
          >
            <span className="text-3xl font-semibold">
              {confidence}%
            </span>

            <span className="mt-1 text-[9px] uppercase tracking-wider text-[#737b73]">
              confidence
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}