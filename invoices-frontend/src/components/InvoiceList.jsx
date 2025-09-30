import { useState } from 'react';
import { Stack, Card, CardContent, Typography, Box,
    IconButton, Dialog, DialogTitle, DialogContent, DialogContentText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function InvoiceList({invoices, setInvoices, api}) {
    const [dialogText, setDialogText] = useState({title: "", content: ""});
    const [dialogVisible, setDialogVisible] = useState(false);

    function deleteInvoice(id) {
        api.deleteInvoice(id)
        .then((response)=>{
            api.getInvoices()
            .then((response) => {
                setInvoices(response);
            })
            .catch((error) => {
                setDialogText({title: "Error", content: error.message});
                setDialogVisible(true);
            });
        })
    }

    return (<>
    
    <Stack sx={{mt: 4}} spacing={2}>
    {invoices.map((invoice) => {
        return (
            <Card elevation={4}>
                <CardContent>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <Box sx={{flex: 1}}>
                            <Typography sx={{mb:1}} variant="h6">
                                {`\$${invoice.amount}`}
                            </Typography>

                            <Typography>
                                {`To: ${invoice.to}`}
                            </Typography>
                            <Typography sx={{mb:2}}>
                                {`From: ${invoice.from}`}
                            </Typography>

                            <Typography variant="body2">
                                {invoice.reason}
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton onClick={()=>{deleteInvoice(invoice.id)}}>
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        );
    })}
    </Stack>
    
    {dialogVisible && (
        <Dialog
            open={()=>{return}}
            onClose={()=>{setDialogVisible(false)}}
        >
            <DialogTitle>
                {dialogText.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogText.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{setDialogVisible(false)}}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )}
    </>);   
}

export default InvoiceList;