// import "./product.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const Formulalist = () => {

  //filter data and pagenation 
  const [filterValue, setFilterValue] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const invoislistPerPage = 10;
  const pagesVisited = pageNumber * invoislistPerPage;

  let [formulMaterialData , setformulMaterialData] = useState([]);
  let [formulaData , setformulaData] = useState([]);
  const getformulaData = async ()=>{
    try{
     debugger
      let res = await axios.get('api/Formula_Material_ViewSet/');
      setformulMaterialData(res.data)
     }
     catch(error){
      console.log(error)
     }
  
 }

const [tableData, setTableData] = useState([]);
// const getData = () => {
  useEffect(() => {
  debugger
  const data = formulMaterialData.reduce((acc, curr) => {
    const {Quantity, Formula: { FormulaName ,AddedTimeStamp }, aMaterial: { MaterialName } } = curr;
    const index = acc.findIndex(item => item.formulaName === FormulaName);
    const material = MaterialName+'-'+Quantity+"(%)"
    if (index >= 0) {
      acc[index].materialNames.push(material);
    } else {
      acc.push({
        formulaName: FormulaName,
        materialNames: [material],
        fdate:AddedTimeStamp
      });
    }

    return acc;
  }, []);

  setTableData(data);
});

//filter table and pagenation code 

const handleFilterChange = (event) => {
  setFilterValue(event.target.value);
};

// filter with page nation 
const filterformuladata = tableData.filter(
  formula => formula.formulaName.toLowerCase().includes(filterValue.toLowerCase())
);
const displayFormulalist = filterformuladata
.slice(pagesVisited, pagesVisited + invoislistPerPage)
.map(post => (
  <tr key={post.id}>
      <td>{post.formulaName}</td>
      <td>
        {post.materialNames.map((material, index) => (
          <span key={index} className="materialname">
            {material}{""}
          </span>
        ))}
      </td>
      {/* <td>{post.materialNames.join(',  ')}</td> */}
      <td>{format(new Date(post.fdate), 'dd-MM-yyyy')}</td>
   </tr>
));

const pageCount = Math.ceil(filterformuladata.length / invoislistPerPage);

const handlePageChange = ({ selected }) => {
  setPageNumber(selected);
};




  useEffect(() =>{
    getformulaData();
    // getData();
  },{});

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/formula/new" className="link px-3"><AddIcon/>New Formula </Link>
      </div>
      <div className="d-flex justify-content-between aligen-items-center">
      <div className="datatableTitle">
      Formula List
        </div>
      <div className="datatableTitle"> 
        <div className="input-group  justify-content-end">
              <div className="form-outline">
                <input id="search-input" type="search" onChange={handleFilterChange}   className="form-control py-2"  placeholder=" Filter by Invoice Number "/>
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
                <th scope="col">Formula Name</th>
                <th scope="col"> Materials (In Percentage)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
            {displayFormulalist}
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

export default Formulalist;
