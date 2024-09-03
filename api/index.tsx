import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';
// import { neynar } from 'frog/hubs';
import { handle } from 'frog/vercel';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// };

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
});

app.frame('/', (c) => {
  const frameUrl = c.url.toString();
  const text = "Check out this cool frame I just interacted with on Frog!";
  
  // Construct the Warpcast share URL
  const warpcastShareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(frameUrl)}`;

  return c.res({
    image: 'https://amethyst-able-sawfish-36.mypinata.cloud/ipfs/QmNRWAmd9qSS4QodRb3Wpf6yJSHx7fmNmXtn9j58vrNkim',
    intents: [
      <Button action="link" value={warpcastShareUrl}>Share on Warpcast</Button>,
    ],
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined';
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development';
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);