// import "./product.scss";
import { Link ,useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ReactPaginate from 'react-paginate';


const Materialstock = () => {

  const navigate = useNavigate();
  let [mstockData , setmstockData] = useState([]);
  
  const [filterValue, setFilterValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const materialsPerPage = 10;
  const pagesVisited = pageNumber * materialsPerPage;


  const getmaterialstock = async ()=>{
    try{
     
     let res = await axios.get('api/meterial/list/');
     setmstockData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
 //filter table data 
 const handleFilterChange = (event) => {
  setFilterValue(event.target.value);
};

// filter with page nation 
const filteredMaterials = mstockData.filter(
  material => material.MaterialName.toLowerCase().includes(filterValue.toLowerCase())
);
  const displayMaterials = filteredMaterials
  .slice(pagesVisited, pagesVisited + materialsPerPage)
  .map(post => (
    <tr key={post.MaterialID}>
    <td>{post.MaterialName}</td>
    <td>{post.MaterialCode}</td>
    <td>{post.QtyType}</td>
    <td>{post.TotalQuantity-post.ConsumedQuantity}</td>
    <td>
      <button
        onClick={() => navigate(`/stock/materiallist/${post.MaterialID}`)}
        className='btn btn-warning'>Details
      </button>
    </td>
  </tr>
  ));

  const pageCount = Math.ceil(filteredMaterials.length / materialsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() =>{
    getmaterialstock();
  },{});

  return (
    <div className="datatable">

      <div className="d-flex justify-content-between aligen-items-center">
        <div className="datatableTitle">
          Raw Material Stock
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
                <th scope="col">MaterialName</th>
                <th scope="col">MaterialCode</th>
                <th scope="col">QtyType</th>
                <th scope="col">Available Qty</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
                {displayMaterials}
           
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

export default Materialstock;
