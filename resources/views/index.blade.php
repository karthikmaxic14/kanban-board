<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>kanbanboard</title>
    <link rel="stylesheet" href="{{  URL::asset('css/style.css')}}" type="text/css" />
    <script src="{{  URL::asset('js/lib/jquery.js')}}" ></script> 
    
</head>
<body>
<nav>
        <h2>Kanban Board</h2>
        <div class="d-flex">
        <div class="search">
            <input type="text" id="search-input">
            <button id="search-btn">
                search
            </button>

        </div>
        
         <button id="14" class="logout">Logout</button>

        </div>
    </nav>
    <div class="add-button">
 
        <button class="add-task-board">Add New Task List</button>
        <button id="14" class="add-task">Add Task </button>
    </div>
    
    <div class="container">
        <div class="board">
            <div class="btn-board">
                
            </div>

        </div>

    </div>
    <div class="popup" id="new-task">
        <div class="popup-content">
            <div class="d-flex heading">
                <h4>
                    New Tasks
                </h4>
                <span class="close">
                    <svg height="14px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="14px"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0" />
                        <path
                            d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0" />
                    </svg>
                </span>
            </div>
            <form action="" id="add-task">
                <label for="">Title</label>
                <input type="text" name="task_name" autocomplete="off">
                <label for="">Description</label>
                <textarea name="description" id="" cols="30" rows="10"></textarea>
                <input type="hidden"  name="task_type" id="task_type" />
                <label for="">Priority</label>
                <select name="priority" id="">
                    <option value="1">
                        Low
                    </option>
                    <option value="2">
                        Medium
                    </option>
                    <option value="3">
                        High
                    </option>
                </select>
                <label for="">Start Date</label>
                <input type="date" name="startdate" autocomplete="off">
                
                <label for="">End  Date</label>
                <input type="date" name="enddate" autocomplete="off">
            </form>
            <div class="footer">
                <button class="primary" id="bt-task">
                    Add
                </button>
                <button class="close">
                    Cancel
                </button>
            </div>
        </div>
    </div>
    <div class="popup" id="edit-task">
        <div class="popup-content">
            <div class="d-flex heading">
                <h4>
                    Edit Tasks
                </h4>
                <span class="close">
                    <svg height="14px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="14px"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0" />
                        <path
                            d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0" />
                    </svg>
                </span>
            </div>
            <form action="post" id="editfrm-task">
                <label for="">Title</label>
                <input type="text" name="task_name" autocomplete="off">
                <label for="">Description</label>
                <textarea name="description" id="" cols="30" rows="10"></textarea>

                <label for="">Priority</label>
                <select name="priority" id="">
                    <option value="low">
                        Low
                    </option>
                    <option value="medium">
                        Medium
                    </option>
                    <option value="high">
                        High
                    </option>
                </select>
            </form>
            <div class="footer">
                <button class="primary" id="update-task">
                   Update
                </button>
                <button class="close">
                    Cancel
                </button>
            </div>
        </div>
    </div>


    <div class="popup" id="new-task-board">
        <div class="popup-content">
            <div class="d-flex heading">
                <h4>
                    New Tasks board
                </h4>
                <span class="close">
                    <svg height="14px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="14px"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0" />
                        <path
                            d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0" />
                    </svg>
                </span>
            </div>
            <form action="" id="add-task-board">
                <label for="">Title</label>
                <input type="text" name="task-board-title" autocomplete="off">
                <label for="">Set Default </label>
                <select name="default_status">
                    <option value="true">
                    true
                    </option>
                    <option value="false" selected>
                    false
                    </option>
                </select>
                
            </form>
            <div class="footer">
                <button class="primary" id="bt-task-board">
                    Add
                </button>
                <button  class="close">
                    Cancel
                </button>
            </div>
        </div>
    </div>
    <div id="message" class="alert" >
        <span> content </span>
    </div>
   
    <script src="{{  URL::asset('js/helper-script.js')}}" ></script>
    <script src="{{  URL::asset('js/script.js')}}" ></script>
</body>
</html>