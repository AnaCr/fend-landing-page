// find the menu and menuContainer elements
const menu = document.querySelector('#menu');
const menuContainer = document.querySelector('.menu-container');

// open and close the navigation menu
menu.addEventListener('click', function(e) {
    const visibility = menuContainer.style.visibility;

    (visibility === 'hidden' || visibility === '') ? 
    menuContainer.style.visibility = 'visible' : 
    menuContainer.style.removeProperty('visibility');
});

/* The following code has been adapted from an example at:
https://www.w3docs.com/snippets/javascript/how-to-detect-a-click-outside-an-element.html (Feb 17 2021) */
// close the navigation menu when a user clicks outside the menu icon
document.addEventListener('click', function(e) {
    var targetElement = e.target;
    do {
        if(targetElement == menu) { // if menu was clicked, do nothing
          return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);   
      
      menuContainer.style.removeProperty('visibility');
});

// start a map with the home section
var navitems = {
  "Home": "home",
}

// find all the sections
const sections = document.querySelectorAll('.section');

// add each section heading and id to the navitems map
sections.forEach(function(s) {
    navitems[s.firstElementChild.innerText] = s.id;
});

const menuContFragment = new DocumentFragment();
// add each item to the menu container
Object.keys(navitems).forEach(function(key) {    
    const li = document.createElement('li');
    li.setAttribute('id', `nav-${navitems[key]}`)
    li.innerText = key;
    menuContFragment.appendChild(li);
});

menuContainer.appendChild(menuContFragment);

// scroll into view slowly
menuContainer.addEventListener('click', function(e) {
  const sectionID = navitems[e.target.innerText];
  const section = document.querySelector(`#${sectionID}`);
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// when the page loads, check if the home section is active
const scrollPosition = window.scrollY;
const homeSection = document.querySelector('#home');
checkActiveSection(scrollPosition, homeSection);

// mark the active section while scrolling
document.addEventListener('scroll', function(e) {
  const scrollPosition = window.scrollY;

  const homeSection = document.querySelector('#home');
  checkActiveSection(scrollPosition, homeSection);

  sections.forEach(function(s) {
    checkActiveSection(scrollPosition, s);
  });
});

function checkActiveSection(scrollPosition, sectionElement) {
  const sectionTop = sectionElement.offsetTop - 100;
  const sectionBottom = sectionTop + sectionElement.scrollHeight;

  ID = sectionElement.getAttribute('id');
  const navLink = document.querySelector(`#nav-${ID}`);

  if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
    navLink.classList.add('active-section');
  } else {
    navLink.classList.remove('active-section');
  }
}