import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import useAuth from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const claim = searchParams.get("claim") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Temporary frontend authentication.
    // Real authentication will be connected to the backend later.
    login({
        name: trimmedName,
        email: trimmedEmail,
        isNewUser: true,
});

    /*
      If the user originally entered a claim,
      preserve it and continue to verification.
    */
    if (claim) {
      navigate(
        `/check?claim=${encodeURIComponent(claim)}`
      );
      return;
    }

    /*
      Normal registration:
      go to Home instead of Dashboard.
    */
    navigate("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07100c] px-5 py-10">
      <div className="w-full max-w-md">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-[#6f776f] transition hover:text-[#a8c686]"
        >
          <ArrowLeft size={14} strokeWidth={1.8} />
          Back to TeaCheck
        </Link>

        {/* Card */}
        <div className="mt-8 rounded-3xl border border-white/[0.08] bg-[#101813] p-7 sm:p-9">

          {/* Brand */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a8c686] font-black text-[#07100c]">
            T
          </div>

          <h1 className="mt-7 text-3xl font-semibold tracking-[-0.04em] text-[#f5f3ea]">
            Join TeaCheck.
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#737b73]">
            Create your account and uncover the receipts.
          </p>

          {/* Claim notice */}
          {claim && (
            <div className="mt-6 rounded-xl border border-[#a8c686]/15 bg-[#a8c686]/[0.05] p-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#a8c686]">
                Your claim is saved
              </p>

              <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#aeb6ad]">
                {claim}
              </p>

              <p className="mt-2 text-[10px] text-[#596259]">
                After creating your account, we'll continue checking
                this claim.
              </p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >
            <Input
              label="Name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={setName}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={setPassword}
              required
            />

            {error && (
              <p className="rounded-xl border border-red-400/15 bg-red-400/[0.05] px-4 py-3 text-xs text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#a8c686] px-5 py-3.5 text-sm font-semibold text-[#07100c] transition hover:bg-[#c7e89a]"
            >
              Create Account

              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-xs text-[#697169]">
            Already have an account?{" "}

            <Link
              to={`/login${
                claim
                  ? `?claim=${encodeURIComponent(claim)}`
                  : ""
              }`}
              className="text-[#a8c686] transition hover:text-[#c7e89a]"
            >
              Log in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-[10px] text-[#4e574f]">
          TEACHECK · EVIDENCE OVER EVERYTHING
        </p>
      </div>
    </main>
  );
}

function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-[#858d85]">
        {label}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        className="w-full rounded-xl border border-white/[0.08] bg-[#0b120f] px-4 py-3 text-sm text-[#f5f3ea] outline-none transition placeholder:text-[#555e56] focus:border-[#a8c686]/40"
      />
    </label>
  );
}