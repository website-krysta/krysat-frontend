
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import axios from "../../api/axios";
import { Link,useParams,useNavigate } from 'react-router-dom';


const SalesInvoiceDetails = () => {

    
  const navigate = useNavigate();
  const { invoiceid } = useParams();
  const [SaleData , setSaleData] = useState([]);

  const getSalesdetails = async ()=>{
    try{
     debugger;
     let res = await axios.get('api/sales_details_ViewSet/');
      setSaleData(res.data) 
    }
    catch(error){
     console.log(error)
    }

    }
      
    const filteredData = SaleData.filter(obj => obj.SaleInfo.InvoiceID === parseInt(invoiceid));
   

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
        Invoice Product list
      
      </div>
     
      <div>
        <div className="main">
     
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Product price</th>
                <th scope="col">Product Quantity</th>
                <th scope="col">Damaged Quantity</th>
                <th scope="col">Damage Reason</th>
                <th scope="col">LossPrice</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {filteredData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.ID}>
                <td>{post.formulainfo == null ? post.whitelabeling.ProductName : post.formulainfo.FormulaName }</td>
                <td>{post.Price}</td>
                <td>{post.Quantity}</td>
                <td>{post.sales_damage.length > 0 ? post.sales_damage[0].DamagedQuantity : 0}</td>
                <td>{post.sales_damage.length > 0 ? post.sales_damage[0].DamageReason : 'no damage'}</td>
                <td>{post.sales_damage.length > 0 ? post.sales_damage[0].LossPrice : 0}</td>
              
                <td>
                  <button
                    onClick={() => navigate(`/Sales/saleDamage/${post.ID}`,{ state: { datainvoice: post } })}
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

export default SalesInvoiceDetails;

