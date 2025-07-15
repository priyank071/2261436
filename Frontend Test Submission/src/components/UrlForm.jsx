import { useState } from 'react';
import { createShortUrl } from '../services/api';
import { log } from '../services/logger';
import { TextField, Button, Grid } from '@mui/material';

export default function UrlForm({ onAdd }) {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      await log('error', 'api', 'URL missing in form');
      return;
    }

    const data = await createShortUrl(url, validity, shortcode);
    if (data.error) {
      await log('error', 'api', data.error);
    } else {
      await log('info', 'api', `Created short URL ${data.shortlink}`);
      onAdd(data);
    }

    setUrl('');
    setValidity('');
    setShortcode('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Validity (minutes)"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Custom Shortcode"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Shorten URL
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
