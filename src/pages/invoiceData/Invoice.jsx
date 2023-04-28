import "./product.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const Invoice = () => {

  const navigate = useNavigate();
  let [invoiceData , setinvoiceData] = useState([]);
  const getinvoiceata = async ()=>{
    try{
     
     let res = await axios.get('api/invoice/list/');
     setinvoiceData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
  


  useEffect(() =>{
    getinvoiceata();
  },{});

  return (
    <div className="datatable">
      <div className="datatableTitle">
       Invoic List
        <Link to="/invoice/addinvoice" className="link px-3"><AddIcon/>Add Invoice</Link>
      </div>
     
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Invoice Number</th>
                <th scope="col">Inward Number</th>
                <th scope="col">Invoice Date</th>
                <th scope="col">Recieved Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {invoiceData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.InvoiceID}>
                <td>{post.InvoiceNumber}</td>
                <td>{post.InwardNumber}</td>
                <td>{post.InvoiceDate}</td>
                <td>{post.RecievedDate}</td>
                <td>
                  <button
                    onClick={() => navigate(`/invoice/editinvoice/${post.InvoiceID}`)}
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
  );
};

export default Invoice;
