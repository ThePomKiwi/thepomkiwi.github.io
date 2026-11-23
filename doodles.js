// Add entries only when you have the original artwork and Facebook post URL.
// Example: { number: 1, title: "Little Miss Kiwi", image: "images/doodles/001.webp", facebookUrl: "https://www.facebook.com/..." }
// Do not use a general Facebook profile link in place of the original post URL.
const doodles = [
  {
    "number": 1,
    "title": "Little Miss Kiwi",
    "image": "images/doodles/001.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1EH9PYDD4r/?mibextid=wwXIfr"
  },
  {
    "number": 2,
    "title": "Autumn Leaves",
    "image": "images/doodles/002.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1FMqCCiXyz/?mibextid=wwXIfr"
  },
  {
    "number": 3,
    "title": "It’s 5 O’Clock Somewhere",
    "image": "images/doodles/003.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1H1c6oSCHP/?mibextid=wwXIfr"
  },
  {
    "number": 4,
    "title": "Little Witch",
    "image": "images/doodles/004.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1CRL25rHLY/?mibextid=wwXIfr"
  },
  {
    "number": 5,
    "title": "Professional Napper",
    "image": "images/doodles/005.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1KTaS6qdKS/?mibextid=wwXIfr"
  },
  {
    "number": 6,
    "title": "Fashion Pup",
    "image": "images/doodles/006.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1CnabEQauv/?mibextid=wwXIfr"
  },
  {
    "number": 7,
    "title": "Beach Day",
    "image": "images/doodles/007.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1CB9fWXjjo/?mibextid=wwXIfr"
  },
  {
    "number": 8,
    "title": "Say Cheese",
    "image": "images/doodles/008.webp",
    "facebookUrl": "https://www.facebook.com/share/p/199zNpf3zi/?mibextid=wwXIfr"
  },
  {
    "number": 9,
    "title": "Hairstylist Kiwi",
    "image": "images/doodles/009.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1HFh7YbZtd/?mibextid=wwXIfr"
  },
  {
    "number": 10,
    "title": "Museum Visit",
    "image": "images/doodles/010.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1Caz1ih4k2/?mibextid=wwXIfr"
  },
  {
    "number": 11,
    "title": "Pizza Night",
    "image": "images/doodles/011.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1FQQGXVFR5/?mibextid=wwXIfr"
  },
  {
    "number": 12,
    "title": "Ice Cream Time",
    "image": "images/doodles/012.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1FbrBFN3tN/?mibextid=wwXIfr"
  }
  ,{
    "number": 13,
    "title": "The Side Eye",
    "image": "images/doodles/013.webp",
    "facebookUrl": "https://www.facebook.com/share/p/1EM4ZXEY99/?mibextid=wwXIfr"
  }
];
const grid = document.getElementById("doodle-grid");
const lightbox = document.getElementById("doodle-lightbox");
let currentDoodle = 0;
let returnFocus = null;
function showDoodle(index) {
  currentDoodle = (index + doodles.length) % doodles.length;
  const d = doodles[currentDoodle];
  document.getElementById("sketchbook-number").textContent = `${String(d.number).padStart(3,"0")} / 100`;
  const img = document.getElementById("sketchbook-image");
  img.src = d.image;
  img.alt = `Pencil drawing ${String(d.number).padStart(3,"0")}: ${d.title}`;
  document.getElementById("sketchbook-title").textContent = d.title;
  document.getElementById("sketchbook-facebook").href = d.facebookUrl;
  document.getElementById("sketchbook-prev").disabled = currentDoodle === 0;
  document.getElementById("sketchbook-next").disabled = currentDoodle === doodles.length - 1;
}
function openDoodle(index, trigger) {
  returnFocus = trigger;
  showDoodle(index);
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("sketchbook-open");
  lightbox.querySelector(".sketchbook-close").focus();
}
function closeDoodle() {
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("sketchbook-open");
  if (returnFocus) returnFocus.focus();
}
if (grid && lightbox) {
  document.getElementById("diary-count").textContent = `${doodles.length} / 100`;
  document.getElementById("progress-fill").style.width = `${doodles.length}%`;
  if (!doodles.length) grid.innerHTML = '<div class="doodle-empty"><span aria-hidden="true">✎</span><h2>The sketchbook is opening soon</h2><p>Kiwi’s drawings and their original Facebook links will live here.</p></div>';
  doodles.forEach((d,index) => {
    if (!d.image || !d.facebookUrl) return;
    const article = document.createElement("article"); article.className="doodle-card";
    const trigger = document.createElement("button"); trigger.className="doodle-open"; trigger.type="button"; trigger.setAttribute("aria-label",`Open drawing ${String(d.number).padStart(3,"0")}: ${d.title}`);
    const img = document.createElement("img"); img.src=d.image; img.alt=`Doodle ${String(d.number).padStart(3,"0")}: ${d.title}`; img.loading="lazy";
    const hint = document.createElement("span"); hint.className="doodle-view-hint"; hint.textContent="View in sketchbook ↗";
    trigger.append(img,hint); trigger.addEventListener("click",()=>openDoodle(index,trigger));
    const title = document.createElement("h2"); title.textContent=`${String(d.number).padStart(3,"0")}/100 · ${d.title}`;
    article.append(trigger,title); grid.append(article);
  });
  lightbox.querySelector(".sketchbook-close").addEventListener("click",closeDoodle);
  lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeDoodle();});
  document.getElementById("sketchbook-prev").addEventListener("click",()=>showDoodle(currentDoodle-1));
  document.getElementById("sketchbook-next").addEventListener("click",()=>showDoodle(currentDoodle+1));
  document.addEventListener("keydown",e=>{
    if(lightbox.hidden)return;
    if(e.key==="Escape"){e.preventDefault();closeDoodle();}
    else if(e.key==="ArrowLeft" && currentDoodle>0){e.preventDefault();showDoodle(currentDoodle-1);}
    else if(e.key==="ArrowRight" && currentDoodle<doodles.length-1){e.preventDefault();showDoodle(currentDoodle+1);}
    else if(e.key==="Tab"){
      const focusable=[...lightbox.querySelectorAll('button:not(:disabled), a[href]')];
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
}
