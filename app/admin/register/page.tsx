"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ShieldCheck,
  User,
  Mail,
  Lock,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function AdminRegister() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState("");

  const [success, setSuccess] = useState(false);

  /* ---------------- REGISTER ---------------- */

  async function registerAdmin() {

    setLoading(true);

    setMsg("");

    try {

      const res = await fetch("/api/admin/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password
        })

      });

      let data;

      try {

        data = await res.json();

      } catch {

        data = {
          message: "Server returned empty response"
        };

      }

      setMsg(data?.message || "Something happened");

      if (res.ok) {

        setSuccess(true);

        setTimeout(() => {

          router.push("/admin/login");

        }, 1800);

      } else {

        setSuccess(false);

      }

    } catch (error) {

      setSuccess(false);

      setMsg("Connection error");

    } finally {

      setLoading(false);

    }

  }

  /* ---------------- UI ---------------- */

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#050816] flex items-center justify-center px-5 py-10 text-white">

      {/* BACKGROUND EFFECTS */}

      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-700/20 blur-3xl rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

      </div>

      {/* CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        transition={{
          duration: 0.5
        }}
        className="relative z-10 w-full max-w-md bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8 shadow-2xl"
      >

        {/* TOP */}

        <div className="text-center mb-8">

          <motion.div
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
            className="mx-auto mb-5 w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30"
          >

            <ShieldCheck size={38} />

          </motion.div>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm mb-5">

            <Sparkles size={14} className="text-cyan-400" />

            Secure Election Administration

          </div>

          <h1 className="text-4xl font-black leading-tight">

            Admin <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Registration
            </span>

          </h1>

          <p className="text-slate-400 mt-4 text-sm leading-relaxed">
            Create a secure administrator account
            to manage the election platform.
          </p>

        </div>

        {/* ALERT MESSAGE */}

        <AnimatePresence mode="wait">

          {msg && (

            <motion.div
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0
              }}
              className={`flex items-center gap-3 p-4 rounded-2xl mb-6 border ${
                success
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                  : "bg-red-500/10 border-red-500/20 text-red-300"
              }`}
            >

              {success ? (

                <CheckCircle2 size={20} />

              ) : (

                <AlertTriangle size={20} />

              )}

              <p className="text-sm font-medium">
                {msg}
              </p>

            </motion.div>

          )}

        </AnimatePresence>

        {/* FORM */}

        <div className="space-y-5">

          {/* NAME */}

          <div>

            <label className="block text-sm font-semibold text-slate-300 mb-2">

              Full Name

            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
              />

            </div>

          </div>

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-semibold text-slate-300 mb-2">

              Email Address

            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-sm font-semibold text-slate-300 mb-2">

              Password

            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-slate-500"
              />

              <input
                type="password"
                placeholder="Create secure password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
              />

            </div>

          </div>

          {/* BUTTON */}

          <motion.button
            whileHover={{
              scale: 1.03
            }}
            whileTap={{
              scale: 0.97
            }}
            onClick={registerAdmin}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl py-4 font-bold shadow-2xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >

            {loading ? (

              <>

                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Creating Account...

              </>

            ) : (

              <>
                Register Admin
              </>

            )}

          </motion.button>

        </div>

        {/* FOOTER */}

        <div className="mt-8 pt-6 border-t border-white/10 text-center">

          <p className="text-slate-500 text-sm">
            Protected by secure election authentication
          </p>

        </div>

      </motion.div>

    </div>

  );

}