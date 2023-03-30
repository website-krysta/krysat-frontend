export const userColumns = [
  { field: "UserID", headerName: "ID", width: 70 },
  
  {
    field: "EmailID",
    headerName: "Email",
    width: 230,
  },
  {
    field: "Password",
    headerName: "Password",
    width: 160,
  },
  {
    field: "Role",
    headerName: "Role",
    width: 160,
  },
];

//temporary data

// let userrowData = ()=>{
//   // const [data, setData] = useState([]);

//   let [mydata , setmydata] = useState([]);
//   const getApidata = async ()=>{
//      try{
//       debugger
//       let res = await axios.get('http://127.0.0.1:8000/api/user/');
//       setmydata(res.data)
//       console.log(mydata )
//      }
//      catch(error){
//       console.log(error)
//      }
//   }
//   // const handleDelete = (id) => {
//   //   setData(data.filter((item) => item.UserID !== id));
//   // };

// useEffect(() =>{
//   getApidata();
// },{});

// }
// export default userrowData


export const userRows = [
  {
    id: 1,
    username: "Dinesh Badugu",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Role: "Admin",
    email: "badugudinesh@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Sai krishan",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "sai@gmail.com",
    Role: "User",
    age: 42,
  },
  {
    id: 3,
    username: "ManiDeep",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "ManiDeep@gmail.com",
    Role: "Admin",
    age: 45,
  },
  {
    id: 4,
    username: "Stalin",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "Stalin@gmail.com",
    Role: "user",
    age: 16,
  },
  {
    id: 5,
    username: "sithaRam",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "sithaRam@gmail.com",
    Role: "user",
    age: 22,
  }

];
    
