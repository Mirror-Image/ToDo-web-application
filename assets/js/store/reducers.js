export default function createReducers() {
  return {
    addItem: (payload, state) => ({
      // нельзя менять предыдущее состояние state.todo.push...
      // возвращаем абсолютно новое состояниеб не мутируя страрое
      ...state, // копируем в объект текущий state через деструктуризацию
      todos: [payload, ... state.todos], // возвращаем по-новому массив todo
    }),
    // editItem: (payload, state) => ({
    //   ...state,
    //   todos: []
    // }),
    removeItem: (payload, state) => ({
      ...state,
      todos: [
        ...state.todos.slice(0, payload.id),
        ...state.todos.slice(payload.id + 1, state.todos.length),
      ]
    }),
    login: (payload, state) => ({
      ...state,
      userData: {
        authorized: true,
        ...payload,
      }
    }),
    logout: (payload, state) => ({
      ...state,
      userData: {}
    })
  }
}