import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableColors, capitalize } from "../filters/colors";
import {
  statusFilterChanged,
  colorFilterChanged,
  StatusFilters,
} from "../filters/filtersSlice";
import {
  allTodosCompleted,
  completedCleared,
  selectTodos,
} from "../todos/todosSlice";

const RemainingTodo = ({ count }) => {
  const suffix = count === 1 ? "" : "s";
  return (
    <div>
      <h3>Remaining todos</h3>
      <div>
        <strong>{count}</strong> item{suffix} remaining
      </div>
    </div>
  );
};

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key];
    const handleClick = () => onChange(value);
    return (
      <div key={value}>
        <button
          className="border border-teal-600 hover:bg-teal-500 hover:text-white font-bold py-2 px-4 text-gray-600 rounded focus:outline-none focus:shadow-outline"
          onClick={handleClick}
        >
          {key}
        </button>
      </div>
    );
  });
  return (
    <div>
      <h3>Filter by Status</h3>
      <div className="flex flex-col justify-start space-y-1">
        {renderedFilters}
      </div>
    </div>
  );
};

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color, changeType);
    };
    return (
      <div className="space-y-1">
        <div>
          <input
            type="checkbox"
            name={color}
            checked={checked}
            onChange={handleChange}
            className="mr-1.5"
          />
          {capitalize(color)}
        </div>
      </div>
    );
  });
  return (
    <div>
      <h3>Filter by Color</h3>
      <form>{renderedColors}</form>
    </div>
  );
};

function Footer() {
  const dispatch = useDispatch();
  const onMarkCompletedClicked = () => dispatch(allTodosCompleted());
  const clearCompleted = () => dispatch(completedCleared());
  const { status, colors } = useSelector((state) => state.filters);
  const onStatusChange = (status) => dispatch(statusFilterChanged(status));
  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed
    );
    return uncompletedTodos.length;
  });

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType));

  return (
    <footer className=" my-2 grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <h3>Actions</h3>
        <div className="flex flex-col justify-start space-y-1">
          <div>
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="click"
              onClick={onMarkCompletedClicked}
            >
              Mark all completed
            </button>
          </div>
          <div>
            <button
              onClick={clearCompleted}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Clear completed
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <RemainingTodo count={todosRemaining} />
      </div>
      <div className="col-span-1">
        <StatusFilter value={status} onChange={onStatusChange} />
      </div>
      <div className="col-span-1">
        <ColorFilters value={colors} onChange={onColorChange} />
      </div>
    </footer>
  );
}

export default Footer;
