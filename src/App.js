import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Edituser from "./pages/new/Update";
import Productlist from "./pages/products/Productlist";
import Newproduct from "./pages/products/Newproduct";
import Newrawmeterial from "./pages/products/Newrawmeterial"
import Labour from "./pages/labour/labour"
import Addlabour from "./pages/labour/addlabour"
import Formula from "./pages/formula/formula";
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
            <Route path="products">
              <Route index element={<Productlist />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<Newproduct inputs={productInputs} title="Add Product" />}
              />
              <Route
                path="newrawmeterial"
                element={<Newrawmeterial/>}
              />
            </Route>
            <Route path="labour">
              <Route index element={<Labour />} />
              <Route  path="new"
                  element={<Addlabour inputs={productInputs} title="Add labour" />} />
            </Route>
            <Route path="formula">
              <Route index element={<Formula />} />
              {/* <Route  path="new"
                  element={<Addlabour inputs={productInputs} title="Add labour" />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
