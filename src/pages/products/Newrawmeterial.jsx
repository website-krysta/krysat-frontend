// import * as React from 'react';
import "../new/new.scss";
import "./productlist.scss";
import './addproduct.css' 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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

export default function Newrawmeterial() {
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
  const [rameterialData, setrameterialData] = useState({
    MaterialID: '2',
    MaterialCode: '',
    MaterialName: '',
    QtyType:'',
    TotalQuantity: 10,
    ConsumedQuantity:'12',
    AddedTimestamp:'2023-04-05T13:05:52Z',
    UpdatedTimestamp:'2023-04-05T13:05:52Z'
    

  });

  const handleChange = (event) => {
    setrameterialData({
      ...rameterialData,
      [event.target.name]: event.target.value
    });
  };


  const handladdrwamaterial = async (event) => {
    event.preventDefault();
    debugger
    try{
      let res = await axios.post('http://127.0.0.1:8000/api/meterial/add/',rameterialData );
      alert("sucessfully submited")
      handleClose()
      
    }
    catch(error){
        alert('User adding fail please try agian !')
    }
  }

  // const handlevendorChange = (event) => {
  //   debugger
  //   setSelectedvOption(event.target.value);
  // }
  useEffect (()=>{
    handladdrwamaterial();
  },{})
  

  return (
    <div>
        
      <Button variant="outlined" onClick={handleClickOpen}>
      <AddIcon className="icon" /> New Raw Material
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <div className='d-flex justify-content-between'>
            <DialogTitle>Add Raw Meterial</DialogTitle>
            <DialogActions>
            <Button onClick={handleClose}> <CloseIcon className="icon" /></Button>
            </DialogActions>
        </div>
       
        
        <DialogContent>
        <form id="login-form" >
          <div className="mb-3">
            <input type="number" name="MaterialCode" value={rameterialData.MaterialCode} onChange={handleChange}  className="form-control pt-3" id="MaterialCode"  placeholder="MaterialCode" required />
          </div>
          <div className="mb-3">
            <input type="text" name="MaterialName" value={rameterialData.MaterialName} onChange={handleChange}  className="form-control pt-3" id="MaterialName" placeholder="MaterialName" required />
          </div>
          <div className="formInput col-6 mb-3">
                <label for="role">User Role</label>
                    <select className="popdropdown"  name="QtyType"  value={rameterialData.QtyType} onChange={handleChange}  >
                    <option value="">-- Select QtyType --</option>
                      <option value="kg">kg</option>
                      <option value="grams">grams</option>
                    </select>
                </div>
        
          
          <div className="center-btn">
          <button type="submit" onClick={handladdrwamaterial}  className="btn login-btn text-center px-5">Submit</button>
          </div>
         
        </form>
    
        </DialogContent>
      </Dialog>
    </div>
  );
}
