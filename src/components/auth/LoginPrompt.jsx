import {
  X,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Bookmark,
} from "lucide-react";

export default function LoginPrompt({
  isOpen,
  claim,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/75
        px-5
        backdrop-blur-md
      "
    >
      <div
        className="
          relative w-full max-w-md
          overflow-hidden
          rounded-3xl
          border border-white/[0.09]
          bg-[#101813]
          shadow-2xl
        "
      >
        {/* Glow */}
        <div
          className="
            pointer-events-none
            absolute -right-24 -top-24
            h-64 w-64
            rounded-full
            bg-[#a8c686]/[0.08]
            blur-[80px]
          "
        />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-4 top-4 z-10
            flex h-9 w-9
            items-center justify-center
            rounded-full
            text-[#737b73]
            transition
            hover:bg-white/[0.06]
            hover:text-white
          "
        >
          <X size={18} />
        </button>

        <div className="relative p-7 sm:p-8">

          {/* Icon */}
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              border border-[#a8c686]/20
              bg-[#a8c686]/[0.08]
              text-xl
            "
          >
            ☕
          </div>

          {/* Heading */}
          <h2
            className="
              mt-6
              text-2xl
              font-semibold
              tracking-[-0.03em]
              text-[#f5f3ea]
            "
          >
            Your tea is ready.
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-[#858d85]
            "
          >
            Create a free account to see the full
            investigation, evidence and receipts.
          </p>

          {/* Claim */}
          {claim && (
            <div
              className="
                mt-5
                rounded-2xl
                border border-white/[0.07]
                bg-[#0b120f]
                p-4
              "
            >
              <p className="line-clamp-3 text-sm leading-6 text-[#c4c9c2]">
                "{claim}"
              </p>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            <Benefit
              icon={ShieldCheck}
              text="AI-assisted claim analysis"
            />

            <Benefit
              icon={FileCheck2}
              text="Evidence and source receipts"
            />

            <Benefit
              icon={Bookmark}
              text="Save your verification history"
            />
          </div>

          {/* Register */}
          <a
            href={`/register?claim=${encodeURIComponent(
              claim
            )}`}
            className="
              group
              mt-7
              flex w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#a8c686]
              px-5 py-3.5
              text-sm
              font-semibold
              text-[#07100c]
              transition
              hover:bg-[#c7e89a]
            "
          >
            Create a free account

            <ArrowRight
              size={16}
              className="
                transition-transform
                group-hover:translate-x-1
              "
            />
          </a>

          {/* Login */}
          <p
            className="
              mt-5
              text-center
              text-xs
              text-[#697169]
            "
          >
            Already have an account?{" "}
            <a
              href={`/login?claim=${encodeURIComponent(
                claim
              )}`}
              className="
                font-medium
                text-[#a8c686]
                hover:text-[#c7e89a]
              "
            >
              Log in
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

function Benefit({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          flex h-8 w-8
          shrink-0
          items-center justify-center
          rounded-lg
          bg-white/[0.04]
          text-[#a8c686]
        "
      >
        <Icon size={15} strokeWidth={1.7} />
      </div>

      <span className="text-xs text-[#a0a79f]">
        {text}
      </span>
    </div>
  );
}