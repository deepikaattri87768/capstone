import { createOptimizedPicture } from "../../scripts/aem.js"; // Adjust path as necessary

const articlesContainer = document.querySelector(".articles-cards.block");

async function getDataFromJSON(jsonURL) {
  try {
    const response = await fetch(jsonURL);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${jsonURL}`);
    }
    const jsonData = await response.json();
    console.log(jsonData);
    const filteredData = jsonData.data.filter(
      (item) => item.template === "magazine"
    );
    return filteredData.map((item) => ({
      imgSrc: item.image,
      title: item.title,
      description: item.description,
      link: item.path,
    }));
  } catch (error) {
    throw new Error("Error fetching JSON data");
  }
}

async function renderCustomList(jsonURL) {
  const data = await getDataFromJSON(jsonURL);

  articlesContainer.innerHTML = "";

  const ulElement = document.createElement("ul");

  data.forEach((item) => {
    const listItem = document.createElement("li");

    const imgDiv = document.createElement("div");
    imgDiv.className = "cards-card-image";
    const imgAnchor = document.createElement("a");
    imgAnchor.href = item.link;

    const pictureElement = createOptimizedPicture(item.imgSrc, item.title);
    console.log(pictureElement);
    imgAnchor.appendChild(pictureElement);
    imgDiv.appendChild(imgAnchor);

    const bodyDiv = document.createElement("div");
    bodyDiv.className = "cards-card-body";

    const titleContainer = document.createElement("p");
    titleContainer.className = "button-container";
    const titleAnchor = document.createElement("a");
    titleAnchor.href = item.link;
    titleAnchor.textContent = item.title;
    titleAnchor.className = "button";
    titleContainer.appendChild(titleAnchor);

    const descriptionP = document.createElement("p");
    descriptionP.textContent = item.description;

    bodyDiv.appendChild(titleContainer);
    bodyDiv.appendChild(descriptionP);

    listItem.appendChild(imgDiv);
    listItem.appendChild(bodyDiv);

    ulElement.appendChild(listItem);
  });

  articlesContainer.appendChild(ulElement);
}

export default function decorate(block) {
  console.log(block);
  const dataListAnchor = block.querySelector('a[href$=".json"]');
  console.log(dataListAnchor);
  if (dataListAnchor) {
    const jsonURL = dataListAnchor.href;
    renderCustomList(jsonURL);
  }
}
