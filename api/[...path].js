export default async function handler(req, res) {
  const { path } = req.query;
  const targetPath = Array.isArray(path) ? path.join('/') : (path || '');
  
  const baseUrl = process.env.BACKEND_API_BASE_URL || process.env.VITE_API_BASE_URL || 'http://api.20.206.214.132.nip.io';
  const targetUrl = `${baseUrl.replace(/\/$/, '')}/api/${targetPath}`;
  
  const headers = { ...req.headers };
  delete headers.host;
  delete headers.origin;
  delete headers.referer;
  delete headers.connection;
  delete headers['content-length'];
  delete headers['accept-encoding'];
  delete headers['x-vercel-id'];

  try {
    const fetchOptions = {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined
    };

    if (fetchOptions.body && typeof fetchOptions.body === 'object') {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.text();

    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('content-type', contentType);
    }

    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).json({ error: 'Backend proxy failed', details: error.message });
  }
}
