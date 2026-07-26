import { useEffect,useState } from "react";
import api from "../services/api";
import "../styles/Portal.css";

function Submissions(){

const [submissions,setSubmissions]=useState([]);
const [user,setUser]=useState(null);
const [assignmentId,setAssignmentId]=useState("");

useEffect(()=>{
getUser();
},[]);


const getUser=async()=>{

try{

const response=await api.get(
"/auth/me"
);

setUser(
response.data
);

if(
response.data.role==="student"
){
getMySubmissions();
}

}
catch(error){
console.log(error);
}

};



const getMySubmissions=async()=>{

try{

const response=await api.get(
"/submissions/my-submissions"
);

setSubmissions(
response.data
);

}
catch(error){
console.log(error);
}

};



const getAssignmentSubmissions=async()=>{

try{

const response=await api.get(
`/submissions/${assignmentId}`
);

setSubmissions(
response.data
);

}
catch(error){

alert(
error.response?.data?.message||
"Failed to fetch submissions."
);

}

};



const deleteSubmission=async(id)=>{

const confirmDelete=window.confirm(
"Are you sure you want to delete this submission ?"
);


if(!confirmDelete){
return;
}


try{

await api.delete(
`/submissions/${id}`
);


alert(
"Submission Deleted Successfully."
);


getMySubmissions();

}
catch(error){

alert(
error.response?.data?.message||
"Failed to delete submission."
);

}

};



if(!user){
return <h2>Loading...</h2>;
}


return(

<div className="portal-container">

<h1 className="portal-heading">
📤 Submissions
</h1>

<p className="portal-sub-heading">
View Assignment Submission Records
</p>



{
(user.role==="faculty"||
user.role==="admin")

&&

<div className="portal-form-card">

<h2>
Search Assignment Submissions
</h2>


<input
type="number"
placeholder="Enter Assignment ID"
value={assignmentId}
onChange={(e)=>
setAssignmentId(
e.target.value
)
}
/>


<button
className="portal-btn"
onClick={
getAssignmentSubmissions
}
>

Search Submissions

</button>

</div>

}



{
user.role==="student"

&&

<h2 className="section-heading">

My Submissions

</h2>

}



{
(user.role==="faculty"||
user.role==="admin")

&&

<h2 className="section-heading">

Submission Records

</h2>

}




{

submissions.length===0

?

<h3 className="empty-message">

No Submissions Found.

</h3>

:

submissions.map((submission)=>(

<div
key={submission.id}
className="portal-card submission-border"
>

<h2>
{submission.assignment_title}
</h2>


{
(user.role==="faculty"||
user.role==="admin")

&&

<>

<h3>
Student Name :
{" "}
{
submission.student_name
}
</h3>

</>

}



{
user.role==="student"

&&

<h3>
Submitted By :
You
</h3>

}



<a
href={
submission.submission_text
}
target="_blank"
rel="noreferrer"
>

View Submission

</a>


<div className="card-details">

<span>
📤 Assignment Submission
</span>

</div>



{
user.role==="student"

&&

<button
className="delete-submission-btn"
onClick={()=>
deleteSubmission(
submission.id
)
}
>

Delete Submission

</button>

}


</div>

))

}


</div>

);

}

export default Submissions;