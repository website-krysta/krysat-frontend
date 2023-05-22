
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import SalesInvoiceList from "./SalesInvoiceList"
const InvoiceDatalist = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <SalesInvoiceList/>

      </div>
    </div>
  )
}

export default InvoiceDatalist;