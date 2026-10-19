import { useState } from "react"
import ErrorPage from "./error";

import { Repos } from "./repoes";


function Dashboard() {
      let [username , setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [date_new,setDate] = useState(null)
    const [error, setError] = useState("");

    function formatDate(dateString) {
    const date = new Date(dateString);  
    setDate(date.toLocaleDateString("en-IN"));
}

     
async function loading_data() {
    const name = username.replaceAll(" " , "");

    if (!name) {
        setProfile(null);
        setError("Please enter a GitHub username.");
        return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetch(
  `https://api.github.com/users/${name}`

);

        if (!data.ok) {
            if (data.status === 404) {
                throw new Error("We couldn't find that GitHub user. Check the username.")
            }

            if (data.status === 403 || data.status === 429) {
                throw new Error("GitHub's request limit may have been reached. Try again later.");
            }

            throw new Error("Something went wrong while fetching the profile.");
            
        }

        const response = await data.json();
        setProfile(response);
        formatDate(response.created_at)

    } catch (err) {
        setProfile(null);
       setError(err.message || "Unable to load the GitHub profile.");
    } finally {
        setLoading(false);
    }
}

function handleRetry() {
  setError("");
    setProfile(null);
    setUsername("");
}

    
    return(
        <>
        {!error&&(
            <>
            <div className="logo">
                <img src="https://cdn-icons-png.flaticon.com/128/3291/3291667.png" alt="github branding" />
               <p>Dashboard</p>
            </div>
            
           <h1>devfinder</h1>
             <section className="Search">
                <img src="data:image/svg+xml;utf8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2358A6FF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%3Ccircle%20cx%3D%2210.8%22%20cy%3D%2210.8%22%20r%3D%227%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22m16%2016%205%205%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E%0A" alt="search_img   " />
               <input type="search" name="Search" id="Search" placeholder="Search Github UserName..." value={username}    onChange={(event) =>
                        setUsername(event.target.value) }/>
            <button id="searchbutton" onClick={loading_data} >Search</button>
             </section>
              
             <main>
            <div className="cointainer-main">
                <div className="sideimg">
                    <img id = "sideimg" src={profile ? profile.avatar_url : "data:image/png;base64,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"} alt="img" />
                </div>
                <div className="info">
                    <div className="user-basic-info">
                        <div className="username">
                            <p>{profile ? profile.login : "{Login Name}" }</p>
                            <p>{profile? profile.name : "{User name}"}</p>

                            <span>
                                <p> {profile?`Bio = ${profile.bio}` : "Bio: "} </p>
                            </span>
                            </div>
                            
                            <p>{profile? date_new: "Created Profil "}</p>

                        </div>  
                <section className="github-info">



                   <div className="stat">
                <p className="stat-label">Repos</p>
                 <p className="stat-value">{profile? profile.public_repos: "0"}</p>
                </div>

            <div className="stat">
                <p className="stat-label">Followers</p>
                <p className="stat-value">{profile? profile.followers: "0"}</p>
            </div>

            <div className="stat">
                <p className="stat-label">Following</p>
                <p className="stat-value">{profile? profile.following :"0"}</p>
            </div>

        </section>


        
                <section className="other-info">
                    <div className="add-info">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238B949E%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%3Cpath%20d%3D%22M20%2010c0%205-8%2012-8%2012S4%2015%204%2010a8%208%200%201%201%2016%200Z%22%3E%3C%2Fpath%3E%0A%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2210%22%20r%3D%222.5%22%3E%3C%2Fcircle%3E%0A%3C%2Fsvg%3E" alt="" />
                         <p>{ profile? profile.location: "None"}</p>
                    </div>
                     <div className="add-info">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238B949E%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M2%2012h20M12%202a15%2015%200%200%201%200%2020M12%202a15%2015%200%200%200%200%2020%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E" alt="" />
                         <p> {profile?.blog ? (<a href={profile.blog} target="_blank" rel="noopener noreferrer">{profile.blog}</a>) : ("0")}</p>
                    </div> 
                    <div className="add-info">
                       
                         <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238B949E%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%3Cpath%20d%3D%22M22%205.9a8.5%208.5%200%200%201-2.4.7%0A%20%20%20%204.2%204.2%200%200%200%201.8-2.3%208.4%208.4%200%200%201-2.7%201%0A%20%20%20%204.2%204.2%200%200%200-7.2%203.8%2012%2012%200%200%201-8.7-4.4%0A%20%20%20%204.2%204.2%200%200%200%201.3%205.6%204.2%204.2%200%200%201-1.9-.5v.1%0A%20%20%20%20a4.2%204.2%200%200%200%203.4%204.1%204.2%204.2%200%200%201-1.9.1%0A%20%20%20%204.2%204.2%200%200%200%203.9%202.9A8.5%208.5%200%200%201%202%2018.8%0A%20%20%20%20a12%2012%200%200%200%2018.5-10.1v-.5A8.6%208.6%200%200%200%2022%205.9Z%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E" alt="" />
                         <p>  {profile?.twitter_username? (<a href={`https://x.com/${profile.twitter_username}`} target="_blank">x.com/{profile.twitter_username.replaceAll("dot" , ".")} </a>): "None"}</p>
                    </div> <div className="add-info">
                        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238B949E%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%3Crect%20x%3D%223%22%20y%3D%227%22%20width%3D%2218%22%20height%3D%2214%22%20rx%3D%222%22%3E%3C%2Frect%3E%0A%20%20%3Cpath%20d%3D%22M8%207V4h8v3M3%2012h18M10%2012v2h4v-2%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E" alt="" />
                         <p>{profile?.company ? profile.company:"Not Provided"}</p>
                    </div>
               
                </section>

                </div>
                </div>
               {profile&&(
             <section className="contrubtion-box">
                    <p>Contribution</p>
                      <div className="greenbox">
                    <img
       src={`https://ghchart.rshah.org/${profile? profile.login : ""}`}
/>
                </div>
                <div className="repodata_user">
                    <Repos 
                        name = {profile.login}
                    />
                </div>
             </section>)}
              
             </main>
            
             
</>)}

              {error && (
                <ErrorPage
                    message={error}
                    onRetry={handleRetry}
                />
            )}s
        </>
    )
}


export default Dashboard
