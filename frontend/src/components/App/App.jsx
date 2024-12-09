import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [problemsCount, setProblemsCount] = useState(0);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4242/users");
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users", error);
            setLoading(false);
        }
    };

    const fetchProblemsCount = async () => {
        const url = "http://localhost:4242/users/problems-count";
        try {
            const response = await axios.get(url);
            setProblemsCount(response.data.count);
        } catch (error) {
            console.error("Error fetching problems count", error);
        }
    };

    const updateProblems = async () => {
        try {
            const response = await axios.post("http://localhost:4242/users/update-problems");
            alert(`${response.data.count} user(s) updated.`);
            fetchUsers();
            fetchProblemsCount();
        } catch (error) {
            console.error("Error updating problems", error);
        }
    };

    const toggleProblem = async (id, currentProblem) => {
        try {
            const response = await axios.patch(`http://localhost:4242/users/${id}/toggle-problem`, {
                problems: !currentProblem
            });
            fetchUsers();
        } catch (error) {
            console.error("Error toggling problem", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchProblemsCount();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <p>Total users with problems: {problemsCount}</p>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">First Name</th>
                                    <th className="px-4 py-2">Last Name</th>
                                    <th className="px-4 py-2">Age</th>
                                    <th className="px-4 py-2">Gender</th>
                                    <th className="px-4 py-2">Problems</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="border px-4 py-2">{user.first_name}</td>
                                        <td className="border px-4 py-2">{user.last_name}</td>
                                        <td className="border px-4 py-2">{user.age}</td>
                                        <td className="border px-4 py-2">{user.gender}</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={user.problems}
                                                onChange={() => toggleProblem(user.id, user.problems)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={updateProblems} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Reset Problems
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
