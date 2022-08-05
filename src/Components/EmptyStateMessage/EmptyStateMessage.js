import React from "react";
import "./EmptyStateMessage.css";

function EmptyStateMessage({ message }) {
  return (
    <div className="empty-state-message-wrapper">
      <div className="empty-state-message">{message}</div>
    </div>
  );
}

export default EmptyStateMessage;
