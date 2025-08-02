import React from "react";
import JournalEntry from "../Component/JournalEntry";
import { Link } from "react-router-dom";

function JournalEntriesPage({ entries, deleteEntry }) {
  return (
    <div className="container">
      <h1 className="heading">Journal Entries</h1>
      <Link to="/" className="view-link">Back to Form</Link>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map((entry) => (
          <JournalEntry key={entry._id} entry={entry} onDelete={() => deleteEntry(entry._id)} />
        ))
      )}
    </div>
  );
}

export default JournalEntriesPage;
