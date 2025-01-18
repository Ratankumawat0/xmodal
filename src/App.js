import React, { useState } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  // Open Modal
  const openModal = () => setIsModalOpen(true);

  // Close Modal
  const closeModal = () => setIsModalOpen(false);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
// button
  // Validate Form
  const validateForm = () => {
    const { username, email, phone, dob } = formData;

    // Check for empty fields
    if (!username.trim() || !email.trim() || !phone.trim() || !dob.trim()) {
      alert("All fields are required.");
      return false;
    }

    // Validate email
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    // Validate phone number
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    // Validate date of birth
    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) {
      alert("Invalid date of birth. Please enter a valid date.");
      return false;
    }

    return true;
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Reset form and close modal
      setFormData({ username: "", email: "", phone: "", dob: "" });
      closeModal();
    }
  };

  return (
    <div className="app">
      <button onClick={openModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2>Fill the Form</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
