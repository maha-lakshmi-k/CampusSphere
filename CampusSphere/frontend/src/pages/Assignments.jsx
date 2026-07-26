import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Portal.css";

function Assignments() {
    const [assignments, setAssignments] = useState([]);
    const [myAssignments, setMyAssignments] = useState([]);
    const [submission, setSubmission] = useState({});
    const [user, setUser] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        getUser();
        getAssignments();
    }, []);

    const getUser = async () => {
        try {

            const response = await api.get(
                "/auth/me"
            );

            setUser(
                response.data
            );

            if (
                response.data.role === "faculty"
            ) {
                getMyAssignments();
            }

        } catch (error) {
            console.log(error);
        }
    };

    const getAssignments = async () => {
        try {

            const response = await api.get(
                "/assignments"
            );

            setAssignments(
                response.data
            );

        } catch (error) {
            console.log(error);
        }
    };

    const getMyAssignments = async () => {
        try {

            const response = await api.get(
                "/assignments/my-assignments"
            );

            setMyAssignments(
                response.data
            );

        } catch (error) {
            console.log(error);
        }
    };

    const createAssignment = async () => {
        try {

            await api.post(
                "/assignments",
                {
                    title,
                    description,
                    branch,
                    year,
                    deadline
                }
            );

            alert(
                "Assignment Created Successfully."
            );

            setTitle("");
            setDescription("");
            setBranch("");
            setYear("");
            setDeadline("");

            getAssignments();
            getMyAssignments();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create assignment."
            );

        }
    };

    const submitAssignment = async (assignmentId) => {
        try {

            await api.post(
                "/submissions",
                {
                    assignment_id:
                        assignmentId,

                    submission_text:
                        submission[
                        assignmentId
                        ]
                }
            );

            alert(
                "Assignment Submitted Successfully."
            );

            setSubmission({
                ...submission,
                [assignmentId]: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Submission Failed."
            );

        }
    };

    const formatDate = (date) => {
        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (

        <div className="portal-container">

            <h1 className="portal-heading">
                📝 Assignments
            </h1>

            <p className="portal-sub-heading">
                Manage Your Academic Tasks
            </p>


            {(user.role === "faculty" ||
                user.role === "admin") && (

                    <div className="portal-form-card">

                        <h2>
                            Create Assignment
                        </h2>

                        <input
                            type="text"
                            placeholder="Assignment Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                        />


                        <input
                            type="text"
                            placeholder="Description"
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


                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) =>
                                setDeadline(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="portal-btn"
                            onClick={
                                createAssignment
                            }
                        >
                            Create Assignment
                        </button>

                    </div>

                )}



            {user.role === "faculty" && (

                <>

                    <h2 className="section-heading">
                        My Assignments
                    </h2>


                    {

                        myAssignments.length === 0 ?

                            (

                                <h3 className="empty-message">
                                    No Assignments Posted.
                                </h3>

                            )

                            :

                            (

                                myAssignments.map(
                                    (assignment) => (

                                        <div
                                            key={
                                                assignment.id
                                            }

                                            className=
                                            "portal-card assignment-border"
                                        >

                                            <h2>
                                                {
                                                    assignment.title
                                                }
                                            </h2>

                                            <p>
                                                {
                                                    assignment.description
                                                }
                                            </p>


                                            <div
                                                className="card-details"
                                            >

                                                <span>

                                                    {
                                                        assignment.branch === "ALL"

                                                            ?

                                                            "🌍 ALL BRANCHES"

                                                            :

                                                            `💻 ${assignment.branch}`
                                                    }

                                                </span>


                                                <span>

                                                    {
                                                        assignment.year === "ALL"

                                                            ?

                                                            "👨‍🎓 ALL YEARS"

                                                            :

                                                            `📚 ${assignment.year} Year`
                                                    }

                                                </span>

                                            </div>


                                            <h4>

                                                ⏰ Deadline :
                                                {" "}
                                                {
                                                    formatDate(
                                                        assignment.deadline
                                                    )
                                                }

                                            </h4>

                                        </div>

                                    )
                                )

                            )

                    }

                </>

            )}



            <h2 className="section-heading">
                Available Assignments
            </h2>


            {

                assignments.length === 0 ?

                    (

                        <h3 className="empty-message">
                            No Assignments Available.
                        </h3>

                    )

                    :

                    (

                        assignments.map(
                            (assignment) => (

                                <div
                                    key={assignment.id}

                                    className=
                                    "portal-card assignment-border"
                                >

                                    <h2>
                                        {
                                            assignment.title
                                        }
                                    </h2>


                                    <p>
                                        {
                                            assignment.description
                                        }
                                    </p>


                                    <div
                                        className="card-details"
                                    >

                                        <span>

                                            {
                                                assignment.branch === "ALL"

                                                    ?

                                                    "🌍 ALL BRANCHES"

                                                    :

                                                    `💻 ${assignment.branch}`
                                            }

                                        </span>


                                        <span>

                                            {
                                                assignment.year === "ALL"

                                                    ?

                                                    "👨‍🎓 ALL YEARS"

                                                    :

                                                    `📚 ${assignment.year} Year`
                                            }

                                        </span>

                                    </div>


                                    <h4>

                                        ⏰ Deadline :
                                        {" "}
                                        {
                                            formatDate(
                                                assignment.deadline
                                            )
                                        }

                                    </h4>


                                    {user.role === "student" && (

                                        <>

                                            <input
                                                type="text"
                                                placeholder="Enter Github Repository Link"
                                                value={
                                                    submission[
                                                    assignment.id
                                                    ] || ""
                                                }

                                                onChange={(e) =>
                                                    setSubmission({

                                                        ...submission,

                                                        [assignment.id]:
                                                            e.target.value

                                                    })
                                                }
                                            />


                                            <button
                                                className="portal-btn"

                                                onClick={() =>
                                                    submitAssignment(
                                                        assignment.id
                                                    )
                                                }
                                            >
                                                Submit Assignment
                                            </button>

                                        </>

                                    )}

                                </div>

                            )
                        )

                    )

            }

        </div>

    );
}

export default Assignments;