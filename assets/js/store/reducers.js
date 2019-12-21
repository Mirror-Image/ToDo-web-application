export default function createReducers() {
  return {
    addItem: (payload, state) => ({
      // нельзя менять предыдущее состояние state.todo.push...
      // возвращаем абсолютно новое состояниеб не мутируя страрое
      ...state, // копируем в объект текущий state через деструктуризацию
      todo: [... state.todo, payload], // возвращаем по-новому массив todo
    }),
    removeItem: (payload, state) => ({
      ...state,
      todo: [
        ...state.todo.slice(0, payload.id),
        ...state.todo.slice(payload.id + 1, state.todo.length),
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