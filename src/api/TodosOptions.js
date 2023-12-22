export const addTodoOptions = (newTodo) => {
    return {
        optimisticData: (todos) => [...todos, newTodo]
            .sort((a, b) => b.id - a.id),
        rollbackOnError: true,
        populateCache: (added, todos) => [...todos, added]
            .sort((a, b) => b.id - a.id),
        revalidate: false
    }
}

export const updateTodoOptions = (updatedTodo) => {
    return {
        optimisticData: (todos) => {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updatedTodo.id
            })
            return [...prevTodos, updatedTodo]
                .sort((a, b) => b.id - a.id)
        },
        rollbackOnError: true,
        populateCache: (updated, todos) => {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updatedTodo.id
            })
            return [...prevTodos, updated]
                .sort((a, b) => b.id - a.id)
        },
        revalidate: false,
    }
}

export const deleteTodoOptions = ({ id }) => {
    return {
        optimisticData: (todos) => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
        rollbackOnError: true,
        populateCache: (emptyResponseObj, todos) => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
        revalidate: false,
    }
}