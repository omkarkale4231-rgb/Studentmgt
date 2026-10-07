import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [rollno, setRollno] = useState("");
  const [students, setStudents] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    if (!username || !rollno) {
      alert("Please enter username and roll number");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/students`, {
        username,
        rollno: Number(rollno)
      });

      setUsername("");
      setRollno("");
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student");
    }
  };

  return (
    <div className="container">
      <h1>MERN Student Application</h1>

      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="number"
          placeholder="Roll Number"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Student Records</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Roll Number</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.username}</td>
              <td>{student.rollno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;