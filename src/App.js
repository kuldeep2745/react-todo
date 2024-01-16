import React, { useState } from "react";
import Styles from "./App.module.css"

const App = () => {
  const [data, setData] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [filtered, setFiltered] = useState("All");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const onClickHandler = () => {
    if (editMode && editingIndex !== null) {
      const updatedArray = dataArray.map((item, i) =>
        i === editingIndex ? { ...item, text: data } : item
      );
      setDataArray(updatedArray);
      setEditMode(false);
      setEditingIndex(null);
    } else {
      setDataArray((prevValue) => [
        ...prevValue,
        { text: data, checked: false },
      ]);
    }
    setData("");
  };

  const editHandler = (index) => {
    setEditMode(true);
    setEditingIndex(index);
    setData(dataArray[index].text);
  };

  const checkHandler = (index) => {
    const updatedArray = dataArray.map((item, i) =>
      index === i ? { ...item, checked: !item.checked } : item
    );
    setDataArray(updatedArray);
  };

  const removeHandler = (index) => {
    const filteredArray = dataArray.filter((item, i) => index !== i);
    setDataArray(filteredArray);
  };

  const filterHandler = (param) => {
    setFiltered(param);
  };

  const filteredArray = () => {
    if (filtered === "Checked") {
      return dataArray.filter((item) => item.checked);
    } else if (filtered === "UnChecked") {
      return dataArray.filter((item) => !item.checked);
    } else {
      return dataArray;
    }
  };

  return (
    <div>
      <div className={Styles.wave}></div>
      <div className={Styles.wave}></div>
      <div className={Styles.wave}></div>
    <div className={Styles.centerContainer}>
  <div className={Styles.centerContent}>
      <input value={data} onChange={(e) => onChangeHandler(e)} />
      <button onClick={onClickHandler}>{editMode ? "Edit" : "Add"}</button>
      <br />
      <button onClick={() => filterHandler("All")}>All</button>
      <button onClick={() => filterHandler("Checked")}>Checked</button>
      <button onClick={() => filterHandler("UnChecked")}>UnChecked</button>
      {filteredArray()?.map((item, index) => (
        <li
          key={index}
          style={{
            textDecoration: `${item.checked ? "line-through" : "none"}`,
          }}
        >
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => checkHandler(index)}
          />
          {item.text}
          <button onClick={() => editHandler(index)}>Edit</button>
          <button onClick={() => removeHandler(index)}>X</button>
        </li>
      ))}
    </div>
    </div>
    </div>
  );
};

export default App;
