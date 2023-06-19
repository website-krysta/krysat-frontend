import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';

import axios from "../../api/axios";
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
  RegisteredName  :'',
  Phone :'',
  EmailID :'',
  Address :'',
  City :'',
  State :'',
  Zip:'',
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
    let res = await axios.post('api/vendor/add/',vendorData );
    handleClose()
    alert("Sucessfully Created new Vendor")
  }
  catch(error){
      alert("Oops! Unable to create Vendor. Please check the provided details and try again later.")
  }
}


useEffect (()=>{
  handladdvendor();
},{})





  return (
    <div className='mainpop'>
      <a className='addbtn' variant="outlined" onClick={handleClickOpen}>
      <AddIcon className="icon" /> New 
      </a>
      <Dialog open={open} onClose={handleClose}>
        <div className='d-flex justify-content-between'>
        <DialogTitle>Vendor/Distributor</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}> <CloseIcon className="icon" /></Button>
        </DialogActions>
        </div>
       
        <DialogContent>
        <form id="login-form" >
        <div className="mb-3 mt-3">
            <input type="text" name="VendorCode" value={vendorData.VendorCode} onChange={handleChange}  className="form-control pt-3" id="code"  placeholder="code" required />
          </div>
          <div className="mb-3 mt-3">
            <input type="text" name="VendorName" value={vendorData.VendorName} onChange={handleChange}  className="form-control pt-3" id="name"  placeholder="Name" required />
          </div>
          <div className="mb-3 mt-3">
            <input type="email" name="EmailID" value={vendorData.EmailID} onChange={handleChange}  className="form-control pt-3" id="email1"  placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input type="phone" name="Phone" value={vendorData.Phone} onChange={handleChange} className="form-control pt-3" id="exampleInputphone" placeholder="Phone" required />
          </div>
          <div className="mb-3">
            <input type="text" name="RegisteredName" value={vendorData.RegisteredName} onChange={handleChange} className="form-control pt-3" id="RegisteredName" placeholder="RegisteredName" required />
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
          <div className="mb-3">
            <input type="number" name="Zip" value={vendorData.Zip} onChange={handleChange}  className="form-control pt-3" id="zipcode" placeholder="zipcode" required />
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
