import{i as c,a as F,S as w}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const u=document.querySelector(".form"),m=document.querySelector(".gallery"),n=document.querySelector(".loader"),i=document.querySelector(".loader-btn");let y=1,p=15,d;i.style.display="none";n.style.display="none";u.addEventListener("submit",async r=>{if(r.preventDefault(),y=1,m.innerHTML="",d=u.elements.search.value.trim(),d===""){c.show({message:"Please write search image",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}n.style.display="inline-block";try{const{hits:t,totalHits:s}=await g(d,y);if(s===0){c.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"}),n.style.display="none";return}f(t),s<p?h():i.style.display="block"}catch(t){c.show({message:`Sorry, ${t}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{u.reset()}});i.addEventListener("click",async()=>{y+=1,i.style.display="block",n.style.display="inline-block";try{const{hits:r,totalHits:t}=await g(d,y);f(r),S(),p*y>t&&h()}catch(r){c.show({message:`Sorry, ${r}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"bottomCenter"}),i.style.display="none"}finally{u.reset()}});async function g(r,t){const s="https://pixabay.com",a="/api/",e={key:"42093583-bfe36716eb3593f6644c471e3",q:r,page:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p},o=new URLSearchParams(e),{data:l}=await F.get(`${s}${a}?${o}`);return l}function L(r){const{webformatURL:t,largeImageURL:s,tags:a,likes:e,views:o,comments:l,downloads:b}=r;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img class="gallery-image" src="${t}" alt="${a}" />
      </a>
      <ul class="gallery-body">
        <li class="gallery-info">
          <h3>Likes:</h3>
          <p>${e}</p>
        </li>
        <li class="gallery-info">
          <h3>Views:</h3>
          <p>${o}</p>
        </li>
        <li class="gallery-info">
          <h3>Comments:</h3>
          <p>${l}</p>
        </li>
        <li class="gallery-info">
          <h3>Downloads:</h3>
          <p>${b}</p>
        </li>
      </ul>
    </li>`}function f(r){const t=r.map(s=>L(s)).join(`
`);m.insertAdjacentHTML("beforeend",t),new w(".gallery a",{captionDelay:250,captionsData:"alt"}),n.style.display="none"}function h(){i.style.display="none",n.style.display="none",c.show({message:"We are sorry, but you have reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#1DB8F5",position:"topRight"})}function S(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:t,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
