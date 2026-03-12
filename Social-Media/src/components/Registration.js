import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Registration() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(name, password, email, phone);
    const url = "https://localhost:7160/api/Registration/Registration";
    const data = {
      Name: name,
      Password: password,
      Email: email,
      PhoneNo: phone,
      Type: "User",
    };

    axios
      .post(url, data)
      .then((results) => {
        console.log(results.data);
        const dt = results.data;
        alert(dt.statusMessage);
        clearFields();
      })
      .catch((error) => {
        console.log(error);
      });

    const clearFields = () => {
      setName("");
      setPassword("");
      setEmail("");
      setPhone("");
    };
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderradius: "15px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                        <label className="form-label" htmlFor="firstName">
                          Name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-4 d-flex align-items-center">
                      <div
                        data-mdb-input-init
                        className="form-outline datepicker w-100"
                      >
                        <input
                          type="Password"
                          className="form-control form-control-lg"
                          id="birthdayDate"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        <label htmlFor="birthdayDate" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="email"
                          id="emailAddress"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                        <label className="form-label" htmlFor="emailAddress">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="tel"
                          id="phoneNumber"
                          className="form-control form-control-lg"
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                        />
                        <label className="form-label" htmlFor="phoneNumber">
                          Phone Number
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <input
                        data-mdb-ripple-init
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                        onClick={(e) => handleSave(e)}
                      />
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <input
                        data-mdb-ripple-init
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Login"
                        onClick={(e) => handleLogin(e)}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Registration;
