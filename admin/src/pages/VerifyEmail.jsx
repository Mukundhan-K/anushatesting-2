import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../utility/index.js";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleVerify = async () => {
    try {
      setStatus("loading");

      await Api.get(
        `/api/auth/verifybyemail/${token}`,
        { withCredentials: true }
      );

      setStatus("success");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* IDLE STATE */}
        {status === "idle" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">
              Verify your email
            </h2>
            <p className="mt-2 text-gray-500">
              Click the button below to activate your account.
            </p>
            <button
              onClick={handleVerify}
              className="mt-6 w-full rounded-xl bg-a-green py-3 text-white font-medium hover:bg-a-green/85 transition"
            >
              Verify Email
            </button>
          </>
        )}

        {/* LOADING STATE */}
        {status === "loading" && (
          <>
            <div className="mx-auto mb-6 h-14 w-14 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Verifying your email
            </h2>
            <p className="mt-2 text-gray-500">
              Please wait while we activate your account…
            </p>
          </>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <>
            <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Email verified 🎉
            </h2>
            <p className="mt-2 text-gray-500">
              Your account is now active. Redirecting to login…
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 transition"
            >
              Go to Login
            </button>
          </>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <>
            <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Verification failed
            </h2>
            <p className="mt-2 text-gray-500">
              The link is invalid or has expired.
            </p>
            <button
              onClick={() => navigate("/createuser")}
              className="mt-6 w-full rounded-xl bg-gray-800 py-3 text-white font-medium hover:bg-gray-900 transition"
            >
              Back to Signup
            </button>
          </>
        )}

      </div>
    </div>
  );
}
