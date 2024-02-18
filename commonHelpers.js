import{S as c,i as u}from"./assets/vendor-5b791d57.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function f(l){const o="https://pixabay.com",r="/api/",s=new URLSearchParams({key:"42413165-de21b3093ac09ea3a2837c255",q:l,image_type:"photo",orientation:"horizontal",safesearch:"true"}),e=`${o}${r}?${s}`;return console.log(e),fetch(e).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}const a={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")};function y(l){const{webformatURL:o,largeImageURL:r,tags:s,likes:e,views:t,comments:n,downloads:i}=l;return`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img class="gallery-image" src="${o}" alt="${s}" />
      </a>
      <ul class="gallery-body">
        <li class="gallery-info">
          <h3>Likes:</h3>
          <p>${e}</p>
        </li>
        <li class="gallery-info">
          <h3>Views:</h3>
          <p>${t}</p>
        </li>
        <li class="gallery-info">
          <h3>Comments:</h3>
          <p>${n}</p>
        </li>
        <li class="gallery-info">
          <h3>Downloads:</h3>
          <p>${i}</p>
        </li>
      </ul>
    </li>`}function m(l){const o=l.hits.map(r=>y(r)).join(`
`);a.gallery.insertAdjacentHTML("beforeend",o),new c(".gallery a",{captionDelay:250,captionsData:"alt"})}a.loader.style.display="none";a.form.addEventListener("submit",d);function d(l){l.preventDefault(),a.gallery.innerHTML="",a.loader.style.display="flex";const o=l.target.elements.input.value.trim();f(o).then(r=>{r.hits.length===0?u.show({message:"Sorry, there are no images matching your search query. Please, try again!",messageColor:"white",backgroundColor:"red",position:"topRight"}):m(r)}).catch(r=>{console.log(r)}).finally(()=>{a.loader.style.display="none"}),l.target.reset()}
//# sourceMappingURL=commonHelpers.js.map
