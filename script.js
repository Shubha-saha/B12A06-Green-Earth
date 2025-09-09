const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

const removeActive = () => {
  const categoryListBtn = document.querySelectorAll(".category-list");
  // console.log(categoryListBtn);
  categoryListBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelPlant = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`categories-list-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelPlant(data.plants);
    });
};

const loadPlantDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayPlantDetail(details.plants);
};

const displayPlantDetail = (plant) => {
  console.log(plant);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
                <div class="rounded-lg">
                  <h2 class="font-bold text-2xl mb-1">${plant.name}</h2>
                  <img class="w-12/12 h-[180px] rounded-tl-lg rounded-tr-lg" src="${plant.image}" alt="" />
                  <p>
                    <span class="font-bold text-xl">Category:</span> ${plant.category}
                  </p>
                  <p><span class="font-bold text-xl">Price:</span> ${plant.price}</p>
                  <p>
                    <span class="font-bold text-xl">Description:</span> ${plant.description}
                  </p>
                </div>
  `;
  document.getElementById("plant_modal").showModal();
};

const displayLevelPlant = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white rounded-lg p-4 space-y-2">
        <img class="w-[300px] h-[150px] rounded-tl-lg rounded-tr-lg" src="${plant.image}" alt="" />
        <h3 onclick="loadPlantDetail(${plant.id})" class="text-xl font-bold">${plant.name}</h3>
        <p class="line-clamp-3">${plant.description}</p>
        <div class="flex justify-between">
          <button class="bg-green-300 rounded-full px-4">${plant.category}</button>
          <h4>tk: ${plant.price}</h4>
        </div>
        <button class="bg-green-700 text-white w-full rounded-full mt-2 px-4 py-1">
          Add to Cart
        </button>
      </div>
    `;
    cardContainer.append(card);
  });
};

const displayCategories = (categories) => {
  const levelCategories = document.getElementById("level-categories");
  levelCategories.innerHTML = "";
  for (let category of categories) {
    const liUl = document.createElement("div");
    liUl.innerHTML = `
      <button id="categories-list-${category.id}" onclick="loadLevelPlant(${category.id})" class="plant-name cursor-pointer mt-2 px-1 hover:bg-green-500 category-list">${category.category_name}</button>
      `;
    levelCategories.append(liUl);
  }
};
loadCategories();
