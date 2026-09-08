import { useState } from "react";
import { ArrowRight, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NextCheck() {
  const [claim, setClaim] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedClaim = claim.trim();

    if (!trimmedClaim) {
      return;
    }

    navigate(
      `/check?claim=${encodeURIComponent(trimmedClaim)}`
    );
  };

  return (
    <section className="mt-16 border-t border-white/[0.06] pt-16">
      <div className="mx-auto max-w-3xl text-center">

        {/* Eyebrow */}
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8c686]">
          Keep investigating
        </p>

        {/* Heading */}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#f5f3ea] sm:text-4xl">
          Still got questions? 👀
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#687268]">
          Don't stop at one claim. Check another headline, post,
          article or URL before you scroll away.
        </p>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 w-full max-w-2xl"
        >
          <div className="flex flex-col rounded-2xl border border-white/[0.1] bg-[#101813]/90 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all focus-within:border-[#a8c686]/30 sm:flex-row">

            <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
              <Link2
                size={17}
                strokeWidth={1.7}
                className="shrink-0 text-[#687268]"
              />

              <input
                type="text"
                value={claim}
                onChange={(event) => setClaim(event.target.value)}
                placeholder="Paste another headline, claim or URL..."
                aria-label="Enter another claim, headline or URL"
                className="w-full bg-transparent text-sm text-[#f5f3ea] outline-none placeholder:text-[#626a62]"
              />
            </div>

            <button
              type="submit"
              disabled={!claim.trim()}
              className="group flex items-center justify-center gap-2 rounded-xl bg-[#a8c686] px-5 py-3 text-sm font-semibold text-[#07100c] transition-all hover:bg-[#c7e89a] disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
            >
              Check the Tea

              <ArrowRight
                size={16}
                strokeWidth={1.9}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          <p className="mt-3 text-[11px] text-[#505850]">
            Your next check starts immediately
          </p>
        </form>
      </div>
    </section>
  );
}