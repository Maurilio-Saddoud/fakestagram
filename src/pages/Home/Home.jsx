import "./Home.css";
import Header from "../../components/Header";
import { FaPlus } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Alert, Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { imgState, usernameAtom } from "../../atoms/atoms";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [image, setImage] = useRecoilState(imgState);
  const [username, setUsername] = useRecoilState(usernameAtom);
  const navigate = useNavigate();

  var imageDiv = document.getElementById("preview");
  var source;

  const getImagePreview = (e) => {
    document.getElementById("cardContainer").style.display = "flex";
    source = URL.createObjectURL(e.target.files[0]);
    imageDiv = document.getElementById("preview");
    var newImg = document.createElement("img");
    newImg.src = source;
    newImg.width = 300;
    imageDiv.appendChild(newImg);
  };

  const closeModal = () => {
    imageDiv.removeChild(imageDiv.firstChild);
    document.getElementById("cardContainer").style.display = "none";
  };

  const checkUsername = () => {
    const tempUsername = document.getElementById("name");
    if (!tempUsername.value || /[^a-zA-Z0-9_.]/.test(tempUsername.value)) {
      alert("Username may only contain '_' or '.' special characters");
      tempUsername.style.border = "solid red 1px";
    } else {
      // alert("The string does not contain special characters");
      setUsername(tempUsername.value);
      proceed();
    }
  };

  const proceed = () => {
    setImage(source);
    navigate("/createNewPost");
  };

  return (
    <div className="page-container">
      <Header />
      <div className="upload-container">
        <div className="upload-icon-container">
          <label for="file-upload" class="custom-file-upload">
            <FaPlus size={60} color="#A9A9A9" />
            <p>Create new post</p>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => getImagePreview(e)}
          />
        </div>
      </div>
      <div id="cardContainer" className="card-container">
        <div className="card" style={{ display: "block" }}>
          <AiOutlineCloseCircle
            id="closeButton"
            size={30}
            onClick={closeModal}
          />
          <div className="select-image-container" style={{ display: "flex", alignItems: "center" }}>
            <div id="preview"></div>
            <div className="button-container">
              <Button variant="outlined" onClick={checkUsername}>
                Select photo
              </Button>
              <Button
                className="cancel-button"
                variant="outlined"
                color="error"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </div>
          </div>
          <div
            className="name-input"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            Enter username:
            <input
              type="text"
              autoComplete="off"
              id="name"
              style={{
                borderStyle: "none",
                height: "30px",
                width: "50%",
                marginLeft: "10px",
                backgroundColor: "#e8e8e8",
                padding: "0 10px",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
