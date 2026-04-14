import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'AI Utsav Backend is running' });
  });

  // Proxy for other LLMs (Placeholder)
  app.post('/api/chat/proxy', async (req, res) => {
    const { modelId, content, userId } = req.body;
    
    // Here you would implement the logic to call OpenAI, Anthropic, etc.
    // using their respective SDKs and your secret keys.
    // For now, we'll return a simulated response or error if keys are missing.
    
    console.log(`Proxying request for ${modelId} from user ${userId}`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({
      content: `This is a simulated response from ${modelId}. In production, this would call the actual API.`,
      tokens: 50
    });
  });

  // Usage tracking endpoint
  app.post('/api/usage/track', (req, res) => {
    const { userId, tokens, modelId } = req.body;
    // Update Supabase usage_logs here
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Utsav running at http://localhost:${PORT}`);
  });
}

startServer();
