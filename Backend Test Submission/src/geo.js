const geoip = require('geoip-lite');

const getLocationFromIp = (ip) => {
  const geo = geoip.lookup(ip);
  if (!geo) return 'Unknown';
  return `${geo.city}, ${geo.country}`;
};

module.exports = getLocationFromIp;