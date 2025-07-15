const Log = async (stack, level, package, message) => {
  try {
    const response = await fetch('https://test-logging-server.com/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LOGGING_TOKEN}`
      },
      body: JSON.stringify({
        stack,
        level,
        package,
        message,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error('Logging failed');
    }
  } catch (error) {
    // Fallback to console only if absolutely necessary
    if (process.env.NODE_ENV === 'development') {
      console.error('Logging error:', error);
    }
  }
};

module.exports = Log;