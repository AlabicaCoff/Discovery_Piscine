let todoList = getCookie();
const todoDiv = document.querySelector(".todo");
showToDo();

function createToDo () {
    let new_todo = prompt("Enter your assignment : ");
    
    if (new_todo == null || new_todo == "") {
        return
    }

    todoList.push(new_todo);
    setCookie();
    showToDo();
}

function showToDo () {
    const element = document.getElementById("ft_list");
    element.innerHTML = "";
    for (i in todoList) {
        let todo_div = document.createElement("div");
        todo_div.id = "id-" + i;
        todo_div.className = "todo";
        todo_div.setAttribute("onclick", "removeToDo(id)");
        todo_div.style.whiteSpace = "pre";
        todo_div.innerHTML = todoList[i];
        element.prepend(todo_div);
    }
}

function removeToDo (id) {
    if (confirm("Are you sure to delete todo?")) {
        todo_id = id.split("-")[1];
        if (todo_id < todoList.length) {
            todoList.splice(i, 1);
        }

        setCookie();
        showToDo();
    }
}

function setCookie () {
    let encrypt_list = Array();
    if (!todoList.length) {
        document.cookie = "ft_list=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        location.reload();
        return
    }
    for (i in todoList) {
        let encrypt = encodeURIComponent(todoList[i]);
        encrypt_list.push(encrypt);
    }
    
    let cookie_value = encrypt_list.join(",");
    const date = new Date();
    date.setTime(date.getTime() + (30*60*1000));
    document.cookie = "ft_list=" + cookie_value + "; expires=" + date.toUTCString()+";";
    location.reload();
}

function getCookie() {
    if (document.cookie != "") {
        let encrypt_list = document.cookie.split("=")[1].split(",");
        let todo_list = Array();

        for (i in encrypt_list) {
            let decrypt = decodeURIComponent(encrypt_list[i]);
            todo_list.push(decrypt)
        }
        return todo_list
    }
    return []
}
