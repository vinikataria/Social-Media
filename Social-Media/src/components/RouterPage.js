import react from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import ManageUsers from "./ManageUsers";
import AdminDashboard from "./AdminDashboard";
import UserDashbord from "./UserDashbord";
import Articles from "./Articles";
import AddArticles from "./AddArticles";
import StaffDashboard from "./StaffDashboard";
import News from "./News";
import AddNews from "./AddNews";
function RouterPage(){
    return(
       <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/userdashboard" element={<UserDashbord />} />
          <Route path="/staffdashboard" element={<StaffDashboard />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/addarticle" element={<AddArticles />} />
          <Route path="/news" element={<News />} />
          <Route path="/addnews" element={<AddNews />} />
        </Routes>
      </Router>
    )
}
export default RouterPage;