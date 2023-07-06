import "./sidebar.scss";
import logo from './images/logo.png'
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import Groups3Icon from '@mui/icons-material/Groups3';
import ScienceIcon from '@mui/icons-material/Science';
import InventoryIcon from '@mui/icons-material/Inventory';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link , useNavigate  } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };
  
  
  const loginData = JSON.parse(localStorage.getItem('userData'));
  const userRole = loginData.Role

  return (
    <div className="sidebar">
      <div className="top pt-5 pb-4">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">   <img src={logo}  alt="logo" /></span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Dashboard</p>

    {userRole !== "user" && (
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
    )}
          <Link to="/invoice" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Add Invoice</span>
            </li>
          </Link>
          <Link to="/formula" style={{ textDecoration: "none" }}>
            <li>
              <ScienceIcon className="icon" />
              <span>Formula</span>
            </li>
          </Link>
          {/* ------------------------------- */}
          <Link to="/stock" style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Stock</span>
            </li>
          </Link>
          <Link to="/production" style={{ textDecoration: "none" }}>
            <li>
              <PrecisionManufacturingIcon className="icon" />
              <span>Production</span>
            </li>
          </Link>
          {/* --------------------------------------------- */}
          <Link to="/labour" style={{ textDecoration: "none" }}>
            <li>
              <Groups3Icon className="icon" />
              <span>Labour</span>
            </li>
          </Link>
          <Link to="/sales" style={{ textDecoration: "none" }}>
            <li>
              <SummarizeIcon className="icon" />
              <span>Sales</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
    
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
