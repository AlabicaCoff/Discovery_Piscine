$(document).ready(function () {
    let todoList = getCookie();
    const element = $("#ft_list");
    showToDo();

    $(".new-btn").click(function() {
        createToDo();
    });

    $(document).on('click', '.todo', function() {
        removeToDo($(this).attr('id'));
    });

    function createToDo() {
        let new_todo = prompt("Enter your assignment : ");

        if (new_todo == null || new_todo == "") {
            return;
        }

        todoList.push(new_todo);
        setCookie();
        showToDo();
    }

    function showToDo() {
        element.empty();
        $.each(todoList, function (i, value) {
            let todo_div = $("<div>").attr({
                "id": "id-" + i,
                "class": "todo",
            }).css("white-space", "pre").html(value);
            element.prepend(todo_div);
        });
    }

    function removeToDo(id) {
        if (confirm("Are you sure to delete todo?")) {
            let todo_id = id.split("-")[1];
            if (todo_id < todoList.length) {
                todoList.splice(todo_id, 1);
            }

            setCookie();
            showToDo();
        }
    }

    function setCookie() {
        if (!todoList.length) {
            document.cookie = "ft_list=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            location.reload();
            return;
        }

        let encrypt_list = $.map(todoList, function (value) {
            return encodeURIComponent(value);
        });

        let cookie_value = encrypt_list.join(",");
        const date = new Date();
        date.setTime(date.getTime() + (30 * 60 * 1000));
        document.cookie = "ft_list=" + cookie_value + "; expires=" + date.toUTCString() + ";";
        location.reload();
    }

    function getCookie() {
        if (document.cookie != "") {
            let encrypt_list = document.cookie.split("=")[1].split(",");
            let todo_list = $.map(encrypt_list, function (value) {
                return decodeURIComponent(value);
            });

            return todo_list;
        }
        return [];
    }
});