import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  console.log(block);
  console.log(block.children);
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    console.log(row);
    console.log(row.firstElementChild);
    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }
    console.log(li);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'contributors-cards-image';
      } else {
        div.className = 'contributors-cards-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.lastChild, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
