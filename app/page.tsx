"use client";

import Link from "next/link";
import {
  Landmark,
  Vote,
  ArrowRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Globe2,
  BellRing,
  ChevronRight,
  BadgeCheck,
  BarChart3
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

import AboutSection from "./components/AboutSection";
import RulesSection from "./components/RulesSection";

export default function GovernmentElectionPortal() {

  const [celebrationMode, setCelebrationMode] = useState(false);

  const triggerCelebration = () => {

    setCelebrationMode(true);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });

    setTimeout(() => setCelebrationMode(false), 3500);

  };

  const platformHighlights = [
    {
      title: "Secure by Design",
      desc: "End-to-end protection for voter data, ballots, and reporting integrity.",
      icon: <ShieldCheck size={30}/>
    },
    {
      title: "Verified Participation",
      desc: "Controlled access with strong identity validation and voter authorization.",
      icon: <BadgeCheck size={30}/>
    },
    {
      title: "Clear Reporting",
      desc: "Audit-ready transparency with concise reporting and operational insights.",
      icon: <BarChart3 size={30}/>
    }
  ];

  return (

    <div className="min-h-screen bg-slate-100 overflow-hidden text-slate-900">

      {/* ---------------- TOP GOVERNMENT BAR ---------------- */}

      <div className="bg-slate-950 text-white border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-bold text-slate-300">

            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>

            Official Digital Voting Platform

          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-semibold text-slate-400">

            <button className="hover:text-white transition">
              Accessibility
            </button>

            <button className="hover:text-white transition">
              English | Español | Français
            </button>

            <button
              onClick={triggerCelebration}
              className="flex items-center gap-1 hover:text-emerald-400 transition"
            >
              <BadgeCheck size={12}/>
              Democracy Day
            </button>

          </div>

        </div>

      </div>

      {/* ---------------- NAVBAR ---------------- */}

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-950 flex items-center justify-center text-white shadow-xl"
            >
              <Landmark size={30}/>
            </motion.div>

            <div>

              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                Election Commission
              </h1>

              <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-slate-500">
                Secure National Voting Infrastructure
              </p>

            </div>

          </div>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-bold text-slate-600">

            <Link href="/" className="text-blue-900">
              Home
            </Link>

            <a href="#process" className="hover:text-blue-900 transition">
              Process
            </a>

            <a href="#about" className="hover:text-blue-900 transition">
              About
            </a>

            <a href="#security" className="hover:text-blue-900 transition">
              Security
            </a>

            <Link href="/admin/login">

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-blue-900 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-800 transition"
              >
                Administrator Login
              </motion.button>

            </Link>

          </nav>

        </div>

      </header>

      {/* ---------------- HERO ---------------- */}

      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28 px-6 overflow-hidden">

        {/* BACKGROUND GRID */}

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        {/* GLOW */}

        <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-600/20 blur-[140px] rounded-full"/>

        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-emerald-500/10 blur-[140px] rounded-full"/>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-100 text-xs font-black uppercase tracking-[0.18em] mb-8"
            >

              <Globe2 size={14}/>

              Secure Voting Platform

            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black leading-[1.05] text-white tracking-tight"
            >

              Secure Digital
              <br/>

              <span className="text-emerald-400">
                Voting Platform
              </span>

            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-lg text-slate-300 leading-relaxed max-w-xl"
            >

              Participate in secure, modern voting with professional digital
              infrastructure built for reliable participation and clear oversight.

            </motion.p>

            {/* ACTIONS */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 mt-10"
            >

              <Link href="/votting">

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group flex items-center gap-4 px-10 py-5 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-[0.12em] shadow-[0_10px_40px_rgba(16,185,129,0.35)] transition-all"
                >

                  <Vote size={24}/>

                  Proceed To Vote

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />

                </motion.button>

              </Link>

              <Link href="/register">

                <button className="flex items-center gap-3 px-8 py-5 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl text-white font-bold hover:bg-white/20 transition">

                  <Users size={20}/>

                  Voter Registration

                </button>

              </Link>

            </motion.div>

            {/* SECURITY */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-3 text-sm text-emerald-300 font-semibold"
            >

              <ShieldCheck size={18}/>

              All election activities are encrypted and monitored securely.

            </motion.div>

          </div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >

            <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[3rem] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

              <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden border border-white/10">

                <img
                  src="/portal_image.svg"
                  alt="Election Portal"
                  className="w-full h-full object-cover opacity-90"
                />

              </div>

              {/* FLOATING CARD */}

              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4
                }}
                className="absolute -bottom-6 -left-6 bg-white rounded-3xl p-5 shadow-2xl border border-slate-200"
              >

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={28}/>
                  </div>

                  <div>

                    <p className="text-sm font-bold text-slate-500 uppercase">
                      Live Participation
                    </p>

                    <h4 className="text-2xl font-black text-slate-900">
                      98.7%
                    </h4>

                  </div>

                </div>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ---------------- PLATFORM HIGHLIGHTS ---------------- */}

      <section className="py-24 px-6 bg-slate-100">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black tracking-tight text-slate-900"
            >

              Professional Voting Technology

            </motion.h3>

            <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
              A clean, secure platform designed for modern voting operations and
              transparent management.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {platformHighlights.map((item, i) => (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group overflow-hidden bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-lg transition-all"
              >

                <div className="w-16 h-16 rounded-3xl bg-blue-900/5 flex items-center justify-center text-blue-900 mb-6">
                  {item.icon}
                </div>

                <h4 className="text-2xl font-black text-slate-900 mb-4">
                  {item.title}
                </h4>

                <p className="text-slate-500 leading-relaxed text-sm">
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ---------------- ALERT SECTION ---------------- */}

      <section
        id="security"
        className="py-20 px-6 bg-slate-950 text-white"
      >

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

          {[
            {
              icon: <ShieldCheck size={26}/>,
              title: "Encrypted Voting",
              desc: "All ballots are protected using secure digital encryption."
            },

            {
              icon: <BellRing size={26}/>,
              title: "Real-Time Monitoring",
              desc: "Election systems are monitored continuously for integrity."
            },

            {
              icon: <BadgeCheck size={26}/>,
              title: "Verified Infrastructure",
              desc: "Built under modern digital governance standards."
            }

          ].map((card, i) => (

            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl"
            >

              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-300 mb-5">
                {card.icon}
              </div>

              <h4 className="text-2xl font-black mb-3">
                {card.title}
              </h4>

              <p className="text-slate-300 leading-relaxed">
                {card.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ---------------- EXTRA SECTIONS ---------------- */}

      <AboutSection />

      <RulesSection />

      {/* ---------------- FOOTER ---------------- */}

      <footer className="bg-slate-900 border-t border-slate-800 text-white py-14 px-6">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-blue-700 flex items-center justify-center">
              <Landmark size={24}/>
            </div>

            <div>

              <h4 className="font-black uppercase tracking-tight">
                Election Commission Portal
              </h4>

              <p className="text-slate-400 text-sm">
                Government Digital Election Infrastructure
              </p>

            </div>

          </div>

          <div className="text-center lg:text-right">

            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
              Official Government Platform • 2026
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Ensuring transparent and fair democratic elections.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );

}