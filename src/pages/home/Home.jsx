import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
 
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
