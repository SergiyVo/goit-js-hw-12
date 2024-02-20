import{S as f,a as h,i as n}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const t={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".loader-btn")};let b=new f(".gallery-link",{captionsData:"alt",captionDelay:500});function F(l){const{webformatURL:o,largeImageURL:s,tags:i,likes:e,views:r,comments:a,downloads:p}=l;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img class="gallery-image" src="${o}" alt="${i}" />
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
    </li>`}function y(l){const o=l.map(s=>F(s)).join();t.gallery.insertAdjacentHTML("beforeend",o),b.refresh(),t.loader.style.display="none"}async function u(l,o){const s="https://pixabay.com",i="/api/",e={key:"42413165-de21b3093ac09ea3a2837c255",q:l,page:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15},r=new URLSearchParams(e),{data:a}=await h.get(`${s}${i}?${r}`);return a}let c=1,m=15,d;t.loadBtn.style.display="none";t.loader.style.display="none";t.form.addEventListener("submit",async l=>{if(l.preventDefault(),c=1,t.loader.style.display="none",t.gallery.innerHTML="",d=t.form.elements.search.value.trim(),d===""){n.show({message:"Please write search image",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}t.loader.style.display="inline-block";try{const{hits:o,totalHits:s}=await u(d,c);if(s===0){n.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"}),t.loader.style.display="none";return}y(o),s<m?g():t.loadBtn.style.display="block"}catch(o){n.show({message:`Sorry, ${o}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}finally{t.form.reset()}});t.loadBtn.addEventListener("click",async()=>{c+=1,t.loader.style.display="inline-block";try{const{hits:l,totalHits:o}=await u(d,c);y(l),w(),m*c>o&&g()}catch(l){n.show({message:`Sorry, ${l}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"bottomCenter"})}});function g(){t.loadBtn.style.display="none",t.loader.style.display="none",n.show({message:"We are sorry, but you have reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#1DB8F5",position:"topRight"})}function w(){const o=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:o,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
