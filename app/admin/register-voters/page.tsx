"use client";

import React, { useState, useEffect } from "react";

import {
  User,
  Phone,
  CreditCard,
  Calendar,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Check,
  Edit,
  Trash2,
  RefreshCw,
  Users,
  Sparkles,
  Activity,
  BadgeCheck,
  FileText,
  Search,
  Loader2
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

/* ---------------- FIELD ---------------- */

interface FieldProps {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  error?: string;
  touched?: boolean;
}

const Field = ({
  id,
  name,
  label,
  icon,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  required,
  maxLength,
  error,
  touched
}: FieldProps) => {

  return (

    <div>

      <label className="block text-sm font-semibold text-slate-300 mb-2">

        {label}

        {required && (
          <span className="text-red-400 ml-1">*</span>
        )}

      </label>

      <div className="relative group">

        <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-cyan-400 transition">

          {icon}

        </div>

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={`w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-12 outline-none text-white placeholder:text-slate-500 transition-all duration-300
          ${
            touched && error
              ? "border-red-500/40 focus:border-red-500"
              : touched && !error && value
              ? "border-emerald-500/40 focus:border-emerald-500"
              : "border-white/10 focus:border-cyan-400"
          }`}
        />

        {touched && !error && value && (

          <Check
            size={18}
            className="absolute right-4 top-4 text-emerald-400"
          />

        )}

      </div>

      {touched && error && (

        <p className="text-xs text-red-400 flex items-center gap-1 mt-2">

          <AlertTriangle size={12} />

          {error}

        </p>

      )}

    </div>

  );

};

/* ---------------- VOTER ---------------- */

interface Voter {
  _id: string;
  name: string;
  phone: string;
  aadhar: string;
  dob: string;
  address: string;
  gender: string;
  voterId: string;
}

/* ---------------- MAIN ---------------- */

export default function VoterRegistration() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhar: "",
    dob: "",
    address: "",
    gender: "Male"
  });

  const [touched, setTouched] = useState({
    phone: false,
    aadhar: false
  });

  const [loading, setLoading] = useState(false);

  const [generatedId, setGeneratedId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [voters, setVoters] = useState<Voter[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [showList, setShowList] = useState(false);

  const [search, setSearch] = useState("");

  /* ---------------- FETCH ---------------- */

  const fetchVoters = async () => {

    try {

      const res = await fetch("/api/voters", {
        cache: "no-store"
      });

      const result = await res.json();

      if (result.success) {
        setVoters(result.data);
      }

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    if (showList) {
      fetchVoters();
    }

  }, [showList]);

  /* ---------------- VALIDATION ---------------- */

  const validatePhone = (phone: string) =>
    /^\d{10}$/.test(phone)
      ? ""
      : "Phone must contain 10 digits";

  const validateAadhar = (aadhar: string) =>
    /^\d{12}$/.test(aadhar)
      ? ""
      : "Aadhar must contain 12 digits";

  const phoneError = touched.phone
    ? validatePhone(formData.phone)
    : "";

  const aadharError = touched.aadhar
    ? validateAadhar(formData.aadhar)
    : "";

  /* ---------------- CHANGE ---------------- */

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;

    if (name === "phone" || name === "aadhar") {

      const digits = value.replace(/\D/g, "");

      setFormData({
        ...formData,
        [name]: digits
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });

    }

  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setTouched({
      phone: true,
      aadhar: true
    });

    if (
      validatePhone(formData.phone) ||
      validateAadhar(formData.aadhar) ||
      !formData.name ||
      !formData.address ||
      !formData.dob
    ) {

      setError(
        "Please complete all required fields correctly."
      );

      return;

    }

    setLoading(true);

    setError("");

    setSuccess("");

    try {

      const method = editingId
        ? "PUT"
        : "POST";

      const body = editingId
        ? {
            id: editingId,
            ...formData
          }
        : formData;

      const res = await fetch("/api/voters", {

        method,

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(body)

      });

      const result = await res.json();

      if (res.ok) {

        if (editingId) {

          setSuccess(
            "Voter updated successfully!"
          );

          setEditingId(null);

          fetchVoters();

        } else {

          setGeneratedId(
            result.data.voterId
          );

          setSuccess(
            "Voter registered successfully!"
          );

        }

        setFormData({
          name: "",
          phone: "",
          aadhar: "",
          dob: "",
          address: "",
          gender: "Male"
        });

      } else {

        setError(result.message);

      }

    } catch {

      setError(
        "Server connection failed"
      );

    }

    setLoading(false);

  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = (voter: Voter) => {

    setFormData({
      name: voter.name,
      phone: voter.phone,
      aadhar: voter.aadhar,
      dob: voter.dob.split("T")[0],
      address: voter.address,
      gender: voter.gender
    });

    setEditingId(voter._id);

    setGeneratedId(null);

    setError("");

    setSuccess("");

    setShowList(false);

  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this voter?"))
      return;

    try {

      const res = await fetch("/api/voters", {

        method: "DELETE",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ id })

      });

      if (res.ok) {

        fetchVoters();

      }

    } catch {

      setError(
        "Server connection failed"
      );

    }

  };

  /* ---------------- FILTER ---------------- */

  const filteredVoters = voters.filter(
    (voter) =>
      voter.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      voter.voterId
        .toLowerCase()
        .includes(search.toLowerCase())
  );

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
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="mb-10"
        >

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm mb-5">

            <Sparkles
              size={15}
              className="text-cyan-400"
            />

            Smart Election Registration

          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight">

            Voter Management <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">

              Registration Portal

            </span>

          </h1>

          <p className="text-slate-400 mt-5 max-w-2xl leading-relaxed">
            Register and manage election voters
            securely with real-time verification
            and digital voter identity generation.
          </p>

        </motion.div>

        {/* TOP CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="uppercase text-xs tracking-widest text-slate-400 font-bold">

                  Total Voters

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {voters.length}

                </h2>

              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">

                <Users size={28} />

              </div>

            </div>

            <div className="mt-5 flex items-center gap-2 text-cyan-300 text-sm">

              <Activity size={15} />

              Live registration tracking

            </div>

          </div>

          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6">

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

              Secure voter validation

            </div>

          </div>

          <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="uppercase text-xs tracking-widest text-cyan-100 font-bold">

                  Election Status

                </p>

                <h2 className="text-3xl font-black mt-3">

                  ACTIVE

                </h2>

              </div>

              <FileText size={30} />

            </div>

            <div className="mt-5 flex items-center gap-2 text-cyan-100 text-sm">

              <Activity size={15} />

              Digital registration enabled

            </div>

          </div>

        </div>

        {/* TABS */}

        <div className="flex gap-3 mb-8">

          <button
            onClick={() =>
              setShowList(false)
            }
            className={`px-6 py-3 rounded-2xl font-semibold transition ${
              !showList
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl"
                : "bg-white/5 border border-white/10 text-slate-300"
            }`}
          >

            Register Voter

          </button>

          <button
            onClick={() =>
              setShowList(true)
            }
            className={`px-6 py-3 rounded-2xl font-semibold transition ${
              showList
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl"
                : "bg-white/5 border border-white/10 text-slate-300"
            }`}
          >

            Manage Voters

          </button>

        </div>

        {/* REGISTER FORM */}

        {!showList ? (

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8"
          >

            {/* SUCCESS */}

            <AnimatePresence>

              {(error || success) && (

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
                  className={`mb-6 flex items-center gap-3 p-4 rounded-2xl border ${
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

                    {success || error}

                  </p>

                </motion.div>

              )}

            </AnimatePresence>

            {/* GENERATED */}

            {generatedId && (

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 text-center"
              >

                <CheckCircle2
                  size={65}
                  className="mx-auto text-emerald-400 mb-4"
                />

                <h2 className="text-2xl font-black mb-3">

                  Registration Successful

                </h2>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-w-md mx-auto">

                  <p className="text-cyan-300 text-sm font-semibold uppercase tracking-widest">

                    Digital Voter ID

                  </p>

                  <h3 className="text-4xl font-black mt-2 tracking-wider">

                    {generatedId}

                  </h3>

                </div>

              </motion.div>

            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="md:col-span-2">

                  <Field
                    id="name"
                    name="name"
                    label="Full Name"
                    icon={<User size={18} />}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter voter name"
                    required
                  />

                </div>

                <Field
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  icon={<Phone size={18} />}
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() =>
                    setTouched({
                      ...touched,
                      phone: true
                    })
                  }
                  maxLength={10}
                  touched={touched.phone}
                  error={phoneError}
                  placeholder="10 digit phone number"
                />

                <Field
                  id="aadhar"
                  name="aadhar"
                  label="Aadhar Number"
                  icon={
                    <CreditCard size={18} />
                  }
                  value={formData.aadhar}
                  onChange={handleChange}
                  onBlur={() =>
                    setTouched({
                      ...touched,
                      aadhar: true
                    })
                  }
                  maxLength={12}
                  touched={touched.aadhar}
                  error={aadharError}
                  placeholder="12 digit Aadhar"
                />

                <Field
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  icon={<Calendar size={18} />}
                  value={formData.dob}
                  onChange={handleChange}
                  type="date"
                  required
                />

                {/* GENDER */}

                <div>

                  <label className="block text-sm font-semibold text-slate-300 mb-2">

                    Gender

                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
                  >

                    <option className="bg-slate-900">
                      Male
                    </option>

                    <option className="bg-slate-900">
                      Female
                    </option>

                    <option className="bg-slate-900">
                      Other
                    </option>

                  </select>

                </div>

                {/* ADDRESS */}

                <div className="md:col-span-2">

                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">

                    <MapPin size={15} />

                    Address

                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no, street, city, pincode..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-slate-500 h-28 resize-none"
                  />

                </div>

              </div>

              {/* BUTTON */}

              <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.97
                }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl py-4 font-bold shadow-2xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-3"
              >

                {loading ? (

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
                      ? "Update Voter"
                      : "Generate Voter ID"}

                    <ChevronRight size={18} />
                  </>

                )}

              </motion.button>

            </form>

          </motion.div>

        ) : (

          /* MANAGE VOTERS */

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8"
          >

            {/* TOP */}

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

              <div>

                <h2 className="text-3xl font-black">

                  Registered Voters

                </h2>

                <p className="text-slate-400 mt-1">

                  Live voter management records

                </p>

              </div>

              <div className="flex gap-3">

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={17}
                    className="absolute left-4 top-4 text-slate-500"
                  />

                  <input
                    type="text"
                    placeholder="Search voters..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none text-white placeholder:text-slate-500"
                  />

                </div>

                {/* REFRESH */}

                <button
                  onClick={fetchVoters}
                  className="px-5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition flex items-center gap-2"
                >

                  <RefreshCw size={17} />

                  Refresh

                </button>

              </div>

            </div>

            {/* LIST */}

            <div className="space-y-5 max-h-[650px] overflow-y-auto pr-1">

              {filteredVoters.length === 0 ? (

                <div className="text-center py-20">

                  <Users
                    size={60}
                    className="mx-auto text-slate-500 mb-4"
                  />

                  <h3 className="text-2xl font-bold">

                    No Voters Found

                  </h3>

                  <p className="text-slate-400 mt-2">

                    No voter records available.

                  </p>

                </div>

              ) : (

                filteredVoters.map((voter, i) => (

                  <motion.div
                    key={voter._id}
                    initial={{
                      opacity: 0,
                      y: 20
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
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/30 transition-all"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                      {/* LEFT */}

                      <div>

                        <h3 className="text-2xl font-bold">

                          {voter.name}

                        </h3>

                        <p className="text-cyan-300 font-mono mt-1">

                          {voter.voterId}

                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-sm text-slate-300">

                          <p>
                            <strong>
                              Phone:
                            </strong>{" "}
                            {voter.phone}
                          </p>

                          <p>
                            <strong>
                              Aadhar:
                            </strong>{" "}
                            {voter.aadhar}
                          </p>

                          <p>
                            <strong>
                              DOB:
                            </strong>{" "}
                            {new Date(
                              voter.dob
                            ).toLocaleDateString()}
                          </p>

                          <p>
                            <strong>
                              Gender:
                            </strong>{" "}
                            {voter.gender}
                          </p>

                        </div>

                        <p className="mt-4 text-sm text-slate-400 leading-relaxed">

                          <strong>
                            Address:
                          </strong>{" "}
                          {voter.address}

                        </p>

                      </div>

                      {/* ACTIONS */}

                      <div className="flex items-center gap-3">

                        <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          onClick={() =>
                            handleEdit(voter)
                          }
                          className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition"
                        >

                          <Edit size={18} />

                        </motion.button>

                        <motion.button
                          whileHover={{
                            scale: 1.1
                          }}
                          whileTap={{
                            scale: 0.9
                          }}
                          onClick={() =>
                            handleDelete(
                              voter._id
                            )
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

        )}

      </div>

    </div>

  );

}