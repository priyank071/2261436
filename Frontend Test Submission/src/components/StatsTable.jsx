import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function StatsTable({ stats }) {
  if (!stats) return null;

  return (
    <>
      <h3>Click Data</h3>
      <p>Shortcode: {stats.shortcode}</p>
      <p>Total Clicks: {stats.totalClicks}</p>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.clickData.map((c, i) => (
            <TableRow key={i}>
              <TableCell>{new Date(c.timestamp).toLocaleString()}</TableCell>
              <TableCell>{c.source}</TableCell>
              <TableCell>{c.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
