$(document).ready(function(){
    if(getToken("token")!=undefined){
        window.location =base_url
    }
    $(".create-user").on("click", function(e){
        e.preventDefault();
         $(".panel-1").fadeOut(100);
        $(".panel-2").fadeIn(600); 
    })
    $(".back-sing-in").on("click", function(e){
        e.preventDefault();
        $(".panel-2").fadeOut(500);
        $(".panel-1").fadeIn(600); 
    })
    $(".submit").on("click", function(e){
        e.preventDefault(); 
        let forms,
            formData,
            error,
            success;
        forms = $("#form-data")[0]      
        formData = new FormData(forms); 
        
        success = function(Data){ 
            if (Data.status == true){
                setToken(Data.token)
                window.location = base_url
            }
        };
        
        error = function (Data, error) {
            console.log(Data.responseJSON.message, error);
            $(".error-message").addClass("show"); 
            $(".error-message").text(Data.responseJSON.message)
        } 
        
        http(  "api/auth/login",
                "POST",
                formData,
                success,
                error
        );
    });
    $(".regiter-new-user").on("click", function(e){
        e.preventDefault(); 
        let forms,
            formData,
            error,
            success;
        forms = $("#form-register")[0]      
        formData = new FormData(forms); 
        
        success = function(Data){ 
            if (Data.status == true){ 

                setToken(Data.token)
                window.location = base_url
            }
        };
        error = function (data) {
            
        } 
        
        http(  "api/auth/register",
                "POST",
                formData,
                success,
                error
        );
    });
})
