import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <button onClick={handleLogout} 
        className="logout-btn">
            Logout
        </button>
    );
}

export default Logout;