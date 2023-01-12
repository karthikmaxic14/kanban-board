<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login page</title>
    
    <script src="{{  URL::asset('js/lib/jquery.js')}}" ></script> 
    <style>
        body{
            background: #E5E5E5;
            font-family: sans-serif;
        }
        label{
            font-size: 13px;
            display: block;
            margin-bottom: 6px;
        }
        .panel{ 
            width: 350px;
            padding: 29px;
            margin: 4em auto;
            background: #fff;
            border-radius: 8px;
        }
        input {
        width: 100%;
        display: block;
        box-sizing: border-box;
        padding: 9px;
        margin-bottom: 21px;
        border: 1px solid #c7c7c7;
        }
        .submit{
            background: #14213D;
            color:#fff
        }
        h4{
            margin: 5px 4px 26px 0px;
            text-align: center;
            font-size: 25px;

        }
    </style>

</head>
<body>
        <div class="panel">
            <form   id="form-data" method="POST" action="">
            <div>
                <h4> User Login</h4>

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
            </div>
        </div>
    <script src="{{  URL::asset('js/helper-script.js')}}" ></script> 
    <script>
    $(document).ready(function(){
        if(getToken("token")!=undefined){
            window.location =base_url
        }

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
            
            error = function (Data) {

            } 
            
            http(  "api/auth/login",
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