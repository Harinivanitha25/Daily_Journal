import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import JournalFormPage from "./pages/JournalFormPage";
import JournalEntriesPage from "./pages/JournalEntriesPage";

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:3000/journal");
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };

    fetchEntries();
  }, []);

  const addEntry = async (entry) => {
    try {
      const res = await fetch("http://localhost:3000/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (res.ok) {
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
      }
    } catch (err) {
      console.error("Error adding entry:", err);
    }
  };

  const deleteEntry = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/journal/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEntries(entries.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<JournalFormPage addEntry={addEntry} />} />
      <Route
        path="/entries"
        element={<JournalEntriesPage entries={entries} deleteEntry={deleteEntry} />}
      />
    </Routes>
  );
}

export default App;
