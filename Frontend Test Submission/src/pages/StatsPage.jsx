import { useState } from 'react';
import { getStats } from '../services/api';
import StatsTable from '../components/StatsTable';
import { TextField, Button } from '@mui/material';

export default function StatsPage() {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);

  const handleGetStats = async () => {
    const data = await getStats(shortcode);
    setStats(data);
  };

  return (
    <div>
      <h1>URL Stats</h1>
      <TextField
        label="Shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <Button variant="contained" onClick={handleGetStats}>Get Stats</Button>
      <StatsTable stats={stats} />
    </div>
  );
}
