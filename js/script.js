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



render();