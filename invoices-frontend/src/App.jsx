import { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import AddInvoice from './components/AddInvoice.jsx';
import InvoiceList from './components/InvoiceList.jsx';
import API from './tools/API.js';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [api, setApi] = useState(new API("localhost",8000));

  return (
  <>
  <AppBar position="fixed">
    <Toolbar>
      <Typography variant="h6">
        Invoice Manager
      </Typography>
    </Toolbar>
  </AppBar>

  <Container maxWidth="md">
    <Toolbar />
    <AddInvoice setInvoices={setInvoices} api={api}/>
    <InvoiceList invoices={invoices} setInvoices={setInvoices} api={api}/>
  </Container>
  </>);
}

export default App;
