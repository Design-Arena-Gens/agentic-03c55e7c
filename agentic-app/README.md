## Naukri Auto-Apply Script Builder

This project ships a tailored console-script generator that helps you automate repeat job applications on [Naukri.com](https://www.naukri.com/). Adjust CSS selectors and polling cadence in the UI, copy the generated snippet, and paste it straight into the browser devtools console while reviewing job listings.

### Local Development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Update `src/components/ScriptBuilder.tsx` if you need to extend the script logic or tweak the form.

### Production Build

```bash
npm run build
npm run start
```

### Using the Script

1. Load your target search results on Naukri.com (desktop recommended).
2. Open the developer tools console.
3. Configure selectors/interval on this site and click **Copy script**.
4. Paste the snippet into the console and press Enter.
5. Clear the interval any time with `clearInterval(window.__NAUKRI_APPLY_INTERVAL__)`.

The script cleans up previous runs automatically and writes a detailed log so you can track progress at a glance.
