import React, { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  imgState,
  taggedPeople,
  taggedProducts,
  locationAtom,
  captionAtom,
  likesAtom,
  commentsAtom,
  usernameAtom,
  elapsedTimeAtom,
} from "../../atoms/atoms";
import "./Post.css";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_KEY = "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";

const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "You are a helpful assistant. you make javascript objects containing a unique username and a complimentary comment. Please only provide the code, without any commentary. you only generate one object at a time.",
};

const Post = () => {
  const [caption, setCaption] = useRecoilState(captionAtom);
  const [likes, setLikes] = useRecoilState(likesAtom);
  const [image, setImage] = useRecoilState(imgState);
  const [location, setLocation] = useRecoilState(locationAtom);
  const [tagged, setTagged] = useRecoilState(taggedPeople);
  const [products, setProducts] = useRecoilState(taggedProducts);
  const [comments, setComments] = useRecoilState(commentsAtom);
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [totalTime, setTotalTime] = useRecoilState(elapsedTimeAtom);
  const [userComment, setUserComment] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [postAge, setPostAge] = useState("1 SECOND AGO");
  const commentsContainerRef = useRef(null);
  const postCardRef = useRef(null);
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Define initial state for messages and isTyping
  const [isLoading, setIsLoading] = useState(false);

  // Handle sending a new message
  const handleSend = async (message) => {
    setLikes((likes + 1) * Math.floor(Math.random() * 9 + 1));
    setPostAge(secondsToMinutes(elapsedTime));
    let content = `generate a unique username and a nice comment and embed them in a javascript object. the post you are commenting was posted by ${username}. Here is an example: {'username': 'random_user', 'comment': 'Perfect! So gorgeous'}. ENSURE THE ATTRIBUTES ALWAYS HAVE QUOTATION MARKS AROUND THEM! just give me the complete object. Please only provide the code, without any commentary.`;
    if (caption)
      content += ` for some added content to inspire your comments, the caption reads: ${caption}.`;
    if (tagged.length > 0)
      content += ` The post you are commenting on also has people tagged. feel free to use some of their names as the usernames commenting, here they are ${JSON.stringify(
        tagged
      )}.`;
    if (products.length > 0)
      content += ` The post you are commenting on also has at least one product tagged. feel free to comment about a product that was tagged ${JSON.stringify(
        products
      )}.`;
    if (location)
      content += `The post you are commenting on also has a location tagged. feel free to comment about where the post was taken place: ${location}.`;

    // Create a new message object with a default message
    const newMessage = {
      role: "user",
      content: content,
    };

    // Set isTyping to true to indicate that ChatGPT is typing a response
    setIsLoading(true);
    document.getElementById("commentsContainer").classList.add("loading");

    // Call the processMessageToChatGPT function to send the message to the ChatGPT API
    await processMessageToChatGPT(newMessage);
  };

  // Send a message to the ChatGPT API and update the messages state with the response
  async function processMessageToChatGPT(newMessage) {
    // Reformat the messages array to an array of objects with a role and content property

    // Construct the request body for the ChatGPT API
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        // Add a system message at the beginning to define the logic of the chat
        systemMessage,
        // Add the reformatted messages from the user
        newMessage,
      ],
    };

    // Send a POST request to the ChatGPT API with the request body
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      // Convert the response to JSON
      .then((data) => {
        return data.json();
      })
      // Update the messages state with the response message
      .then((data) => {
        let str = data.choices[0].message.content;
        console.log(str);

        let startIndex = str.indexOf("{");
        let endIndex = str.lastIndexOf("}");
        let result = str.substring(startIndex, endIndex + 1);

        try {
          result = JSON.parse(
            result.replace(/(\r\n|\n|\r)/gm, "").replace(/'/g, '"')
          );
          setComments([...comments, result]);
        } catch (e) {
          console.error("Failed to parse JSON: ", e);
        }

        setIsLoading(false);
        document
          .getElementById("commentsContainer")
          .classList.remove("loading");
        var objDiv = document.getElementById("commentsContainer");
        objDiv.scrollTop = objDiv.scrollHeight;
      });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function secondsToMinutes(seconds) {
    if (seconds < 60) {
      return seconds + "  SECONDS AGO";
    } else {
      const minutes = Math.round(seconds / 60);
      return minutes + " MINUTE" + (minutes > 1 ? "S " : " ") + "AGO";
    }
  }

  // Use useEffect to set the height of the interactive container to match the height of the post card element
  useEffect(() => {
    if (!image) {
      navigate("/");
    }
    const postCardHeight = postCardRef.current.clientHeight;
    const interactiveContainer = document.querySelector(
      ".interactive-container"
    );
    interactiveContainer.style.height = `${postCardHeight}px`;

    const commentsContainer = document.querySelector(".comments-container");
    commentsContainer.style.height = `calc(${postCardHeight}px - 100px)`;

    const timer = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="page-container post">
      <div className="post-card" ref={postCardRef}>
        <div className="img-container img-post-page">
          <img id="postImage" src={image} objectFit="cover" width={400} alt="" />
        </div>
        <div className="interactive-container">
          <div
            className="comments-container"
            id="commentsContainer"
            ref={commentsContainerRef}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {caption && (
                  <p>
                    <b>@{username}</b>: {caption}
                  </p>
                )}
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <p>
                      <b>@{comment.username}</b>: {comment.comment}
                    </p>
                  </div>
                ))}
                <div
                  className="refresh-button-container"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginBottom: "20px",
                  }}
                >
                  <Button onClick={handleSend}>Refresh</Button>
                  <Button
                    onClick={() => {
                      setTotalTime(elapsedTime);
                      navigate("/summary");
                    }}
                    color="error"
                  >
                    Close post
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="like-count">
            <p style={{ margin: "0 0 0 20px" }}>{likes} likes</p>
            <p
              style={{
                color: "#a9a9a9",
                fontSize: "10px",
                margin: "0 0 0 20px",
              }}
            >
              {postAge}
            </p>
          </div>
          <div className="write-comment">
            <input
              onChange={(e) => setUserComment(e.target.value)}
              autoComplete="off"
              type="text"
              name=""
              id="writeComment"
              placeholder="Add a comment..."
              style={{
                height: "100%",
                width: "90%",
                borderStyle: "none",
                marginLeft: "20px",
                padding: "2px 0px",
              }}
            />
            <p
              onClick={() => {
                setComments([
                  ...comments,
                  {
                    username: username,
                    comment: userComment,
                  },
                ]);
                setUserComment("");
                document.getElementById("writeComment").value = "";
                const commentsContainer = commentsContainerRef.current;
                commentsContainer.scrollTop =
                  commentsContainer.scrollHeight - 100;
              }}
              style={{
                margin: "0 20px 0 10px",
                color: "#00BBF6",
                cursor: "pointer",
              }}
            >
              post
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
