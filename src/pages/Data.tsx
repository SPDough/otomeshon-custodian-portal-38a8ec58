import { useRef } from 'react';
import { motion } from "framer-motion";
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { Box, Typography, Paper, Container } from '@mui/material';
import 'handsontable/dist/handsontable.full.min.css';
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";

registerAllModules();

const Data = () => {
  const hotTableRef = useRef(null);

  const data = [
    ['Asset Name', 'Symbol', 'Price', 'Market Cap', 'Sector', 'P/E Ratio'],
    ['Apple Inc.', 'AAPL', 150.25, '2.4T', 'Technology', 28.5],
    ['Microsoft Corp.', 'MSFT', 310.80, '2.3T', 'Technology', 32.1],
    ['Amazon.com Inc.', 'AMZN', 125.50, '1.3T', 'Consumer Discretionary', 45.2],
    ['Alphabet Inc.', 'GOOGL', 102.75, '1.3T', 'Technology', 22.8],
    ['Tesla Inc.', 'TSLA', 185.30, '588B', 'Consumer Discretionary', 65.4],
    ['Meta Platforms', 'META', 320.15, '815B', 'Technology', 24.7],
    ['NVIDIA Corp.', 'NVDA', 425.80, '1.05T', 'Technology', 62.3],
    ['Berkshire Hathaway', 'BRK.A', 520000, '750B', 'Financial Services', 15.2],
    ['Johnson & Johnson', 'JNJ', 162.45, '425B', 'Healthcare', 16.8],
    ['JPMorgan Chase', 'JPM', 148.20, '432B', 'Financial Services', 12.5],
  ];

  const hotSettings = {
    data,
    rowHeaders: true,
    colHeaders: true,
    contextMenu: true,
    manualRowResize: true,
    manualColumnResize: true,
    manualRowMove: true,
    manualColumnMove: true,
    filters: true,
    dropdownMenu: true,
    columnSorting: true,
    multiColumnSorting: true,
    autoWrapRow: true,
    autoWrapCol: true,
    licenseKey: 'non-commercial-and-evaluation',
    height: 'auto',
    stretchH: 'all' as const,
    columns: [
      { type: 'text', width: 150 },
      { type: 'text', width: 80 },
      { type: 'numeric', numericFormat: { pattern: '$0,0.00' }, width: 100 },
      { type: 'text', width: 120 },
      { type: 'text', width: 180 },
      { type: 'numeric', numericFormat: { pattern: '0.0' }, width: 100 },
    ],
  };

  return (
    <AnimatedPage>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              Data Sandbox
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Interactive data table for exploring and manipulating financial data.
              You can sort, filter, edit cells, and perform various data operations.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ width: '100%', overflow: 'auto' }}>
              <HotTable ref={hotTableRef} settings={hotSettings} />
            </Box>
          </Paper>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Features: Right-click for context menu, drag columns/rows to reorder,
              use dropdown filters, sort by clicking column headers.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default Data;
