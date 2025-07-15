import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function UrlTable({ urls }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Original URL</TableCell>
          <TableCell>Short URL</TableCell>
          <TableCell>Expiry</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {urls.map((url) => (
          <TableRow key={url.shortcode}>
            <TableCell>{url.originalUrl}</TableCell>
            <TableCell>
              <a href={`http://localhost:3001/${url.shortcode}`} target="_blank" rel="noreferrer">
                {url.shortcode}
              </a>
            </TableCell>
            <TableCell>{new Date(url.expiry).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
