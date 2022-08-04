import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  unstable_HistoryRouter,
  useLocation,
  useParams,
} from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { BiLinkAlt } from "react-icons/bi";
import { getPostData } from "../../APIs";
import "./NewsPage.css";
import NewsCard from "../../Components/NewsCard/NewsCard";
import getFormatedDates from "../../utils/getFormatedDates";

function NewsPage() {
  const { postId } = useParams();
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    (async function () {
      try {
        const postResponse = await axios.get(getPostData(postId));
        setNewsData(postResponse?.data);
        console.log(postResponse);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [postId]);

  console.log("title", newsData.title);

  const renderComments = (children, depth) => {
    if (children?.children && children?.children.length > 0) {
      return renderComments(children?.children, depth * 2);
    } else if (children?.text) {
      return (
        <div
          style={{
            marginLeft: `${0.5 * depth}rem`,
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div className="comment-author">
            {children?.author} | {getFormatedDates(children?.created_at)}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: children?.text }}
            className="comment-wrapper"
          ></div>
          <div className="horizontal-dashed-line"></div>
        </div>
      );
    }
  };

  return newsData !== {} ? (
    <div className="news-page">
      <div className="homepage-header">
        <div className="logo">HackerNews</div>
      </div>
      <span className="back-arrow-container">
        <Link to={"/"}>
          <MdOutlineArrowBack className="back-arrow" size={40} />
        </Link>
        <div className="back-btn-text">Back</div>
      </span>
      <div>
        <div className="news-card">
          <div className="title-container-date-wrapper">
            <div className="news-title-tags-container">
              <div className="news-title">
                {newsData.title || "Title Placeholder"}
              </div>
              <div className="news-author-upvotes">
                By {newsData?.author} | {newsData?.points} upvotes
              </div>
            </div>
            <a href={`${newsData?.url}`} target="_blank">
              <BiLinkAlt className="link-icon" size={30} />
            </a>
          </div>
        </div>
      </div>
      <div className="comments-heading">Comments</div>
      {newsData.children?.length > 0 &&
        newsData.children.map((children) => renderComments(children, 2))}
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default NewsPage;
