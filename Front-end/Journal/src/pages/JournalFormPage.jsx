import React from "react";
import JournalForm from "../Component/JournalForm";
import { Link } from "react-router-dom";

function JournalFormPage({ addEntry }) {
  return (
    <div className="container">
      <h1 className="heading">Daily Journal</h1>
      <JournalForm addEntry={addEntry} />
      <Link to="/entries" className="view-link">View Entries</Link>
    </div>
  );
}

export default JournalFormPage;
