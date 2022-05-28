const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let photosArray=[];
let ready=false;
let imagesLoaded=0;
let totalImages=0;

//check the loading of image
function imageLoaded(){
  
  imagesLoaded++;
  console.log(imagesLoaded);
  if(imagesLoaded===totalImages){
      ready=true;
      loader.hidden=true;
      console.log('ready=',ready);
  }   
}


//function to set attribute
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}


//Display Photos
function displayPhotos(){
    imagesLoaded=0;
   totalImages=photosArray.length;
   console.log('total images ',totalImages);


    photosArray.forEach((photo)=>{
        //Creating anchor tag and adding attributes

        const item= document.createElement('a');
// item.setAttribute('href',photo.links.html);
// item.setAttribute('target','_blank');
setAttributes(item,{
    href: photo.links.html,
    target: '_blank',
});


//creating image tag

const img=document.createElement('img');
// img.setAttribute('src',photo.urls.regular);
// img.setAttribute('alt',photo.alt_description);
// img.setAttribute('title',photo.alt_description);

setAttributes(img,{
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
});
//event listener to check when each time loaded
img.addEventListener('load',imageLoaded);

//appending image inside anchor and anchor inside image container
item.appendChild(img);
imageContainer.appendChild(item);


    });
}

//Adding API
const apiKey='hOT1vqG_KV3hmJQBYcs-hA6GiqX3BKIQehn7iAcRCSQ';
const count=30;
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos(){
try{
const response=await fetch(apiUrl);
photosArray=await response.json();

displayPhotos();
}catch(error){
//Add error Here
}

}
window.addEventListener('scroll',()=>{
if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
    console.log('load more');
    ready=false;
    getPhotos();
}

});

getPhotos();