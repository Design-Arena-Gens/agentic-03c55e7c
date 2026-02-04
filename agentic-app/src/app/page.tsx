import { ScriptBuilder } from "@/components/ScriptBuilder";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-6">
        <header className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">
                Agentic Workflow Toolkit
              </p>
              <h1 className="text-4xl font-semibold text-white">
                Automate Naukri Job Applications in Seconds
              </h1>
            </div>
            <div className="rounded-full border border-blue-300 bg-blue-500/10 px-6 py-3 text-sm font-medium text-blue-100 shadow-lg shadow-blue-500/30">
              Built for console injection workflows
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-base text-blue-50/80">
            Configure selector overrides, cadence, and logging style to match
            the current search layout. The generated script is ready to paste
            straight into the browser devtools console on Naukri.com.
          </p>
        </header>

        <ScriptBuilder />
      </div>
    </div>
  );
}
