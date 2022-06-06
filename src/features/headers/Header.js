import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../todos/todosSlice";

function Header() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => setText(e.target.value);

  const handleKeydown = (e) => {
    const trimmedText = text.trim();
    if (e.which === 13) {
      dispatch(saveNewTodo(trimmedText));
      setText("");
    }
  };
  return (
    <div>
      <div className="">
        <input
          type="text"
          className="w-full"
          value={text}
          placeholder="What needs to be done?"
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
      </div>
    </div>
  );
}

export default Header;
