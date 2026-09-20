/*
  ================================
  실제 작업물 입력
  ================================

  작업 하나당:
  {
    name: "작품명 / Episode 01",
    original: "assets/원본파일.jpg",
    lettered: "assets/작업본파일.jpg"
  }

  아래 works 배열에 원하는 만큼 계속 추가하면 됩니다.
*/
const works = [
  {
    name:"용사고교 던전공략과",
    original:"img/portfolio/JP1_24O.jpg",
    lettered:"img/portfolio/JP1_24.jpg"
  },
  {
    name:"사적취향",
    original:"img/portfolio/JP2_61O.jpg",
    lettered:"img/portfolio/JP2_61.jpg"
  },
  {
    name:"리트라이",
    original:"img/portfolio/JP3_46O.jpg",
    lettered:"img/portfolio/JP3_46.jpg"
  },
  {
    name:"망할 운명의 걸그룹 리더가 되었습니다",
    original:"img/portfolio/EN1_1O.jpg",
    lettered:"img/portfolio/EN1_1.jpg"
  },
  {
    name:"엔딩메이커",
    original:"img/portfolio/EN2_78O.jpg",
    lettered:"img/portfolio/EN2_78.jpg"
  },
  {
    name:"튜토리얼 탑의 고인물",
    original:"img/portfolio/EN3_172O.jpg",
    lettered:"img/portfolio/EN3_172.jpg"
  },
  {
    name:"칸나는 어떠한 결심을 했다 [19세 완전판]",
    original:"img/portfolio/EN4_3O.jpg",
    lettered:"img/portfolio/EN4_3.jpg"
  }
];

const track=document.getElementById("track");
const dots=document.getElementById("dots");
const counter=document.getElementById("counter");
let current=0;

function imageHTML(src,alt,label){
  return `<div class="image-box">
    <img src="${src}" alt="${alt}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="placeholder" style="display:none">${label}</div>
  </div>`;
}


// function render(){
//   track.innerHTML=works.map((w,i)=>`
//     <article class="slide">
//       <div class="slide-top">
//         <div class="work-name">${w.name}</div>
//         <div class="work-number">${String(i+1).padStart(2,"0")} / ${String(works.length).padStart(2,"0")}</div>
//       </div>
//       <div class="compare">
//         <div>
//           <div class="panel-label"><strong>ORIGINAL</strong><span></span></div>
//           ${imageHTML(w.original,"원본 이미지","ORIGINAL IMAGE")}
//           <div class="caption"></div>
//         </div>
//         <div>
//           <div class="panel-label"><strong>LETTERED</strong><span></span></div>
//           ${imageHTML(w.lettered,"식자 작업 이미지","LETTERED IMAGE")}
//           <div class="caption"></div>
//         </div>
//       </div>
//     </article>
//   `).join("");

//   dots.innerHTML=works.map((_,i)=>`<button class="dot ${i===0?'active':''}" aria-label="${i+1}번 작업"></button>`).join("");
//   document.querySelectorAll(".dot").forEach((d,i)=>d.onclick=()=>go(i));
//   update();
// }

function render(){
  track.innerHTML=works.map((w,i)=>`
    <article class="slide">
      <div class="slide-top">
        <h2 class="section-title">${w.name}</h2>
        <div class="work-number">${String(i+1).padStart(2,"0")} / ${String(works.length).padStart(2,"0")}</div>
      </div>
      <div class="compare">
        <div>
          <div class="panel-label"><strong>ORIGINAL</strong><span></span></div>
          ${imageHTML(w.original,"원본 이미지","ORIGINAL IMAGE")}
          <div class="caption"></div>
        </div>
        <div>
          <div class="panel-label"><strong>LETTERED</strong><span></span></div>
          ${imageHTML(w.lettered,"식자 작업 이미지","LETTERED IMAGE")}
          <div class="caption"></div>
        </div>
      </div>
    </article>
  `).join("");

  dots.innerHTML=works.map((_,i)=>`<button class="dot ${i===0?'active':''}" aria-label="${i+1}번 작업"></button>`).join("");
  document.querySelectorAll(".dot").forEach((d,i)=>d.onclick=()=>go(i));
  update();
}



function go(index){
  current=(index+works.length)%works.length;
  update();
}
function update(){
  track.style.transform=`translateX(-${current*100}%)`;
  document.querySelectorAll(".dot").forEach((d,i)=>d.classList.toggle("active",i===current));
  counter.textContent=`${String(current+1).padStart(2,"0")}  /  ${String(works.length).padStart(2,"0")}`;
}
document.getElementById("prev").onclick=()=>go(current-1);
document.getElementById("next").onclick=()=>go(current+1);

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft")go(current-1);
  if(e.key==="ArrowRight")go(current+1);
});

// 슬라이드 내 두 이미지 박스의 스크롤을 비율(%)로 동기화하는 함수
function initSyncScroll() {
  document.querySelectorAll('.compare').forEach(compare => {
    const boxes = compare.querySelectorAll('.image-box');
    if (boxes.length < 2) return;

    let isSyncing = false;

    boxes.forEach((box, index) => {
      box.onscroll = () => {
        if (isSyncing) return;
        isSyncing = true;

        const otherBox = boxes[index === 0 ? 1 : 0];
        // 현재 박스의 스크롤 비율(%) 계산
        const percentage = box.scrollTop / (box.scrollHeight - box.clientHeight);
        
        // 상대 박스도 동일한 비율(%) 위치로 이동
        otherBox.scrollTop = percentage * (otherBox.scrollHeight - otherBox.clientHeight);

        setTimeout(() => { isSyncing = false; }, 10);
      };
    });
  });
}

// update 함수가 실행될 때마다 스크롤 동기화 재설정
const originalUpdate = update;
update = function() {
  originalUpdate();
  setTimeout(initSyncScroll, 50); // 이미지가 로드될 시간을 살짝 줍니다.
};




// 가로 드래그로 슬라이드 넘기기
(function initDragSlider(){
  const slider = document.querySelector(".slider");
  if (!slider) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startTranslate = 0;
  let lastX = 0;
  let dragStarted = false;
  let suppressClick = false;

  function getWidth(){
    return slider.clientWidth || 1;
  }

  function getTranslate(){
    return -current * getWidth();
  }

  function setDragTranslate(x){
    track.style.transform = `translateX(${x}px)`;
  }

  slider.addEventListener("dragstart", (e) => {
    // 이미지의 브라우저 기본 드래그(이미지가 마우스를 따라오는 현상) 차단
    e.preventDefault();
  });

  slider.addEventListener("pointerdown", (e) => {
    // 버튼/닷을 누른 경우에는 드래그 시작하지 않음
    if (e.target.closest(".arrow, .dot, button, a")) return;

    e.preventDefault();
    isDragging = true;
    dragStarted = false;
    startX = lastX = e.clientX;
    startY = e.clientY;
    startTranslate = getTranslate();

    track.style.transition = "none";
    slider.setPointerCapture?.(e.pointerId);
  });

  slider.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // 세로 스크롤 의도가 더 강하면 드래그 슬라이드를 취소
    if (!dragStarted) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
        isDragging = false;
        track.style.transition = "";
        return;
      }
      if (Math.abs(dx) < 6) return;
      dragStarted = true;
      suppressClick = true;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      lastX = e.clientX;
      setDragTranslate(startTranslate + dx);
    }
  });

  function endDrag(e){
    if (!isDragging) return;
    isDragging = false;

    const dx = lastX - startX;
    const threshold = Math.min(120, getWidth() * 0.18);

    track.style.transition = "";

    if (dragStarted && Math.abs(dx) >= threshold) {
      go(current + (dx < 0 ? 1 : -1));
    } else {
      update();
    }

    if (e?.pointerId != null) {
      try { slider.releasePointerCapture?.(e.pointerId); } catch (_) {}
    }

    setTimeout(() => { suppressClick = false; }, 0);
  }

  slider.addEventListener("pointerup", endDrag);
  slider.addEventListener("pointercancel", endDrag);
  slider.addEventListener("lostpointercapture", () => {
    if (isDragging) endDrag();
  });

  slider.addEventListener("click", (e) => {
    if (suppressClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // 창 크기가 바뀌어도 현재 슬라이드 위치 유지
  window.addEventListener("resize", () => {
    if (!isDragging) update();
  });
})();

render();