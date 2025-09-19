const products = [
  { id: 1, name: "Smartphone", category: "Electronics", price: 120, image: "images/smartphone.webp" },
  { id: 2, name: "Laptop", category: "Electronics", price: 200, image: "images/laptop.jpg" },
  { id: 3, name: "T-shirt", category: "Clothing", price: 25, image: "images/tshirt.webp" },
  { id: 4, name: "Novel", category: "Books", price: 15, image: "images/novel.avif" }
];

const productGrid = document.getElementById("productGrid");
const search = document.getElementById("search");
const category = document.getElementById("category");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const sort = document.getElementById("sort");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalAddToCart = document.getElementById("modalAddToCart");
const closeModal = document.getElementById("closeModal");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let filteredProducts = products;


function renderProducts() {
  productGrid.innerHTML = "";
  filteredProducts.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="openModal(${p.id})">View</button>
    `;
    productGrid.appendChild(div);
  });
}


function openModal(id) {
  const p = products.find(item => item.id === id);
  modalImage.src = p.image;
  modalTitle.textContent = p.name;
  modalPrice.textContent = `$${p.price}`;
  modalAddToCart.onclick = () => addToCart(p);
  modal.classList.remove("hidden");
}


closeModal.onclick = () => modal.classList.add("hidden");
window.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.classList.add("hidden");
});

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  modal.classList.add("hidden");
}


function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = `Total: $${total}`;
}


function applyFilters() {
  const searchText = search.value.toLowerCase();
  const cat = category.value;
  const maxPrice = +priceRange.value;

  filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchText) &&
    (!cat || p.category === cat) &&
    p.price <= maxPrice
  );

  if (sort.value === "low-high") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort.value === "high-low") filteredProducts.sort((a, b) => b.price - a.price);

  renderProducts();
}


search.addEventListener("input", applyFilters);
category.addEventListener("change", applyFilters);
priceRange.addEventListener("input", () => {
  priceValue.textContent = `Up to $${priceRange.value}`;
  applyFilters();
});
sort.addEventListener("change", applyFilters);


renderProducts();
renderCart();
