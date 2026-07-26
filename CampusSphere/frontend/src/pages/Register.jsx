import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import college from "../assets/college.png";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        role: "student",
        branch: "",
        year: "",
        registration_no: ""

    });


    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };


    const handleRegister = async () => {

        try {

            await api.post(

                "/auth/register",

                formData

            );


            alert(
                "Registration Successful."
            );


            navigate("/");


        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Registration Failed."

            );

        }

    };


    return (

        <div className="register-page">

            <div className="left-section">

                <h1>
                    CampusSphere
                </h1>

                <h3>
                    Digital College Notice Board
                </h3>

                <hr />

                <h2>
                    Learn • Connect • Grow Together
                </h2>

                <p>

                    CampusSphere connects
                    students and faculty
                    through notices,
                    assignments and
                    submissions.

                </p>


                <img
                    src={college}
                    alt="College"
                    className="college-image"
                />

            </div>



            <div className="right-section">

                <div className="register-card">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Join CampusSphere
                    </p>



                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >

                        <option value="student">

                            Student

                        </option>


                        <option value="faculty">

                            Faculty

                        </option>

                    </select>



                    {

                        formData.role === "student"

                        &&

                        <input
                            type="text"
                            name="registration_no"
                            placeholder="Registration Number"
                            value={
                                formData.registration_no
                            }
                            onChange={
                                handleChange
                            }
                        />

                    }



                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                    />



                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                    />



                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                    />



                    <input
                        type="text"
                        name="branch"
                        placeholder="Enter Branch"
                        value={formData.branch}
                        onChange={handleChange}
                    />



                    {

                        formData.role === "student"

                        &&

                        <input
                            type="number"
                            name="year"
                            placeholder="Enter Year"
                            value={formData.year}
                            onChange={handleChange}
                        />

                    }



                    <button
                        className="register-btn"
                        onClick={handleRegister}
                    >

                        Create Account

                    </button>



                    <Link
                        to="/"
                        className="login-link"
                    >

                        Already have an account?
                        Login Here

                    </Link>



                    {

                        formData.role === "student"

                        &&

                        <h5>

                            Email Format :
                            <br />
                            RegistrationNo@svcew.edu.in

                        </h5>

                    }



                    <h4>

                        Learn • Connect • Grow

                    </h4>

                </div>

            </div>

        </div>

    );

}

export default Register;