import React from "react";
import { Link } from "react-router-dom";
import getFormatedDates from "../../utils/getFormatedDates";
import "./NewsCard.css";

function NewsCard({ author, created_at, objectID, points, title, _tags }) {
  return (
    <Link to={`/posts/${objectID}`} style={{ all: "unset" }}>
      <div className="news-card">
        <div className="title-container-date-wrapper">
          <div className="news-title-tags-container">
            <div className="news-title">
              {title ? title : "Title Placeholder"}
            </div>
            <div className="news-author-upvotes">
              By {author} | {points} upvotes
            </div>
            <div className="tag-wrapper">
              {_tags.map((tag, i) => (
                <div key={i} className="tag">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="date">{getFormatedDates(created_at)}</div>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
