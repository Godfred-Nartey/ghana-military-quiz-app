import axios from 'axios';

export async function warmUpServer(): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
  const healthUrl = `${baseUrl.replace(/\/$/, '')}/health`;

  await axios.get(healthUrl, {
    timeout: 60000,
  });
}
