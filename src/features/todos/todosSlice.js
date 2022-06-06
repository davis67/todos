import { createSelector } from "reselect";
import { client } from "../../api/client";
import { StatusFilters } from "../filters/filtersSlice";
const initialState = {
  status: "idle",
  entities: {},
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "todos/todoAdded":
      const currentTodo = action.payload;
      return {
        ...state,
        entities: { ...state.entities, [currentTodo.id]: currentTodo },
      };

    case "todos/todoToggled":
      const todoId = action.payload;
      const todo = state.entities[todoId];
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed,
          },
        },
      };
    case "todos/todoDeleted": {
      const newEntries = { ...state.entities };
      delete newEntries[action.payload];
      return {
        ...state,
        entities: newEntries,
      };
    }
    case "todos/allCompleted": {
      const newEntries = { ...state.entities };
      Object.values(newEntries).forEach((todo) => {
        newEntries[todo.id] = { ...todo, completed: true };
      });
      return {
        ...state,
        entities: newEntries,
      };
    }
    case "todos/completedCleared": {
      const newEntries = { ...state.entities };
      Object.values(newEntries).forEach((todo) => {
        if (todo.completed) {
          delete newEntries[todo.id];
        }
      });
      return {
        ...state,
        entities: newEntries,
      };
    }

    case "todos/colorSelected": {
      const { color, todoId } = action.payload;
      const todo = state.entities[todoId];
      return {
        ...state,
        entities: { ...state.entities, [todoId]: { ...todo, color } },
      };
    }

    default:
      return state;
  }
}

export const todoToggled = (id) => ({ type: "todos/todoToggled", payload: id });
export const todoDeleted = (id) => ({ type: "todos/todoDeleted", payload: id });

export const allTodosCompleted = () => ({
  type: "todos/allCompleted",
});
export const completedCleared = () => ({
  type: "todos/completedCleared",
});

export const todoColorSelected = (todoId, color) => ({
  type: "todos/colorSelected",
  payload: { todoId, color },
});

//thunk functions
export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text };
    const response = await client.post("/fakeApi/todos", { todo: initialTodo });
    dispatch({ type: "todos/todoAdded", payload: response.todo });
  };
}

const selectTodoEntities = (state) => state.todos.entities;

export const selectTodos = createSelector(selectTodoEntities, (entities) =>
  Object.values(entities)
);

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters;
    const showAllCompletions = status === StatusFilters.All;
    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodosIds = createSelector(
  selectFilteredTodos,
  (todos) => todos.map((todo) => todo.id)
);

export const selectTodosIds = createSelector(selectTodoEntities, (entities) =>
  Object.keys(entities)
);

export const selectTodoById = (state, todoid) => {
  return selectTodoEntities(state)[todoid];
};
