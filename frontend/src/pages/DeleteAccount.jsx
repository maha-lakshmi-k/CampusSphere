import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/DeleteAccount.css";

function DeleteAccount(){

const [user,setUser]=useState(null);

const navigate=useNavigate();


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

}
catch(error){
console.log(error);
}

};



const handleDeleteAccount=async()=>{

const confirmDelete=window.confirm(

"Are you sure?\n\nThis action cannot be undone and all your data will be permanently deleted."

);


if(!confirmDelete){
return;
}


try{

await api.delete(
"/auth/delete-account"
);


alert(
"Account Deleted Successfully."
);


localStorage.clear();


navigate("/");


}
catch(error){

alert(

error.response?.data?.message||

"Failed to delete account."

);

}

};



if(!user){
return <h2>Loading...</h2>;
}


return(

<div className="delete-page">

<div className="delete-container">

<h1>
DELETE ACCOUNT
</h1>

<div className="delete-logo">

{user.name[0].toUpperCase()}

</div>


<h2>
{user.name}
</h2>


<p className="warning-message">

This action cannot be undone.

<br/><br/>

All your data including notices,
assignments and submissions will
be permanently deleted.

</p>



<div className="delete-details">

<h3>
Name
</h3>

<p>
{user.name}
</p>

</div>



<div className="delete-details">

<h3>
Email
</h3>

<p>
{user.email}
</p>

</div>



<div className="delete-details">

<h3>
Role
</h3>

<p>
{user.role}
</p>

</div>



<button
className="delete-account-btn"
onClick={
handleDeleteAccount
}
>

Delete My Account

</button>



<button
className="cancel-btn"
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

Cancel

</button>


</div>

</div>

);

}

export default DeleteAccount;