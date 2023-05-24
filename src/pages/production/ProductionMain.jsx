import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ProductionList from "./ProductionList"
const ProductionMain = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductionList/>

      </div>
    </div>
  )
}

export default ProductionMain;