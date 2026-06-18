"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  Vote,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  Sparkles,
  UserCheck,
  Loader2,
  Fingerprint,
  Check,
  Activity,
  Globe2
} from "lucide-react";

import { getVoterToken } from "../utils/auth";

import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/Header";

/* ---------------- TYPES ---------------- */

interface Nominee {
  _id: string;
  name: string;
  party: string;
}

/* ---------------- COMPONENT ---------------- */

export default function VotingWizard() {

  const router = useRouter();

  const [step, setStep] = useState(1);

  const [voterIdInput, setVoterIdInput] =
    useState("");

  const [nominees, setNominees] =
    useState<Nominee[]>([]);

  const [selectedNominee, setSelectedNominee] =
    useState<Nominee | null>(null);

  const [status, setStatus] = useState({
    type: "",
    msg: ""
  });

  const [voterName, setVoterName] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] =
    useState(false);

  /* ---------------- VERIFY + FETCH NOMINEES ---------------- */

  useEffect(() => {
    const token = getVoterToken();

    if (!token) {
      router.push("/voter/login");
      return;
    }

    const verifyVoter = async () => {
      try {
        const res = await fetch("/api/voters/verify", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: "no-store"
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          router.push("/voter/login");
          return;
        }

        setVoterName(data.voter.name || "");
        setVoterIdInput(data.voter.voterId || "");
      } catch (error) {
        console.error(error);
        router.push("/voter/login");
      } finally {
        setAuthLoading(false);
      }
    };

    const fetchNominees = async () => {
      try {
        const res = await fetch("/api/nominees");
        const result = await res.json();
        setNominees(result.data || []);
      } catch (err) {
        console.error("Failed to load nominees");
      }
    };

    verifyVoter();
    fetchNominees();
  }, [router]);

  /* ---------------- STEPS ---------------- */

  const next = () => {

    if (step < 4) {
      setStep((prev) => prev + 1);
    }

  };

  const back = () => {

    if (step > 1) {
      setStep((prev) => prev - 1);
    }

  };

  /* ---------------- SUBMIT ---------------- */

  const submitVote = async () => {

    setLoading(true);

    setStatus({
      type: "",
      msg: ""
    });

    try {

      const res = await fetch("/api/vote", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          voterIdString:
            voterIdInput.trim(),

          nomineeId:
            selectedNominee!._id

        })

      });

      const data = await res.json();

      if (res.ok) {

        setStep(4);

      } else {

        setStatus({
          type: "error",
          msg: data.message
        });

      }

    } catch {

      setStatus({
        type: "error",
        msg: "Server connection failed"
      });

    } finally {

      setLoading(false);

    }

  };

  /* ---------------- PROGRESS ---------------- */

  const progress = (step / 4) * 100;

  /* ---------------- UI ---------------- */

  return (

    <>
      <Header />

      <div className="relative min-h-screen overflow-hidden bg-[#040816] text-white">

        {/* BACKGROUND */}

        <div className="absolute inset-0">

          <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-3xl" />

          <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-700/20 rounded-full blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-14">

          {/* HERO */}

          <motion.div
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="mb-12"
          >

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm mb-5">

              <Sparkles
                size={15}
                className="text-cyan-400"
              />

              Secure Digital Election System

            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">

              National Voting <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">

                Portal System

              </span>

            </h1>

            <p className="text-slate-400 mt-5 max-w-2xl leading-relaxed">

              Exercise your democratic right
              through a modern, encrypted,
              and secure online election system.

            </p>

          </motion.div>

          {/* TOP CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="uppercase text-xs tracking-widest text-slate-400 font-bold">

                    Security Status

                  </p>

                  <h2 className="text-3xl font-black mt-3">

                    Protected

                  </h2>

                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600">

                  <ShieldCheck size={28} />

                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-emerald-300 text-sm">

                <BadgeCheck size={15} />

                End-to-end encryption enabled

              </div>

            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="uppercase text-xs tracking-widest text-slate-400 font-bold">

                    Active Election

                  </p>

                  <h2 className="text-3xl font-black mt-3">

                    LIVE

                  </h2>

                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600">

                  <Activity size={28} />

                </div>

              </div>

              <div className="mt-5 flex items-center gap-2 text-cyan-300 text-sm">

                <Globe2 size={15} />

                Real-time voting session

              </div>

            </div>

            <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl">

              <div className="flex justify-between items-center">

                <div>

                  <p className="uppercase text-xs tracking-widest text-cyan-100 font-bold">

                    Verification

                  </p>

                  <h2 className="text-3xl font-black mt-3">

                    Enabled

                  </h2>

                </div>

                <Fingerprint size={30} />

              </div>

              <div className="mt-5 flex items-center gap-2 text-cyan-100 text-sm">

                <UserCheck size={15} />

                Digital identity verification

              </div>

            </div>

          </div>

          {/* MAIN CONTAINER */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[35px] overflow-hidden"
          >

            {/* TOP HEADER */}

            <div className="p-8 border-b border-white/10">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                <div>

                  <div className="flex items-center gap-3 mb-2">

                    <Vote className="text-cyan-400" />

                    <h2 className="text-3xl font-black">

                      Voting Wizard

                    </h2>

                  </div>

                  <p className="text-slate-400">

                    Complete the voting process
                    securely in a few steps.

                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-400 mb-2">

                    Progress

                  </p>

                  <div className="w-60 h-3 rounded-full bg-white/10 overflow-hidden">

                    <motion.div
                      animate={{
                        width: `${progress}%`
                      }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* CONTENT */}

            <div className="p-8 md:p-10">

              {/* ERROR */}

              <AnimatePresence>

                {status.msg && (

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
                    className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-2xl"
                  >

                    <AlertTriangle size={20} />

                    {status.msg}

                  </motion.div>

                )}

              </AnimatePresence>

              {/* STEP 1 */}

              {step === 1 && (

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  className="space-y-8"
                >

                  <div>

                    <h2 className="text-4xl font-black mb-3">

                      Verify Your Identity

                    </h2>

                    <p className="text-slate-400">

                      Enter your digital voter ID
                      to continue the election process.

                    </p>

                  </div>

                  <div className="relative">

                    <Fingerprint
                      size={20}
                      className="absolute left-5 top-5 text-slate-500"
                    />

                    <input
                      type="text"
                      placeholder="Enter Voter ID"
                      value={voterIdInput}
                      onChange={(e) =>
                        setVoterIdInput(
                          e.target.value.toUpperCase()
                        )
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-5 outline-none text-white font-mono tracking-widest placeholder:text-slate-500 focus:border-cyan-400 transition"
                    />

                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    whileTap={{
                      scale: 0.97
                    }}
                    onClick={next}
                    disabled={
                      !voterIdInput.trim()
                    }
                    className="w-full py-5 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg shadow-2xl hover:shadow-cyan-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >

                    Continue Verification

                    <ArrowRight size={20} />

                  </motion.button>

                </motion.div>

              )}

              {/* STEP 2 */}

              {step === 2 && (

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  className="space-y-8"
                >

                  <div>

                    <h2 className="text-4xl font-black mb-3">

                      Select Your Candidate

                    </h2>

                    <p className="text-slate-400">

                      Choose your preferred nominee
                      carefully before proceeding.

                    </p>

                  </div>

                  <div className="grid gap-5">

                    {nominees.map((n, i) => (

                      <motion.div
                        key={n._id}
                        initial={{
                          opacity: 0,
                          y: 15
                        }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        transition={{
                          delay: i * 0.05
                        }}
                        whileHover={{
                          scale: 1.01
                        }}
                        onClick={() =>
                          setSelectedNominee(n)
                        }
                        className={`cursor-pointer rounded-3xl border p-6 transition-all ${
                          selectedNominee?._id ===
                          n._id
                            ? "bg-cyan-500/10 border-cyan-400"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >

                        <div className="flex items-center justify-between">

                          <div>

                            <h3 className="text-2xl font-bold">

                              {n.name}

                            </h3>

                            <p className="text-cyan-300 mt-1">

                              {n.party}

                            </p>

                          </div>

                          {selectedNominee?._id ===
                            n._id && (

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">

                              <Check size={24} />

                            </div>

                          )}

                        </div>

                      </motion.div>

                    ))}

                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <button
                      onClick={back}
                      className="py-4 rounded-2xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
                    >

                      <ArrowLeft size={18} />

                      Back

                    </button>

                    <motion.button
                      whileHover={{
                        scale: 1.02
                      }}
                      whileTap={{
                        scale: 0.97
                      }}
                      onClick={next}
                      disabled={!selectedNominee}
                      className="py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >

                      Review Vote

                      <ArrowRight size={18} />

                    </motion.button>

                  </div>

                </motion.div>

              )}

              {/* STEP 3 */}

              {step === 3 &&
                selectedNominee && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 20
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    className="space-y-8"
                  >

                    <div className="text-center">

                      <h2 className="text-4xl font-black mb-3">

                        Confirm Your Vote

                      </h2>

                      <p className="text-slate-400">

                        Please verify your
                        details before securely
                        casting your vote.

                      </p>

                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 space-y-6">

                      <div>

                        <p className="text-slate-400 text-sm uppercase tracking-widest">

                          Voter ID

                        </p>

                        <h3 className="text-2xl font-mono mt-2">

                          {voterIdInput}

                        </h3>

                      </div>

                      <div>

                        <p className="text-slate-400 text-sm uppercase tracking-widest">

                          Selected Candidate

                        </p>

                        <h2 className="text-4xl font-black mt-2 text-cyan-300">

                          {
                            selectedNominee.name
                          }

                        </h2>

                        <p className="text-slate-300 mt-1 text-lg">

                          {
                            selectedNominee.party
                          }

                        </p>

                      </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                      <button
                        onClick={back}
                        className="py-4 rounded-2xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
                      >

                        <ArrowLeft size={18} />

                        Back

                      </button>

                      <motion.button
                        whileHover={{
                          scale: 1.02
                        }}
                        whileTap={{
                          scale: 0.97
                        }}
                        onClick={submitVote}
                        disabled={loading}
                        className="py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 font-bold shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3"
                      >

                        {loading ? (

                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                            Submitting...
                          </>

                        ) : (

                          <>
                            Cast Vote Securely

                            <ShieldCheck
                              size={18}
                            />
                          </>

                        )}

                      </motion.button>

                    </div>

                  </motion.div>

                )}

              {/* SUCCESS */}

              {step === 4 && (

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  className="text-center py-10"
                >

                  <div className="w-28 h-28 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">

                    <CheckCircle2
                      size={60}
                    />

                  </div>

                  <h2 className="text-5xl font-black mt-8">

                    Vote Recorded

                  </h2>

                  <p className="text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">

                    Your vote has been securely
                    encrypted and successfully
                    recorded in the national
                    election database.

                  </p>

                  <div className="mt-10 flex justify-center">

                    <motion.button
                      whileHover={{
                        scale: 1.03
                      }}
                      whileTap={{
                        scale: 0.97
                      }}
                      onClick={() =>
                        router.push("/")
                      }
                      className="px-10 py-5 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold shadow-2xl hover:shadow-cyan-500/30 transition-all"
                    >

                      Return Home

                    </motion.button>

                  </div>

                </motion.div>

              )}

            </div>

          </motion.div>

          {/* FOOTER QUOTES */}

          <div className="mt-10 text-center space-y-3 text-slate-400">

            <p>
              🇮🇳 “My Vote is My Future –
              Power of One Vote.”
            </p>

            <p>
              🇮🇳 “No Voter to be Left
              Behind.”
            </p>

            <p>
              🇮🇳 “Electoral Literacy for
              Stronger Democracy.”
            </p>

          </div>

          {/* SECURITY */}

          <div className="mt-6 flex justify-center">

            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm">

              <ShieldCheck size={15} />

              All votes are encrypted &
              protected securely.

            </div>

          </div>

        </div>

      </div>

    </>

  );

}