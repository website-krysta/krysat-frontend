// import "./product.scss";
import { Link ,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ReactPaginate from 'react-paginate';


const Whitelabelingstock = () => {
   
  const [filterValue, setFilterValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const materialsPerPage = 8;
  const pagesVisited = pageNumber * materialsPerPage;



  const navigate = useNavigate();
  let [mstockData , setmstockData] = useState([]);
  const getwhitelebelingstock = async ()=>{
    try{
     
     let res = await axios.get('api/product/list/');
     setmstockData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
  
// filter with page nation 
const filteredwhitelabeling = mstockData.filter(
  material => material.ProductName.toLowerCase().includes(filterValue.toLowerCase())
);
  const displaywhitelabelingList = filteredwhitelabeling
  .slice(pagesVisited, pagesVisited + materialsPerPage)
  .map(post => (
    <tr key={post.ProductID}>
                <td>{post.ProductName}</td>
                <td>{post.ProductCode}</td>
                <td>{post.QtyType}</td>
                <td>{post.TotalQuantity-post.ConsumedQuantity}</td>
                <td>
                  <button
                    onClick={() => navigate(`/stock/whitelabeling/${post.ProductID}`)}
                    className='btn btn-warning'>Details
                  </button>
                </td>
    </tr>
  ));

  const pageCount = Math.ceil(filteredwhitelabeling.length / materialsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
 //filter table data 
 const handleFilterChange = (event) => {
  setFilterValue(event.target.value);
};



  useEffect(() =>{
    getwhitelebelingstock();
  },{});

  return (
    <div className="datatable">
    
      <div className="d-flex justify-content-between aligen-items-center">
        <div className="datatableTitle">
        White Labeling Stock
        </div>
        <div className="datatableTitle"> 
        <div className="input-group  justify-content-end">
              <div className="form-outline">
                <input id="search-input" type="search" onChange={handleFilterChange} value={filterValue}  className="form-control py-2"  placeholder=" Filter by Material Name "/>
              </div>
              <button id="search-button" type="button" className="btn btn-primary py-2">
              <ContentPasteSearchIcon />
              </button>
        </div>
        </div>
      </div>
   
     
      <div className="mt-5">
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">WhiteLabelName</th>
                <th scope="col">MaterialCode</th>
                <th scope="col">QtyType</th>
                <th scope="col">Available Qty</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {displaywhitelabelingList}
            {/* {mstockData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.ProductID}>
                <td>{post.ProductName}</td>
                <td>{post.ProductCode}</td>
                <td>{post.QtyType}</td>
                <td>{post.TotalQuantity-post.ConsumedQuantity}</td>
                <td>
                  <button
                    onClick={() => navigate(`/stock/whitelabeling/${post.ProductID}`)}
                    className='btn btn-warning'>Details
                  </button>
                </td>
              </tr>
            </tbody>);
            })} */}
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

export default Whitelabelingstock;
