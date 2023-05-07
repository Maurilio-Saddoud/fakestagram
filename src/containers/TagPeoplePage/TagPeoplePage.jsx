import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import "./TagPeoplePage.css";
import { AiOutlineClose } from "react-icons/ai";
import { taggedPeople } from "../../atoms/atoms";

const TagPeoplePage = () => {
  const [taggedList, setTaggedList] = useRecoilState(taggedPeople);
  const [tagged, setTagged] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const removeElement = (element) => {
    const newArray = taggedList.filter((item) => item !== element);
    setTaggedList(newArray);
  };

  useEffect(() => {
    if (containerRef.current) {
      const parentHeight = containerRef.current.parentElement.clientHeight;
      const containerHeight = containerRef.current.scrollHeight;
      containerRef.current.style.maxHeight = `calc(${parentHeight}px - 30px)`;
    }
  }, [taggedList]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setTaggedList([...taggedList, tagged]);
      setTagged("");
      document.getElementById("taggedSearchBar").value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div id="tagPage" className="tag-people-container">
      <div className="card-header tag-header">
        <p>Tag people</p>
        <p
          className="close-slider"
          style={{ marginRight: "10px", color: "#00BBF6", cursor: "pointer" }}
          onClick={() =>
            document.getElementById("tagPage").classList.remove("active-tag")
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
            id="taggedSearchBar"
            onChange={(e) => setTagged(e.target.value)}
            ref={inputRef}
          />
          <p
            id="tag"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (tagged) {
                setTaggedList([...taggedList, tagged]);
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
          {taggedList.map((name) => (
            <div key={name} className="name-container">
              <AiOutlineClose
              color="grey"
                style={{ cursor: "pointer", margin: "2px" }}
                onClick={() => {
                  removeElement(name);
                }}
              />
              @{name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagPeoplePage;
