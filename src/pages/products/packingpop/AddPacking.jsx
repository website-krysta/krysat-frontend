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
import axios from "../../../api/axios";
import {useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

export default function Addpacking() {
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
  // const [selectedvOption, setSelectedvOption] = useState(null);
  const [packingData, setpackingData] = useState({
    PackingMaterialID: '2',
    PackingMaterialCode: '',
    ProductName: '',
    QtyType:'',
    TotalQuantity: '0',
    ConsumedQuantity:'0',
    AddedTimestamp:'2023-04-05T13:05:52Z',
    UpdatedTimestamp:'2023-04-05T13:05:52Z'
  });

  const handleChange = (event) => {
    setpackingData({
      ...packingData,
      [event.target.name]: event.target.value
    });
  };


  const handladdrwamaterial = async (event) => {
    event.preventDefault();
    debugger
    try{
      let res = await axios.post('/api/packing/add/',packingData );
      handleClose()
      alert("Packing details created successfully!")
      
    }
    catch(error){
        alert('Oops! Unable to create packing details. Please check the provided information and try again later.')
    }
  }

  useEffect (()=>{
    handladdrwamaterial();
  },{})
  

  return (
    <div className="mainpop">
        
      <a variant="outlined" className='addbtn' onClick={handleClickOpen}>
      <AddIcon className="icon" /> New
      </a>
      
      <Dialog open={open} onClose={handleClose}>
        <div className='d-flex justify-content-between'>
            <DialogTitle>Add Packing</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose}> <CloseIcon className="icon" /></Button>
            </DialogActions>
        </div>
       
        
        <DialogContent>
        <form id="login-form" >
          <div className="mb-3">
            <input type="text" name="PackingMaterialCode" value={packingData.PackingMaterialCode} onChange={handleChange}  className="form-control pt-3" id="PackingMaterialCode"  placeholder="PackingMaterialCode" required />
          </div>
          <div className="mb-3">
            <input type="text" name="PackingMaterialName" value={packingData.PackingMaterialName} onChange={handleChange}  className="form-control pt-3" id="PackingMaterialName" placeholder="PackingMaterialName" required />
          </div>
          <div className="formInput col-6 mb-3">
                    <select className="popdropdown"  name="QtyType"  value={packingData.QtyType} onChange={handleChange}  >
                    <option value="">-- Select QtyType --</option>
                      <option value="kg">kg</option>
                      <option value="gram">Grams</option>
                      <option value="liter">Liters</option>
                      <option value="numbers">Numbers</option>
                    </select>
                </div>
          {/* <div className="mb-3">
            <input type="number" name="TotalQuantity" value={packingData.TotalQuantity} onChange={handleChange}  className="form-control pt-3" id="TotalQuantity"  placeholder="TotalQuantity" required />
          </div>
          <div className="mb-3">
            <input type="number" name="ConsumedQuantity" value={packingData.ConsumedQuantity} onChange={handleChange}  className="form-control pt-3" id="ConsumedQuantity"  placeholder="ConsumedQuantity" required />
          </div> */}
          
          <div className="center-btn">
          <button type="submit" onClick={handladdrwamaterial}  className="btn login-btn text-center px-5">Submit</button>
          </div>
         
        </form>
    
        </DialogContent>
      </Dialog>
    </div>
  );
}
