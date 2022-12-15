window.addEventListener('load', () => {

    todos = JSON.parse(localStorage.getItem('todos')) || [];


    const form = document.querySelector('#newTaskForm');
    //for stopping it from refreshing the page:
    form.addEventListener('submit', event => {
        event.preventDefault();

        const todo = {
            content: event.target.elements.content.value
        }

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        location.reload();
    })
    DisplayTodos();
})

function DisplayTodos() {
    const items_div = document.querySelector('#items');


    todos.forEach(todo => {
        const item_div = document.createElement("div");
        item_div.classList.add("item");

        const item_content_div = document.createElement("div");
        item_content_div.classList.add("content");


        item_div.appendChild(item_content_div);

        const item_input_el = document.createElement('input');
        item_input_el.type = "text";
        item_input_el.classList.add('text');
        item_input_el.value = todo.content;
        item_input_el.setAttribute('readonly', 'readonly');

        item_content_div.appendChild(item_input_el);

        const item_options_div = document.createElement("div");
        item_options_div.classList.add("options");


        const item_edit_el = document.createElement("button");
        item_edit_el.classList.add("edit");
        item_edit_el.innerHTML = "edit"

        const item_delete_el = document.createElement("button");
        item_delete_el.classList.add("delete");
        item_delete_el.innerHTML = "delete";

        item_options_div.appendChild(item_edit_el);
        item_options_div.appendChild(item_delete_el);

        item_div.appendChild(item_options_div)

        items_div.appendChild(item_div);


        item_edit_el.addEventListener('click', e => {
            const input = item_div.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                location.reload();


            })
        })


        item_delete_el.addEventListener('click', e => {
            todos = todos.filter(t => t !== todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            location.reload();

        })

    })

}



