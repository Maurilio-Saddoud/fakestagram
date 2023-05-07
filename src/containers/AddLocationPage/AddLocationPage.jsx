import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import "./AddLocationPage.css";
import { locationAtom } from "../../atoms/atoms";

const AddLocationPage = () => {
  const [addedLocation, setAddedLocation] = useRecoilState(locationAtom);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const parentHeight = containerRef.current.parentElement.clientHeight;
      containerRef.current.style.maxHeight = `calc(${parentHeight}px - 30px)`;
    }
  }, [addedLocation]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setAddedLocation(event.target.value);
      event.target.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div id="locationPage" className="tag-people-container">
      <div className="card-header tag-header">
        <p>Add location</p>
        <p
          className="close-slider"
          style={{ marginRight: "10px", color: "#00BBF6", cursor: "pointer" }}
          onClick={() =>
            document
              .getElementById("locationPage")
              .classList.remove("active-tag")
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
            id="locationSearch"
            ref={inputRef}
          />
          <p
            id="tag"
            style={{ cursor: "pointer" }}
            onClick={() => {
              let searchbarValue = document.getElementById("locationSearch").value;
              if (searchbarValue) {
                setAddedLocation(searchbarValue);
                document.getElementById("locationSearch").value = "";
                inputRef.current.focus();
              }
            }}
          >
            Add
          </p>
        </div>

        <div className="locations-container" style={{ overflow: "auto" }}>
          {addedLocation && <div className="location-container">{addedLocation}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddLocationPage;
