const urlMap = new Map();
const statsMap = new Map();

const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

const storeUrl = (longUrl, validity, shortCode = null) => {
  const code = shortCode || generateShortCode();
  const expiry = new Date(Date.now() + (validity || 30) * 60000);
  
  if (urlMap.has(code)) {
    throw new Error('Shortcode already exists');
  }
  
  urlMap.set(code, {
    longUrl,
    expiry,
    createdAt: new Date()
  });
  
  statsMap.set(code, {
    clicks: 0,
    clickData: []
  });
  
  return { code, expiry };
};

const getUrl = (shortCode) => {
  const entry = urlMap.get(shortCode);
  if (!entry) throw new Error('URL not found');
  if (new Date() > entry.expiry) throw new Error('URL expired');
  return entry.longUrl;
};

const recordClick = (shortCode, source, ip) => {
  const stats = statsMap.get(shortCode);
  if (!stats) return;
  
  stats.clicks++;
  stats.clickData.push({
    timestamp: new Date(),
    source: source || 'direct',
    ip,
    location: getLocationFromIp(ip)
  });
};

const getStats = (shortCode) => {
  const urlEntry = urlMap.get(shortCode);
  const stats = statsMap.get(shortCode);
  
  if (!urlEntry || !stats) throw new Error('Not found');
  
  return {
    ...urlEntry,
    ...stats
  };
};

module.exports = { storeUrl, getUrl, recordClick, getStats };