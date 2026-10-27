import Script from 'next/script';

const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC;
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

/** Loads the cookieless Umami tracker; renders nothing unless both env vars are set (so dev traffic isn't counted). */
export function Analytics() {
  if (!UMAMI_SRC || !UMAMI_WEBSITE_ID) return null;

  return <Script src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />;
}
