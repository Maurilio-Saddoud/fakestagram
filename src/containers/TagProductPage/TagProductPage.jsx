import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import "./TagProductPage.css";
import { AiOutlineClose } from "react-icons/ai";
import { taggedProducts } from "../../atoms/atoms";

const TagProductPage = () => {
  const [taggedProductsList, setTaggedProductsList] = useRecoilState(taggedProducts);
  const [tagged, setTagged] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const removeElement = (element) => {
    const newArray = taggedProductsList.filter((item) => item !== element);
    setTaggedProductsList(newArray);
  };

  useEffect(() => {
    if (containerRef.current) {
      const parentHeight = containerRef.current.parentElement.clientHeight;
      const containerHeight = containerRef.current.scrollHeight;
      containerRef.current.style.maxHeight = `calc(${parentHeight}px - 30px)`;
    }
  }, [taggedProductsList]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setTaggedProductsList([...taggedProductsList, tagged]);
      setTagged("");
      document.getElementById("taggedProductSearchBar").value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div id="taggedProductsPage" className="tag-people-container">
      <div className="card-header tag-header">
        <p>Tag products</p>
        <p
          className="close-slider"
          style={{ marginRight: "10px", color: "#00BBF6", cursor: "pointer" }}
          onClick={() =>
            document.getElementById("taggedProductsPage").classList.remove("active-tag")
          }
        >
          Done
        </p>
      </div>
      <div className="tag-body" ref={containerRef}>
        <div className="search-bar-container">
          <input
            onKeyDown={handleKeyDown}
            className="search-bar"
            type="search"
            name=""
            placeholder="Search..."
            autoComplete="off"
            id="taggedProductSearchBar"
            onChange={(e) => setTagged(e.target.value)}
            ref={inputRef}
          />
          <p
            id="tag"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (tagged) {
                setTaggedProductsList([...taggedProductsList, tagged]);
                setTagged("");
                document.getElementById("taggedSearchBar").value = "";
                inputRef.current.focus();
              }
            }}
          >
            Tag
          </p>
        </div>

        <div className="tagged-names-container" style={{ overflow: "auto" }}>
          {taggedProductsList.map((name) => (
            <div key={name} className="name-container">
              <AiOutlineClose
              color="grey"
                style={{ cursor: "pointer", margin: "2px" }}
                onClick={() => {
                  removeElement(name);
                }}
              />
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagProductPage;
