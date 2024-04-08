import React, { useState } from "react";
import axios from "axios";

const CreateBoat = () => {
  const [formData, setFormData] = useState({
    name: "",
    departure_city: "",
    arrival_city: "",
    departure_time: "",
    arrival_time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/boats/",
        formData,
      );
      console.log("Boat instance created successfully:", response.data);
      setFormData({
        name: "",
        departure_city: "",
        arrival_city: "",
        departure_time: "",
        arrival_time: "",
      });
    } catch (error) {
      console.error("Error creating boat instance:", error);
    }
  };

  return (
    <div>
      <h2>Create New Boat Instance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Departure City:</label>
          <input
            type="text"
            name="departure_city"
            value={formData.departure_city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Arrival City:</label>
          <input
            type="text"
            name="arrival_city"
            value={formData.arrival_city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Departure Time:</label>
          <input
            type="datetime-local"
            name="departure_time"
            value={formData.departure_time}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Arrival Time:</label>
          <input
            type="datetime-local"
            name="arrival_time"
            value={formData.arrival_time}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBoat;
