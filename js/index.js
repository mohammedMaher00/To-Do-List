//  ! Html varibles

const newTask=document.getElementById('newTask')
const modal=document.getElementById('modal')
const addBtn= document.getElementById('addBtn')
const statusInput= document.getElementById('status')
const categoryInput= document.getElementById('category')
const titleInput= document.getElementById('title')
const descriptionInput= document.getElementById('description')
const updateBtn=document.getElementById('updateBtn')
const modeIcon=document.querySelector('#mode')
const root=document.querySelector(':root')
const sections=document.querySelectorAll('section')
const gridBtn=document.getElementById('gridBtn')
const barsBtn=document.getElementById('barsBtn')
const taskContainers=document.querySelectorAll('.tasks')

let temp
let containers={
    nextUp:document.querySelector('.nextUP'),
    inProgress:document.querySelector('.in-progress'),
    done:document.querySelector('.done')
}
// regex
const titleRegex=/^[a-z]{3,}$/
const descriotionRegex=/^[a-z]{5,100}$/




// * App variables

let tasksArry=JSON.parse(localStorage.getItem('tasks'))||[]
for(let i=0;i<tasksArry.length;i++){
    displayTask(i)
}

// ! functions
function showModule(){
    modal.classList.replace('d-none','d-flex')
    document.body.style.overflow='hidden'
    scroll(0,0)

}
function hideModule(){
    modal.classList.replace('d-flex','d-none')
    clearInput()
    addBtn.classList.remove('d-none')
   updateBtn.classList.replace('d-block','d-none')
   document.body.style.overflow='visible'

}

function addTask(){
    if(validate(titleRegex,titleInput)&&validate(descriotionRegex,descriptionInput)){
        const task={
            status:statusInput.value,
            category:categoryInput.value,
            title:titleInput.value,
            description:descriptionInput.value
        }
    
        tasksArry.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasksArry))
       
        displayTask(tasksArry.length-1)
        clearInput()
        hideModule()
        playCounter()
        
    }
   
}

function displayTask(index){

    let taskHtml=`
    <div class="task">
    <h3 class="text-capitalize">${tasksArry[index].title}</h3>
    <p class="description text-capitalize">${tasksArry[index].description}</p>
    <h4 class="category ${tasksArry[index].category} text-capitalize">${tasksArry[index].category}</h4>
    <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
      <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
      <li><i class="bi bi-trash-fill" onclick="deletTask(${index})"></i></li>
      <li><i class="bi bi-palette-fill" onclick=" changeColor(event)"></i></li>
    </ul>
</div>

    `
   
    let section= containers[`${tasksArry[index].status}`]

    section.querySelector('.tasks').innerHTML+=taskHtml
   

}
function deletTask(index){
    emptyContainer()
    tasksArry.splice(index,1)
    localStorage.setItem('tasks', JSON.stringify(tasksArry))
    for(let i=0;i<tasksArry.length;i++){
        displayTask(i)
    }


}
function emptyContainer(){
    for ( item in containers){
        containers[item].querySelector('.tasks').innerHTML='';

    }
}

function getTaskInfo(index){
    showModule()
   statusInput.value=tasksArry[index].status
   categoryInput.value=tasksArry[index].category
   titleInput.value=tasksArry[index].title
   descriptionInput.value=tasksArry[index].description
 temp=index
   addBtn.classList.add('d-none')
   updateBtn.classList.replace('d-none','d-block')

}
function updateTask(){
    tasksArry[temp].status=statusInput.value
    tasksArry[temp].category= categoryInput.value
    tasksArry[temp].title=titleInput.value
    tasksArry[temp].description=descriptionInput.value
    localStorage.setItem('tasks', JSON.stringify(tasksArry))
    emptyContainer()
    for(let i=0;i<tasksArry.length;i++){
        displayTask(i)
    }

    hideModule()
    clearInput()
    addBtn.classList.remove('d-none')
   updateBtn.classList.replace('d-block','d-none')
}


function clearInput(){
    statusInput.value='nextUp'
        categoryInput.value='education'
    titleInput.value=''
        descriptionInput.value=''
}


function generateRandomColor(){
    let colorChar=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
let color = '#';
    for(let i=1; i<=6;i++){
        let random= Math.trunc(Math.random()*colorChar.length)
        color+=colorChar[random]
       
    }
   return color+22
}

function changeColor(event){
    event.target.closest('.task').style.backgroundColor=generateRandomColor()
    
   

}

function changeMode(){
    if(modeIcon.classList.contains('bi-brightness-high-fill')){
        root.style.setProperty('--main-black','#ffffff')
    root.style.setProperty('--sec-black','#eee')
    modeIcon.classList.replace('bi-brightness-high-fill','bi-moon-stars-fill')
    }else{
        root.style.setProperty('--main-black','#0d1117')
    root.style.setProperty('--sec-black','#161b22')
    modeIcon.classList.replace('bi-moon-stars-fill','bi-brightness-high-fill')
    }
}


function validate(regex ,element){
    if(regex.test(element.value)){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.parentElement.nextElementSibling.classList.replace('d-block','d-none')
        return true
    }else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.parentElement.nextElementSibling.classList.replace('d-none','d-block')
        return false
    }

}



function changeTobars(){
    gridBtn.classList.remove('active')
    barsBtn.classList.add('active')
    for(let i=0 ;i<sections.length;i++){
        sections[i].classList.remove('col-md-6','col-lg-4')
    }
    for(let y=0 ;y<taskContainers.length;y++){
        taskContainers[y].setAttribute('data-view','bars')
    }

    

}

function changeToGrid(){
    gridBtn.classList.add('active')
    barsBtn.classList.remove('active')
    for(let i=0 ;i<sections.length;i++){
        sections[i].classList.add('col-md-6','col-lg-4')
    }
    for(let y=0 ;y<taskContainers.length;y++){
        taskContainers[y].removeAttribute('data-view','bars')
    }
}

function playCounter(){
    for(let i=0 ;i<sections.length;i++){
       let counter=sections[i].firstElementChild.children[1].children.length
        
        sections[i].firstElementChild.children[0].children[1].innerHTML=counter
    }
}
playCounter()



// ! Events
newTask.addEventListener('click',showModule)


//  ^ hide module


addBtn.addEventListener('click',addTask)

document.addEventListener('keydown',function(e){
   if(e.key==='Escape'){
    hideModule()
   }
})

modal.addEventListener('click', function(e){
// console.log(e.target.id);
if(e.target.id==='modal'){
    hideModule()
}
})
addBtn.addEventListener('click',addTask)

updateBtn.addEventListener('click',updateTask)
modeIcon.addEventListener('click',changeMode)
titleInput.addEventListener('input',function(){
    validate(titleRegex,titleInput)
})
descriptionInput.addEventListener('input',function(){
    validate(descriotionRegex,descriptionInput)
})
barsBtn.addEventListener('click',changeTobars)
gridBtn.addEventListener('click',changeToGrid)