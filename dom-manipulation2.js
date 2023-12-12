

// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
  
  //>>>>>>>>>>>Part 1<<<<<<<<<<<
  const mainEl = document.querySelector("main");
  
  mainEl.style.backgroundColor = "var(--main-bg)";
  mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
  mainEl.classList.add("flex-ctr");
  
  //>>>>>>>>>>>Part 2<<<<<<<<<<<
  const topMenuEl = document.querySelector("#top-menu");
  topMenuEl.style.height = "100%";
  topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
  topMenuEl.classList.add("flex-around");
  
  //>>>>>>>>>>>Part 3<<<<<<<<<<<
  menuLinks.forEach((menuLink) => {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", menuLink.href);
    anchor.textContent = menuLink.text;
    topMenuEl.appendChild(anchor);
  });
  
//// ===== Part 2 Assignment =====\\\\\\

//>>>>>>>>>Creating the Submenu<<<<<<<<<<<<

const subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
// Hide sub-menu
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

//>>>>>>>>>Adding Menu Interaction<<<<<<<<<<<<
const topMenuLinks = document.querySelectorAll("#top-menu > a");

// Declare a function to find a link in the menuLinks array of objects
function findLinkObject (arr, linkText){
  let result;
  arr.forEach(linkObj =>{
    console.log(linkObj);
    if(linkObj.text === linkText){
      result = linkObj;
    }
  });
  return result;
}

// Add click event listener tot he top menu to make links active/inactive and toggle the submenu bar
topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  //declare clicked link variable to be used multiple times
  let clickedLink =  event.target;

  // If the click occured on a link deactivate all links and activate the one that was clicked
  if (clickedLink.tagName !== "A") {
    return;
  } else {
    console.log(clickedLink.textContent);
  }
  topMenuLinks.forEach(link =>{
  link.classList.remove("active");
  })

  clickedLink.classList.toggle("active");

  // Toggle the submenu bar
  let linkObj = findLinkObject(menuLinks, clickedLink.innerText.toLowerCase());
 
  if(linkObj.subLinks){
    if(subMenuEl.style.top === "100%"){
      subMenuEl.style.top = "0%";
    }
    else{
      subMenuEl.style.top = "100%";
      buildSubmenu(linkObj.subLinks)
    }
  }
  else{
    subMenuEl.style.top = "0%";
  }

  if (
    event.target.innerText.toLowerCase() === "about" &&
    event.target.tagName === "A"
  ) {
    mainEl.innerHTML = "<h1>About</h1>";
  }
});

// Declare a function to build submenu dinnamically 
function buildSubmenu(LinksForSubMenu){

  //Clear submenu in case there was a previous one
  while(subMenuEl.firstChild){
    subMenuEl.removeChild(subMenuEl.firstChild);
  }
  
  // Build submenu based on the sublink provided
  LinksForSubMenu.forEach(linkObject => {
  let anchor = document.createElement("a");
  anchor.setAttribute("href", linkObject.href);
  anchor.innerText = linkObject.text;
  subMenuEl.appendChild(anchor);
  })
}

// Add click event listener
subMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  // If the clicked element isn't an <a>, return. If it's an <a> log the element in the console.
  if (event.target.tagName !== "A") {
    return;
  } else {
    console.log(event.target.textContent);
  }
  //Toggle submenu
  subMenuEl.style.top = "0";
  topMenuLinks.forEach(a => {
    a.classList.remove("active");
  })

  let h1 = document.createElement("h1");
  if(event.target.tagName === "A") {
   
    h1.textContent = event.target.innerText;
    mainEl.innerHTML = `<h1>${h1.textContent}</h1>`;
  } else {
    return;
  }
  
});






