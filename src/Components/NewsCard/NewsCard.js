import React from "react";
import getFormatedDates from "../../utils/getFormatedDates";
import "./NewsCard.css";

function NewsCard({
  author,
  comment_text,
  created_at,
  created_at_i,
  num_comments,
  objectID,
  parent_id,
  points,
  story_id,
  story_text,
  story_title,
  story_ur,
  title,
  url,
  _tags,
}) {
  return (
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
            {_tags.map((tag) => (
              <div className="tag">{tag}</div>
            ))}
          </div>
        </div>
        <div className="date">{getFormatedDates(created_at)}</div>
      </div>
    </div>
  );
}

export default NewsCard;
