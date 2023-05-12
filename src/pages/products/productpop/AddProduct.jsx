// import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import axios from "../../../api/axios";
import {useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

export default function AddProduct() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//  start main function
  const [productData, setproductData] = useState({
    ProductID: '2',
    ProductCode: '',
    ProductName: '',
    QtyType:'',
    TotalQuantity: '0',
    ConsumedQuantity:'0',
    AddedTimestamp:'2023-04-05T13:05:52Z',
    UpdatedTimestamp:'2023-04-05T13:05:52Z'
  });

  const handleChange = (event) => {
    setproductData({
      ...productData,
      [event.target.name]: event.target.value
    });
  };


  const handladdrwamaterial = async (event) => {
    event.preventDefault();
    debugger
    try{
      let res = await axios.post('/api/product/add/',productData );
      handleClose()
      alert("Sucessfully Created")
      
    }
    catch(error){
        alert('User adding fail please try agian !')
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
            <DialogTitle>Add White Labeling</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose}> <CloseIcon className="icon" /></Button>
            </DialogActions>
        </div>
       
        
        <DialogContent>
        <form id="login-form" >
          <div className="mb-3">
            <input type="text" name="ProductCode" value={productData.ProductCode} onChange={handleChange}  className="form-control pt-3" id="ProductCode"  placeholder="ProductCode" required />
          </div>
          <div className="mb-3">
            <input type="text" name="ProductName" value={productData.MaterialName} onChange={handleChange}  className="form-control pt-3" id="ProductName" placeholder="ProductName" required />
          </div>
          <div className="formInput col-6 mb-3">
                    <select className="popdropdown"  name="QtyType"  value={productData.QtyType} onChange={handleChange}  >
                    <option value="">-- Select QtyType --</option>
                      <option value="kg">kg</option>
                      <option value="grams">grams</option>
                      <option value="grams">liters</option>
                    </select>
                </div>
          {/* <div className="mb-3">
            <input type="number" name="TotalQuantity" value={productData.TotalQuantity} onChange={handleChange}  className="form-control pt-3" id="TotalQuantity"  placeholder="TotalQuantity" required />
          </div>
          <div className="mb-3">
            <input type="number" name="ConsumedQuantity" value={productData.ConsumedQuantity} onChange={handleChange}  className="form-control pt-3" id="ConsumedQuantity"  placeholder="ConsumedQuantity" required />
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
