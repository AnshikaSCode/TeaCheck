import useAuth from "../../hooks/useAuth";
import {
  LogOut,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const {user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#07100c]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#a8c686] text-sm font-bold text-[#07100c]">
            T
          </div>

          <span className="text-base font-semibold tracking-tight text-[#f5f3ea]">
            TeaCheck
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">

          <Link
            to="/"
            className="text-xs text-[#687268] transition hover:text-[#f5f3ea]"
          >
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/sach-ka-samna"
                className="text-xs text-[#687268] transition hover:text-[#f5f3ea]"
              >
                Sach Ka Samna 🔥
              </Link>

              <Link
                to="/dashboard"
                className="text-xs text-[#687268] transition hover:text-[#f5f3ea]"
              >
                Dashboard
              </Link>

              <Link
                to="/history"
                className="text-xs text-[#687268] transition hover:text-[#f5f3ea]"
              >
                History
              </Link>

              <button
                type="button"
                aria-label="Search"
                className="text-[#687268] transition hover:text-[#f5f3ea]"
              >
                <Search
                  size={17}
                  strokeWidth={1.7}
                />
              </button>

              <Link
              to="/profile"
              className="flex items-center gap-2 text-xs text-[#687268] transition hover:text-[#f5f3ea]"
              >
                <User
                size={15}
                strokeWidth={1.7}
                />
                
                <span>
                    {user?.name || "Profile"}
                    </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-[#687268] transition hover:text-red-300"
              >
                <LogOut
                  size={15}
                  strokeWidth={1.7}
                />
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <button
                type="button"
                aria-label="Search"
                className="text-[#687268] transition hover:text-[#f5f3ea]"
              >
                <Search
                  size={17}
                  strokeWidth={1.7}
                />
              </button>

              <Link
                to="/login"
                className="text-xs text-[#687268] transition hover:text-[#f5f3ea]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-[#a8c686] px-4 py-2 text-xs font-semibold text-[#07100c] transition hover:bg-[#c7e89a]"
              >
                Create account
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] text-[#b7beb6] transition hover:border-white/[0.12] hover:text-[#f5f3ea] md:hidden"
        >
          {menuOpen ? (
            <X size={18} />
          ) : (
            <Menu size={18} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-white/[0.05] bg-[#07100c] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-1">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-[#f5f3ea]"
            >
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/sach-ka-samna"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-[#f5f3ea]"
                >
                  Sach Ka Samna 🔥
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-[#f5f3ea]"
                >
                  Dashboard
                </Link>

                <Link
                  to="/history"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-[#f5f3ea]"
                >
                  History
                </Link>

                <button
                  type="button"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-[#f5f3ea]"
                >
                  <Search size={16} />
                  Search
                </button>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-[#f5f3ea]"
                >
                  <User size={16} />
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-red-300"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-[#f5f3ea]"
                >
                  <Search size={16} />
                  Search
                </button>

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-[#b7beb6] transition hover:bg-white/[0.04] hover:text-[#f5f3ea]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-xl bg-[#a8c686] px-4 py-3 text-center text-sm font-semibold text-[#07100c] transition hover:bg-[#c7e89a]"
                >
                  Create account
                </Link>
              </>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}