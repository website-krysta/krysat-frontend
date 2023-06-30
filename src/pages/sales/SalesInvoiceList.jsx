// import "./product.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import DetailsIcon from '@mui/icons-material/Details';
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const SalesInvoiceList = () => {

  //filter data and pagenation 
  const [filterValue, setFilterValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const invoislistPerPage = 8;
  const pagesVisited = pageNumber * invoislistPerPage;

  const navigate = useNavigate();
  let [invoiceData , setinvoiceData] = useState([]);
  const getinvoiceata = async ()=>{
    try{
     
     let res = await axios.get('api/salesinvoice/list/');
     setinvoiceData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
  

  // get vendor form data
  const [vendorData, setvendorData] = useState([]);
  const getvendordata = async ()=>{
    try{
     let res = await  axios.get('/api/vendor/list/');
     setvendorData(res.data)
    }
    catch(error){
     console.log(error)
    }
  }
   
   const [salseData, setSalseData] = useState([]);
   const getsalseData = async ()=>{
     try{
      debugger;
      let res = await  axios.get('api/sales/list/');
      debugger;
      setSalseData(res.data)
     }
     catch(error){
      console.log(error)
     }
   }

 //filter and pagenation code 
//filter table data 
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  // filter with page nation 
  const filteredinvoicedata = invoiceData.filter(
    invoice => invoice.InvoiceNumber.toLowerCase().includes(filterValue.toLowerCase())
  );
 const displayinvoicelist = filteredinvoicedata
  .slice(pagesVisited, pagesVisited + invoislistPerPage)
  .map(post => {
    debugger;
  const vendor = vendorData.find(vendor => vendor.VendorID === post.VendorID);
  const sales = salseData.find(sales => sales.InvoiceID === post.InvoiceID);
  return (
    <tr key={post.InvoiceID}>
    <td>{post.InvoiceNumber}</td>
    <td>{post.InwardNumber}</td>
    <td>{post.BatchNo}</td>
    <td>{vendor ? vendor.VendorName : post.VendorID}</td>

    <td>{sales ? sales.TotalProducts:0}</td>
    <td>{sales ? sales.TotalAmount:0}</td>
    <td>{post.InvoiceDate}</td>
    <td>{post.RecievedDate}</td>
    <td>
    <div className="actions-btns">
          <div
              onClick={() => navigate(`/sales/updatsaleinvoice/${post.InvoiceID}`)}
              className='edit'><CreateIcon/>
          </div>
          <div
            onClick={() => navigate(`/sales/saleProducts/${post.InvoiceID}`)}
            className='view'><DetailsIcon/> 
          </div>
    </div>
      {/* <button
        onClick={() => navigate(`/sales/updatsaleinvoice/${post.InvoiceID}`)}
        className='btn btn-warning'>Edit 
      </button>
    </td>
    <td>
      <button
      
        onClick={() => navigate(`/sales/saleProducts/${post.InvoiceID}`)}
        className='btn btn-warning'>Details 
      </button> */}
    </td>
  </tr>
  )
  });

  const pageCount = Math.ceil(filteredinvoicedata.length / invoislistPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };





  useEffect(() =>{
    getinvoiceata();
    getvendordata();
    getsalseData();
  },{});

  return (
    <div className="datatable">
     <div className="datatableTitle">
        Sales Invoic List
        </div>
      <div className="d-flex justify-content-between aligen-items-center">
        {/* <div className="datatableTitle">
        Sales Invoic List
        </div> */}
        <div className="datatableTitle">
        <Link to="/sales/saleinvoice" className="link px-3"><AddIcon/>Add Sales Invoice</Link>
      </div>
        <div className="datatableTitle"> 
        <div className="input-group  justify-content-end">
              <div className="form-outline">
                <input id="search-input" type="search" onChange={handleFilterChange} value={filterValue}  className="form-control py-2"  placeholder=" Filter by Invoice Number "/>
              </div>
              <button id="search-button" type="button" className="btn btn-primary py-2">
              <ContentPasteSearchIcon />
              </button>
        </div>
        </div>
      </div>
     
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Invoice Number</th>
                <th scope="col">Inward Number</th>
                <th scope="col">BatchNo</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">No of Products</th>
                <th scope="col">Invoice Value</th>
                <th scope="col">Invoice Date</th>
                <th scope="col">Recieved Date</th>
                <th scope="col">Actions</th>
                
              </tr>
            </thead>
            <tbody>
            {displayinvoicelist}
            </tbody>
        </table>
        <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
        </div>
      </div>
    

    </div>
  );
};

export default SalesInvoiceList;
