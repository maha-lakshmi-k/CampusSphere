import { useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import api from "../services/api";
import college from "../assets/college.png";
import "../styles/Dashboard.css";

function StudentDashboard(){

const [user,setUser]=useState(null);
const [showSidebar,setShowSidebar]=useState(false);

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


const handleLogout=()=>{

localStorage.clear();
navigate("/");

};


if(!user){
return <h2>Loading...</h2>;
}


return(

<div className="dashboard-page">

<div className="left-panel">

<h1>
Campus<span>Sphere</span>
</h1>

<h3>
Digital College Notice Board
</h3>

<div className="line"></div>

<h2>
Stay Connected.
<br/>
Stay Informed.
</h2>

<p>
CampusSphere helps you stay updated
with important notices,assignments
and submissions.
</p>

<img
src={college}
alt="College"
className="college-image"
/>

</div>


<div className="right-panel">

<div className="dashboard-container">


<div className="dashboard-header">

<div>

<h1>
Welcome, {user.name} 👋
</h1>

<p>
{user.role}
{" • "}
{user.branch}
{" • "}
{user.year} Year
</p>

</div>


<div className="header-right">

<div className="date-card">

<h3>
{
new Date().toLocaleDateString(
"en-IN",
{
weekday:"long"
}
)
}
</h3>

<p>
{
new Date().toLocaleDateString(
"en-IN",
{
day:"numeric",
month:"long",
year:"numeric"
}
)
}
</p>

</div>


<div
className="profile-logo"
onClick={()=>
setShowSidebar(
!showSidebar
)
}
>

{user.name[0].toUpperCase()}

</div>

</div>

</div>

<hr/>


<Link
to="/notices"
className="dashboard-link"
>

<div className="dashboard-card notice">

<div>

<h2>
NOTICES
</h2>

<p>
Campus Notifications
</p>

</div>

<span>
→
</span>

</div>

</Link>



<Link
to="/assignments"
className="dashboard-link"
>

<div className="dashboard-card assignment">

<div>

<h2>
ASSIGNMENTS
</h2>

<p>
View Your Assignments
</p>

</div>

<span>
→
</span>

</div>

</Link>



<Link
to="/submissions"
className="dashboard-link"
>

<div className="dashboard-card submission">

<div>

<h2>
SUBMISSIONS
</h2>

<p>
View My Submissions
</p>

</div>

<span>
→
</span>

</div>

</Link>


</div>

</div>



{
showSidebar && (

<div className="profile-sidebar">

<div className="sidebar-profile">

<div className="sidebar-logo">

{user.name[0].toUpperCase()}

</div>

<h2>
{user.name}
</h2>

<p>
{user.role}
{" | "}
{user.branch}
</p>

</div>


<button
className="sidebar-btn"
onClick={()=>
navigate("/profile")
}
>
My Profile
</button>


<button
className="sidebar-btn"
onClick={handleLogout}
>
Logout
</button>


<button
className="delete-btn"
onClick={()=>
navigate(
"/delete-account"
)
}
>
Delete Account
</button>


<button
className="close-btn"
onClick={()=>
setShowSidebar(false)
}
>
Close
</button>

</div>

)

}


</div>

);

}

export default StudentDashboard;