import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { MdOutlineArrowBack } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { getPostData } from "../../APIs";
import EmptyStateMessage from "../../Components/EmptyStateMessage/EmptyStateMessage";
import Loader from "../../Components/Loader/Loader";
import { AppContext } from "../../Contexts/AppContext";
import getFormatedDates from "../../utils/getFormatedDates";
import "./NewsPage.css";
import useWindowSize from "../../custom-hooks/useWindowSize";

function NewsPage() {
  const { postId } = useParams();
  const { isLoading, setLoading, showToast } = useContext(AppContext);
  const { height, width } = useWindowSize();
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const postResponse = await axios.get(getPostData(postId));
        setNewsData(postResponse?.data);
        console.log(postResponse);
      } catch (err) {
        showToast("error", err.message);
      }
      setLoading(false);
    })();
  }, [postId]);

  /* 
    Function to dynamically render comments inside comment
  */

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

  return isLoading ? (
    <div className="loader-wrapper">
      <Loader />
    </div>
  ) : Object.keys(newsData).length > 0 ? (
    <>
      <div className="news-page">
        <div className="homepage-header">
          <div className="logo">HackerNews</div>
        </div>
        <span className="back-arrow-container">
          <Link to={"/"} style={{ all: "unset", cursor: "pointer" }}>
            <MdOutlineArrowBack
              className="back-arrow"
              size={width < 640 ? 24 : 40}
            />
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
                <BiLinkAlt className="link-icon" size={width < 640 ? 24 : 30} />
              </a>
            </div>
          </div>
        </div>
        <div className="comments-heading">Comments</div>
        {newsData.children?.length > 0 ? (
          newsData.children.map((children) => renderComments(children, 2))
        ) : (
          <EmptyStateMessage message={"No comments found"} />
        )}
      </div>
    </>
  ) : (
    <EmptyStateMessage message={"Sorry. No post data available"} />
  );
}

export default NewsPage;
