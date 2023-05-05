// import "../products/productlist.scss";
// import './products/addproduct.css' 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Materialstock from "../stock/Materialstock"
import Packingstock from "../stock/Packingstock"
import Whitelabelingstock from "./Whitelabelingstock";
import Productionstock from './Productionstock';
// import Newrawmeterial from "../products/Newrawmeterial"
// import Newvendor from "../products/Newvendor"
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const Stockhome = () => {
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
                    &nbsp; Raw Material
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
                    &nbsp; White Labeling
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
                    &nbsp; Packing Material
                    </label>
                  </div>
                  <div className="form-check pt-5  px-4">
                    <input
                      type="radio"
                      value="option4"
                      checked={selectedOption === 'option4'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label1" for="flexRadioDefault2">
                     &nbsp; Production
                    </label>
                  </div>
                </div>
              </div>
            </div>

             {selectedOption === 'option1' && (
              <Materialstock />
            )}
           {selectedOption === 'option2' && (
              <Whitelabelingstock />
            )}
            {selectedOption === 'option3' && (
              <Packingstock />
            )}
             {selectedOption === 'option4' && (
              <Productionstock />
            )}




          </div>
        </div>
      </div>
    </div>
  );
};

export default Stockhome;
