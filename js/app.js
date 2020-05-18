const getID = document.getElementById.bind(document);

class productClass {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UIClass {
  addProduc(product) {
    const productList = getID("product-list");
    const element = document.createElement("div");
    element.className =
      "card mb-4 d-flex align-items-center justify-content-center";
    element.innerHTML = `
      <div class="card-body">
         <strong>Product</strong>: ${product.name}
         <strong>Price</strong>: $ ${product.price}
         <strong>Year</strong>: ${product.year}
         <a href="#" class="ml-2 btn btn-danger" name="delete">Delete</a>
      </div>
     `;
    productList.appendChild(element);
    this.resetForm();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.remove();
      this.showMessage("Producto borrado", "info");
    }
  }

  showMessage(sms, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-4 mb-0`;
    div.appendChild(document.createTextNode(sms));
    //Mostrando en el DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");
    container.insertBefore(div, app);
    setTimeout(() => {
      div.remove();
    }, 1000);
  }

  resetForm() {
    getID("product-form").reset();
  }
}

//Eventos del DOM
//Agregar producto
getID("product-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = getID("name").value,
    price = getID("price").value,
    year = getID("year").value;

  const product = new productClass(name, price, year);
  const ui = new UIClass();
  if (name === "" || price === "" || year === "") {
    return ui.showMessage("Complete los campos", "danger");
  }
  ui.addProduc(product);
  ui.showMessage("Correcto", "success");
});

//Eliminar producto
getID("product-list").addEventListener("click", e => {
  const ui = new UIClass();
  ui.deleteProduct(e.target);
});