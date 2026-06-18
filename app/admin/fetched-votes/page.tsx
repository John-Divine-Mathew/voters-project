"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  RefreshCw,
  UserCheck,
  Calendar,
  FileText,
  ShieldCheck,
  Activity,
  Sparkles,
  Clock3,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

interface Vote {
  _id: string;
  voter: {
    name: string;
    phone: string;
    voterId: string;
  };
  nominee: {
    name: string;
    party: string;
  };
  createdAt: string;
}

export default function VotesPage() {

  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /* ---------------- FETCH VOTES ---------------- */

  const fetchVotes = async () => {

    setLoading(true);

    try {

      const res = await fetch("/api/admin/fetch-votes", {
        cache: "no-store"
      });

      const data = await res.json();

      setVotes(data.votes || []);

    } catch (error) {

      console.error("Error fetching votes:", error);

      setVotes([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchVotes();

  }, []);

  /* ---------------- FILTER ---------------- */

  const filteredVotes = votes.filter(

    (vote) =>

      vote.voter?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      vote.voter?.voterId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

  );

  /* ---------------- UI ---------------- */

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND EFFECTS */}

      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-700/20 blur-3xl rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12"
        >

          <div>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm mb-5">

              <Sparkles size={15} className="text-cyan-400" />

              Real-Time Election Monitoring

            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">

              Election Audit <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Dashboard
              </span>

            </h1>

            <p className="text-slate-400 mt-5 max-w-2xl leading-relaxed">
              Securely monitor, verify and analyze election votes
              with live transparency and advanced audit tracking.
            </p>

          </div>

          {/* REFRESH BUTTON */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={fetchVotes}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl hover:shadow-cyan-500/30 transition-all font-semibold"
          >

            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />

            Refresh Data

          </motion.button>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* TOTAL VOTES */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 relative overflow-hidden"
          >

            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full" />

            <div className="flex items-center justify-between">

              <div>

                <p className="uppercase text-xs tracking-widest text-slate-400 font-bold">
                  Total Votes
                </p>

                <h2 className="text-5xl font-black mt-3">
                  {votes.length}
                </h2>

              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">

                <UserCheck size={30} />

              </div>

            </div>

            <div className="mt-6 flex items-center gap-2 text-emerald-400 text-sm">

              <TrendingUp size={16} />

              Votes updated instantly

            </div>

          </motion.div>

          {/* SYSTEM STATUS */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="uppercase text-xs tracking-widest text-slate-400 font-bold">
                  Security Status
                </p>

                <h2 className="text-3xl font-black mt-3">
                  Protected
                </h2>

              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 shadow-xl">

                <ShieldCheck size={30} />

              </div>

            </div>

            <div className="mt-6 flex items-center gap-2 text-emerald-400 text-sm">

              <CheckCircle2 size={16} />

              Encrypted vote tracking enabled

            </div>

          </motion.div>

          {/* LIVE TRACK */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >

            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />

            <div className="flex items-center justify-between">

              <div>

                <p className="uppercase text-xs tracking-widest text-cyan-100 font-bold">
                  Live Tracking
                </p>

                <h2 className="text-3xl font-black mt-3">
                  ACTIVE
                </h2>

              </div>

              <Activity size={30} />

            </div>

            <div className="mt-6 flex items-center gap-2 text-cyan-100 text-sm">

              <Clock3 size={16} />

              Real-time election audit

            </div>

          </motion.div>

        </div>

        {/* SEARCH */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 mb-8 flex flex-col lg:flex-row justify-between gap-5"
        >

          <div className="relative w-full lg:max-w-xl">

            <Search
              className="absolute left-4 top-4 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search voter name or voter ID..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-5 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>

          <div className="flex items-center gap-2 text-slate-300 font-medium">

            <FileText size={18} />

            {filteredVotes.length} Record(s) Found

          </div>

        </motion.div>

        {/* TABLE */}

        <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[30px] overflow-hidden shadow-2xl">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-white/5 border-b border-white/10">

                <tr className="text-slate-300 uppercase text-xs tracking-widest">

                  <th className="p-5 text-left">
                    Voter
                  </th>

                  <th className="p-5 text-left">
                    Voter ID
                  </th>

                  <th className="p-5 text-left">
                    Selected Nominee
                  </th>

                  <th className="p-5 text-left">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                <AnimatePresence>

                  {filteredVotes.map((vote, i) => (

                    <motion.tr
                      key={vote._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-cyan-500/5 transition-all"
                    >

                      {/* VOTER */}

                      <td className="p-5">

                        <div>

                          <p className="font-semibold text-white">
                            {vote.voter?.name}
                          </p>

                          <p className="text-sm text-slate-400 mt-1">
                            {vote.voter?.phone}
                          </p>

                        </div>

                      </td>

                      {/* VOTER ID */}

                      <td className="p-5">

                        <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-sm">

                          {vote.voter?.voterId}

                        </span>

                      </td>

                      {/* NOMINEE */}

                      <td className="p-5">

                        <div>

                          <p className="font-semibold text-cyan-300">
                            {vote.nominee?.name}
                          </p>

                          <p className="text-sm text-slate-400 mt-1">
                            {vote.nominee?.party}
                          </p>

                        </div>

                      </td>

                      {/* DATE */}

                      <td className="p-5">

                        <div className="flex items-center gap-2 text-slate-300">

                          <Calendar size={15} />

                          {new Date(vote.createdAt).toLocaleDateString()}

                        </div>

                      </td>

                    </motion.tr>

                  ))}

                </AnimatePresence>

              </tbody>

            </table>

          </div>

          {/* EMPTY STATE */}

          {filteredVotes.length === 0 && !loading && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >

              <FileText
                size={60}
                className="mx-auto text-slate-500 mb-5"
              />

              <h2 className="text-2xl font-bold text-white mb-2">
                No Voting Records Found
              </h2>

              <p className="text-slate-400">
                Try searching with another voter ID or name.
              </p>

            </motion.div>

          )}

        </div>

      </div>

    </div>

  );

}