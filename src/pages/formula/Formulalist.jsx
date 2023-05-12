// import "./product.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';

const Formulalist = () => {

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
    // try{
     
    //  let res = await axios.get('api/formula/list/');
    //  setformulaData(res.data)
    // }
    // catch(error){
    //  console.log(error)
    // }
 }
//  const formulaMaterialData = formulMaterialData.map(entry => {
//   return {
//     formulaName: entry.Formula.FormulaName,
//     materialName: entry.aMaterial.MaterialName
//   }
// });
const [tableData, setTableData] = useState([]);
// const getData = () => {
  useEffect(() => {
  debugger
  const data = formulMaterialData.reduce((acc, curr) => {
    const {Quantity, Formula: { FormulaName ,AddedTimeStamp }, aMaterial: { MaterialName } } = curr;
    const index = acc.findIndex(item => item.formulaName === FormulaName);
    const material = MaterialName+'-'+Quantity
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



  useEffect(() =>{
    getformulaData();
    // getData();
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
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
            {tableData.map((item, index) => (
          <tr key={index}>
            <td>{item.formulaName}</td>
            <td>{item.materialNames.join(',')}</td>
            <td>{item.fdate}</td>
          </tr>
        ))}
          {/* {formulaMaterialData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.formulaName}</td>
              <td>{entry.materialName}</td>
            </tr>
          ))} */}
        </tbody>
            {/* {formulaData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.FormulaID}>
                <td>{post.FormulaName}</td>
                <td>{post.TotalMaterialsUsed}</td>
                <td>{post.AddedTimeStamp}</td>
              </tr>
            </tbody>);
            })} */}
        </table>
        </div>
      </div>
    

    </div>
  );
};

export default Formulalist;
