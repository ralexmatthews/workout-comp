import * as Sentry from "@sentry/remix";

Sentry.init({
  dsn: "https://e0cb2f8b5ef11a0e16ba1e0f111014df@o4508050755813376.ingest.us.sentry.io/4508050757648384",
  autoInstrumentRemix: true,
});
