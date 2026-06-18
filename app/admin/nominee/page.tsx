"use client";

import { useState, useEffect } from "react";

import {
  UserPlus,
  Flag,
  CheckCircle,
  Loader2,
  AlertTriangle,
  Edit,
  Trash2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Crown,
  Activity,
  Users,
  BadgeCheck
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

interface Nominee {
  _id: string;
  name: string;
  party: string;
}

export default function AddNominee() {

  const [data, setData] = useState({
    name: "",
    party: ""
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  const [nominees, setNominees] = useState<Nominee[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH NOMINEES ---------------- */

  const fetchNominees = async () => {

    setLoading(true);

    try {

      const res = await fetch("/api/nominees", {
        cache: "no-store"
      });

      const result = await res.json();

      if (result.success) {
        setNominees(result.data);
      }

    } catch (error) {

      console.error("Error fetching nominees:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchNominees();

  }, []);

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setStatus("loading");

    setMessage("");

    try {

      const method = editingId ? "PUT" : "POST";

      const body = editingId
        ? { id: editingId, ...data }
        : data;

      const res = await fetch("/api/nominees", {

        method,

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(body)

      });

      const result = await res.json();

      if (res.ok) {

        setStatus("success");

        setMessage(
          editingId
            ? "Nominee updated successfully!"
            : "Nominee registered successfully!"
        );

        setData({
          name: "",
          party: ""
        });

        setEditingId(null);

        fetchNominees();

        setTimeout(() => {
          setStatus("idle");
        }, 4000);

      } else {

        throw new Error(result.message);

      }

    } catch (err: any) {

      setStatus("error");

      setMessage(
        err.message || "Something went wrong"
      );

    }

  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = (nominee: Nominee) => {

    setData({
      name: nominee.name,
      party: nominee.party
    });

    setEditingId(nominee._id);

    setStatus("idle");

    setMessage("");

  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this nominee?")) return;

    try {

      const res = await fetch("/api/nominees", {

        method: "DELETE",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ id })

      });

      if (res.ok) {

        setStatus("success");

        setMessage("Nominee removed successfully!");

        fetchNominees();

        setTimeout(() => {
          setStatus("idle");
        }, 3000);

      }

    } catch (err: any) {

      setStatus("error");

      setMessage(err.message);

    }

  };

  /* ---------------- CANCEL ---------------- */

  const handleCancel = () => {

    setData({
      name: "",
      party: ""
    });

    setEditingId(null);

    setStatus("idle");

    setMessage("");

  };

  /* ---------------- UI ---------------- */

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white px-5 py-10">

      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-700/20 blur-3xl rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm mb-5">

            <Sparkles size={15} className="text-cyan-400" />

            Election Candidate Management

          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight">

            Nominee Control <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Administration Panel
            </span>

          </h1>

          <p className="text-slate-400 mt-5 max-w-2xl leading-relaxed">
            Securely manage election nominees, update candidate
            information and monitor registered participants in real-time.
          </p>

        </motion.div>

        {/* TOP CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* TOTAL */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="uppercase text-xs tracking-widest text-slate-400 font-bold">
                  Total Nominees
                </p>

                <h2 className="text-5xl font-black mt-3">
                  {nominees.length}
                </h2>

              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">

                <Users size={28} />

              </div>

            </div>

            <div className="mt-5 flex items-center gap-2 text-cyan-300 text-sm">

              <Activity size={15} />

              Live candidate tracking

            </div>

          </motion.div>

          {/* SECURITY */}

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

                <ShieldCheck size={28} />

              </div>

            </div>

            <div className="mt-5 flex items-center gap-2 text-emerald-400 text-sm">

              <BadgeCheck size={15} />

              Secure nominee management

            </div>

          </motion.div>

          {/* STATUS */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="uppercase text-xs tracking-widest text-cyan-100 font-bold">
                  Election Status
                </p>

                <h2 className="text-3xl font-black mt-3">
                  ACTIVE
                </h2>

              </div>

              <Crown size={30} />

            </div>

            <div className="mt-5 flex items-center gap-2 text-cyan-100 text-sm">

              <Activity size={15} />

              Candidate registration enabled

            </div>

          </motion.div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* FORM */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8"
          >

            <div className="flex items-center gap-4 mb-8">

              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">

                <UserPlus size={26} />

              </div>

              <div>

                <h2 className="text-3xl font-black">

                  {editingId
                    ? "Edit Nominee"
                    : "Register Nominee"}

                </h2>

                <p className="text-slate-400 mt-1">
                  Election candidate registration portal
                </p>

              </div>

            </div>

            {/* ALERTS */}

            <AnimatePresence mode="wait">

              {status === "success" && (

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-2xl mb-6"
                >

                  <CheckCircle size={20} />

                  <p className="text-sm font-medium">
                    {message}
                  </p>

                </motion.div>

              )}

              {status === "error" && (

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-2xl mb-6"
                >

                  <AlertTriangle size={20} />

                  <p className="text-sm font-medium">
                    {message}
                  </p>

                </motion.div>

              )}

            </AnimatePresence>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-300 mb-2">

                  Candidate Name

                </label>

                <input
                  type="text"
                  placeholder="Enter nominee name"
                  value={data.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      name: e.target.value
                    })
                  }
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
                />

              </div>

              {/* PARTY */}

              <div>

                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">

                  <Flag size={14} />

                  Political Party

                </label>

                <input
                  type="text"
                  placeholder="Enter political party"
                  value={data.party}
                  onChange={(e) =>
                    setData({
                      ...data,
                      party: e.target.value
                    })
                  }
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex gap-4 pt-3">

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl py-4 font-bold shadow-2xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-3"
                >

                  {status === "loading" ? (

                    <>

                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Processing...

                    </>

                  ) : (

                    <>
                      {editingId
                        ? "Update Nominee"
                        : "Register Nominee"}
                    </>

                  )}

                </motion.button>

                {editingId && (

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
                  >

                    Cancel

                  </button>

                )}

              </div>

            </form>

          </motion.div>

          {/* NOMINEE LIST */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8"
          >

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-black">
                  Registered Nominees
                </h2>

                <p className="text-slate-400 mt-1">
                  Live election candidate records
                </p>

              </div>

              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                onClick={fetchNominees}
                className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
              >

                <RefreshCw
                  size={20}
                  className={loading ? "animate-spin" : ""}
                />

              </motion.button>

            </div>

            {/* LIST */}

            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">

              {nominees.length === 0 ? (

                <div className="text-center py-20">

                  <UserPlus
                    size={55}
                    className="mx-auto text-slate-500 mb-4"
                  />

                  <h3 className="text-xl font-bold">
                    No Nominees Found
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Register your first election nominee.
                  </p>

                </div>

              ) : (

                nominees.map((nominee, index) => (

                  <motion.div
                    key={nominee._id}
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: index * 0.05
                    }}
                    whileHover={{
                      scale: 1.02
                    }}
                    className="group bg-white/5 border border-white/10 rounded-3xl p-5 hover:border-cyan-400/30 transition-all"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="text-xl font-bold text-white">

                          {nominee.name}

                        </h3>

                        <p className="text-cyan-300 mt-1">

                          {nominee.party}

                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        {/* EDIT */}

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            handleEdit(nominee)
                          }
                          className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition"
                        >

                          <Edit size={18} />

                        </motion.button>

                        {/* DELETE */}

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            handleDelete(nominee._id)
                          }
                          className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition"
                        >

                          <Trash2 size={18} />

                        </motion.button>

                      </div>

                    </div>

                  </motion.div>

                ))

              )}

            </div>

          </motion.div>

        </div>

      </div>

    </div>

  );

}