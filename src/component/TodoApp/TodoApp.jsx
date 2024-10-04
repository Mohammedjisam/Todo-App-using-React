import React, { useState } from 'react';
import "./TodoApp.css";

const TodoApp = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the item being edited
  const [isLocked, setIsLocked] = useState(false); // Track if the list is locked

  const maxItems = 10;

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const storeItems = (event) => {
    event.preventDefault();

    if (isLocked) {
      alert("The list has been confirmed. No more items can be added.");
      return;
    }

    // Trim the input to avoid issues with white spaces
    const trimmedInput = input.trim();

    // Validate that the input is not empty after trimming
    if (trimmedInput === "") {
      alert("Input cannot be empty!");
      return;
    }

    // Validate that the input contains only letters (strings)
    const stringOnlyPattern = /^[a-zA-Z\s]+$/;
    if (!stringOnlyPattern.test(trimmedInput)) {
      alert("Please enter only alphabetic characters.");
      return;
    }

    // Check if the maximum limit of items is reached
    if (items.length >= maxItems) {
      alert(`You cannot add more than ${maxItems} items.`);
      return;
    }

    // Check if the input already exists in the items array (case-insensitive)
    const itemExists = items.some((item) => item.toLowerCase() === trimmedInput.toLowerCase());
    if (itemExists && editIndex === null) { // Avoid duplicate check while editing
      alert("This item already exists in the list!");
      return;
    }

    if (editIndex !== null) {
      // Update the existing item
      const updatedItems = items.map((item, index) =>
        index === editIndex ? trimmedInput : item
      );
      setItems(updatedItems);
      setEditIndex(null); // Reset after update
    } else {
      // Add a new item
      setItems([...items, trimmedInput]);
    }

    // Clear the input after storing or editing
    setInput("");
  };

  const deleteItem = (index) => {
    if (isLocked) {
      alert("The list has been confirmed. Items cannot be deleted.");
      return;
    }
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const editItem = (index) => {
    if (isLocked) {
      alert("The list has been confirmed. Items cannot be edited.");
      return;
    }
    setInput(items[index]); // Set the input field with the current item to edit
    setEditIndex(index); // Store the index of the item being edited
  };
  
  const handleLock = () => {
    setIsLocked(true); // Lock the list
  };

  const handleModify = () => {
    setIsLocked(false); // Unlock the list
  };






  
  return (
    <div className='todo-container'>
      <form className="input-section" onSubmit={storeItems}>
        <h1>Todo App</h1>
        <input
          type='text'
          value={input}
          onChange={handleChange}
          placeholder='Enter Items...'
          disabled={isLocked} // Disable input when locked
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              storeItems(e); // Trigger item addition on Enter key press
            }
          }}
        />
        {!isLocked && (
          <button type="button" onClick={handleLock}>Confirm List</button>
        )}
        {isLocked && (
          <button type="button" onClick={handleModify}>Modify</button>
        )}
      </form>
      <ul>
        {items.map((data, index) => (
          <li key={index}>
            {data}
            <i
              className="fa-solid fa-edit"
              style={{ color: '#4CAF50', cursor: 'pointer', marginRight: '10px' }}
              onClick={() => editItem(index)}
            ></i>
            <i
              className="fa-solid fa-trash-can"
              style={{ color: '#ea3434', cursor: 'pointer' }}
              onClick={() => deleteItem(index)}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
