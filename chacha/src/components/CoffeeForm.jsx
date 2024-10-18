import { coffeeOptions } from "../utils";
import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CoffeForm({ isAuthenticated }) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [cost, setCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  const { globalData, setGlobalData, globalUser } = useAuth();

  async function handleSubmitForm() {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    //only submits the form if it is completed
    if (!selected) {
      return;
    }

    try {
      // duplicate of globalData
      const newGlobalData = {
        ...(globalData || {}),
      };
      //time is in miliseconds, so have to convert hour and minute to proper unit
      const timeNow = Date.now();
      const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 1000;
      const timestamp = timeNow - timeToSubtract;

      //update global state and send same data to database
      newGlobalData[timestamp] = { name: selected, cost: cost };
      console.log(timestamp, selected, cost);
      setGlobalData(newGlobalData);

      const userRef = doc(db, "users", globalUser.uid);
      await setDoc(
        userRef,
        {
          [timestamp]: { name: selected, cost: cost },
        },
        { merge: true }
      );

      setSelected(null)
      setCost(0)
      setHour(0)
      setMin(0)
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      <div className="section-header">
        <i className="fa-solid fa-pencil"></i>
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select tea type:</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button
              onClick={() => {
                setSelected(option.name);
                setShowCoffeeTypes(false);
              }}
              className={
                "button-card " +
                (option.name === selected ? "coffee-button-selected" : "")
              }
              key={optionIndex}
            >
              <h4>{option.name}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
        <button
          onClick={() => {
            setShowCoffeeTypes(true);
            setSelected(null);
          }}
          className={
            "button-card " +
            (showCoffeeTypes === true ? "coffee-button-selected" : "")
          }
        >
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      {showCoffeeTypes && (
        <select
          onChange={(event) => {
            setSelected(event.target.value);
          }}
          id="coffee-list"
          name="coffee-list"
        >
          <option value={null}>Select Type</option>
          {coffeeOptions.map((option, optionIndex) => {
            return (
              <option value={option.name} key={optionIndex}>
                {option.name} {option.caffeine}mg
              </option>
            );
          })}
        </select>
      )}
      <h4>Add the cost ($):</h4>
      <input
        value={cost}
        onChange={(event) => {
          setCost(event.target.value);
        }}
        type="number"
        className="w-full"
        placeholder="$4.50"
      />
      <h4>Time since consumption:</h4>
      <div className="time-entry">
        <div>
          <h6>Hours</h6>
          <select
            onChange={(event) => {
              setHour(event.target.value);
            }}
            id="hours-select"
          >
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23,
            ].map((hour, hourIndex) => {
              return (
                <option key={hourIndex} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h6>Mins</h6>
          <select
            onChange={(event) => {
              setMin(event.target.value);
            }}
            id="mins-select"
          >
            {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
              return (
                <option key={minIndex} value={min}>
                  {min}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>
        <p>Add Entry</p>
      </button>
    </>
  );
}
