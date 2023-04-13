// import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

import React, { useEffect, useState } from "react";

export default function Addpacking() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//  start main function
  const [rameterialData, setrameterialData] = useState({
    MaterialID: '',
    MaterialCode: '',
    MaterialName: '',
    TotalQuantity:'',
    ConsumedQuantity:''


  });

  const handleChange = (event) => {
    setrameterialData({
      ...rameterialData,
      [event.target.name]: event.target.value
    });
  };




  return (
    <div>
        
      <Button className='addbtn' variant="outlined" onClick={handleClickOpen}>
      <AddIcon className="icon" /> New
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <div className='d-flex justify-content-between'>
            <DialogTitle>Packing Product</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose}> <CloseIcon className="icon" /></Button>
            </DialogActions>
        </div>
       
        
        <DialogContent>
        <form id="login-form" >
          <div className="mb-3">
            <input type="number" name="code" onChange={handleChange}  className="form-control pt-3" id="code"  placeholder="code" required />
          </div>
          <div className="mb-3">
            <input type="text" name="name" onChange={handleChange}  className="form-control pt-3" id="name" placeholder="name" required />
          </div>
          <div className="mb-3">
          <select className="popdropdown"  name="QtyType"  value="" onChange={handleChange}  >
                    <option value="">-- Select QtyType --</option>
                      <option value="kg">kg</option>
                      <option value="grams">grams</option>
                    </select>
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
