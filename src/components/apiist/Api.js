export const getuserlist = () =>{
    return fetch("http://localhost:8000/api/user/").then(res =>{
        res.json()
    })
}