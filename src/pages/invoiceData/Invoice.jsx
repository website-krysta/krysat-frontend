import "./product.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const Invoice = () => {

  //filter data and pagenation 
  const [filterValue, setFilterValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const invoislistPerPage = 8;
  const pagesVisited = pageNumber * invoislistPerPage;

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
  .map(post => (
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
  ));

  const pageCount = Math.ceil(filteredinvoicedata.length / invoislistPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };





  useEffect(() =>{
    getinvoiceata();
  },{});

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/invoice/addinvoice" className="link px-3"><AddIcon/>Add Invoice</Link>
      </div>
      <div className="d-flex justify-content-between aligen-items-center">
        <div className="datatableTitle">
        Invoic List
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
                <th scope="col">Invoice Date</th>
                <th scope="col">Recieved Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {displayinvoicelist}
            
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

export default Invoice;
