import "../products/productlist.scss";
import '../products/addproduct.css' 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
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
        await axios.delete(`api/deleteuser/${id}/`)
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
                <th scope="col">TotalLabours</th>
                <th scope="col">MorningShiftCount</th>
                <th scope="col">NightShiftCount</th>
                <th scope="col">MorningShiftAmount</th>
                <th scope="col">NightShiftAmount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            {labourdata.map((post)=>{
                 return (
            <tbody>
              <tr key={post.ID}>
                <td>{post.TotalLabours}</td>
                <td>{post.MorningShiftCount}</td>
                <td>{post.NightShiftCount}</td>
                <td>{post.MorningShiftAmount}</td>
                <td>{post.NightShiftAmount}</td>
                <td>{format(new Date(post.EnteryDate), 'dd-MM-yyyy')}</td>
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
