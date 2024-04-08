import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const CreateBus = () => {
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
        "http://127.0.0.1:8000/buses/",
        formData,
      );
      console.log("Bus instance created successfully:", response.data);

      generateTicket(response.data);

      setFormData({
        name: "",
        departure_city: "",
        arrival_city: "",
        departure_time: "",
        arrival_time: "",
      });
    } catch (error) {
      console.error("Error creating bus instance:", error);
    }
  };

  const generateTicket = (busData) => {
    const doc = new jsPDF();

    doc.text("Bus Ticket", 20, 10);
    doc.text(`Bus Name: ${busData.name}`, 20, 20);
    doc.text(`Departure City: ${busData.departure_city}`, 20, 30);
    doc.text(`Arrival City: ${busData.arrival_city}`, 20, 40);
    doc.text(`Departure Time: ${busData.departure_time}`, 20, 50);
    doc.text(`Arrival Time: ${busData.arrival_time}`, 20, 60);

    doc.save("bus_ticket.pdf");
  };

  return (
    <div className="pa4">
      <h2 className="mb4">Create New Bus Instance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb3">
          <label className="db">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
          />
        </div>
        <div className="mb3">
          <label className="db">Departure City:</label>
          <input
            type="text"
            name="departure_city"
            value={formData.departure_city}
            onChange={handleChange}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
          />
        </div>
        <div className="mb3">
          <label className="db">Arrival City:</label>
          <input
            type="text"
            name="arrival_city"
            value={formData.arrival_city}
            onChange={handleChange}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
          />
        </div>
        <div className="mb3">
          <label className="db">Departure Time:</label>
          <input
            type="datetime-local"
            name="departure_time"
            value={formData.departure_time}
            onChange={handleChange}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
          />
        </div>
        <div className="mb3">
          <label className="db">Arrival Time:</label>
          <input
            type="datetime-local"
            name="arrival_time"
            value={formData.arrival_time}
            onChange={handleChange}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
          />
        </div>
        <button
          type="submit"
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBus;
