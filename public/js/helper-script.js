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
        contentType: false,
        cache: false,
        data: form,
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer "+getToken("token") 
        },
        success:success,
        error:error
    });
}
function alertMessage(message, type){
    $("#message").fadeIn(500);
    $("#message span").text(message);
    setTimeout(() => {
        $("#message").fadeOut(500);
    }, 5000);
}
