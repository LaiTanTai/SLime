const url = "https://63e867afac3920ad5beba870.mockapi.io/api/QLSP"
function APIgetdata(){
    return axios({
        method : "GET",
        url : url,
    })
}