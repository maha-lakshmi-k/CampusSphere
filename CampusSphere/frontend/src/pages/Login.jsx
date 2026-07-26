import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import college from "../assets/college.png";
import "../styles/Login.css";

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async()=>{

        try{

            const response =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            const {token,user}
            = response.data;

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            if(user.role==="student"){

                navigate("/student");

            }

            else if(
                user.role==="faculty"
            ){

                navigate("/faculty");

            }

            else{

                navigate("/admin");

            }

        }catch(error){

            alert(

                error.response?.data?.message ||

                "Login Failed."

            );

        }

    };

    return(

        <div className="login-page">

            <div className="left-section">

                <h1>
                    CampusSphere
                </h1>

                <h3>
                    Digital College Notice Board
                </h3>

                <hr />

                <h2>
                    Stay Connected.
                    Stay Informed.
                </h2>

                <p>

                    CampusSphere helps
                    students, faculty and
                    administrators stay
                    updated with notices,
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

                <div
                className="login-card"
                >

                <h1>
                    Welcome Back
                </h1>

                <p>
                    Login to your account
                </p>


                <input
                type="email"
                placeholder=
                "Enter your Email"

                value={email}

                onChange={(e)=>

                setEmail(
                e.target.value
                )

                }
                />


                <input
                type="password"
                placeholder=
                "Enter your Password"

                value={password}

                onChange={(e)=>

                setPassword(
                e.target.value
                )

                }
                />


                <button
                onClick={
                handleLogin
                }

                className="login-btn"
                >

                    Login

                </button>



                <Link
                to="/register"

                className=
                "register-btn"

                >

                    Create New Account

                </Link>


                <h4>

                Stay Connected •
                Stay Informed •
                Stay Updated

                </h4>

                </div>

            </div>

        </div>

    );

}

export default Login;