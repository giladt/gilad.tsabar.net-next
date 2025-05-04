import {init, replayIntegration } from "@sentry/nextjs";

init({
  dsn: "https://b66d5170ad8644abecfdfc3a26f6d0ba@o4509261157367808.ingest.de.sentry.io/4509261159661648",

  integrations: [
    replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
      maskAllInputs: true
    }),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});