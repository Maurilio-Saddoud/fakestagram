import React, { useEffect } from "react";
import {
  imgState,
  taggedPeople,
  taggedProducts,
  likesAtom,
  commentsAtom,
  elapsedTimeAtom,
} from "../../atoms/atoms";
import "./SummaryPage.css";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const SummaryPage = () => {
  const [likes, setLikes] = useRecoilState(likesAtom);
  const [image, setImage] = useRecoilState(imgState);
  const [tagged, setTagged] = useRecoilState(taggedPeople);
  const [products, setProducts] = useRecoilState(taggedProducts);
  const [comments, setComments] = useRecoilState(commentsAtom);
  const [time, setTime] = useRecoilState(elapsedTimeAtom);
  const navigate = useNavigate();

  function secondsToMinutes(seconds) {
    if (seconds < 60) {
      return (
        <p>
          You wasted <span style={{ color: "black" }}>{seconds}</span> real life
          seconds looking at this fake post.
        </p>
      );
    } else {
      const minutes = Math.round(seconds / 60);
      const secondsRemaining = (seconds % 60 < 10 ? "0" : "") + (seconds % 60);
      return (
        <p>
          You wasted <span style={{ color: "black" }}>{minutes}</span> minute
          {minutes > 1 ? "s" : ""} and{" "}
          <span style={{ color: "black" }}>{secondsRemaining}</span> second
          {secondsRemaining > 1 ? "s" : ""} looking at this fake post.
        </p>
      );
    }
  }

  useEffect(() => {
    if (!image) navigate("/");
  }, []);

  return (
    <div className="summary-page-container">
      <div className="summary-card">
        <div className="summary-header">
          <h3 style={{ fontFamily: "Alata", color: "#757575" }}>
            Your activity
          </h3>
        </div>

        <div className="summary-row">
          <img
            src="photo.jpeg"
            alt="default profiile picture"
            width={"50px"}
            height={"50px"}
            style={{ borderRadius: "100px", margin: "10px 20px" }}
          />
          <p style={{ color: "#757575" }}>
            Jane Doe and <span style={{ color: "black" }}>{likes}</span> other
            fake people liked your post
          </p>
        </div>
        <div className="summary-row">
          <img
            src="photo.jpeg"
            alt="default profiile picture"
            width={"50px"}
            height={"50px"}
            style={{ borderRadius: "100px", margin: "10px 20px" }}
          />
          <p style={{ color: "#757575" }}>
            John Doe and{" "}
            <span style={{ color: "black" }}>{comments.length}</span> other fake
            people commented on your post
          </p>
        </div>
        <div className="summary-row">
          <img
            src={image}
            alt="default profiile picture"
            width={"50px"}
            height={"50px"}
            style={{ borderRadius: "100px", margin: "10px 20px" }}
          />
          <p style={{ color: "#757575" }}>
            You tagged <span style={{ color: "black" }}>{tagged.length}</span>{" "}
            fake {tagged.length > 1 ? "people" : "person"} in your post
          </p>
        </div>
        <div className="summary-row">
          <img
            src={image}
            alt="default profiile picture"
            width={"50px"}
            height={"50px"}
            style={{ borderRadius: "100px", margin: "10px 20px" }}
          />
          <p style={{ color: "#757575" }}>
            You tagged <span style={{ color: "black" }}>{products.length}</span>{" "}
            fake {products.length > 1 ? "products" : "product"} in your post
          </p>
        </div>
        <div className="summary-row">
          <img
            src={image}
            alt="default profiile picture"
            width={"50px"}
            height={"50px"}
            style={{ borderRadius: "100px", margin: "10px 20px" }}
          />
          <p style={{ color: "#757575" }}>{secondsToMinutes(time)}</p>
        </div>
        <div className="reset-container">
          <Button onClick={() => window.location.reload()} variant="contained">
            Let's do it again!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
