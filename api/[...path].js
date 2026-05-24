export default async function handler(req, res) {
  const { path } = req.query;
  const targetPath = Array.isArray(path) ? path.join('/') : (path || '');
  
  const targetUrl = `http://20.206.194.184/api/${targetPath}`;
  
  const headers = { ...req.headers };
  // Remove headers that might cause Vercel/Azure to reject the proxy
  delete headers.host;
  delete headers.referer;
  
  // THE DISGUISE: Trick Spring Security into accepting this as a local CORS request
  headers.origin = 'http://localhost:5173';
  
  try {
    const fetchOptions = {
      method: req.method,
      headers: headers,
      // Pass the body along if it's not a GET/HEAD request
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    };
    
    // If Vercel parsed the body as JSON automatically, we need to stringify it before sending
    if (fetchOptions.body && typeof fetchOptions.body === 'object') {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    
    // Attempt to read the response as text/json
    const data = await response.text();
    
    // Copy the backend's status code to the frontend response
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy disguise failed', details: error.message });
  }
}
