
import Sidebar from "../../components/sidebar/Sidebar";
import CreateIcon from '@mui/icons-material/Create';
import DetailsIcon from '@mui/icons-material/Details';
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import {useParams,useNavigate } from 'react-router-dom';


const SalesBatch = () => {

    
  const navigate = useNavigate();
  const { salesid } = useParams();
  const [SaleData , setSaleData] = useState([]);

  const getSalesdetails = async ()=>{
    try{
     debugger;
     let res = await axios.get('api/batchsales/list/');
      setSaleData(res.data) 
    }
    catch(error){
     console.log(error)
    }

    }
      
    const filteredData = SaleData.filter(obj => obj.ID === parseInt(salesid));
   

 useEffect(() =>{
  getSalesdetails();
},[]);

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
                                    Sale Batch list
                                </div>
                                <div>
                                    <div className="main">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">BatchNo</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">AddedTimeStamp</th>                            
                                                </tr>
                                            </thead>
                                            {filteredData.map((post) => {
                                                return (
                                                    <tbody>
                                                        <tr key={post.ID}>
                                                            <td>{post.BatchNo}</td>
                                                            <td>{post.Quantity}</td>
                                                            <td>{post.AddedTimeStamp}</td>
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

export default SalesBatch;

