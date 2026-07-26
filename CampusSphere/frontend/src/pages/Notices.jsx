import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Portal.css";

function Notices() {
    const [notices, setNotices] = useState([]);
    const [myNotices, setMyNotices] = useState([]);
    const [user, setUser] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        getUser();
        getNotices();
    }, []);

    const getUser = async () => {
        try {
            const response = await api.get("/auth/me");

            setUser(response.data);

            if (response.data.role === "faculty") {
                getMyNotices();
            }

        } catch (error) {
            console.log(error);
        }
    };

    const getNotices = async () => {
        try {
            const response = await api.get("/notices");
            setNotices(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const getMyNotices = async () => {
        try {

            const response = await api.get(
                "/notices/my-notices"
            );

            setMyNotices(
                response.data
            );

        } catch (error) {
            console.log(error);
        }
    };

    const createNotice = async () => {
        try {

            await api.post(
                "/notices",
                {
                    title,
                    description,
                    branch,
                    year
                }
            );

            alert(
                "Notice Created Successfully."
            );

            setTitle("");
            setDescription("");
            setBranch("");
            setYear("");

            getNotices();

            if (user.role === "faculty") {
                getMyNotices();
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create notice."
            );

        }
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="portal-container">

            <h1 className="portal-heading">
                📢 Notices
            </h1>

            <p className="portal-sub-heading">
                Stay Updated With Campus News
            </p>


            {(user.role === "faculty" ||
                user.role === "admin") && (

                    <div className="portal-form-card">

                        <h2>
                            Create Notice
                        </h2>

                        <input
                            type="text"
                            placeholder="Enter Notice Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Branch"
                            value={branch}
                            onChange={(e) =>
                                setBranch(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Year"
                            value={year}
                            onChange={(e) =>
                                setYear(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="portal-btn"
                            onClick={createNotice}
                        >
                            Create Notice
                        </button>

                    </div>

                )}


            {user.role === "faculty" && (

                <>

                    <h2 className="section-heading">
                        My Notices
                    </h2>

                    {
                        myNotices.length === 0 ?

                            (

                                <h3 className="empty-message">
                                    No Notices Posted.
                                </h3>

                            )

                            :

                            (

                                myNotices.map((notice) => (

                                    <div
                                        key={notice.id}
                                        className="portal-card notice-border"
                                    >

                                        <h2>
                                            {notice.title}
                                        </h2>

                                        <p>
                                            {notice.description}
                                        </p>

                                        <div
                                            className="card-details"
                                        >

                                            <span>

                                                {
                                                    notice.branch === "ALL"

                                                        ?

                                                        "🌍 ALL BRANCHES"

                                                        :

                                                        `💻 ${notice.branch}`

                                                }

                                            </span>

                                            <span>

                                                {
                                                    notice.year === "ALL"

                                                        ?

                                                        "👨‍🎓 ALL YEARS"

                                                        :

                                                        `📚 ${notice.year} Year`
                                                }

                                            </span>

                                        </div>

                                    </div>

                                ))

                            )

                    }

                </>

            )}



            <h2 className="section-heading">
                Available Notices
            </h2>


            {
                notices.length === 0 ?

                    (

                        <h3 className="empty-message">
                            No Notices Available.
                        </h3>

                    )

                    :

                    (

                        notices.map((notice) => (

                            <div
                                key={notice.id}
                                className="portal-card notice-border"
                            >

                                <h2>
                                    {notice.title}
                                </h2>

                                <p>
                                    {notice.description}
                                </p>

                                <div
                                    className="card-details"
                                >

                                    <span>

                                        {
                                            notice.branch === "ALL"

                                                ?

                                                "🌍 ALL BRANCHES"

                                                :

                                                `💻 ${notice.branch}`
                                        }

                                    </span>


                                    <span>

                                        {
                                            notice.year === "ALL"

                                                ?

                                                "👨‍🎓 ALL YEARS"

                                                :

                                                `📚 ${notice.year} Year`
                                        }

                                    </span>

                                </div>

                            </div>

                        ))

                    )

            }

        </div>
    );
}

export default Notices;