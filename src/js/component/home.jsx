import React, { useEffect, useState } from "react";

// Include images into your bundle
const Home = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [editTodoId, setEditTodoId] = useState(null);
	const [editValue, setEditValue] = useState("");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = () => {
		fetch('https://playground.4geeks.com/todo/users/chchalle')
			.then((res) => res.json())
			.then((user) => {
				setTodos(user.todos);
			});
	};

	const deleteTodo = (todoId) => {
		fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(() => fetchUsers())
			.catch((error) => {
				console.error(error);
			});
	};

	const addTodo = () => {
		const newToDo = { label: inputValue, is_done: false };

		fetch('https://playground.4geeks.com/todo/todos/chchalle', {
			method: 'POST',
			body: JSON.stringify(newToDo),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(() => {
				fetchUsers();
				setInputValue("");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const updateTodo = (todoId) => {
		const updatedTodo = { label: editValue, is_done: false };

		fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
			method: 'PUT',
			body: JSON.stringify(updatedTodo),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(() => {
				fetchUsers();
				setEditTodoId(null);
				setEditValue("");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleKeyDown = (event, todoId) => {
		if (event.key === 'Enter') {
			updateTodo(todoId);
		}
	};

	return (
		<div className="container">
			<h1>My Todos</h1>
			<div className="container">
				<ul>
					<li className="row">
						<input
							className="col-12"
							type="text"
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									addTodo();
								}
							}}
							placeholder="Next Task"
						/>
					</li>
					{todos.map((todo) => (
						<li className="row" key={todo.id}>
							{editTodoId === todo.id ? (
								<input
									type="text"
									value={editValue}
									className="col-11"
									onChange={(event) => setEditValue(event.target.value)}
									onKeyDown={(event) => handleKeyDown(event, todo.id)}
									onBlur={() => {
										// Save changes when input loses focus
										updateTodo(todo.id);
									}}
								/>
							) : (
								<input
									type="text"
									value={todo.label}
									className="col-11"
									readOnly
									onClick={() => {
										setEditTodoId(todo.id);
										setEditValue(todo.label);
									}}
								/>
							)}
							<i
								id="icon"
								className="fas fa-trash-alt col-1 float-right"
								onClick={() => deleteTodo(todo.id)}
							></i>
						</li>
					))}
				</ul>
			</div>
			<div>{todos.length} tasks</div>
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
		</div>
	);
};

export default Home;