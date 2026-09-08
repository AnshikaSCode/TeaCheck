import { useState } from "react";
import { ArrowRight, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LoginPrompt from "../auth/LoginPrompt";
import useAuth from "../../hooks/useAuth";

export default function ClaimInput() {
  const [claim, setClaim] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedClaim = claim.trim();

    if (!trimmedClaim) {
      return;
    }

    // Guest user
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    // Authenticated user
    navigate(
      `/check?claim=${encodeURIComponent(trimmedClaim)}`
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="flex flex-col rounded-2xl border border-white/[0.1] bg-[#101813]/90 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all focus-within:border-[#a8c686]/30 sm:flex-row">

          {/* Input */}
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
              placeholder="Paste a headline, claim or URL..."
              aria-label="Enter a claim, headline or URL"
              className="w-full bg-transparent text-sm text-[#f5f3ea] outline-none placeholder:text-[#626a62]"
            />
          </div>

          {/* Check button */}
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

        <p className="mt-3 text-center text-[11px] text-[#555e56]">
          Try a headline, viral claim, article or URL
        </p>
      </form>

      {/* Login/Register gate for guests */}
      <LoginPrompt
        isOpen={showLoginPrompt}
        claim={claim}
        onClose={() => setShowLoginPrompt(false)}
      />
    </>
  );
}