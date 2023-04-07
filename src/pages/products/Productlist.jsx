import "./productlist.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Productdata from "../../components/producttable/productdata"
const Productlist = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Productdata/>

      </div>
    </div>
  )
}

export default Productlist