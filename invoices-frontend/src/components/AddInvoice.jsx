import { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions
} from '@mui/material';

function AddInvoice({setInvoices, api}) {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState("");

    const [dialogText, setDialogText] = useState({title: "", content: ""});

    function createButton() {
        setLoading(true);

        api.addInvoice(reason, Number(amount), to, from)
        .then((response) => {
            setDialogText({title: "Success", content: response});
            setLoading(false);
            api.getInvoices()
            .then((response) => {
                setInvoices(response);
            })
            .catch((error) => {
                setDialogText({title: "Error", content: error.message});
                setDialogVisible(true);
            });
        })
        .catch((error) => {
            setDialogText({title: "Error", content: error.message});
            setDialogVisible(true);
            setLoading(false);
        });
    }

    return (<Box sx={{mt:2, px:8, display: "flex", flexDirection: 'column', gap: 2}}>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
            <TextField disabled={loading} label="To" sx={{flex: 2}}
            value={to}
            onChange={(e)=> {
                setTo(e.target.value);
            }}
            />

            <TextField disabled={loading} label="From" sx={{flex: 2}}
            value={from}
            onChange={(e)=> {
                setFrom(e.target.value)
            }}
            />

            <TextField disabled={loading} label="Amount" sx={{flex: 1}}
            value={amount}
            onChange={(e)=> {
                if (e.target.value === "") setAmount("");
                if (Number.isNaN(Number(e.target.value))) return;

                setAmount(e.target.value);
            }}
            />
        </Box>
        <TextField disabled={loading} label="Reason"
            value={reason}
            onChange={(e)=> {
                setReason(e.target.value)
            }}
        />
        <Button disabled={loading} onClick={()=>{createButton()}} variant="contained" sx={{py: 2, mx:20}}>Create</Button>
        {
        dialogVisible && (
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
        )
        }
    </Box>);
}

export default AddInvoice;