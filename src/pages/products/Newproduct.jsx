import "./productlist.scss";
import './addproduct.css' 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Rawmaterialform from "./Rawmaterialform"
import Productform from "./Productform"
import Packingmaterial from "./Packingmaterial"
// import AddIcon from "@mui/icons-material/Add";
// import StoreIcon from "@mui/icons-material/Store";
import Newrawmeterial from "../products/Newrawmeterial"
import Newvendor from "../products/Newvendor"
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate,useLocation } from 'react-router-dom';


const New = () => {
  // const invoiceData = JSON.parse(sessionStorage.getItem('invoiceinfo'));
  // let invoicID = invoiceData['ID']
  // get data from navigate compontent or parent component
  debugger;
  const invoiceifo = useLocation();
  debugger;
  // let inwordNo = invoiceData['InwardNumber']

  const [selectedOption, setSelectedOption] = useState('option1');
  
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bottom" >
          <div className="right" >
            <div className="row">
            <div className="col-12 d-flex justify-content-center pt-5">
                  <div className="col-4 mb-3 d-flex ">
                       
                        <input type="text" name="" value={invoiceifo.state.datainvoice.InwardNumber} className="form-control text-center" placeholder="Inward Number"/>
                  </div>
              </div>
              <div className="col-12 radio-btn-sec mb-5">
                <div className="d-flex justify-content-center ">
                  <div className="form-check pt-5 px-3">
                    <input
                      type="radio"
                      value="option1"
                      checked={selectedOption === 'option1'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label1" for="flexRadioDefault1">
                      Raw Material
                    </label>
                  </div>
                  <div className="form-check pt-5  px-4">
                    <input
                      type="radio"
                      value="option2"
                      checked={selectedOption === 'option2'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label1" for="flexRadioDefault2">
                      White Labeling
                    </label>
                  </div>
                  <div className="form-check pt-5  px-4">
                    <input
                      type="radio"
                      value="option3"
                      checked={selectedOption === 'option3'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label1" for="flexRadioDefault2">
                      Packing Material
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {selectedOption === 'option1' && (
              <Rawmaterialform data={invoiceifo.state && invoiceifo.state.datainvoice}/>
            )}
            {selectedOption === 'option2' && (
              <Productform data={invoiceifo.state && invoiceifo.state.datainvoice}/>
            )}
            {selectedOption === 'option3' && (
              <Packingmaterial data={invoiceifo.state && invoiceifo.state.datainvoice}/>
            )}




          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
