import React, { useState } from "react";

function JournalForm({ addEntry }) {
  const [date, setDate] = useState("");
  const [happy, setHappy] = useState("");
  const [sad, setSad] = useState("");
  const [about, setAbout] = useState("");
  const [mood, setMood] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !mood || !about) return alert("Date, Mood, and About are required");
    addEntry({ date, happy, sad, about, mood });
    setDate(""); setHappy(""); setSad(""); setAbout(""); setMood(null);
  };

  return (
    <form className="journal-form" onSubmit={handleSubmit}>
      <label>Date : <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
      <textarea placeholder="Happy Moments" value={happy} onChange={(e) => setHappy(e.target.value)} />
      <textarea placeholder="Sad Things" value={sad} onChange={(e) => setSad(e.target.value)} />
      <textarea placeholder="About the Day" value={about} onChange={(e) => setAbout(e.target.value)} required />

      <div className="mood-buttons">
        <button type="button" className="mood-button happy" onClick={() => setMood("happy")}> Happy</button>
        <button type="button" className="mood-button moderate" onClick={() => setMood("moderate")}>Moderate</button>
        <button type="button" className="mood-button sad" onClick={() => setMood("sad")}>Sad</button>
      </div>

      <button type="submit">Add Entry</button>
    </form>
  );
}

export default JournalForm;
