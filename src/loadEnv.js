import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from project root .env before other modules import.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// optional: you can enable debug by setting DOTENV_DEBUG=true in the environment
if (process.env.DOTENV_DEBUG === 'true') {
  console.log('Loaded .env from', path.resolve(__dirname, '../.env'));
}

export default null;
