async function fetchTodo() {
    try {
        const response = await fetch('http://localhost:3000/api/todos/1');
        const todo = await response.json();

        //json to string converter function
        const todoString = JSON.stringify(todo, null, 2);

        //text node with the JSON string
        const textNode = document.createTextNode(todoString);
        document.body.appendChild(textNode);
    } catch (error) {
        console.error('Error fetching todo:', error);
    }
}

fetchTodo();
