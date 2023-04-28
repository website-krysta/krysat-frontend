
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link,useParams,useNavigate } from 'react-router-dom';


const MaterialstockList = () => {

  const navigate = useNavigate();
  const { MaterialID } = useParams();
  // let [selectedData ,setselectedData] = useState([]);
  const [mstockData , setmstockData] = useState([]);


  const getmaterialstock = async ()=>{
    try{
     debugger;
     let res = await axios.get('api/materialviewSet/');
      setmstockData(res.data) 
    }
    catch(error){
     console.log(error)
    }

    }
      
    const filteredData = mstockData.filter(obj => obj.MaterialID ===parseInt(MaterialID));


 useEffect(() =>{
  getmaterialstock();
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
        Raw Material Stock list
  
      </div>
     
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
               
                <th scope="col">Material Name</th>
                <th scope="col">Material Code</th>
                <th scope="col">Batch No</th>
                <th scope="col">QtyType</th>
                <th scope="col">VendorName</th>
                <th scope="col">DamagedQty </th>
                <th scope="col">InwardNumber </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {filteredData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.Id}>
                <td>{post.Material.MaterialName}</td>
                <td>{post.Material.MaterialCode}</td>
                <td>{post.BatchNo}</td>
                <td>{post.Material.QtyType}</td>
                <td>{post.Vendor.VendorName}</td>
                <td>{post.Damaged.DamagedQty}</td>
                <td>{post.invoice.InwardNumber}</td>
                <td>
                  <button
                    onClick={() => navigate(`/stock/updatematerial/${post.Id}`)}
                    className='btn btn-warning'>Edit
                  </button>
                </td>
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

export default MaterialstockList;
