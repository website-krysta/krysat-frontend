import "../products/productlist.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Formulalist from "./Formulalist";

const Formulamain = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Formulalist/>

      </div>
    </div>
  )
}

export default Formulamain;