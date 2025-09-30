const express = require('express');
const cors = require('cors');
const uuid = require('uuid-v4');
const app = express();

var invoices = []

app.use(cors());
app.use(express.json());

function processAddRequest(req, res) {
    const invoiceUuid = uuid();

    invoices.push({...req.body, id: invoiceUuid});

    res.status(200).send("Backend: Invoice was added\n");
}

function processValidateAddRequest(req, res) {
    const json = req.body;
    const keys = Object.keys(json);
    
    if (keys.length !== 4) {
        res.status(400).send("Backend: Too many or too little JSON keys for request.\n");
        return;
    }

    if (!keys.includes("reason") || !keys.includes("amount") || !keys.includes("from") || !keys.includes("to")) {
        res.status(400).send("Backend: One or more JSON keys are missing for request.\n");
        return;
    }

    
    if (typeof json.reason !== "string" || typeof json.amount !== "number" ||
    typeof json.from !== "string" || typeof json.from !== "string") {
        res.status(400).send("Backend: Incorrect data types for one or more JSON keys.\n");
        return;
    }
    
    processAddRequest(req, res);
}

app.post('/add', (req, res) => {
    processValidateAddRequest(req, res); 
});

app.get('/invoices', (req, res) => {
    const data = {invoices};

    res.status(200).json(data); 
});

function processDeleteRequest(req, res) {
    invoices = invoices.filter((item) => item.id !== req.body.id);
    
    res.status(200).send("Backend: Invoice deleted\n");
}

function processValidateDeleteRequest(req, res) {
    const json = req.body;
    const keys = Object.keys(json);
    
    if (keys.length !== 1) {
        res.status(400).send("Backend: Too many or too little JSON keys for request.\n");
        return;
    }

    if (!keys.includes("id")) {
        res.status(400).send("Backend: A JSON key is missing for request.\n");
        return;
    }
    
    if (typeof json.id !== "string") {
        res.status(400).send("Backend: Incorrect data type for JSON key\n");
        return;
    }

    const filteredInvoices = invoices.filter((item) => item.id === json.id);
    
    if (filteredInvoices.length <= 0) {
        res.status(400).send("Backend: Invoice not found for ID.\n");
        return;
    }
    
    processDeleteRequest(req, res);
}

app.delete('/delete', (req, res) => {
     processValidateDeleteRequest(req, res);
});

app.listen(8000, (err) => {
    if (err) {
        console.log("Some kind of error occurred.\n");
    } else {
        console.log("Server listening on port 8000.\n");
    }
});
