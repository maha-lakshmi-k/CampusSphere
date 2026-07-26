import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Profile.css";

function Profile(){

const [user,setUser]=useState(null);

const navigate=useNavigate();


useEffect(()=>{
getUser();
},[]);


const getUser=async()=>{

try{

const token=localStorage.getItem("token");

const response=await api.get(
"/auth/me",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setUser(response.data);

}
catch(error){
console.log(error);
}

};


if(!user){
return <h2>Loading...</h2>;
}


return(

<div className="profile-page">

<div className="profile-container">

<h1>
MY PROFILE
</h1>


<div className="profile-logo">

{user.name[0].toUpperCase()}

</div>


<h2>
{user.name}
</h2>


<div className="profile-card">

<h3>
Name
</h3>

<p>
{user.name}
</p>

</div>



{
user.role==="student"
&&

<div className="profile-card">

<h3>
Registration Number
</h3>

<p>
{user.registration_no}
</p>

</div>

}



<div className="profile-card">

<h3>
Email
</h3>

<p>
{user.email}
</p>

</div>



<div className="profile-card">

<h3>
Role
</h3>

<p>
{user.role}
</p>

</div>



{
user.branch
&&

<div className="profile-card">

<h3>
Branch
</h3>

<p>
{user.branch}
</p>

</div>

}



{
user.year
&&

<div className="profile-card">

<h3>
Year
</h3>

<p>
{user.year}
</p>

</div>

}



<div className="profile-card">

<h3>

{
user.role==="student"
?

"Student ID"

:

user.role==="faculty"

?

"Faculty ID"

:

"Admin ID"

}

</h3>

<p>
{user.id}
</p>

</div>



<button
className="back-btn"
onClick={()=>{

if(user.role==="student"){

navigate("/student");

}

else if(user.role==="faculty"){

navigate("/faculty");

}

else{

navigate("/admin");

}

}}
>

Back To Dashboard

</button>


</div>

</div>

);

}

export default Profile;