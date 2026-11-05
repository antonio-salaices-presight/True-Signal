# TrueSignal

Prototype of an AI-powered, security-focused trend intelligence platform. It shows how analysts would see emerging topics, alerts with evidence, a daily briefing, data sources and governance settings.

**All data is fictional.** Nothing connects to X, Reddit or any news source.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
src/
  data.js          mock alerts, evidence, topics and sources
  components.jsx   shared pieces (chart, tags, evidence rows)
  views/           one file per screen
  App.jsx          navigation, state and analyst actions
  styles.css       design tokens (dark and light) and layout
```

## Connecting real data

Replace the exports in `src/data.js` with calls to your backend. Use official APIs or licensed feeds, and review each platform's terms before production use.
