//유저가 값을 입력한다
//+버틀을 클릭하면, 할일이 추가된다.
//Delete 버튼을 누루면 할일이 삭제된다.
//Check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 나오게 된다.
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tab-item");
let taskList = [];
let mode ="all";
let filterList=[];
addButton.addEventListener("click",addTask);


for(let i=0; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}

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
        let list = [];
        if (mode == "all"){
            list = taskList;
        }else if(mode == "ongoing" || mode =="done"){
            list = filterList;
        }
    let resultHtml = "";
    for(let i=0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHtml+= `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
            <button onclick="togglecomplete('${list[i].id}')" class="check-button" ></button>
            <button onclick="deleteTask('${list[i].id}')" class="delete-button"> </button>
            </div>
        </div>`;
        }else {resultHtml +=  `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="togglecomplete('${list[i].id}')" class="check-button" ></button>
            <button onclick="deleteTask('${list[i].id}')" class="delete-button"> </button>
        </div>
    </div>`;}
        
        
console.log(list)
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
   filter();
}
function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList.splice(i,1)
        } 
    }
    filter();
}

function filter(e){
   if(e){
       mode =e.target.id;
   }
    filterList = [];
     if (mode == "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
                }
        }  
       
    } else if(mode == "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
    }   render();
}
//엔터키
let input = document.getElementById("task-input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("add-button").click();
  }
});






//무작위 ID 생성
function randomIDGenerate(){
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}