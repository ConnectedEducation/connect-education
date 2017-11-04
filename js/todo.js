for(let todo in todos){
    let todoTitle = document.createElement('P');
    todoTitle.className = "todo-title no-margins";
    todoTitle.innerHTML = todos[todo]['title'];

    let course = document.createElement('P');
    course.className = "todo-detail no-margins";
    course.innerHTML = todos[todo]['course'];

    let dueDate = document.createElement('P');
    dueDate.className = "todo-detail no-margins";
    dueDate.innerHTML = 'Due: ' + todos[todo]['dueDate'];

    let todoBody = document.createElement('DIV');
    todoBody.className = 'todo-body';
    todoBody.innerHTML = todos[todo]['body'];

    let todoItem = document.createElement('A');
    todoItem.className = "ce-panel dashboard-item";
    todoItem.href = 'todosample.html';

    let todoHead = document.createElement('DIV');
    todoHead.className = 'todo-head';

    todoItem.appendChild(todoHead);
    todoHead.appendChild(todoTitle);
    todoHead.appendChild(course);
    todoHead.appendChild(dueDate);

    todoItem.appendChild(document.createElement('HR'));
    todoItem.appendChild(todoBody);

    document.getElementById('todos-container').appendChild(todoItem);
}