import "../products/productlist.scss";
import '../products/addproduct.css' 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const Labour = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
  
    let [labourdata , setlabourdata] = useState([]);
    const getLabourdata = async ()=>{
       try{
        
        let res = await axios.get('api/labour/list/');
        setlabourdata(res.data)
        console.log(labourdata )
       }
       catch(error){
        console.log(error)
       }
    }
    
    const handleuserDelete =  async(id) => {
     
       try{
        await axios.delete(`https://saimythribuilders.com/api/deleteuser/${id}/`)
        const updateuser = labourdata.filter(user => user.UserID !== id);
        setlabourdata(updateuser);
                
       }
       catch(error){
        console.log(error);
        
       }
     
    
    };
  
  // delet record 
  
  
  
  useEffect(() =>{
    getLabourdata();
   
  },{});
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {/* <div className="top d-flex justify-content-between align-items-center ">
          <h1>Add Labour </h1>
          <Link to="/users" className="link" >
            <button className="btn btn-warning">
              Back
            </button>
          </Link>
        </div> */}

        <div className="bottom" >
          <div className="right" >
            <div className="row">
            <div className="datatable">
      <div className="datatableTitle">
        All Labour Details
        <Link to="/labour/new" className="link">Add Labour</Link>
      </div>
     
 
      <div>
        <div className="main mt-4">
        <table class="table">
            <thead>
              <tr>
                {/* <th scope="col">UserID</th> */}
                <th scope="col">TotalLabours</th>
                <th scope="col">MorningShiftCount</th>
                <th scope="col">NightShiftCount</th>
                <th scope="col">MorningShiftAmount</th>
                <th scope="col">NightShiftAmount</th>
                {/* <th scope="col">AddedTimeStamp</th> */}
              </tr>
            </thead>
            {labourdata.map((post)=>{
                 return (
            <tbody>
              <tr key={post.ID}>
                {/* <td>{post.UserID}</td> */}
                <td>{post.TotalLabours}</td>
                <td>{post.MorningShiftCount}</td>
                <td>{post.NightShiftCount}</td>
                <td>{post.MorningShiftAmount}</td>
                <td>{post.NightShiftAmount}</td>
                {/* <td>{post.AddedTimeStamp}</td> */}
                
                {/* <td>
                  <button
                    onClick={() => navigate(`/users/viewuser/${post.UserID}`)}
                    className='btn btn-primary'><PreviewIcon />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/users/edituser/${post.UserID}`)}
                    className='btn btn-warning'><CreateIcon/>
                  </button>
                </td>
                <td>
                  <button
                   onClick={() => handleuserDelete(post.UserID)}
                    className='btn btn-danger'><RestoreFromTrashIcon />
                  </button>
                </td> */}
              </tr>
            </tbody>);
            })}
        </table>
                                  </div>
                              </div>


                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Labour;
