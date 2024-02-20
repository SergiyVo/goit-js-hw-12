import{S as f,i,a as h}from"./assets/vendor-527658dd.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const t={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".loader-btn")};function b(l){const{webformatURL:o,largeImageURL:s,tags:n,likes:e,views:r,comments:a,downloads:p}=l;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img class="gallery-image" src="${o}" alt="${n}" />
      </a>
      <ul class="gallery-body">
        <li class="gallery-info">
          <h3>Likes:</h3>
          <p>${e}</p>
        </li>
        <li class="gallery-info">
          <h3>Views:</h3>
          <p>${r}</p>
        </li>
        <li class="gallery-info">
          <h3>Comments:</h3>
          <p>${a}</p>
        </li>
        <li class="gallery-info">
          <h3>Downloads:</h3>
          <p>${p}</p>
        </li>
      </ul>
    </li>`}function u(l){const o=l.map(s=>b(s)).join(`
`);t.gallery.insertAdjacentHTML("beforeend",o),new f(".gallery a",{captionDelay:250,captionsData:"alt"}),t.loader.style.display="none"}document.querySelector(".form");const F=document.querySelector(".gallery");document.querySelector(".loader");const w=document.querySelector(".loader-btn");let c=1,y=15,d;t.loadBtn.style.display="none";t.loader.style.display="none";t.form.addEventListener("submit",async l=>{if(l.preventDefault(),c=1,F.innerHTML="",d=t.form.elements.search.value.trim(),d===""){i.show({message:"Please write search image",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}t.loader.style.display="inline-block";try{const{hits:o,totalHits:s}=await m(d,c);if(s===0){i.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"}),t.loader.style.display="none";return}u(o),s<y?(g(),t.loadBtn.style.display="none"):t.loadBtn.style.display="block"}catch(o){i.show({message:`Sorry, ${o}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{t.form.reset()}});w.addEventListener("click",async()=>{c+=1,t.loadBtn.style.display="block",t.loader.style.display="inline-block";try{const{hits:l,totalHits:o}=await m(d,c);u(l),S(),y*c>o&&g()}catch(l){i.show({message:`Sorry, ${l}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"bottomCenter"}),t.loadBtn.style.display="none"}finally{t.form.reset()}});async function m(l,o){const s="https://pixabay.com",n="/api/",e={key:"42093583-bfe36716eb3593f6644c471e3",q:l,page:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y},r=new URLSearchParams(e),{data:a}=await h.get(`${s}${n}?${r}`);return a}function g(){t.loadBtn.style.display="none",t.loader.style.display="none",i.show({message:"We are sorry, but you have reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#1DB8F5",position:"topRight"})}function S(){const o=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:o,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
