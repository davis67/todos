import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableColors, capitalize } from "../filters/colors";
import {
  selectTodoById,
  todoDeleted,
  todoToggled,
  todoColorSelected,
} from "./todosSlice";

function TodosListItem({ id }) {
  const dispatch = useDispatch();
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const onDelete = () => {
    dispatch(todoDeleted(todo.id));
  };
  const handleCompleted = (e) => {
    dispatch(todoToggled(todo.id));
  };
  const handleColorChanged = (e) => {
    const color = e.target.value;
    dispatch(todoColorSelected(todo.id, color));
  };
  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ));
  return (
    <li className=" my-2 grid grid-cols-4 gap-4">
      <div className="col-span-3 flex items-center">
        <input type="checkbox" checked={completed} onChange={handleCompleted} />
        <div className="ml-4 text-gray-500">{text}</div>
        <div className="ml-6">
          <select value={color} style={{ color }} onChange={handleColorChanged}>
            <option value=""></option>
            {colorOptions}
          </select>
        </div>
      </div>
      <div>
        <button onClick={onDelete}>
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TodosListItem;
