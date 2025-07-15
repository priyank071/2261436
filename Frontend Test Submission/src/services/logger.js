export const log = async (level, pkg, message) => {
  try {
    const payload = {
      stack: 'frontend',
      level,
      package: pkg,
      message
    };

    await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Logging failed:', err);
  }
};
