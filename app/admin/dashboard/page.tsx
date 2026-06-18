"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getToken } from "../../utils/auth";

import {
  UserCheck,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Sparkles,
  BellRing,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    voters: 0,
    nominees: 0,
    votesCast: 0,
    participation: 0
  });

  /* ---------------- VERIFY + FETCH ---------------- */

  useEffect(() => {

    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchStats = async () => {

      try {

        const res = await fetch("/api/admin/stats", {
          cache: "no-store"
        });

        const data = await res.json();

        if (data.success) {
          setStats(data.stats);
        }

      } catch (err) {
        console.error("Stats fetch failed", err);
      }

    };

    const initDashboard = async () => {

      try {

        const verify = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!verify.ok) {
          router.push("/admin/login");
        } else {
          await fetchStats();
          setLoading(false);
        }

      } catch (error) {
        console.error(error);
      }

    };

    initDashboard();

    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);

  }, [router]);

  /* ---------------- LOADING ---------------- */

  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center relative overflow-hidden">

        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse" />

        <div className="absolute w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-5 z-10"
        >

          <div className="relative">

            <div className="w-20 h-20 rounded-full border-[5px] border-blue-500/30 border-t-blue-500 animate-spin" />

            <ShieldCheck
              size={34}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400"
            />

          </div>

          <div className="text-center">

            <h2 className="text-white text-xl font-bold tracking-wide">
              Initializing Admin Control Hub
            </h2>

            <p className="text-slate-400 text-sm mt-1 animate-pulse">
              Secure election environment loading...
            </p>

          </div>

        </motion.div>

      </div>

    );
  }

  /* ---------------- STATS ---------------- */

  const statItems = [

    {
      label: "Total Voters",
      value: stats.voters,
      icon: <Users size={24} />,
      gradient: "from-cyan-500 to-blue-600"
    },

    {
      label: "Nominees",
      value: stats.nominees,
      icon: <UserCheck size={24} />,
      gradient: "from-purple-500 to-indigo-600"
    },

    {
      label: "Votes Cast",
      value: stats.votesCast,
      icon: <CheckCircle2 size={24} />,
      gradient: "from-emerald-500 to-green-600"
    }

  ];

  /* ---------------- NAVIGATION ---------------- */

  const cards = [

    {
      title: "Manage Nominees",
      desc: "Create, edit and organize election nominees securely.",
      icon: <UserCheck size={28} />,
      path: "/admin/nominee",
      glow: "group-hover:shadow-blue-500/40"
    },

    {
      title: "Register Voters",
      desc: "Add eligible voters and manage authentication access.",
      icon: <Users size={28} />,
      path: "/admin/register-voters",
      glow: "group-hover:shadow-purple-500/40"
    },

    {
      title: "Election Results",
      desc: "Track live analytics and visualize election outcomes.",
      icon: <BarChart3 size={28} />,
      path: "/admin/fetched-votes",
      glow: "group-hover:shadow-emerald-500/40"
    }

  ];

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND EFFECTS */}

      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-10"
      >

        {/* HEADER */}

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12"
        >

          <div>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm mb-5">

              <Sparkles size={16} className="text-cyan-400" />

              AI Powered Election Dashboard

            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">

              Admin Command <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Control Center
              </span>

            </h1>

            <p className="text-slate-400 mt-5 max-w-2xl leading-relaxed">
              Monitor election activities, manage voters, track nominees
              and visualize live analytics through a secure futuristic dashboard.
            </p>

          </div>

          {/* LIVE STATUS */}

          <motion.div
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 w-full lg:w-[320px]"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-sm text-slate-400">
                  System Status
                </p>

                <h3 className="text-xl font-bold mt-1">
                  All Systems Active
                </h3>

              </div>

              <BellRing className="text-cyan-400" />

            </div>

            <div className="space-y-4">

              <div>

                <div className="flex justify-between text-sm mb-1">

                  <span className="text-slate-400">
                    Security Health
                  </span>

                  <span className="text-emerald-400">
                    98%
                  </span>

                </div>

                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"
                  />

                </div>

              </div>

              <div className="flex items-center gap-2 text-sm text-cyan-300">

                <Activity size={16} />

                Real-time monitoring enabled

              </div>

            </div>

          </motion.div>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

          {statItems.map((stat, index) => (

            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                scale: 1.04,
                rotate: 1
              }}
              className="group relative overflow-hidden bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6"
            >

              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-gradient-to-br ${stat.gradient}`} />

              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg mb-6`}>
                {stat.icon}
              </div>

              <p className="text-slate-400 uppercase text-xs tracking-widest font-semibold">
                {stat.label}
              </p>

              <h2 className="text-4xl font-black mt-2">
                {stat.value}
              </h2>

              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium">

                <TrendingUp size={16} />

                Live Updated

              </div>

            </motion.div>

          ))}

          {/* PARTICIPATION */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.04 }}
            className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-2xl"
          >

            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

            <p className="uppercase text-xs tracking-widest font-bold text-cyan-100">
              Turnout Rate
            </p>

            <h2 className="text-5xl font-black mt-3">
              {stats.participation}%
            </h2>

            <div className="mt-6 flex items-center gap-2 text-cyan-100">

              <Activity size={18} />

              Election participation analytics

            </div>

          </motion.div>

        </div>

        {/* ACTION CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {cards.map((card, index) => (

            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              onClick={() => router.push(card.path)}
              className={`group relative overflow-hidden bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[30px] p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl ${card.glow}`}
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/5 to-cyan-500/10" />

              <div className="relative z-10">

                <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl mb-6 group-hover:scale-110 transition">

                  {card.icon}

                </div>

                <h2 className="text-2xl font-bold mb-3">
                  {card.title}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  {card.desc}
                </p>

                <div className="flex items-center text-cyan-300 font-semibold group-hover:gap-3 transition-all">

                  Open Dashboard

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.div>

    </div>

  );

}