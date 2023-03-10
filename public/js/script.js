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
        new_id,
        temp,
        forms;
    data = ev.dataTransfer.getData("text");
    prev_id = ev.dataTransfer.getData("parent_id");

    if ($(ev.target).closest("li").length > 0) {
        $(ev.target).closest("li").before(document.getElementById(data));

    } else {
        $(ev.target).closest("ul").append(document.getElementById(data));
    }
    new_id = $(ev.target).closest("ul").attr('task-board');
    temp = data.replace("task_name", "");
    forms = {
        "task_type": new_id,
        "_method": "PUT"
    }; 
    http("api/task/" + temp+"/status", "post", JSON.stringify(forms), function (data) {
         alertMessage(data.message, "success")   
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
    $(taskBoard).html(taskList_content).addClass("task-list").attr("task-board-id", id );

    return taskBoard;
}
function createTask({ task_name, priority, description, end_date }, id) {
    var li, s;

    priority = getPriority(priority);
    s = new Date(end_date)

    li = '<li id="task_name' + id + '" target-id="' + id + '" draggable="true" ondragstart="drag(event)" class="task-item">' +
        '<h4>' + task_name + '</h4>' +
        '<p>' + description + '</p><span class="task-item-close">' +
        '<svg height="10px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="10px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"></path><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"></path></svg></span>' +
        '<div class="d-flex f-sm"><div class="w-50"><span class=" "> <b>Due date: </b>' + s.getDate() + "-" + ('0' + (s.getMonth() + 1)).slice(-2) + "-" + s.getFullYear() + '</span> </div><div  class="w-50 text-right "><b> Status: </b> <span class="status ' + priority + '">' + priority + '</span></div> </div></li>';
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
function renderTaskStatus (data){
    var content =""; 
    for (var list in data){
         content = content+ "<li draggable='true' id='"+data[list].id+"' order='"+data[list].order+"'  >" + data[list].name + "</li>";
    } 
    $("#sortlist").html(content);
}

$(document).ready(function () {
    window.task = [];
    var success,
        error;
    success = function (data) {
                Init(data);
                getTaskData()
            };
    error = function (data) {
            if (data.responseJSON.error == "Unauthenticated.") {
                removeToken("token");
                window.location = base_url + "login"
            }

        };
    http("api/task-status", "GET", null,
        success,
        error
    )
    $("[name='start_date']").datepicker({
        dateFormat: "yy-mm-dd"
    });

    $("[name='end_date']").datepicker({
        dateFormat: "yy-mm-dd"
    });

    $(".board")
    
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
            e.stopPropagation();
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
            start_date = new Date(editVal.start_date)
            $("#edit-task [name='start_date']").val(start_date.getFullYear() + "-" + ('0' + (start_date.getMonth() + 1)).slice(-2) + "-" + ('0'+ start_date.getDate()).slice(-2));
            end_date = new Date(editVal.end_date)
            $("#edit-task [name='end_date']").val(end_date.getFullYear() + "-" + ('0' + (end_date.getMonth() + 1)).slice(-2) + "-" + ("0"+end_date.getDate()).slice(-2));
            $("#edit-task").show();
        })
        .on("click", ".task-close", function (e) { 
            e.preventDefault();
            if (confirm(" Are you sure want to delete Task board")) {
                var temp, ids;
                temp = $(e.target).closest(".task-list");
                ids = $(temp).find("[task-board]").attr("task-board");
                http("api/task-status/" + ids, "DELETE", null, function (data) {
                })
                temp.remove();
                
            }
        })

    /**
     * Add task
     */
    $(".add-task").on("click", function (e) {
        $("#new-task").attr("data-target", $(e.target).attr("id"));
        $("#new-task").show();
    });

    /**
     * Add task list
     */
    $("#new-task-board .primary").on("click", function (e) {
        var title,
            formData,
            forms,
            board;

        title = $("[name='task-board-title']").val();
        formData = $("#add-task-board").serializeArray()
        
        forms = seralizeToJson( formData);
        http("api/task-status", "POST", forms, function (result) {
            board = createTaskboard(result.data.name, result.data.id)
            $(".btn-board").before(board);
            alertMessage(result.message, "success");
            },
            function (result) {
                alertMessage(result.message, null)
            })
        $("[name='task-board-title']").val("");
        $("#new-task-board").hide();

    });
    
    /**
     * Adding New task
     */

    $("#bt-task").on("click", function (e) {
        var val,
            item,
            target,
            values;

        target = $("#new-task").attr("data-target");
        $("#task_type").val(target);
        let formData = $("#add-task").serializeArray();
        let forms =  seralizeToJson(formData);  
        let success = function (data) {
            var item = createTask(data.data, data.data.id)
            $("[task-board='" + data.data.task_type + "']").prepend(item);
            $("#add-task").trigger("reset");
            $("#new-task").hide();
            window.task[data.data.id] = data.data
        };
        let error = function (data) {
            alertMessage(data.responseJSON.message, null)
        }
        http("api/task", "POST", forms, success, error)
    });

    
    /** 
     * Update Task 
     */
    $("#update-task").on("click", function (e) {
        var val,
            task_item, forms, success, error;

        task_item = $("#edit-task").attr("data-task-id")
        val = $("#editfrm-task").serializeArray();
        val[2].value = getPriorityID(val[2].value);
        forms = seralizeToJson(val);

        success = function (data) {
            $("#task_name" + task_item).replaceWith(createTask(data.data, data.data.id));
            window.task[task_item] = data.data;
        };
        error = function (data) {
            alertMessage(data.responseJSON.message, null)
        };

        http("api/task/" + task_item, "POST", forms, success, error);
        target = $("#edit-task").attr("data-target");
        $("#edit-task").hide();
    });


    /**
     * Logout Action button
     */
    $(".logout").on("click", function (e) {
        e.preventDefault();
        let success = function (data) {
            
            if (data.status) {
                removeToken("token");
                window.location = "http://localhost:8000/login";


            }
        };
        http("api/auth/logout", "POST", null, success)
    })

    /**
     * Search Task
    */
    $("#search-input").keyup(function (e) {
        var search;
        search = e.target.value
        serach(search);
    });

    /**
     * Close Popup
     */    

    $(".popup .close").on("click", function (e) {
        $(".popup").hide();
    })
    /**
     * open task list Popup
     */    

    $(".add-task-board").on("click", function (e) {
        $("#new-task-board").show();

    });
    $(".task-status-setting").on("click", function (e) {
        let success =  function(result){
            renderTaskStatus(result.data);
            slist(document.getElementById("sortlist"));
        }
        http("api/task-status", "GET", null,success );
        $("#task-status-order").show();
    });

    $("#update-order").on("click", function(e){
        e.preventDefault();
        var formData = [];
        $("#sortlist li").each(function(i, e){
            formData.push({"id":$(e).attr("id"), "order": i+1})
        }) 
        http("api/task-status/update-order", "POST", JSON.stringify(formData), function(data){
            changeOrder(formData);
            $("#task-status-order").hide();
            alertMessage(data.message, "success")
        }, function (data){
            console.log(data);
        })
    })


    slist(document.getElementById("sortlist"));
})
