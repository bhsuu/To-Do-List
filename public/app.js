$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    
    $("#todoInput").keypress(function(event){
        if (event.which ===13){
            createTodo();
        }
    })
    $(".list").on("click","span", function(event){
        event.stopPropagation;
        removeTodo($(this).parent());
    })
    $(".list").on("click","li", function(){
        updateTodo($(this));
    })
    
})


function addTodos(data){
        data.forEach(function(toDo){
            addTodo(toDo);
        })
    }

function addTodo(toDo){
    var newTodo = $("<li class='task'>" + toDo.name + "<span>X</span></li>");
    //store id into jquery .data mem
    newTodo.data("id", toDo._id);
    newTodo.data("completed", toDo.completed);
    if (toDo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo)
}

function createTodo(){ 
    //create post
    var usrInput = $("#todoInput").val();
    $.post("/api/todos", {name: usrInput})
        .then(function(newTodo){
            addTodo(newTodo);
            $("#todoInput").val("");
        })
        .catch(function(err){
            console.log(err);
        })
}
function removeTodo(todo){
    var clickedId = todo.data("id")
    $.ajax({
        method : "DELETE",
        url : "/api/todos/"+ clickedId
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
         console.log(err);
    })
}

function updateTodo(todo){
    var isDone = !todo.data("completed");
    var updateStatus = {completed: isDone};
    var clickedId = todo.data("id")
    $.ajax({
        method : "PUT",
        url : "/api/todos/"+ clickedId,
        data: updateStatus
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data("completed", isDone);
    })
    .catch(function(err){
        console.log(err);
    })
}