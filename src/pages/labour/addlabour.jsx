// import "../products/productlist.scss";
// import '../products/addproduct.css' 
import "../labour/labour.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const Addlabour = () => {

 const navigate = useNavigate();

  //  start main function
  const [labourData, setlabourData] = useState({
    ID :'',
    TotalLabours :'',
    MorningShiftCount  :'',
    NightShiftCount :'',
    MorningShiftAmount :'',
    NightShiftAmount :'',
    EnteryDate:'',
    AddedTimeStamp :'2023-04-05T13:05:52Z',
    updatedTimeStamp :'2023-04-05T13:05:52Z',
  });
  
  const handleChange = (event) => {
    setlabourData({
      ...labourData,
      [event.target.name]: event.target.value
    });
  };
  
  
  const handlAddlabour = async (event) => {
    event.preventDefault();

    try{
        debugger;
      let res = await axios.post('api/labour/add/',labourData );
      navigate('/labour')
      alert("Sucessfully adding labour Reacord")
    }
    catch(error){
        alert('Labour adding fail please try agian !')
    }
  }
  
  
  useEffect (()=>{
    handlAddlabour();
  },{})

  return (
      <div className="new">
          <Sidebar />
          <div className="newContainer">
              <Navbar />
              <div className="bottom" >
                  <div className="right" >
                      <div className="row">
                          <div className="datatable">
                              <div className="datatableTitle">
                                  Add Labour Details
                              </div>
                              <div>
                                      <form className="labourform addlabourform">
                                          <div class="row">
                                              <h1 className="text-center text-primary pt-4"></h1>
                                              <div className="col-md-12">
                                                  <div className="mb-3">
                                                  <label>Entry Date</label>
                                                  <input type="date" name="EnteryDate" onChange={handleChange} className="form-control pt-3" id="enteryDate" placeholder="Please entry Date" required />
                                                  </div>
                                                  <div className="formInput1 mb-3 mt-2">
                                                  <label>Total Labours</label>
                                                      <input type="number"  name="TotalLabours" onChange={handleChange} className="form-control pt-3" id="TotalLabours" placeholder="TotalLabours" required />
                                                  </div>
                                                  <div className="formInput1 mb-3">
                                                  <label>Morning Shift</label>
                                                      <input type="number"  name="MorningShiftCount" onChange={handleChange} className="form-control pt-3" id="MorningShiftCount" placeholder="MorningShiftCount" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label>Night Shift</label>
                                                      <input type="number"  name="NightShiftCount" onChange={handleChange} className="form-control pt-3" id="NightShiftCount" placeholder="NightShiftCount" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label>Morning Shift Amount</label>
                                                      <input type="number"  name="MorningShiftAmount" onChange={handleChange} className="form-control pt-3" id="MorningShiftAmount" placeholder="MorningShiftAmount" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label>Night Shift Amount</label>
                                                      <input type="number"  name="NightShiftAmount" onChange={handleChange} className="form-control pt-3" id="NightShiftAmount" placeholder="NightShiftAmount" required />
                                                  </div>
                                                
                                                  
                                                <div className="mb-5">
                                                    <button onClick={handlAddlabour} >Add labour</button>
                                                </div>
            
                                              </div>

                                          </div>
                                      </form>

                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
     
  );
};

export default Addlabour;
