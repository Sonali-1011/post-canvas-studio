/* =========================================
   POST CANVAS STUDIO
   PORTFOLIO JAVASCRIPT
========================================= */


/* PORTFOLIO IMAGES */

const portfolioItems = [

  // FASHION & JEWELLERY

  {
    image: "lehenga1.png",
    title: "Bridal Fashion Creative",
    category: "fashion"
  },

  {
    image: "lehanga 2.png",
    title: "Fashion Campaign",
    category: "fashion"
  },

  {
    image: "dress lehenga.png",
    title: "Lehenga Promotion",
    category: "fashion"
  },

  {
    image: "saree ad.png",
    title: "Saree Advertisement",
    category: "fashion"
  },

  {
    image: "saree design.png",
    title: "Saree Social Creative",
    category: "fashion"
  },

  {
    image: "jwell.png",
    title: "Jewellery Creative",
    category: "fashion"
  },


  // HOTELS

  {
    image: "712226458_1628624284906472_5061683234414590589_n.jpg",
    title: "Hotel Social Creative",
    category: "hotel"
  },

  {
    image: "madhouse (1).png",
    title: "Madhouse Hotel Promotion",
    category: "hotel"
  },

  {
    image: "Executive room (1).png",
    title: "Executive Room Creative",
    category: "hotel"
  },


  // RESORTS

  {
    image: "Vinayak grand 2  (1).png",
    title: "Vinayak Grand Resort",
    category: "resort"
  },

  {
    image: "sukhdev resort (1).jpeg",
    title: "Sukhdev Resort Campaign",
    category: "resort"
  },

  {
    image: "gold leaf.png",
    title: "Gold Leaf Resort Promotion",
    category: "resort"
  },

  {
    image: "markar villa 1.png",
    title: "Villa Promotion",
    category: "resort"
  },

  {
    image: "mankar villa.png",
    title: "Villa Social Creative",
    category: "resort"
  },

  {
    image: "bliss 2.png",
    title: "Bliss Stay Creative",
    category: "resort"
  },

  {
    image: "Bliss stay.png",
    title: "Stay Promotion",
    category: "resort"
  },

  {
    image: "Uk royal resort.png",
    title: "UK Royal Resort",
    category: "resort"
  },

  {
    image: "Sha sha 2.png",
    title: "Sha Sha Resort Promotion",
    category: "resort"
  },

  {
    image: "sky line.png",
    title: "Skyline Resort Creative",
    category: "resort"
  },


  // EDUCATION

  {
    image: "academy ad.png",
    title: "Academy Advertisement",
    category: "education"
  },

  {
    image: "acadmy 2.png",
    title: "Academy Social Creative",
    category: "education"
  },


  // PRODUCTS

  {
    image: "4 product.png",
    title: "Product Campaign",
    category: "product"
  }

];


/* CATEGORY NAMES */

const categoryLabels = {

  fashion: "Fashion & Jewellery",

  hotel: "Hotels",

  resort: "Resorts",

  education: "Education",

  product: "Products & Ads"

};


/* ELEMENTS */

const grid = document.getElementById("portfolioGrid");

const filterButtons = document.querySelectorAll(".filter");

const seeMoreBtn = document.getElementById("seeMoreBtn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCategory = document.getElementById("lightboxCategory");


/* PORTFOLIO SETTINGS */

const ITEMS_PER_PAGE = 6;

let activeItems = [...portfolioItems];

let activeIndex = 0;

let showAllItems = false;


/* RENDER PORTFOLIO */

function renderPortfolio(filter = "all") {

  // Filter portfolio items

  activeItems = filter === "all"

    ? [...portfolioItems]

    : portfolioItems.filter(item => item.category === filter);


  // Clear old portfolio cards

  grid.innerHTML = "";


  // No images available

  if (activeItems.length === 0) {

    grid.innerHTML = `
      <p class="empty-state">
        More work in this category will be added soon.
      </p>
    `;

    if (seeMoreBtn) {
      seeMoreBtn.classList.add("hidden");
    }

    return;

  }


  // Display only 6 images initially

  const displayedItems = showAllItems

    ? activeItems

    : activeItems.slice(0, ITEMS_PER_PAGE);


  // Create portfolio cards

  displayedItems.forEach((item, index) => {

    const card = document.createElement("article");

    card.className = "work-card";

    card.tabIndex = 0;

    card.setAttribute("role", "button");

    card.setAttribute("aria-label", `View ${item.title}`);


    // Image wrapper

    const imageWrap = document.createElement("div");

    imageWrap.className = "work-image";


    // Image

    const image = document.createElement("img");

    image.src = `assets/${item.image}`;

    image.alt = item.title;

    image.loading = "lazy";


    // Handle missing images

    image.onerror = function () {

      card.style.display = "none";

      console.warn(
        "Image could not be loaded:",
        item.image
      );

    };


    imageWrap.appendChild(image);


    // Portfolio details

    const meta = document.createElement("div");

    meta.className = "work-meta";


    const details = document.createElement("div");


    const category = document.createElement("span");

    category.textContent =
      categoryLabels[item.category] || "Creative Design";


    const title = document.createElement("h3");

    title.textContent = item.title;


    details.appendChild(category);

    details.appendChild(title);


    // Image number

    const number = document.createElement("span");

    number.className = "work-number";

    number.textContent =
      String(index + 1).padStart(2, "0");


    meta.appendChild(details);

    meta.appendChild(number);


    // Add elements to card

    card.appendChild(imageWrap);

    card.appendChild(meta);


    // Open image preview

    card.addEventListener("click", function () {

      openLightbox(index);

    });


    // Keyboard accessibility

    card.addEventListener("keydown", function (event) {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openLightbox(index);

      }

    });


    grid.appendChild(card);

  });


  // SEE MORE BUTTON

  if (seeMoreBtn) {

    const hasMoreItems =
      activeItems.length > ITEMS_PER_PAGE;


    seeMoreBtn.classList.toggle(
      "hidden",
      !hasMoreItems
    );


    if (showAllItems) {

      seeMoreBtn.innerHTML = `
        See Less
        <i class="bi bi-arrow-up"></i>
      `;

    } else {

      seeMoreBtn.innerHTML = `
        See More
        <i class="bi bi-arrow-down"></i>
      `;

    }

  }

}


/* FILTER BUTTONS */

filterButtons.forEach(button => {

  button.addEventListener("click", function () {

    // Remove active class from all buttons

    filterButtons.forEach(item => {

      item.classList.remove("active");

    });


    // Add active class to selected button

    button.classList.add("active");


    // Reset portfolio pagination

    showAllItems = false;


    // Render selected category

    renderPortfolio(button.dataset.filter);

  });

});


/* SEE MORE / SEE LESS */

if (seeMoreBtn) {

  seeMoreBtn.addEventListener("click", function () {

    showAllItems = !showAllItems;


    // Get selected category

    const selectedFilter =
      document.querySelector(".filter.active")?.dataset.filter || "all";


    // Update portfolio

    renderPortfolio(selectedFilter);


    // When clicking See Less, move back to portfolio heading

    if (!showAllItems) {

      document.getElementById("work").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

}


/* OPEN LIGHTBOX */

function openLightbox(index) {

  if (!activeItems.length) return;


  activeIndex = index;

  const item = activeItems[activeIndex];


  lightboxImage.src = `assets/${item.image}`;

  lightboxImage.alt = item.title;

  lightboxTitle.textContent = item.title;

  lightboxCategory.textContent =
    categoryLabels[item.category] || "Creative Design";


  lightbox.classList.add("open");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";


  document.getElementById("lightboxClose").focus();

}


/* CLOSE LIGHTBOX */

function closeLightbox() {

  lightbox.classList.remove("open");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


/* NEXT / PREVIOUS IMAGE */

function changeLightbox(direction) {

  if (!activeItems.length) return;


  activeIndex =

    (activeIndex + direction + activeItems.length)

    % activeItems.length;


  openLightbox(activeIndex);

}


/* LIGHTBOX BUTTONS */

document.getElementById("lightboxClose")

  .addEventListener("click", closeLightbox);


document.getElementById("lightboxPrev")

  .addEventListener("click", function () {

    changeLightbox(-1);

  });


document.getElementById("lightboxNext")

  .addEventListener("click", function () {

    changeLightbox(1);

  });


/* CLOSE LIGHTBOX ON BACKGROUND CLICK */

lightbox.addEventListener("click", function (event) {

  if (event.target === lightbox) {

    closeLightbox();

  }

});


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", function (event) {

  if (!lightbox.classList.contains("open")) return;


  if (event.key === "Escape") {

    closeLightbox();

  }


  if (event.key === "ArrowLeft") {

    changeLightbox(-1);

  }


  if (event.key === "ArrowRight") {

    changeLightbox(1);

  }

});


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", function () {

  const isOpen = navLinks.classList.toggle("open");


  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );


  menuToggle.innerHTML = isOpen

    ? '<i class="bi bi-x-lg"></i>'

    : '<i class="bi bi-list"></i>';

});


/* CLOSE MOBILE MENU AFTER CLICK */

navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", function () {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.innerHTML =
      '<i class="bi bi-list"></i>';

  });

});


/* CURRENT YEAR */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* INITIAL PORTFOLIO LOAD */

renderPortfolio("all");

// MOBILE MENU TOGGLE
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("active")
    );
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

