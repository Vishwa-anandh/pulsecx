import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from 'http'
import fs from 'fs'
import path from 'path'

const antigravityApiPlugin = () => ({
  name: 'antigravity-api',
  configureServer(server) {
    server.middlewares.use('/api/chat', (req, res) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString() });
        req.on('end', () => {
          try {
            const { message } = JSON.parse(body);
            
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.setHeader('Transfer-Encoding', 'chunked');

            const ollamaReq = http.request({
              hostname: 'localhost',
              port: 11434,
              path: '/api/generate',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
            }, (ollamaRes) => {
              ollamaRes.on('data', (chunk) => {
                const chunkStr = chunk.toString();
                // Ollama sends JSON lines, multiple lines can be in one chunk
                const lines = chunkStr.split('\n').filter(line => line.trim() !== '');
                
                for (const line of lines) {
                  try {
                    const data = JSON.parse(line);
                    if (data.response) {
                      res.write(data.response);
                    }
                  } catch (e) {
                    console.error("Error parsing Ollama chunk:", e);
                  }
                }
              });

              ollamaRes.on('end', () => {
                res.end();
              });
            });

            ollamaReq.on('error', (e) => {
              console.error(`Problem with Ollama request: ${e.message}`);
              res.write("Error: Could not connect to local Ollama instance.");
              res.end();
            });

            // System prompt to set context
            const dbPath = path.resolve(__dirname, 'src/data/mockDatabase.json');
            let dbContext = "{}";
            try {
              dbContext = fs.readFileSync(dbPath, 'utf8');
            } catch(e) {
              console.error("Could not read mockDatabase for context");
            }

            const systemPrompt = `You are an AI assistant for PulseCX, a Customer Experience monitoring dashboard. Be EXTREMELY concise. Answer in 1-2 sentences max.
You have access to the live system state:
${dbContext}

If the user asks you to show or render the Executive Dashboard or overview, output EXACTLY the token: [RENDER_EXECUTIVE_DASHBOARD]
If the user asks you to show or render the Monitoring Dashboard, output EXACTLY the token: [RENDER_MONITORING_DASHBOARD]`;
            
            ollamaReq.write(JSON.stringify({
              model: 'gemma4:latest',
              prompt: message,
              system: systemPrompt,
              stream: true,
              keep_alive: '1h',
              options: {
                num_ctx: 1024,
                num_predict: 150,
                temperature: 0.3
              }
            }));
            ollamaReq.end();

          } catch (err) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
          }
        });
      } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), antigravityApiPlugin()],
})
