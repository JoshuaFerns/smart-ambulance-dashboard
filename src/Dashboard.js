// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { ref, onValue, push, set } from "firebase/database";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [location, setLocation] = useState("");

  // 🔹 Fetch live requests
  useEffect(() => {
    const requestsRef = ref(db, "requests/");
    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRequests(formatted);
      } else {
        setRequests([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Add a new request
  const handleAddRequest = (e) => {
    e.preventDefault();

    if (!patientName || !location) {
      alert("Please fill in both fields");
      return;
    }

    const newRequestRef = push(ref(db, "requests"));
    set(newRequestRef, {
      patientName,
      status: "Pending",
      location,
    });

    // Reset form
    setPatientName("");
    setLocation("");
  };

  return (
    <div>
      <h2>Hospital Dashboard</h2>

      {/* Add Request Form */}
      <form onSubmit={handleAddRequest}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Add Request</button>
      </form>

      <h3>Live Requests</h3>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id}>
              <strong>{req.patientName}</strong> - {req.status} (Location:{" "}
              {req.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
