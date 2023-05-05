import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Edituser from "./pages/new/Update";
import InvoiceDatalist from "./pages/products/Productlist";
import Newproduct from "./pages/products/Newproduct";
import Newrawmeterial from "./pages/products/Newrawmeterial"
import Addinvoice from "./pages/invoiceData/Addinvoice"
import Labour from "./pages/labour/labour"
import Addlabour from "./pages/labour/addlabour"
import Formula from "./pages/formula/formula";
import Stockhome from "./pages/stock/Stockhome";
import Formulamain from "./pages/formula/Formulamain";
import EditInvoice from "./pages/invoiceData/Editinvoice"
import MaterialstockList from "./pages/stock/MaterialStockList";
import Updatewhitelabeling from "./pages/stock/Updatewhitelabeling";
import Updatepackingstock from "./pages/stock/Updatepackingstock";
import ProductionHome from "./pages/production/Productionhome";
import UpdateRawmaterial from "./pages/stock/UpdateMaterial";
import Packingproduct from "./pages/production/PackingProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'






function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}> 
      <BrowserRouter basename='krystafrontend'>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path="viewuser/:userId" element={<Single />} />
              <Route path="edituser/:userId" element={<Edituser inputs={userInputs} />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="invoice">
              <Route index element={<InvoiceDatalist />} />
              <Route path="editinvoice/:InvoiceID" element={<EditInvoice />} />
              <Route
                path="new"
                element={<Newproduct inputs={productInputs} title="Add Product" />}
              />
              <Route
                path="newrawmeterial"
                element={<Newrawmeterial/>}
              />
                  <Route
                path="addinvoice"
                element={<Addinvoice/>}
              />
              
            </Route>
            <Route path="labour">
              <Route index element={<Labour />} />
              <Route  path="new"
                  element={<Addlabour inputs={productInputs} title="Add labour" />} />
            </Route>
            <Route path="formula">
              <Route index element={<Formulamain />} />
              <Route  path="new" element={<Formula />} />
            </Route>
            <Route path="stock">
              <Route index element={<Stockhome />} />
              <Route path="materiallist/:MaterialID" element={<MaterialstockList />} />
              <Route path="updatematerial/:addMaterialID" element={<UpdateRawmaterial />} />
              
              {/* whitelabeling */}
              <Route path="whitelabeling/:ProductID" element={<Updatewhitelabeling/>} />
            
               {/* packing */}
               <Route path="packinglist/:PackingMaterialID" element={<Updatepackingstock/>} />
            

            </Route>
            <Route path="production">
              <Route index element={<ProductionHome />} />
              <Route path="packingproduct" element={<Packingproduct />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
