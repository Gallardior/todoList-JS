class Product
{
  constructor(name,price,year)
  {
    this.name = name,
    this.price = price,
    this.year = year
    this.id = 0
  }
}

class UI
{
  resetForm(form)
  {
    form.reset()
  }

  addProduct(product) 
  {
    // GUARDAR EN LOCALSTORAGE
    product.id = arrayProducts.length + 1
    arrayProducts.push(product)
    localStorage.setItem('products', JSON.stringify(arrayProducts))

    // PINTAR EN PANTALLA
    const productList = document.getElementById('product-list')
    const element = document.createElement('div')
    element.classList.add('.card')
    element.classList.add('.mb-4')
    element.innerHTML = `
    <div class="card-body row" id=${product.id}>
      <i class ="col mt-auto mb-auto">${product.name}</i> 
      <i class ="col mt-auto mb-auto">${product.price} $</i>
      <i class ="col mt-auto mb-auto">${product.year}</i> 
      <a class ="col btn mt-auto mb-auto fas fa-pen" name="edit"></a> 
      <a class ="col btn mt-auto mb-auto fas fa-trash-alt" name="delete"></a> 
    </div>
    `
    productList.appendChild(element)
  }

  deleteProduct(product) 
  {
    // ELIMINA DEL DOM
    if (product.target.name === "delete" || product.target.name === "edit") {
      let productToRemove = product.target.parentElement.parentElement

      productToRemove.remove()
    }
    // ELIMINA DEL LOCALSTORAGE
    let temp = JSON.parse(localStorage.getItem('products'))
    for(let i = 0; i < temp.length; i++)
    {
      if(product.target.parentElement.id == temp[i].id)
      {
        temp.splice(i, 1)
        localStorage.clear()
        localStorage.setItem('products', JSON.stringify(temp))
      }
    }

  }

  editProduct(product) 
  {
    let productTarget = product.target.parentElement
    let nameOld = productTarget.querySelectorAll(".mt-auto")[0].innerHTML
    let priceOld = productTarget.querySelectorAll(".mt-auto")[1].innerHTML  
    let yearOld = productTarget.querySelectorAll(".mt-auto")[2].innerHTML
    
    priceOld = parseFloat(priceOld.slice(0, -1))

    document.getElementById('name').value = nameOld
    document.getElementById('price').value = priceOld
    document.getElementById('year').value = yearOld
  }
  
  showMessage(message, classList) 
  {
    const div = document.createElement('div')
    div.className = `alert alert-${classList}`
    div.appendChild(document.createTextNode(message))
    
    //Motrarndo en pantalla

    const appContainer = document.querySelector('.appContainer')
    const app = document.querySelector('#App')
    appContainer.insertBefore(div, app)

    setTimeout(() => {
      div.remove()
    }, 2500);
  }
}

// DOOM EVENTS

let form = document.getElementById('products-form')
let productList = document.getElementById('product-list')
  
  // AGREGAR PRODUCTO
form.addEventListener("submit", e => {
  e.preventDefault()
  
  let name = document.getElementById('name').value
  let price = document.getElementById('price').value
  let year = document.getElementById('year').value

  let product = new Product(name,price,year)
  const ui = new UI

  if( name === '' || price === '' || year === '')
  {
    ui.showMessage('Completa el formulario', 'info')
  }else
  {
    ui.addProduct(product)
    ui.resetForm(form)
    ui.showMessage('Producto agregado', 'success')
  }

})
  //ELIMINAR PRODUCTO
productList.addEventListener("click", e => {
  const ui = new UI
  ui.deleteProduct(e)

  if(e.target.name === 'delete') ui.showMessage('Producto eliminado', 'danger')
})

  //EDITAR PRODUCTO
productList.addEventListener("click", e => {

  const ui = new UI

  if(e.target.name === "edit")
  {
    ui.editProduct(e)
    ui.deleteProduct(e)
    ui.showMessage('Edita a tu gusto en el formulario y vuelve a guardar', 'info')
  }
      
})

let arrayProducts = [];

// LEER LOCALSTORAGE
document.addEventListener('DOMContentLoaded', () => {
  let arrayTemp = JSON.parse(localStorage.getItem('products'))

  for(let i = 0; i< arrayTemp.length; i++)
  {
    let name = arrayTemp[i].name
    let price = arrayTemp[i].price
    let year = arrayTemp[i].year

    let product = new Product(name,price,year)
    const ui = new UI
    ui.addProduct(product)
  }

})