"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, CreditCard, Calendar, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VoterRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    aadhar: "",
    dob: "",
    address: "",
    gender: "Male",
  });
  const [generatedId, setGeneratedId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    setLoading(true);
    try {
      const res = await fetch("/api/voters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setGeneratedId(data.data.voterId);
      setMessage("Registration completed successfully.");
      setTimeout(() => {
        router.push("/voter/login");
      }, 2200);
    } catch (err) {
      setError("Unable to complete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/40"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black">Voter Registration</h1>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
            Create a secure voter account using your email, password, and official identification details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
                  placeholder="Secure password"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Phone</label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
                  placeholder="10 digit phone"
                  required
                  maxLength={10}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Aadhar</label>
              <div className="relative">
                <CreditCard className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
                  placeholder="12 digit Aadhar"
                  required
                  maxLength={12}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-300">Address</label>
              <div className="relative">
                <MapPin className="absolute top-4 left-4 text-slate-400" size={18} />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 p-4 pl-12 text-white outline-none focus:border-cyan-500 min-h-[120px]"
                  placeholder="Street, city, state, pin code"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-300">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-4 px-5 text-white outline-none focus:border-cyan-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-300">
              {message} You will be redirected to login shortly.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-cyan-500 px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Registering...
              </span>
            ) : (
              "Create Voter Account"
            )}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already registered?{' '}
            <Link href="/voter/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Login here
            </Link>
          </p>
        </form>

        {generatedId && (
          <div className="mt-8 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-slate-100">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Your digital voter ID</p>
            <p className="mt-4 text-3xl font-black text-white">{generatedId}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
