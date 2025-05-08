// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import {init, replayIntegration,captureRouterTransitionStart} from "@sentry/nextjs";

init({
  dsn: "https://6861167508dc2f5e44dd9ea231c46be9@o4509261157367808.ingest.de.sentry.io/4509266560286800",

  // Add optional integrations for additional features
  integrations: [
    replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 1.0,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

export const onRouterTransitionStart = captureRouterTransitionStart;