const express = require('express');
const router = express.Router();
const { storeUrl, getUrl, recordClick, getStats } = require('./storage');
const logger = require('./logger');

router.post('/shorturls', async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    
    // Validate input
    if (!url) throw new Error('URL is required');
    if (validity && (isNaN(validity) || validity <= 0) {
      throw new Error('Invalid validity period');
    }
    if (shortcode && !/^[a-zA-Z0-9_-]{4,20}$/.test(shortcode)) {
      throw new Error('Invalid shortcode format');
    }
    
    const { code, expiry } = storeUrl(url, validity, shortcode);
    logger.info('shortener', `Created shortcode: ${code} for ${url}`);
    
    res.status(201).json({
      shortlink: `http://localhost:3001/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (error) {
    logger.error('shortener', `Creation error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    const url = getUrl(shortcode);
    
    // Record click
    recordClick(
      shortcode, 
      req.headers.referer, 
      req.ip
    );
    
    logger.info('redirect', `Redirecting ${shortcode} to ${url}`);
    res.redirect(302, url);
  } catch (error) {
    logger.error('redirect', `Redirect error: ${error.message}`);
    res.status(404).json({ error: error.message });
  }
});

router.get('/shorturls/:shortcode', (req, res) => {
  try {
    const { shortcode } = req.params;
    const stats = getStats(shortcode);
    logger.info('stats', `Fetched stats for ${shortcode}`);
    res.json(stats);
  } catch (error) {
    logger.error('stats', `Stats error: ${error.message}`);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;