import React, { useState } from "react";
import Styles from "./App.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
        <div className={Styles.card}>
          <div className={Styles.CentreAlignCard}>
          <div className={Styles.inputButtonAlign}>

          <input
            className={Styles.inputs}
            value={data}
            onChange={(e) => onChangeHandler(e)}
            required=""
            />
          <button className={Styles.button86} onClick={onClickHandler}>
            {editMode ? "Edit" : "Add"}
          </button>
            </div>
          <br />
          <div className={Styles.filterAlign}>

          <button
            className={Styles.buttonwiggle}
            onClick={() => filterHandler("All")}
            >
            All
          </button>
          <button
            className={Styles.buttonwiggle}
            onClick={() => filterHandler("Checked")}
            >
            Checked
          </button>
          <button
            className={Styles.buttonwiggle}
            onClick={() => filterHandler("UnChecked")}
            >
            UnChecked
          </button>
            </div>
            </div>
          <ul>
            {filteredArray()?.map((item, index) => (
              <li key={index} className={Styles.listItem}>
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={item.checked}
                  onChange={() => checkHandler(index)}
                />
                <span
                  style={{
                    textDecoration: `${item.checked ? "line-through" : "none"}`,
                  }}
                >
                  {item.text}
                </span>
                <button
                  className={Styles.buttonwiggle}
                  onClick={() => editHandler(index)}
                >
                  <EditIcon />
                </button>
                <button
                  className={Styles.buttonwiggle}
                  onClick={() => removeHandler(index)}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
