import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';
// import { neynar } from 'frog/hubs';
import { handle } from 'frog/vercel';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
});

app.frame('/', (c) => {
  return c.res({
    image: 'https://amethyst-able-sawfish-36.mypinata.cloud/ipfs/QmNRWAmd9qSS4QodRb3Wpf6yJSHx7fmNmXtn9j58vrNkim',
    intents: [
      <Button action='/frame2'>Enter</Button>,
    ],
  });
});

app.frame('/frame2', (c) => {
  return c.res({
    image: 'https://amethyst-able-sawfish-36.mypinata.cloud/ipfs/QmUzxXb5GLGyeobR9vw43BjQr2Ce6njfLHqNSWrQH9WJSq',
    intents: [
      <Button action='/share'>Share</Button>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.frame('/share', (c) => {
  // Prewritten cast message
  const prewrittenMessage = "Just got my results from [Your Frame's Name]! Check it out: https://your-frame-url.com";

  // Logic to share the prewritten message
  console.log("Casting the following message:", prewrittenMessage);
  window.open(`https://your-casting-platform-url.com?message=${encodeURIComponent(prewrittenMessage)}`, '_blank');

  // Return a response with a confirmation image and back button
  return c.res({
    image: 'https://your-confirmation-image-url.com/your-confirmation-image.png',
    intents: [
      <Button action='/frame2'>Back</Button>,
    ],
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined';
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development';
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);