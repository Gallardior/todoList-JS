class Product
{
  constructor(name,price,year)
  {
    this.name = name,
    this.price = price,
    this.year = year
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
    const productList = document.getElementById('product-list')
    const element = document.createElement('div')
    element.innerHTML = `
    <div class="card text-left mb-4">
      <div class="card-body row">
        <i class ="col mt-auto mb-auto">${product.name}</i> 
        <i class ="col mt-auto mb-auto">${product.price}</i>
        <i class ="col mt-auto mb-auto">${product.year}</i> 
        <a class ="col btn mt-auto mb-auto far fa-trash-alt"></a> 
      </div>
    </div>
    `

    productList.appendChild(element)
  }

  deleteProduct() 
  {

  }

  editProduct() 
  {

  }
  
  ShowMessage() 
  {

  }
}

// DOOM EVENTS

let form = document.getElementById('products-form')

form.addEventListener("submit", e => {
  e.preventDefault()
  
  let name = document.getElementById('name').value
  let price = document.getElementById('price').value
  let year = document.getElementById('year').value

  let product = new Product(name,price,year)
  const ui = new UI

  ui.addProduct(product)
  ui.resetForm(form)
})