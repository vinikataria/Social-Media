import { useState , useEffect } from "react";
import UserHeader from "./UserHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function AddNews(){
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin]=useState(false);
    const [user, setUser]=useState("");
    const [loginemail , setLoginemail] = useState("");
    
        useEffect(()=>{
            const username = localStorage.getItem("username");
             const Loginemail = localStorage.getItem("Loginemail");

            setUser(username);
            setLoginemail(Loginemail);
            // Check if user is admin
            if(username === "admin"){
                setIsAdmin(true);
            }
        },[]);

        

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({title,loginemail, content, image});
        const url = "https://localhost:7160/api/News/AddNews";

        const data ={
            Title : title,
            Email : loginemail,
            Content : content,
            IsActive : 1
        }

        axios.post(url,data)
        .then((results)=>{
            console.log(results.data);
            const dt = results.data;
            alert(dt.statusMessage);
            if(dt.statusCode === 200){
                navigate("/news");
            }
        }).catch((error)=>{
            console.log(error);
        });
        // Add your API call here
    };

    const handleCancel = () => {
        navigate("/news");
    };

    return(
        <div>
            <UserHeader />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white">
                                <h3 className="mb-0">
                                    <i className="fas fa-newspaper me-2"></i>
                                    Add New News
                                </h3>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    {/* Title and Email Row */}
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label htmlFor="articleTitle" className="form-label fw-bold">
                                                Title <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="articleTitle"
                                                placeholder="Enter article title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                     
                                    </div>

                                    {/* Content */}
                                    <div className="mb-3">
                                        <label htmlFor="articleContent" className="form-label fw-bold">
                                            Content <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="articleContent"
                                            rows="6"
                                            placeholder="Write your article content here..."
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            required
                                        ></textarea>
                                        <small className="text-muted">
                                            {content.length} characters
                                        </small>
                                    </div>

                                    {/* Image Upload */}
                                   
                                    {/* Buttons */}
                                    <div className="d-flex justify-content-end gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-lg px-4"
                                            onClick={handleCancel}
                                        >
                                            <i className="fas fa-times me-2"></i>
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg px-4"
                                        >
                                            <i className="fas fa-check me-2"></i>
                                            Submit New
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddNews;