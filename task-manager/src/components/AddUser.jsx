import { useState } from "react";

function AddUser() {

  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const addUser = async () => {

    // Validation
    if (!uid || !name || !role) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/users", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          UID: uid,
          name,
          Role: role
        })

      });

      const data = await res.json();

      // Success message
      alert(data.message);

      console.log(data);

      // Clear input fields
      setUid("");
      setName("");
      setRole("");

    } catch (err) {

      console.log(err);
      alert("Something went wrong");

    }

  };

  return (

    <div
      className="container"
      style={{
        textAlign: "center",
        marginTop: "50px"
      }}
    >

      <h2>Add User</h2>

      <div style={{ marginTop: "20px" }}>

        {/* UID Input */}
        <input
          type="number"
          placeholder="Enter UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #E5E7EB",
            borderRadius: "6px"
          }}
        />

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #E5E7EB",
            borderRadius: "6px"
          }}
        />

        {/* Role Input */}
        <input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #E5E7EB",
            borderRadius: "6px"
          }}
        />

        {/* Submit Button */}
        <button
          className="btn-primary"
          onClick={addUser}
        >
          Add User
        </button>

      </div>

    </div>

  );
}

export default AddUser;

