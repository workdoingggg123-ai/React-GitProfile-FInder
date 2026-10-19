let url = "https://api.github.com/users/"
let user = "";
async function url_fetch(url) {
    try {
         let data =  await fetch(`${url}${user}`)
        if (!data.ok) {
            throw new Error(`User not found: ${data.status}`);
        }

         let response  =  await data.json()
         return response
    } catch (error) {
        console.log(error)
    }
   
}