import "../products/productlist.scss";
import '../products/addproduct.css' 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const Labour = () => {


   //filter data and pagenation 
   const [filterValue, setFilterValue] = useState('');
   const [pageNumber, setPageNumber] = useState(0);
   const invoislistPerPage = 8;
   const pagesVisited = pageNumber * invoislistPerPage;

    const navigate = useNavigate();
    const [data, setData] = useState([]);
  
    let [labourdata , setlabourdata] = useState([]);
    const getLabourdata = async ()=>{
       try{
        
        let res = await axios.get('api/labour/list/');
        setlabourdata(res.data)
        console.log(labourdata )
       }
       catch(error){
        console.log(error)
       }
    }
    
    // const handleuserDelete =  async(id) => {
     
    //    try{
    //     await axios.delete(`api/deleteuser/${id}/`)
    //     const updateuser = labourdata.filter(user => user.UserID !== id);
    //     setlabourdata(updateuser);
                
    //    }
    //    catch(error){
    //     console.log(error);
        
    //    }
     
    
    // };
  
  // filter with page nation 
  const filterelabourdata = labourdata.filter(
    invoice => invoice.EnteryDate.toLowerCase().includes(filterValue.toLowerCase())
  );
 const displaylabourlist = filterelabourdata
  .slice(pagesVisited, pagesVisited + invoislistPerPage)
  .map(post => (
    <tr key={post.ID}>
                <td>{post.TotalLabours}</td>
                <td>{post.MorningShiftCount}</td>
                <td>{post.NightShiftCount}</td>
                <td>{post.MorningShiftAmount}</td>
                <td>{post.NightShiftAmount}</td>
                <td>{format(new Date(post.EnteryDate), 'dd-MM-yyyy')}</td>
              </tr>
  ));

  const pageCount = Math.ceil(filterelabourdata.length / invoislistPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  
  //filter table data 
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  
  useEffect(() =>{
    getLabourdata();
   
  },{});
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
        <Link to="/labour/new" className="link">Add Labour</Link>
      </div>
      <div className="d-flex justify-content-between aligen-items-center">
        <div className="datatableTitle">
      Labour Details
        </div>
        <div className="datatableTitle"> 
        <div className="input-group  justify-content-end">
              <div className="form-outline">
                <input id="search-input" type="date" onChange={handleFilterChange} value={filterValue}  className="form-control py-2"  placeholder=" Filter by Invoice Number "/>
              </div>
              <button id="search-button" type="button" className="btn btn-primary py-2">
              <ContentPasteSearchIcon />
              </button>
        </div>
        </div>
      </div>
     
 
      <div>
        <div className="main mt-4">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">TotalLabours</th>
                <th scope="col">MorningShiftCount</th>
                <th scope="col">NightShiftCount</th>
                <th scope="col">MorningShiftAmount</th>
                <th scope="col">NightShiftAmount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
            {displaylabourlist}
            </tbody>
            {/* {labourdata.map((post)=>{
                 return (
            <tbody>
              <tr key={post.ID}>
                <td>{post.TotalLabours}</td>
                <td>{post.MorningShiftCount}</td>
                <td>{post.NightShiftCount}</td>
                <td>{post.MorningShiftAmount}</td>
                <td>{post.NightShiftAmount}</td>
                <td>{format(new Date(post.EnteryDate), 'dd-MM-yyyy')}</td>
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
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Labour;
