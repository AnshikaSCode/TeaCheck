import { useEffect, useState } from "react";
import {
  Search,
  Brain,
  GitCompare,
  ReceiptText,
  Check,
} from "lucide-react";

const stages = [
  {
    label: "Searching sources",
    icon: Search,
  },
  {
    label: "Analyzing evidence",
    icon: Brain,
  },
  {
    label: "Comparing claims",
    icon: GitCompare,
  },
  {
    label: "Preparing receipts",
    icon: ReceiptText,
  },
];

export default function VerificationLoader({ onComplete }) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((current) => {
        if (current >= stages.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete();
          }, 900);

          return current;
        }

        return current + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">

        {/* Loader */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#a8c686]/20 bg-[#101813] shadow-2xl shadow-black/20">
          <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-[#a8c686]/10">
            <Search
              size={24}
              strokeWidth={1.6}
              className="text-[#a8c686]"
            />
          </div>
        </div>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.22em] text-[#a8c686]">
          TeaCheck
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#f5f3ea] sm:text-4xl">
          Investigating the tea...
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#737b73]">
          We’re checking available sources, comparing evidence,
          and putting together the receipts.
        </p>

        {/* Stages */}
        <div className="mt-10 space-y-3 text-left">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isComplete = index < activeStage;
            const isActive = index === activeStage;

            return (
              <div
                key={stage.label}
                className={`flex items-center gap-4 rounded-2xl border px-4 py-4 transition-all duration-500 ${
                  isActive || isComplete
                    ? "border-[#a8c686]/20 bg-[#101813]"
                    : "border-white/[0.05] bg-white/[0.015]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isComplete
                      ? "bg-[#a8c686] text-[#07100c]"
                      : isActive
                        ? "bg-[#a8c686]/10 text-[#a8c686]"
                        : "bg-white/[0.04] text-[#505850]"
                  }`}
                >
                  {isComplete ? (
                    <Check size={17} strokeWidth={2.2} />
                  ) : (
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                      className={isActive ? "animate-pulse" : ""}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      isActive || isComplete
                        ? "text-[#f5f3ea]"
                        : "text-[#555e56]"
                    }`}
                  >
                    {stage.label}
                  </p>

                  {isActive && (
                    <p className="mt-1 text-xs text-[#687268]">
                      Working on it...
                    </p>
                  )}
                </div>

                {isComplete && (
                  <span className="text-xs text-[#8fa873]">
                    Done
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-[11px] text-[#505850]">
          This demo uses simulated verification for now.
        </p>
      </div>
    </div>
  );
}