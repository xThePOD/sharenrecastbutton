import { Button, Frog } from 'frog';
import { handle } from 'frog/vercel';

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: 'Share on Warpcast',
});

app.frame('/', (c) => {
  const frameUrl = c.url.toString();
  const text = "Check out this cool frame I just interacted with on Frog!";
  const warpcastShareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(frameUrl)}`;

  return c.res({
    image: 'https://amethyst-able-sawfish-36.mypinata.cloud/ipfs/QmNRWAmd9qSS4QodRb3Wpf6yJSHx7fmNmXtn9j58vrNkim',
    intents: [
      <Button action="link" value={warpcastShareUrl}>Share on Warpcast</Button>,
    ],
  });
});

export const GET = handle(app);
export const POST = handle(app);