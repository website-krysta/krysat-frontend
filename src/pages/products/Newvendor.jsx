import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

import axios from "axios";
import {useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";



export default function Newvendor() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//  start main function
const now = new Date();
const [vendorData, setvendorData] = useState({
  VendorCode :'',
  VendorName :'',
  VendorShopName  :'',
  Phone :'',
  EmailID :'',
  Address :'',
  City :'',
  State :'',
  AddedTimestamp :'2023-04-05T13:05:52Z',
  UpdatedTimestamp :'2023-04-05T13:05:52Z',
});

const handleChange = (event) => {
  setvendorData({
    ...vendorData,
    [event.target.name]: event.target.value
  });
};


const handladdvendor = async (event) => {
  event.preventDefault();
  debugger
  try{
    let res = await axios.post('http://127.0.0.1:8000/api/vendor/add/',vendorData );
    navigate('/products/new')
  }
  catch(error){
      alert('User adding fail please try agian !')
  }
}


useEffect (()=>{
  handladdvendor();
},{})





  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      <AddIcon className="icon" /> New Vendor
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
            <input type="text" name="VendorCode" value={vendorData.VendorCode} onChange={handleChange}  className="form-control pt-3" id="code"  placeholder="vendor code" required />
          </div>
          <div className="mb-3 mt-3">
            <input type="text" name="VendorName" value={vendorData.VendorName} onChange={handleChange}  className="form-control pt-3" id="name"  placeholder="name" required />
          </div>
          <div className="mb-3 mt-3">
            <input type="email" name="EmailID" value={vendorData.EmailID} onChange={handleChange}  className="form-control pt-3" id="email1"  placeholder="email" required />
          </div>
          <div className="mb-3">
            <input type="phone" name="Phone" value={vendorData.Phone} onChange={handleChange} className="form-control pt-3" id="exampleInputphone" placeholder="phone" required />
          </div>
          <div className="mb-3">
            <input type="text" name="VendorShopName" value={vendorData.VendorShopName} onChange={handleChange} className="form-control pt-3" id="ShopName" placeholder="ShopName" required />
          </div>
          <div className="mb-3">
            <input type="text" name="Address" value={vendorData.Address} onChange={handleChange}  className="form-control pt-3" id="exampleInputaddress" placeholder="address" required />
          </div>
          <div className="mb-3">
            <input type="text" name="City" value={vendorData.City} onChange={handleChange}  className="form-control pt-3" id="city" placeholder="city" required />
          </div>
          <div className="mb-3">
            <input type="text" name="State" value={vendorData.State} onChange={handleChange}  className="form-control pt-3" id="examplestate" placeholder="state" required />
          </div>
          <div className="center-btn">
          <button type="submit" onClick={handladdvendor}  className="btn login-btn text-center px-5">Submit</button>
          </div>
        </form>
        </DialogContent>
     
      </Dialog>
    </div>
  );
}
