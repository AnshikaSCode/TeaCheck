import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import VerificationLoader from "../components/verification/VerificationLoader";

export default function CheckTea() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const claim =
    searchParams.get("claim") ||
    "A new law will give every citizen free smartphones.";

  const handleComplete = useCallback(() => {
    navigate(
      `/result/demo?claim=${encodeURIComponent(claim)}`
    );
  }, [claim, navigate]);

  return (
    <div className="min-h-screen bg-[#07100c]">
      <Navbar />

      <main>
        <VerificationLoader onComplete={handleComplete} />
      </main>
    </div>
  );
}