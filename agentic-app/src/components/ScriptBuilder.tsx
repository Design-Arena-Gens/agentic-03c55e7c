"use client";

import { useMemo, useState } from "react";

const DEFAULT_VIEW_SELECTOR = "#interested-btn";
const DEFAULT_BULK_SELECTOR = 'button.btn-success[ng-click="applyBulk()"]';
const DEFAULT_NORMAL_SELECTOR = '.apply[ng-click*="submitChoice"] .new-btn';

const toTemplateLiteral = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/`/g, "\\`");

export function ScriptBuilder() {
  const [intervalSeconds, setIntervalSeconds] = useState(3);
  const [viewSelector, setViewSelector] = useState(DEFAULT_VIEW_SELECTOR);
  const [bulkSelector, setBulkSelector] = useState(DEFAULT_BULK_SELECTOR);
  const [normalSelector, setNormalSelector] = useState(DEFAULT_NORMAL_SELECTOR);
  const [copied, setCopied] = useState(false);

  const script = useMemo(() => {
    const safeInterval = Number.isFinite(intervalSeconds)
      ? Math.max(1, Math.round(intervalSeconds))
      : 3;
    return `(function () {
  console.clear();
  const globalKey = "__NAUKRI_APPLY_INTERVAL__";
  if (window[globalKey]) {
    clearInterval(window[globalKey]);
    console.log("%c♻️ Cleared existing apply loop", "color: #ff9800; font-weight: bold;");
  }

  const viewButton = document.querySelector(\`${toTemplateLiteral(viewSelector)}\`);
  if (viewButton instanceof HTMLElement) {
    viewButton.click();
    console.log("%c🚀 Opened modal by clicking View button", "color: green; font-weight: bold;");
  } else {
    console.log("%c⚠️ View button not found — maybe modal is already open.", "color: orange; font-weight: bold;");
  }

  let applyCount = 0;
  const intervalMs = ${safeInterval} * 1000;
  const intervalHandler = () => {
    const bulkApplyButton = document.querySelector(\`${toTemplateLiteral(bulkSelector)}\`);
    const normalApplyButton = document.querySelector(\`${toTemplateLiteral(normalSelector)}\`);

    if (
      bulkApplyButton instanceof HTMLButtonElement &&
      !bulkApplyButton.disabled
    ) {
      bulkApplyButton.click();
      applyCount++;
      console.log(\`%c✅ [\${applyCount}] Bulk Apply clicked at \${new Date().toLocaleTimeString()}\`, "color: blue");
      return;
    }

    if (normalApplyButton instanceof HTMLElement) {
      normalApplyButton.click();
      applyCount++;
      console.log(\`%c✅ [\${applyCount}] Normal Apply clicked at \${new Date().toLocaleTimeString()}\`, "color: teal");
      return;
    }

    console.log("%c🎉 All jobs applied successfully!", "color: limegreen; font-size: 16px; font-weight: bold;");
    console.log(\`%c🧾 Total Jobs Applied: \${applyCount}\`, "color: #2196F3; font-weight: bold;");
    if (window[globalKey]) {
      clearInterval(window[globalKey]);
      delete window[globalKey];
    }
  };

  window[globalKey] = setInterval(intervalHandler, intervalMs);
  intervalHandler();

  console.log(\`%c⏱ Running apply check every \${intervalMs / 1000} seconds\`, "color: #9c27b0");
})();`;
  }, [intervalSeconds, viewSelector, bulkSelector, normalSelector]);

  return (
    <section className="w-full max-w-5xl space-y-10">
      <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-lg shadow-blue-500/5">
        <h1 className="text-3xl font-semibold text-zinc-950">
          Naukri Auto-Apply Script Builder
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Fine-tune the selectors and cadence below, then paste the generated
          snippet into your browser console while browsing Naukri.com listings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <span className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Modal Trigger Selector
          </span>
          <input
            value={viewSelector}
            onChange={(event) => {
              setViewSelector(event.target.value);
              setCopied(false);
            }}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
            spellCheck={false}
          />
          <p className="text-xs text-zinc-500">
            CSS selector used to open the job detail modal (default: View
            button).
          </p>
        </label>

        <label className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <span className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Bulk Apply Selector
          </span>
          <input
            value={bulkSelector}
            onChange={(event) => {
              setBulkSelector(event.target.value);
              setCopied(false);
            }}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
            spellCheck={false}
          />
          <p className="text-xs text-zinc-500">
            Selector for the bulk apply call-to-action; script waits for it to
            enable before clicking.
          </p>
        </label>

        <label className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <span className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Normal Apply Selector
          </span>
          <input
            value={normalSelector}
            onChange={(event) => {
              setNormalSelector(event.target.value);
              setCopied(false);
            }}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
            spellCheck={false}
          />
          <p className="text-xs text-zinc-500">
            Fallback selector for the standard apply button.
          </p>
        </label>

        <label className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <span className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Interval (seconds)
          </span>
          <input
            type="number"
            min={1}
            value={intervalSeconds}
            onChange={(event) => {
              setIntervalSeconds(Number(event.target.value));
              setCopied(false);
            }}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
          />
          <p className="text-xs text-zinc-500">
            How frequently to trigger the apply search loop (minimum 1 second).
          </p>
        </label>
      </div>

      <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-8 shadow-inner shadow-blue-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-blue-900">
            Generated Console Script
          </h2>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(script);
                setCopied(true);
              } catch (error) {
                console.error("Failed to copy script", error);
                setCopied(false);
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-95"
          >
            {copied ? "Copied!" : "Copy script"}
          </button>
        </div>
        <pre className="mt-6 max-h-[420px] overflow-auto rounded-2xl bg-black p-6 text-xs leading-relaxed text-green-100">
{script}
        </pre>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-900">Usage Checklist</h3>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-zinc-600">
          <li>Open a Naukri.com search results page in a desktop browser.</li>
          <li>Navigate to the browser developer tools console.</li>
          <li>Paste the generated script and press Enter to start automation.</li>
          <li>
            Keep the tab visible so selectors resolve correctly and monitor the
            console for progress updates.
          </li>
          <li>
            Refresh the page or run{" "}
            <code>clearInterval(window.__NAUKRI_APPLY_INTERVAL__)</code> in the
            console to stop the loop manually.
          </li>
        </ul>
      </div>
    </section>
  );
}
