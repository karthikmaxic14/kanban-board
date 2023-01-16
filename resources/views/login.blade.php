<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login page</title>
    <link rel="stylesheet" href="{{  URL::asset('css/login.css')}}" type="text/css" />    
    <script src="{{  URL::asset('js/lib/jquery.js')}}" ></script> 
</head>
<body>
        <div class="panel panel-1 ">
            <form   id="form-data" method="POST" action="">
            <div>
                <h4> User Login</h4>
                <span class="error-message d-none"></span>
                <label for="">
                    User Name
                </label>
                <input type="text" name="name" autocomplete="off">
            </div>
            <div>

                <label for="">
                    Password 
                </label>
                <input type="password" name="password" autocomplete="off">
            </div>
            <div >
            
                <input type="submit" class="submit">
                <a href="#" class="create-user"> Create account</a>
            </div>
            </form>
        </div>
        <div class="panel panel-2 d-none">
            <form   id="form-register" method="POST" action="">
            <div>
                <h4> Register New user</h4>

                <label for="">
                    User Name 
                </label>
                <input type="text" name="name" autocomplete="off">
            </div>
            <div>
            <label for="">
                    Email Id 
                </label>
                <input type="text" name="email" autocomplete="off">

                <label for="">
                    Password 
                </label>
                <input type="password" name="password" autocomplete="off">
            </div>
            <div >
                
                <input type="submit" class="regiter-new-user">
                <a href="#" class="back-sing-in"> Back to Sing in</a>
            </div>
            </form>
        </div>
  
    <script src="{{  URL::asset('js/helper-script.js')}}" ></script> 
    <script>
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

    </script>
</body>
</html>