const menuBtn=document.querySelector(".menu-btn"),nav=document.querySelector(".nav");
if(menuBtn){menuBtn.addEventListener("click",()=>{nav.classList.toggle("mobile-open");menuBtn.setAttribute("aria-expanded",nav.classList.contains("mobile-open"))})}
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("mobile-open")));
const modal=document.getElementById("videoModal"), frame=document.getElementById("videoFrame"), title=document.getElementById("modalTitle");
document.querySelectorAll("[data-video]").forEach(card=>card.addEventListener("click",()=>{frame.src=card.dataset.video;title.textContent=card.dataset.title||"Temple video";modal.classList.add("open");modal.setAttribute("aria-hidden","false")}));
function closeModal(){if(!modal)return;modal.classList.remove("open");modal.setAttribute("aria-hidden","true");frame.src=""}
document.querySelectorAll(".modal-close,.modal-backdrop").forEach(x=>x.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
