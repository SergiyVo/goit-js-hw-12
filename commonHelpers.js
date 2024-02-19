import{i as c,a as F,S as w}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const d=document.querySelector(".form"),m=document.querySelector(".gallery"),n=document.querySelector(".loader"),a=document.querySelector(".loader-btn");let y=1,p=15,u;a.style.display="none";n.style.display="none";d.addEventListener("submit",async s=>{if(s.preventDefault(),y=1,a.style.display="none",m.innerHTML="",u=d.elements.search.value.trim(),u===""){c.show({message:"Please write search image",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}n.style.display="inline-block";try{const{hits:t,totalHits:r}=await g(u,y);if(r===0){c.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"}),n.style.display="none";return}f(t),r<p?h():a.style.display="block"}catch(t){c.show({message:`Sorry, ${t}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{d.reset()}});a.addEventListener("click",async()=>{y+=1,a.style.display="none",n.style.display="inline-block";try{const{hits:s,totalHits:t}=await g(u,y);f(s),S(),p*y>t&&h()}catch(s){c.show({message:`Sorry, ${s}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"bottomCenter"})}finally{a.style.display="block"}});async function g(s,t){const r="https://pixabay.com",i="/api/",e={key:"42093583-bfe36716eb3593f6644c471e3",q:s,page:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p},o=new URLSearchParams(e),{data:l}=await F.get(`${r}${i}?${o}`);return l}function L(s){const{webformatURL:t,largeImageURL:r,tags:i,likes:e,views:o,comments:l,downloads:b}=s;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img class="gallery-image" src="${t}" alt="${i}" />
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
    </li>`}function f(s){const t=s.map(r=>L(r)).join(`
`);m.insertAdjacentHTML("beforeend",t),new w(".gallery a",{captionDelay:250,captionsData:"alt"}),n.style.display="none"}function h(){c.show({message:"We are sorry, but you have reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#1DB8F5",position:"topRight"}),a.style.display="none",n.style.display="none"}function S(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:t,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
