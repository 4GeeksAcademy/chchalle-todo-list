import React, {useState} from "react";

//include images into your bundle
const Home =() =>{

	const[todos, setTodos]=useState([]);
	const[inputValue, setInputValue]=useState("");
	return (
		<div className="container">
			<h1>My Todos</h1>
				<ul>
					<li><input 
					type="text" 
					value= {inputValue}
					onChange=
					{
						(event)=> 
						{
							setInputValue(event.target.value);
						}
					}					
			onKeyDown=
				{
					(event)=>
					{
						const key= event.key;
						if (key==='Enter')
						{
							setTodos(todos.concat(inputValue));
							setInputValue("");
						}
					}
				}
					
				placeholder="Next Task"></input>
				</li>
					{todos.map((task, index)=>(
					<li>
					
					<i class="fas fa-trash-alt" 
					onClick={() => setTodos(todos.filter((t,currentIndex)=> index!=currentIndex))}
					></i>{task}</li>
					))
					}
				</ul>
				<div>23 tags</div>
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
		</div>
	
	)
};

export default Home;