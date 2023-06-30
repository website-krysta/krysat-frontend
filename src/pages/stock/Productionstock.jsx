
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import CreateIcon from '@mui/icons-material/Create';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ReactPaginate from 'react-paginate';

const Productionstock = () => {

  const [filterValue, setFilterValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const materialsPerPage = 8;
  const pagesVisited = pageNumber * materialsPerPage;

  
  const navigate = useNavigate();
  let [mstockData , setmstockData] = useState([]);
  const getProductionstock = async ()=>{
    try{
     debugger;
     let res = await axios.get('api/formula/list/');
    //  let res = await axios.get('api/productionTable_ViewSet/');
     setmstockData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
  
// filter with page nation 
const filteredMaterials = mstockData.filter(
  material => material.FormulaName.toLowerCase().includes(filterValue.toLowerCase())
);
  const displayProductionList = filteredMaterials
  .slice(pagesVisited, pagesVisited + materialsPerPage)
  .map(post => (
    <tr key={post.FormulaID}>
                <td>{post.FormulaName}</td>
                <td>{(post.TotalProductionQty - post.TotalSaledQty) <= 0 ? 0:post.TotalProductionQty - post.TotalSaledQty}</td>
                <td>
                <div className="actions-btns useraction-btns">
                  <div onClick={() => navigate(`/stock/production/${post.FormulaID}`)}
                    className='view'><CreateIcon/>

                </div>
                </div>
                  {/* <button
                    onClick={() => navigate(`/stock/production/${post.FormulaID}`)}
                    className='btn btn-warning'>Details
                  </button> */}
                </td>
               
    </tr>
  ));

  const pageCount = Math.ceil(filteredMaterials.length / materialsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
 //filter table data 
 const handleFilterChange = (event) => {
  setFilterValue(event.target.value);
};


  useEffect(() =>{
    getProductionstock();
  },{});

  return (
    <div className="datatable">
      <div className="d-flex justify-content-between aligen-items-center">
        <div className="datatableTitle">
        Production Stock
        </div>
        <div className="datatableTitle"> 
        <div className="input-group  justify-content-end">
              <div className="form-outline">
                <input id="search-input" type="search" onChange={handleFilterChange} value={filterValue}  className="form-control py-2"  placeholder="Product Name"/>
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
                <th scope="col">Product Name </th>
                <th scope="col">Available Qty</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
            {displayProductionList}
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

export default Productionstock;
