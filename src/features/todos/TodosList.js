import React from "react";
import { useSelector } from "react-redux";
import TodosListItem from "./TodosListItem";
import { selectFilteredTodosIds } from "./todosSlice";

function TodosList() {
  const todoIds = useSelector(selectFilteredTodosIds);
  const renderedListItems = todoIds.map((todoId) => {
    return <TodosListItem key={todoId} id={todoId} />;
  });
  return (
    <ul className="m-1.5 font-normal px-1.5 pt-1.5 pb-16 leading-tight">
      {renderedListItems}
    </ul>
  );
}

export default TodosList;
