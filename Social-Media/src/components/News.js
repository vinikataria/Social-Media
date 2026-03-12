import { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import axios from "axios";
import { FaCheck, FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function News(){
    
  const [expandedRows, setExpandedRows] = useState([]);
  const navigate = useNavigate();
  const [isAdmin, setUser] = useState(false);
  const [email, setLoginemail] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const Loginemail = localStorage.getItem("Loginemail");
    setUser(username);
    setLoginemail(Loginemail);

    const isAdminUser = username === "admin";
    const userType = isAdminUser ? "Admin" : "User";
    const emailToSend = isAdminUser ? "" : Loginemail || ""; 

    const url = "https://localhost:7160/api/News/NewsList";
    const data = {
      ID: 0,
      Content: "",
      Title: "",
      Email: emailToSend, 
      IsActive: 0,
    };

    axios
      .get(url)
      .then((results) => {
        console.log(results.data);
        const dt = results.data;
        if (dt.statusCode === 200) {
          setData(dt.listNews);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleApprove = (id) => {
    console.log("Approve article:", id);
    // Add your approve logic here
  };

  const handleDelete = (id) => {
    console.log("Delete article:", id);
    // Add your delete logic here
  };

  const handleReject = (id) => {
    console.log("Reject article:", id);
    // Add your reject logic here
  };

  const toggleExpand = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const AddEvent = (e) => {
    e.preventDefault();
    navigate("/addnews");
  };

    return(
        <div>
            <UserHeader />
            <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>News Management</h2>
                    <button className="btn btn-primary" onClick={(e) => AddEvent(e)}>
                      <FaPlus className="me-2" />
                      Add News
                    </button>
                  </div>
          
                  <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data, index) => {
                        const isExpanded = expandedRows.includes(index);
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{data.title}</td>
                            <td>
                              {isExpanded ? data.content : truncateText(data.content)}
                              {data.content && data.content.length > 50 && (
                                <button
                                  className="btn btn-link btn-sm p-0 ms-2"
                                  onClick={() => toggleExpand(index)}
                                >
                                  {isExpanded ? "Show Less" : "Show More"}
                                </button>
                              )}
                            </td>
                            <td>
                           
                             
                          
                                {isAdmin && (
                                 <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => handleDelete(data.id)}
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                                )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
        </div>
    )
}
export default News;