import React, { useEffect, useMemo, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { app } from "../firebase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [plan, setPlan] = useState("basic");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const auth = getAuth(app);

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const p = params.get("plan");
    if (p && ["basic", "pro", "premium"].includes(p)) {
      setPlan(p);
    }
  }, [location.search]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the terms to continue.");
      return;
    }
    try {
      setSubmitting(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }} className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center justify-center text-indigo-600 text-xl font-bold">
            KanaLearn
          </Link>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">Create your account</h2>
          <p className="mt-1 text-sm text-gray-600">Start learning kana faster</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Create a password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="basic">Basic — $0/mo</option>
              <option value="pro">Pro — $5/mo</option>
              <option value="premium">Premium — $10/mo</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            I agree to the Terms and Privacy.
          </label>

          <button type="submit" disabled={submitting || !agree} className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-medium shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60">
            {submitting ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
        </div>
      </div>
    </motion.div>
  );
}
