
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ReactPaginate from 'react-paginate';

const ProductionList = () => {

  const [filterValue, setFilterValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const materialsPerPage = 10;
  const pagesVisited = pageNumber * materialsPerPage;

  
  const navigate = useNavigate();
  let [mstockData , setmstockData] = useState([]);
  const getProductionstock = async ()=>{
    try{
     debugger;
     let res = await axios.get('api/productionTable_ViewSet/');
     setmstockData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
  
// filter with page nation 
const filteredMaterials = mstockData.filter(
  material => material.forumula.FormulaName.toLowerCase().includes(filterValue.toLowerCase())
);
  const displayProductionList = filteredMaterials
  .slice(pagesVisited, pagesVisited + materialsPerPage)
  .map(post => (
    <tr key={post.ProductionID}>
                <td>{post.forumula.FormulaName}</td>
                <td>{post.ProductionQuantity}</td>
                <td>{format(new Date(post.AddedTimeStamp), 'dd-MM-yyyy')}</td>
               
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
        <div className="datatableTitle">
        <Link to="/production/addproduction" className="link px-3"><AddIcon/>Add Production</Link>
      </div>
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
                <th scope="col">Production Qty</th>  
                <th scope="col">Production Date</th>
              </tr>
            </thead>
            {displayProductionList}
          
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

export default ProductionList;
