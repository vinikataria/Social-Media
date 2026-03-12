import React, { useEffect } from "react";
function UserHeader() {

    const [user , setUser]=React.useState("");
    const [isAdmin, setIsAdmin]=React.useState(false);

    useEffect(()=>{
        const username = localStorage.getItem("username");
        setUser(username);
        // Check if user is admin
        if(username === "admin"){
            setIsAdmin(true);
        }
    },[]);

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">{user}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/articles">Articles</a>
        </li>

        <li className="nav-item">
          <a className="nav-link " href="/news">News</a>
        </li>

        {isAdmin && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/manageusers">Manage Users</a>
            </li>
        
          </>
        )}

      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    )
    
}
export default UserHeader;