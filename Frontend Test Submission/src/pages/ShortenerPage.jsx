import { useEffect, useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlTable from '../components/UrlTable';
import { getAllUrls } from '../services/api';

export default function ShortenerPage() {
  const [urls, setUrls] = useState([]);

  const loadUrls = async () => {
    const data = await getAllUrls();
    setUrls(data);
  };

  useEffect(() => {
    loadUrls();
  }, []);

  return (
    <div>
      <h1>URL Shortener</h1>
      <UrlForm onAdd={loadUrls} />
      <UrlTable urls={urls} />
    </div>
  );
}
