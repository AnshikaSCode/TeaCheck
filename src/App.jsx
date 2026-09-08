import {BrowserRouter, Routes, Route,} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckTea from "./pages/CheckTea";
import VerificationResult from "./pages/VerificationResult";
import SachKaSamna from "./pages/SachKaSamna";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import NewsDetail from "./pages/NewsDetail";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function Placeholder({ title }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07100c] px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#a8c686]">
          TeaCheck
        </p>

        <h1 className="mt-4 text-4xl font-semibold text-[#f5f3ea]">
          {title}
        </h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
        path="/dashboard"
        element={
        <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
        }
        />

        <Route
          path="/check"
          element={
            <ProtectedRoute>
              <CheckTea />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sach-ka-samna"
          element={
            <ProtectedRoute>
              <SachKaSamna />
            </ProtectedRoute>
          }
        />

        <Route
  path="/news/:id"
  element={
    <ProtectedRoute>
      <NewsDetail />
    </ProtectedRoute>
  }
/>

        <Route
        path="/history"
        element={
        <ProtectedRoute>
          <History />
          </ProtectedRoute>
        }/>


        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Placeholder title="Saved Receipts" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Placeholder title="Profile" />
            </ProtectedRoute>
          }
        />

        {/* =========================================
            VERIFICATION RESULT
        ========================================== */}

        <Route
          path="/result/:id"
          element={
            <ProtectedRoute>
              <VerificationResult />
            </ProtectedRoute>
          }
        />

        {/* =========================================
            PUBLIC ABOUT
        ========================================== */}

        <Route
          path="/about"
          element={<Placeholder title="About TeaCheck" />}
        />

        {/* =========================================
            404
        ========================================== */}

        <Route
          path="*"
          element={<Placeholder title="404" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;