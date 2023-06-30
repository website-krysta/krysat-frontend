// import "./product.scss";
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import axios from "../../api/axios";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ReactPaginate from 'react-paginate';

const Packingstock = () => {

  const [filterValue, setFilterValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const materialsPerPage = 8;
  const pagesVisited = pageNumber * materialsPerPage;

  
  const navigate = useNavigate();
  let [mstockData , setmstockData] = useState([]);
  const getpackingstock = async ()=>{
    try{
     
     let res = await axios.get('api/packing/list/');
     setmstockData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }

 // filter with page nation 
const filteredPackinging = mstockData.filter(
  material => material.PackingMaterialName.toLowerCase().includes(filterValue.toLowerCase())
);
  const displayPackingList = filteredPackinging
  .slice(pagesVisited, pagesVisited + materialsPerPage)
  .map(post => (
    <tr key={post.PackingMaterialID}>
    <td>{post.PackingMaterialName}</td>
      <td>{post.PackingMaterialCode}</td>
      <td>{post.QtyType}</td>
      <td>{post.TotalQuantity-post.ConsumedQuantity}</td>
      
      <td>
        <div className="actions-btns useraction-btns">
          <div onClick={() => navigate(`/stock/packinglist/${post.PackingMaterialID}`)}
            className='view'><CreateIcon />
          </div>
        </div>
        
        {/* <button
          onClick={() => navigate(`/stock/packinglist/${post.PackingMaterialID}`)}
          className='btn btn-warning'>Details
        </button> */}
      </td>
    </tr>
  ));

  const pageCount = Math.ceil(filteredPackinging.length / materialsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
 //filter table data 
 const handleFilterChange = (event) => {
  setFilterValue(event.target.value);
};



  useEffect(() =>{
    getpackingstock();
  },{});

  return (
    <div className="datatable">
    
      <div className="d-flex justify-content-between aligen-items-center">
        <div className="datatableTitle">
        Packing Material Stock
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
            {displayPackingList}
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

export default Packingstock;
