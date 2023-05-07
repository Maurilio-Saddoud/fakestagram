import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { imgState } from "../../atoms/atoms";
import "./CreateNewPost.css";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TagPeoplePage from "../../containers/TagPeoplePage";
import TagProductPage from "../../containers/TagProductPage";
import AddLocationPage from "../../containers/AddLocationPage";
import { captionAtom } from "../../atoms/atoms";

const CreateNewPost = () => {
  const [caption, setCaption] = useRecoilState(captionAtom);
  const [image, setImage] = useRecoilState(imgState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!image) {
      navigate("/");
    }
  }, []);

  return (
    <div className="page-container create-post">
      <div className="create-post-card">
        <div className="card-header">
          <IoIosArrowBack
            size={25}
            style={{ marginLeft: "5px", cursor: "pointer" }}
            color="#FF0000"
            onClick={() => navigate("/")}
          />
          <p>New post</p>
          <p
            style={{ marginRight: "10px", color: "#00BBF6", cursor: "pointer" }}
            onClick={() => navigate("/post")}
          >
            Share{" "}
          </p>
        </div>
        <div className="body">
          <div className="img-container">
            <img src={image} objectFit="cover" width={400} alt="" />
          </div>
          <div className="post-content-container">
            <div className="row">
              <textarea
                className="caption"
                id="caption"
                type="text"
                rows="5"
                cols="60"
                placeholder="Write a caption..."
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
            </div>
            <div className="row">
              <div
                className="button1"
                onClick={() => {
                  document
                    .getElementById("tagPage")
                    .classList.add("active-tag");
                }}
              >
                <p style={{ marginLeft: "10px" }}>Tag people</p>
                <MdNavigateNext size={30} />
              </div>
              <div
                className="button1"
                onClick={() => {
                  document
                    .getElementById("taggedProductsPage")
                    .classList.add("active-tag");
                }}
              >
                <p style={{ marginLeft: "10px" }}>Tag products</p>
                <MdNavigateNext size={30} />
              </div>
            </div>
            <div className="row">
              <div
                className="button1"
                onClick={() => {
                  document
                    .getElementById("locationPage")
                    .classList.add("active-tag");
                }}
              >
                <p style={{ marginLeft: "10px" }}>Add location</p>
                <MdNavigateNext size={30} />
              </div>
            </div>
          </div>
        </div>
        <TagPeoplePage />
        <TagProductPage />
        <AddLocationPage />
      </div>
    </div>
  );
};

export default CreateNewPost;
