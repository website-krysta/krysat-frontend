// import "./product.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';

const Formulalist = () => {

  let [formulaData , setformulaData] = useState([]);
  const getformulaData = async ()=>{
    try{
     
     let res = await axios.get('api/formula/list/');
     setformulaData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
  


  useEffect(() =>{
    getformulaData();
  },{});

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Formula List
        <Link to="/formula/new" className="link px-3"><AddIcon/>New Formula </Link>
      </div>
     
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Formula Name</th>
                <th scope="col">Total MaterialsUsed</th>
                <th scope="col">AddedTimeStamp</th>
              </tr>
            </thead>
            {formulaData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.ID}>
                <td>{post.FormulaName}</td>
                <td>{post.TotalMaterialsUsed}</td>
                <td>{post.AddedTimeStamp}</td>
              </tr>
            </tbody>);
            })}
        </table>
        </div>
      </div>
    

    </div>
  );
};

export default Formulalist;
