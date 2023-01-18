var
    taskItem = 0,
    closeIcon = '<svg height="14px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="14px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"/><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/></svg>',
    closeSmall = '<svg height="10px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="10px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"/><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/></svg>';

Object.size = function (obj) {
    var size,
        key;
    size = 0
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function Init(taskList) {
    var i, j;
    taskList = taskList.data
    for (i in taskList) {
        $(".btn-board").before(createTaskboard(taskList[i].name, taskList[i].id));
    }
}

function serach(value) {
    var filter,
        i, li,
        txtValue;
    filter = value.toUpperCase();
    li = $("li");
    for (i = 0; i < li.length; i++) {
        txtValue = $(li[i]).find("h4").text();
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();  
    var data,
        prev_id,
        new_id;
    data = ev.dataTransfer.getData("text");
    prev_id = ev.dataTransfer.getData("parent_id");

    if ($(ev.target).closest("li").length > 0) {
        $(ev.target).closest("li").before(document.getElementById(data));

    } else {
        $(ev.target).closest("ul").append(document.getElementById(data));
    }
    new_id = $(ev.target).closest("ul").attr('task-board');
    var temp = data.replace("task_name", "");
    var forms = new FormData();;
    forms.append("task_type", new_id);
    forms.append("_method", "PUT");
    http("api/task/" + temp, "post", forms, function (data) {

    })


}
function createTaskboard(title, id) {
    var taskBoard, taskList_content;

    taskList_content = '<div class="header"><h2>' + title + '</h2>' +
        '<div class="d-flex"> ' +
        '<button class="task-close">' +
        '<svg height="14px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="14px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"/><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/></svg>'
        + '</button></div></div>' +
        '<ul task-board="' + id + '" class="list" ondrop="drop(event)" ondragover="allowDrop(event)"></ul> ';

    taskBoard = document.createElement("div");
    $(taskBoard).html(taskList_content).addClass("task-list");

    return taskBoard;
}
function createTask({ task_name, priority, description, end_date}, id) {
    var li;

    priority = getPriority(priority);
    var s = new Date(  end_date)

  console.log(s);   
    li = '<li id="task_name' + id + '" target-id="' + id + '" draggable="true" ondragstart="drag(event)" class="task-item">' +
        '<h4>' + task_name + '</h4>' +
        '<p>' + description + '</p><span class="task-item-close">' +
        '<svg height="10px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="10px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"></path><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"></path></svg></span>' +
        '<div class="d-flex f-sm"><div class="w-50"><span class=" "> <b>Due date: </b>' + s.getDate()+ "-" +s.getMonth() +"-"+ s.getFullYear()  + '</span> </div><div  class="w-50 text-right "><b> Status: </b> <span class="status ' + priority + '">' + priority + '</span></div> </div></li>';
    li = $.parseHTML(li);
    taskItem++;
    return li;
}
/**
*  create Dom by json
*
* @param   {[type]}  val     [val description]
* @param   {[type]}  parent  [parent description]
*
* @return  {[type]}          [return description]
*/
function createViews(val, parent = null) {
    var i, j, s, node;

    for (i in val) {

        s = val[i]; node = document.createElement(val[i].tagName);
        node.setAttribute("id", i);

        if (val[i].children) {
            createViews(val[i].children, node);
        }
        for (j in s) {
            if (j.localeCompare("children") != 0) {
                if (j === "text") {
                    node.innerHTML = s[j];
                }
                else if (j != "tagName") {
                    node.setAttribute(j, s[j]);
                }
            }
        }
        if (parent != null) {
            if (parent.firstElementChild == null) {
                parent.appendChild(node);
            }
            else {
                parent.insertBefore(node, parent.firstElementChild.nextSibling);
            }
        }
    }
    return node;
}

function getTaskData() {
    let success = function (data) {
        var temp = data.data;

        for (j in temp) {
            window.task[temp[j].id] = temp[j];
            $("[task-board=" + temp[j].task_type + "]").append(createTask(temp[j], temp[j].id));
        }
    };
    http("api/task", "GET", null, success)
}

$(document).ready(function () {
    window.task = [];
    http("api/task-status", "GET", null,
        function (data) {
            Init(data);
            getTaskData()
        },
        function (data) {
            if (data.responseJSON.error == "Unauthenticated.") {
                removeToken("token");
                window.location = base_url+"login"
            }

        }
    )
    $("[name='start_date']").datepicker({
        dateFormat: "yy-mm-dd"
      });
      
    $("[name='end_date']").datepicker({
        dateFormat: "yy-mm-dd"
      });
    
    $(".board")
        .on("click", ".task-close", function (e) {
            if (confirm(" Are you sure want to delete Task board")) {
                var temp, ids;
                temp = $(e.target).closest(".task-list");
                ids = $(temp).find("[task-board]").attr("task-board");
                http("api/task-status/" + ids, "DELETE", null, function (data) {

                })
                temp.remove();

            }
        })
        .on("click", ".task-item-close", function (e) {
            if (confirm(" Are you sure want to delete Task")) {
                var li,
                    taskBoard,
                    itemId;

                li = $(e.target).closest(".task-item");
                taskBoard = $(li.closest("ul")).attr("task-board");
                itemId = $(li).attr("target-id");

                http("api/task/" + itemId, "DELETE", null, function (data) {
                    li.remove();
                });

            }
        })
        .on("click", ".task-item", function (e) {
            var items_id,
                parent_id,
                editVal,
                priority, start_date, end_date;
            items_id = $(e.target).closest("li").attr("target-id");
            parent_id = $(e.target).closest("ul").attr("task-board");

            $("#edit-task").attr("data-target", parent_id)
                .attr("data-task-id", items_id);

            editVal = window.task[items_id]
            priority = getPriority(editVal.priority);
            $("#edit-task [name='task_name']").val(editVal.task_name);
            $("#edit-task [name='description']").val(editVal.description);
            $("#edit-task [name='priority']").val(priority);
            var start_date = new Date(editVal.start_date)
            $("#edit-task [name='start_date']").val(start_date.getFullYear()+ "-" +start_date.getMonth() +"-"+ start_date.getDate() );
            var end_date = new Date(editVal.end_date)
            $("#edit-task [name='end_date']").val(end_date.getFullYear()+ "-" +end_date.getMonth() +"-"+ end_date.getDate());
            $("#edit-task").show();
        })

    $(".add-task").on("click", function (e) {
        $("#new-task").attr("data-target", $(e.target).attr("id"));
        $("#new-task").show();
    });


    $("#update-task").on("click", function (e) {
        var val, values,
                task_item, forms;
        task_item = $("#edit-task").attr("data-task-id")
        val = $("#editfrm-task").serializeArray();
        priority_id  = getPriorityID(val[2].value);
        forms = new FormData();;
        forms.append("task_name", val[0].value);
        forms.append("description", val[1].value);
        forms.append("priority", priority_id);
        forms.append("start_date", val[3].value);
        forms.append("end_date", val[4].value);
        forms.append("_method", "PUT");
        http("api/task/"+task_item, "POST", forms, function (data) {
            
            $("#task_name" + task_item).replaceWith(createTask(values, task_item));
            window.task[task_item] = values;
            },
            function (data) {
                alertMessage(data.responseJSON.message, null)
        })

        
        target = $("#edit-task").attr("data-target"); 
        

        $("#edit-task").hide();
    });


    $(".popup .close").on("click", function (e) {
        $(".popup").hide();
    })

    $(".add-task-board").on("click", function (e) {
        $("#new-task-board").show();

    });

    $("#new-task-board .primary").on("click", function (e) {
        var title, taskB_id;
        title = $("[name='task-board-title']").val();


        var formData = $("#add-task-board")[0]
        var forms = new FormData(formData);
        http("api/task-status", "POST", forms, function (data) {

            var board = createTaskboard(data.title, data.id)
            $(".btn-board").before(board);

        },
            function (data) {
                alertMessage(data.responseJSON.message, null)
            })



        $("[name='task-board-title']").val("");
        $("#new-task-board").hide();

    });



    $("#search-input").keyup(function (e) {
        var search;
        search = e.target.value
        serach(search);
    });

    $("#bt-task").on("click", function (e) {
        var val,
            item,
            target,
            values;

        target = $("#new-task").attr("data-target");
        $("#task_type").val(target);
        let formData = $("#add-task")[0]

        let forms = new FormData(formData);

        let success = function (data) {
            var item = createTask(data.data, data.data.task_type)
            $("[task-board='" + data.data.task_type + "']").prepend(item);
            $("#add-task").trigger("reset");
            $("#new-task").hide();
        };
        let error = function (data) {
            alertMessage(data.responseJSON.message, null)
        }
        http("api/task", "POST", forms, success, error)
    });
    $(".logout").on("click", function(e){
        e.preventDefault();
        let success = function (data) {
            console.log(data.staus);
            if(data.status){
                removeToken("token");
                window.location = "http://localhost:8000/login";
                

            }
        };
        http("api/auth/logout", "POST", null, success)


    })
   
})
