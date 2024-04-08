import React, { useState, useEffect } from "react";
import "./Reminder.css"; // Make sure to import the CSS file

const ReminderSetting = () => {
  const [reminders, setReminders] = useState([
    { id: 1, label: "Journey 1", time: "08:45", active: false },
    { id: 2, label: "Journey 2", time: "08:45", active: false },
    { id: 3, label: "Journey 3", time: "08:45", active: false },
  ]);

  const [alarmTime, setAlarmTime] = useState("");
  const [notification, setNotification] = useState("");
  const [selectedSound, setSelectedSound] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const audioFiles = [
    { id: 1, name: "sound1.mp3" },
    { id: 2, name: "sound2.mp3" },
    { id: 3, name: "sound3.mp3" },
  ]; // List of available audio files in your public/audio folder

  const toggleReminder = (id, time) => {
    console.log("Toggle reminder clicked:", id, time);
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, active: !reminder.active }
          : reminder
      )
    );
    if (reminders.find((reminder) => reminder.id === id && reminder.active)) {
      console.log("Setting alarm time:", time);
      setAlarmTime(time); // Update the alarm time when an active reminder is clicked
    }
  };

  const playSelectedSound = () => {
    if (selectedSound) {
      setAudioSrc(`/audio/${selectedSound}`);
      const audio = new Audio(`/audio/${selectedSound}`);
      audio.play(); // Play the audio immediately after setting the source
    }
  };

  const handleSetAlarm = () => {
    const currentTime = new Date();
    const alarmDateTime = new Date(alarmTime);

    const timeUntilAlarm = alarmDateTime.getTime() - currentTime.getTime();

    if (timeUntilAlarm > 0) {
      setTimeout(() => {
        // Trigger alarm logic here
        alert("Alarm!");
        setNotification("Alarm triggered!");
      }, timeUntilAlarm);
      setNotification("Alarm set successfully!");
    } else {
      setNotification("Invalid alarm time");
    }
  };

  return (
    <div className="reminder-container">
      <h2>Reminders</h2>
      {reminders.map((reminder) => (
        <div key={reminder.id} className="reminder-item">
          <label onClick={() => toggleReminder(reminder.id, reminder.time)}>
            {reminder.label}
          </label>
          <span>At: {reminder.time}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={reminder.active}
              onChange={() => toggleReminder(reminder.id, reminder.time)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      ))}
      <button className="done-button">Done</button>

      {/* Alarm Setting */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Alarm Settings</h5>
                <div className="form-group">
                  <label htmlFor="alarm-time">Alarm Time:</label>
                  <input
                    id="alarm-time"
                    className="form-control"
                    type="datetime-local"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="select-sound">Select Alarm Sound:</label>
                  <select
                    id="select-sound"
                    className="form-control"
                    value={selectedSound}
                    onChange={(e) =>
                      setSelectedSound(e.target.value)
                    }
                  >
                    <option value="">Select Alarm Sound</option>
                    {audioFiles.map((audio) => (
                      <option key={audio.id} value={audio.name}>
                        {audio.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={playSelectedSound}
                  >
                    Play Selected Sound
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleSetAlarm}
                  >
                    Set Alarm
                  </button>
                </div>
                {audioSrc && <audio controls src={audioSrc} />}
                {notification && (
                  <div className="alert alert-success mt-3">
                    {notification}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderSetting;
