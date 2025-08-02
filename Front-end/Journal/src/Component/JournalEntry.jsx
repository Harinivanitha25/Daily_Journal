import React from "react";

function JournalEntry({ entry, onDelete }) {
  return (
    <div className="entry">
      <div className="entry-header">
        <strong>{entry.date}</strong>
        <span>{entry.mood?.toUpperCase()}</span>
      </div>
      <p><strong>Happy Moments:</strong> {entry.happy}</p>
      <p><strong>Sad Things:</strong> {entry.sad}</p>
      <p><strong>About the Day:</strong> {entry.about}</p>
      <button onClick={onDelete} className="delete-btn">Delete</button>
    </div>
  );
}

export default JournalEntry;
