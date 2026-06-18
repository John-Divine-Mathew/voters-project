import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-900/20 backdrop-blur-xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80 font-bold">
            Voter Registration Access
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-black text-white">
            Secure Voter Registration Portal
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-8">
            Voter registration is managed by the election admin dashboard. Use the secure admin login below to access the voter registration workflow and manage ballots professionally.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-start">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-900/40">
            <h2 className="text-xl font-semibold text-white mb-4">Demo admin credentials</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-3xl bg-slate-950/90 p-4 border border-slate-800">
                <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-semibold">Email</p>
                <p className="mt-2 text-white font-semibold">mathewdivine95@gmail.com</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-4 border border-slate-800">
                <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-semibold">Password</p>
                <p className="mt-2 text-white font-semibold">1234</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-900/40">
            <h2 className="text-xl font-semibold text-white mb-4">Next steps</h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Log in using the admin portal.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Register voters and manage nominee ballots.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Use the admin dashboard for professional election workflow.
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-4 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                Admin Login
              </Link>
              <Link
                href="/admin/register-voters"
                className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-800 px-6 py-4 text-center text-sm font-bold text-white transition hover:border-slate-500"
              >
                Open Voter Registration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
