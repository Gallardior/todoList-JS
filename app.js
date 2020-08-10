class Task
{
  constructor(name, complete = false)
  {
    this.name = name
    this.id = 0
    this.complete = complete
  }
}

class UI
{
  resetForm(form)
  {
    form.reset()
  }

  addTask(task) 
  {
    // GUARDAR EN LOCALSTORAGE
    task.id = arrayTasks.length + 1
    arrayTasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(arrayTasks))

    // PINTAR EN PANTALLA
    const taskList = document.getElementById('task-list')
    const element = document.createElement('div')
    element.classList.add('o-0')
    if(task.complete === true)
    {
    element.innerHTML = `
    <div class="card-body row" id=${task.id}>
      <i class ="tarea col-md-6 mt-auto mb-auto complete">${task.name}</i>
      <a class ="text-center col btn mt-auto mb-auto fas fa-check" name="complete"></a> 
      <a class ="text-center col btn mt-auto mb-auto fas fa-pen" name="edit"></a> 
      <a class ="text-center col btn mt-auto mb-auto fas fa-trash-alt" name="delete"></a> 
    </div>
    `
    }else
    {
    element.innerHTML = `
    <div class="card-body row" id=${task.id}>
      <i class ="tarea col-md-6 mt-auto mb-auto">${task.name}</i>
      <a class ="text-center col btn mt-auto mb-auto fas fa-check" name="complete"></a> 
      <a class ="text-center col btn mt-auto mb-auto fas fa-pen" name="edit"></a> 
      <a class ="text-center col btn mt-auto mb-auto fas fa-trash-alt" name="delete"></a> 
    </div>
    `
    }
    taskList.appendChild(element)
    setTimeout(() => {
      element.classList.remove('o-0')
    }, 300);
  }

  deleteTask(task) 
  {
    // ELIMINA DEL DOM
    if ( task.target.name === "delete" || task.target.name === "edit" ) {
      let taskToRemove = task.target.parentElement.parentElement

      taskToRemove.classList.add('o-0')
      setTimeout(() => {
        taskToRemove.remove()
      }, 500);
    }
    // ELIMINA DEL LOCALSTORAGE

    arrayTasks = JSON.parse(localStorage.getItem('tasks'))
    for(let i = 0; i < arrayTasks.length; i++)
    {
      if(task.target.parentElement.id == arrayTasks[i].id)
      {
        arrayTasks.splice(i, 1)
        localStorage.clear()
        localStorage.setItem('tasks', JSON.stringify(arrayTasks))
      }
    }

  }

  editTask(task) 
  {
    let taskTarget = task.target.parentElement
    let nameOld = taskTarget.querySelectorAll(".mt-auto")[0].innerHTML

    document.getElementById('name').value = nameOld
  }

  completeTask(task)
  {
    // Pintar como completada
    let target = task.target.parentElement.firstElementChild
    target.classList.toggle('complete')

    // Guardar como completada
    let targetId = parseInt(task.target.parentElement.id)

    for(task of arrayTasks)
    {
      if(targetId === task.id)
      {
        if(task.complete === true)
        {
          task.complete = false
        }else
        {
          task.complete = true
        }

      }
    }
    localStorage.clear()
    localStorage.setItem('tasks', JSON.stringify(arrayTasks))
  }

  showMessage(message, classList) 
  {
    const div = document.createElement('div')
    div.className = `alert alert-${classList}`
    div.appendChild(document.createTextNode(message))
    
    //Motrarndo en pantalla

    const appContainer = document.querySelector('.appContainer')
    const app = document.querySelector('#App')
    div.classList.add('o-0')
    appContainer.insertBefore(div, app)
    // Animacion al mostrar mensaje
    setTimeout(() => {
      div.classList.remove('o-0')
    }, 10);
    // Animacion al eliminar mensaje
    setTimeout(() => {
      div.classList.add('o-0')
    }, 2300);
    // Eliminar del DOM
    setTimeout(() => {
      div.remove()
    }, 2500);
  }
}

// DOOM EVENTS

let form = document.getElementById('tasks-form')
let taskList = document.getElementById('task-list')
  
  // AGREGAR TAREA
form.addEventListener("submit", e => {
  e.preventDefault()
  
  let name = document.getElementById('name').value
  let task = new Task(name)
  const ui = new UI

  if( name.trim() === '')
  {
    ui.showMessage('Por favor, escribe una tarea', 'info')
  }else
  {
    ui.addTask(task)
    ui.resetForm(form)
  }

})
  //ELIMINAR TAREA
taskList.addEventListener("click", e => {
  if(e.target.name === 'delete')
  {
    const ui = new UI
    ui.deleteTask(e)
  }
})

  // EDITAR TAREA
taskList.addEventListener("click", e => {
  if(e.target.name === "edit")
  {
    const ui = new UI
    ui.editTask(e)
    ui.deleteTask(e)
  }
})

  // COMPELTAR TAREA
taskList.addEventListener("click", e => {
  if(e.target.name === 'complete')
  {
    const ui = new UI
    ui.completeTask(e)
  }
}) 
 
let arrayTasks = [];
  
// LEER LOCALSTORAGE
document.addEventListener('DOMContentLoaded', () => {

  let arrayTemp = JSON.parse(localStorage.getItem('tasks'))

  for(let i = 0; i< arrayTemp.length; i++)
  {
    let name = arrayTemp[i].name
    let complete = arrayTemp[i].complete
    let task = new Task(name, complete)
    const ui = new UI
    ui.addTask(task)
  }

})
      



