const menuToggle = document.getElementById("menuToggle");
const panelOps = document.getElementById("panelOps");

if (menuToggle && panelOps) {
  menuToggle.addEventListener("click", () => {
    const isOpen = panelOps.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  panelOps.querySelectorAll("p").forEach(item => {
    item.addEventListener("click", () => {
      panelOps.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

const slides = document.querySelectorAll(".offer-slide");
const dots = document.querySelectorAll(".dot");
let slideIndex = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

setInterval(nextSlide, 4000);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    slideIndex = index;
    showSlide(slideIndex);
  });
});

const track = document.getElementById("picksTrack");
const cards = document.querySelectorAll(".pick-card");
const next = document.getElementById("picksNext");
const prev = document.getElementById("picksPrev");
const dotsContainer = document.getElementById("picksDots");
let pickPosition = 0;

cards.forEach((card, index) => {
  let dot = document.createElement("span");
  dot.classList.add("pick-dot");

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.onclick = function () {
    pickPosition = index;
    scrollPicks();
  };

  dotsContainer.appendChild(dot);
});

const pickDots = document.querySelectorAll(".pick-dot");

function scrollPicks() {
  const width = cards[0].offsetWidth + 16; // card + gap
  track.scrollTo({
    left: pickPosition * width,
    behavior: "smooth"
  });

  pickDots.forEach(dot => dot.classList.remove("active"));
  pickDots[pickPosition].classList.add("active");
}

next.addEventListener("click", () => {
  pickPosition++;
  if (pickPosition >= cards.length) {
    pickPosition = 0;
  }
  scrollPicks();
});

prev.addEventListener("click", () => {
  pickPosition--;
  if (pickPosition < 0) {
    pickPosition = cards.length - 1;
  }
  scrollPicks();
});

setInterval(() => {
  pickPosition++;
  if (pickPosition >= cards.length) {
    pickPosition = 0;
  }
  scrollPicks();
}, 3500);

const categories = [
  { name: "Ethnic Wear",        discount: "50-80% OFF",    image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301046614ROSEWOOD_2_800x.jpg?v=1768468002&width=700&height=933&crop=center" },
  { name: "Casual Wear",        discount: "40-80% OFF",    image: "https://img.theloom.in/live/media/catalog/product/cache/101a419f04e4161b4f9f2458eaa9a195/s/s/ss24-tb06883.jpg" },
  { name: "Men's Activewear",   discount: "30-70% OFF",    image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301039245NAVY_2_800x.jpg?v=1763042990&width=700&height=933&crop=center" },
  { name: "Women's Activewear", discount: "30-70% OFF",    image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301062137RED_3_800x.jpg?v=1782373445&width=700&height=933&crop=center" },
  { name: "Western Wear",       discount: "40-80% OFF",    image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301059490BLACK_2.jpg?v=1774439570" },
  { name: "Sportswear",         discount: "30-80% OFF",    image: "https://tiimg.tistatic.com/fp/1/008/234/shrink-resistance-mens-sports-wear-blue-and-white-plain-tracksuits-089.jpg" },
  { name: "Loungewear",         discount: "30-60% OFF",    image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301060777PINK_2_800x.jpg?v=1773310490&width=700&height=933&crop=center" },
  { name: "Innerwear",          discount: "UP TO 70% OFF", image: "https://nobero.com/cdn/shop/files/1737715608763.webp?v=1775476956" },
  { name: "Lingerie",           discount: "UP TO 70% OFF", image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301025240BLACK_2_800x.jpg?v=1756218090&width=700&height=933&crop=center" },
  { name: "Bags & backPack",    discount: "30-80% OFF",    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/shopsy-backpack/5/9/h/bagpack-school-college-travel-office-bag-b02-tbl-laptop-backpack-resized-original-imahkakpjfvfhnev.jpeg?q=90" },
  { name: "Watches",            discount: "UP TO 80% OFF", image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwfeed7ba6/images/Titan/Catalog/90189SM01_1.jpg?sw=600&sh=600" },
  { name: "Grooming",           discount: "UP TO 60% OFF", image: "https://www.oyegifts.com/cdn/shop/files/Men_s-Grooming-Kit.jpg?v=1777873789&width=1620" },
  { name: "Beauty & Makeup",    discount: "UP TO 60% OFF", image: "https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg" },
  { name: "Flips & Flops",      discount: "30-70% OFF",    image: "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301061377BROWN_1_9648849c-727d-4e97-8ec3-c61f7f04ce7d_800x.jpg?v=1780289521&width=700&height=933&crop=center" },
];

const grid = document.getElementById("grid");

categories.forEach(cat => {
  const card = document.createElement("a");
  card.className = "card";
  card.href = "#";
  card.innerHTML = `
    <div class="card-image">
      <img src="${cat.image}" alt="${cat.name}">
    </div>
    <div class="card-footer">
      <p class="card-title">${cat.name}</p>
      <p class="card-discount">${cat.discount}</p>
      <span class="card-cta">Shop Now</span>
    </div>
  `;
  grid.appendChild(card);
});