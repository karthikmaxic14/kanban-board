let base_url = "http://localhost:8000/"
function setToken(value) {
    localStorage.setItem("token", (value));
}
function getToken(value) {
    return localStorage.getItem(value);
}
function removeToken (value){
    localStorage.removeItem(value);
}
function getPriority(index){
    let data = ["low", "medium","high"];
    return data[index-1];
} 

function getPriorityID(index){ 
    
    let data = ["low", "medium","high"];
    let id = data.indexOf(index);
    return id+1;
} 
function http(path, method, form, success, error = null){
    
    $.ajax({
        url: base_url+path,
        method: method,
        contentType: 'application/json',
        processData: false,
        // contentType: false,
        // cache: false,
        dataType: 'json',
        data: form,
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer "+getToken("token") 
        },
        success:success,
        error:error
    });
}
function alertMessage(message, type=null){
    $("#message").fadeIn(500);
    $("#message span").text(message); 
    if (type){
        $("#message").addClass(type) 
    } else {
        $("#message").removeClass(type) 
    }

    setTimeout(() => {
        $("#message").fadeOut(500);
    }, 5000);
}

function slist (target) {
    target.classList.add("slist");
    let items = target.getElementsByTagName("li"), current = null;
    for (let i of items) {
       i.draggable = true;
  
       i.ondragstart = e => {
        current = i;
        for (let it of items) {
          if (it != current) { it.classList.add("hint"); }
        }
      };
  
       i.ondragenter = e => {
        if (i != current) { i.classList.add("active"); }
      };
  
       i.ondragleave = () => i.classList.remove("active");
  
       i.ondragend = () => { for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }};
  
        i.ondragover = e => e.preventDefault();
  
       i.ondrop = e => {
        e.preventDefault();
        if (i != current) {
          let currentpos = 0, droppedpos = 0;
          for (let it=0; it<items.length; it++) {
            if (current == items[it]) { currentpos = it; }
            if (i == items[it]) { droppedpos = it; }
          }
          if (currentpos < droppedpos) {
            i.parentNode.insertBefore(current, i.nextSibling);
          } else {
            i.parentNode.insertBefore(current, i);
        }
        }
      };
    }
  }
   
function seralizeToJson( value){
    let data = {};
    for(i in value){ 
        data [value[i]['name']] =    value[i]['value'];
    }
    return JSON.stringify(data);
}
function changeOrder(data){
  for(var i in data) {
    var temp =$("[task-board-id="+data[i].id+"]").clone();
    $("[task-board-id="+data[i].id+"]").addClass("remove");
    $(".board .btn-board").before( temp);
    $("[task-board-id="+data[i].id+"].remove").remove();
    // $(temp).remove();
  }
}