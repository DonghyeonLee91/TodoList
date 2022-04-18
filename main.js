//유저가 값을 입력한다
//+버틀을 클릭하면, 할일이 추가된다.
//Delete 버튼을 누루면 할일이 삭제된다.
//Check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 나오게 된다.
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tab-item")
let taskList = [];
addButton.addEventListener("click",addTask)
console.log(tabs)
function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    render();
}

function render(){
    let resultHtml = "";
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHtml+= `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="togglecomplete('${taskList[i].id}')" class="re-button")></button>
                <button onclick="deleteTas('${taskList[i].id}')" class="delete-button" ></button>
            </div>
        </div>`;
        }else {resultHtml +=  `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button onclick="togglecomplete('${taskList[i].id}')" class="check-button" ></button>
            <button onclick="deleteTask('${taskList[i].id}')" class="delete-button"> </button>
        </div>
    </div>`;}
        
        
    }

    document.getElementById("task-board").innerHTML = resultHtml;
}

function togglecomplete(id){
   for(let i=0;i<taskList.length;i++){
       if(taskList[i].id == id){
           taskList[i].isComplete = !taskList[i].isComplete;
           break;
       }
   }
   render();
}
function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}




//무작위 ID 생성
function randomIDGenerate(){
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}