// intial  varibales for the DOM
const imgContiner = document.getElementById('imgcontiner');
const loader = document.getElementById("loader");


let errorCounter = 0;
let isInitialLoad = true;
let ready = false;
let imagesLoaded = 0;
let totalImages;
let photosArray = [];


let Count = 6;
const apiKey = "QwGa6ymqIZrsxHqVDYD1wn2J27Vw1uHbJRagnpVNnAQ";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${Count}&query=people`;



function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}


// check if all images were loaded 
function imageLoaded() {
  imagesLoaded++;
   // checking the condtion of where imagesloaded equal to total images 
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
   }
}




// Setting attributes on the DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

function displayPhotos() {
    // assigning totalimages  in order to compare the imagloaded
    totalImages = photosArray.length
    photosArray.forEach((photo) => {
      const item = document.createElement("a");
      // settimg the attributes for a tag 
      setAttributes(item, {
        href: photo.links.html,
        target: "_blank",
      });
  
      const img = document.createElement("img");
      //  setting attributes img tag 
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      //  adding event listner on img loading 
     
      img.addEventListener("load", imageLoaded);
      
      //  a tag and img to gather  and appending to imgcontiner 
      item.appendChild(img);
      imgcontiner.appendChild(item);
    });
}
  
  // Fetch photos from Unsplash API
async function getPhotos() {
    try{ 
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();

      if (isInitialLoad) {
        updateURLWithNewCount(30);
        isInitialLoad = false;
      }


  }catch (error) {
        errorCounter < 0
          ? (getPhotos(), errorCounter++)
          : (console.log(error),
            (loader.hidden = true),
            (imageContainer.innerText = `Something is not working right, ${error}`));
      }
}

//  adding event listener to the scroll in order to feth new photos
window.addEventListener("scroll", () => {
   
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
      ready = false;
      imagesLoaded = 0;
      getPhotos()
    }
});
  





// on load data 

getPhotos()
