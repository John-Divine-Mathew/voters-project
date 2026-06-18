"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { saveVoterToken } from "../../utils/auth";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VoterLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/voters/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        saveVoterToken(data.token);
        router.push("/votting");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Unable to login right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/40"
      >
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80 font-semibold">
            Voter Access
          </p>
          <h1 className="mt-4 text-4xl font-black text-white">
            Voter Login
          </h1>
          <p className="mt-3 text-slate-400 text-sm">
            Enter the email and password created during voter registration.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Email</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-12 pr-12 text-white outline-none focus:border-cyan-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {message && (
            <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300">
              {message}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-3xl bg-cyan-500 px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm text-slate-400">
            Don’t have an account?{' '}
            <Link href="/voter/register" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Register now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
