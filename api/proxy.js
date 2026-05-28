module.exports = async function handler(req, res) {
  // Extract the target path safely
  const fullUrl = req.url;
  const targetPath = fullUrl.includes('targetPath=') ? fullUrl.split('targetPath=')[1] : null;

  if (!targetPath) {
    return res.status(400).json({ error: 'Missing targetPath query parameter' });
  }

  // The targetPath includes the full path (e.g. /api/auth/login)
  const baseUrl = process.env.BACKEND_API_BASE_URL || process.env.VITE_API_BASE_URL || 'http://api.20.206.214.132.nip.io';
  const targetUrl = `${baseUrl.replace(/\/$/, '')}${targetPath}`;
  
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

    const fetchResponse = await fetch(targetUrl, fetchOptions);
    const data = await fetchResponse.text();

    const contentType = fetchResponse.headers.get('content-type');
    if (contentType) {
      res.setHeader('content-type', contentType);
    }

    res.status(fetchResponse.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).json({ error: 'Backend proxy failed', details: error.message });
  }
};
