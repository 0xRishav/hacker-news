import React from "react";
import getFormatedDates from "../utils/getFormatedDates";

function NewsCard({ title, author, created_at, points }) {
  return (
    <div>
      <>
        <h1>{title}</h1>
        <div>{author}</div>
        <div>{getFormatedDates(created_at)}</div>
        <div>{points}</div>
      </>
    </div>
  );
}

export default NewsCard;
