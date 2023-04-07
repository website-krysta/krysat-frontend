import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';




export default function AddPackingvendor() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      <AddIcon className="icon" /> New  Vendor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <div className='d-flex justify-content-between'>
        <DialogTitle>Add Vendor</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}> <CloseIcon className="icon" /></Button>
        </DialogActions>
        </div>
       
        <DialogContent>
        <form id="login-form" >
        <div className="mb-3 mt-3">
            <input type="text" name="code"   className="form-control pt-3" id="code"  placeholder="vendor code" required />
          </div>
          <div className="mb-3 mt-3">
            <input type="text" name="name"   className="form-control pt-3" id="name"  placeholder="name" required />
          </div>
          <div className="mb-3 mt-3">
            <input type="email" name="email"   className="form-control pt-3" id="email1"  placeholder="email" required />
          </div>
          <div className="mb-3">
            <input type="phone" name="phone"  className="form-control pt-3" id="exampleInputphone" placeholder="phone" required />
          </div>
          <div className="mb-3">
            <input type="text" name="company"  className="form-control pt-3" id="company" placeholder="company" required />
          </div>
          <div className="mb-3">
            <input type="text" name="address"  className="form-control pt-3" id="exampleInputaddress" placeholder="address" required />
          </div>
          <div className="mb-3">
            <input type="text" name="city"  className="form-control pt-3" id="city" placeholder="city" required />
          </div>
          <div className="mb-3">
            <input type="text" name="state"  className="form-control pt-3" id="examplestate" placeholder="state" required />
          </div>
          <div className="center-btn">
          <button type="submit"   className="btn login-btn text-center px-5">Submit</button>
          </div>
        </form>
    
        </DialogContent>
      </Dialog>
    </div>
  );
}
