const $=(q,root=document)=>root.querySelector(q),$$=(q,root=document)=>[...root.querySelectorAll(q)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('js-ready');
const toastBox=$('#toast');let toastTimer;
function toast(text){toastBox.textContent=text;toastBox.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastBox.classList.remove('visible'),3500);}
const reveals=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('visible');reveals.unobserve(item.target);}}),{threshold:.08});
$$('.reveal').forEach(el=>reveals.observe(el));
const chapters=$$('.chapter'),header=$('#header'),navLinks=$$('.desktop-nav a');
let scrollTick=false,presentation=false,currentChapter=0;
function updateScroll(){
 const y=scrollY,total=document.documentElement.scrollHeight-innerHeight;
 $('.scroll-progress').style.width=(total>0?y/total*100:0)+'%';
 header.classList.toggle('scrolled',y>80);
 let index=0;
 chapters.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.38)index=i;});
 if(!presentation)currentChapter=index;
 navLinks.forEach(a=>a.classList.toggle('active',a.hash==='#'+chapters[index].id));
 $('#present-section').value=String(currentChapter);$('#present-count').textContent=String(currentChapter+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0');
 scrollTick=false;
}
addEventListener('scroll',()=>{if(!scrollTick){requestAnimationFrame(updateScroll);scrollTick=true;}},{passive:true});
updateScroll();
const menuToggle=$('.menu-toggle'),mobileNav=$('.mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','เปิดเมนู');menuToggle.innerHTML='<svg><use href="#i-menu"/></svg>';}
menuToggle.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'ปิดเมนู':'เปิดเมนู');menuToggle.innerHTML='<svg><use href="'+(open?'#i-close':'#i-menu')+'"/></svg>';});
$$('a',mobileNav).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!mobileNav.hidden&&!mobileNav.contains(e.target)&&!menuToggle.contains(e.target))closeMenu();});
if(!reduced){$('.hero').addEventListener('pointermove',e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');e.currentTarget.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');},{passive:true});}
const modelData=[
 {id:'tiger',name:'เสือสมิง',latin:'BLOODFANG TIGER',type:'THREAT / CHARACTER',desc:'นักล่าหลักในต้นแบบเกม ออกแบบจังหวะเดิน วิ่ง กัด และกระโจน ให้การเคลื่อนไหวสัมพันธ์กับการไล่ตาม',learn:'สังเกตจังหวะก้าว จุดสัมผัสพื้น ทิศทางโมเดล และการเชื่อมอนิเมชันกับกติกาการโจมตี',credit:'ปั้นและเตรียม Rig ใน Blender ทดสอบอนิเมชันใน Roblox Studio',view:'35deg 76deg auto'},
 {id:'ghost',name:'ผีในป่า',latin:'HOLLOW SHAMAN',type:'THREAT / CHARACTER',desc:'ตัวละครที่สื่อความผิดปกติผ่านภาษากาย มีท่าอยู่นิ่ง เดิน วิ่ง และคว้าคอสำหรับระบบเผชิญหน้าในเกม',learn:'ทดลองทำให้ท่าทางบอกอารมณ์ พร้อมตรวจตำแหน่งแขนและมุมมองของผู้เล่นขณะเกิดปฏิสัมพันธ์',credit:'ปั้นโมเดลและเตรียมโครงกระดูกใน Blender ทดสอบกับกล้องบุคคลที่หนึ่ง',view:'25deg 80deg auto'},
 {id:'deer',name:'กวาง',latin:'SPOTTED DEER',type:'WILDLIFE / ANIMATION',desc:'สัตว์ป่าที่ช่วยให้สภาพแวดล้อมรู้สึกมีชีวิต มีท่าวิ่ง ก้มกิน และล้มลงเมื่อถูกยิง ก่อนค้างท่านอนนิ่ง',learn:'แยกท่าเริ่ม–ท่าวน–ท่าจบ และออกแบบท่าตายให้ต่อเนื่องกับการหยุดเคลื่อนไหว',credit:'ปั้นโมเดลและพัฒนา Rig พร้อมชุดอนิเมชันผ่าน Blender',view:'35deg 78deg auto'},
 {id:'boar',name:'หมูป่า',latin:'WILD BOAR',type:'WILDLIFE / ANIMATION',desc:'ทดลองจังหวะการวิ่งของสัตว์ที่มีลำตัวหนัก ร่วมกับท่าก้มกินและชุดการเคลื่อนไหวเมื่อถูกยิง',learn:'สังเกตน้ำหนักลำตัว การยืดและย่อของขา และความต่อเนื่องของท่าทางที่ใช้วนซ้ำ',credit:'ปั้นโมเดลและเตรียมอนิเมชันใน Blender',view:'35deg 78deg auto'},
 {id:'rabbit',name:'กระต่าย',latin:'FOREST HARE',type:'WILDLIFE / ANIMATION',desc:'สัตว์ขนาดเล็กที่มีจังหวะวิ่งต่างจากกวางและหมูป่า ใช้ท่ากระโดดและท่าก้มกินเพื่อสร้างรายละเอียดในป่า',learn:'ทดลองการเคลื่อนที่ที่มีช่วงลอยตัว และการจัดการสัดส่วนกระดูกของตัวละครขนาดเล็ก',credit:'ปั้นโมเดลและเตรียม Rig พร้อมอนิเมชันผ่าน Blender',view:'35deg 78deg auto'},
 {id:'machete',name:'มีดและปลอก',latin:'FOREST MACHETE',type:'PROP / EQUIPMENT',desc:'อุปกรณ์ที่แยกมีดกับปลอกเป็นคนละชิ้น เพื่อเตรียมท่าชัก เก็บ ถือ และฟันในมุมมองบุคคลที่หนึ่ง',learn:'ตรวจด้านคมของมีด ตำแหน่งยึดอาวุธ และการจัดท่าทางทั้งแขนให้การใช้งานรู้สึกมั่นคง',credit:'ปั้นโมเดลและทดสอบการใช้งานร่วมกับตัวละคร R6 ใน Blender และ Roblox Studio',view:'35deg 65deg auto'},
 {id:'shotgun',name:'ปืนเดินป่า',latin:'FOREST SHOTGUN',type:'PROP / EQUIPMENT',desc:'โมเดลต้นแบบปืนสำหรับท่าถือ เล็ง และยิงในเกม เน้นให้รูปทรงอ่านง่ายและไม่บังมุมมองของผู้เล่น',learn:'ทดลองสัดส่วนอุปกรณ์ ระยะจากกล้อง และการทำงานร่วมกันของอาวุธ แขนตัวละคร และแรงดีด',credit:'ปั้นและปรับโมเดลด้วย Blender ใช้ประกอบการทดสอบระบบอาวุธใน Roblox Studio',view:'40deg 70deg auto'}
];
let manifest=[],activeModel=0,playing=true,rotate=!reduced,viewerVisible=false,loadToken=0;
const viewer=$('#asset-viewer'),animSelect=$('#animation-select'),timeSlider=$('#animation-time'),playButton=$('#play-animation');
function animationLabel(name){
 if(/Shot_Death/i.test(name))return 'ถูกยิงและล้มลง';
 if(/Eat_Start/i.test(name))return 'เริ่มก้มกิน';if(/Eat_Loop/i.test(name))return 'ก้มกิน (วนซ้ำ)';if(/Eat_End/i.test(name))return 'เงยหน้าหลังจากกิน';
 if(/Dead/i.test(name))return 'นอนนิ่ง';if(/Roar/i.test(name))return 'คำราม / โจมตี';if(/Stalk/i.test(name))return 'ย่องเดิน';if(/Grab/i.test(name))return 'คว้าและยกตัว';
 if(/Pounce/i.test(name))return 'กระโจน';if(/Bite/i.test(name))return 'กัด';if(/Run/i.test(name))return 'วิ่ง';if(/Walk/i.test(name))return 'เดิน';if(/Idle|Breathe|Sniff/i.test(name))return 'อยู่นิ่ง / หายใจ';return name.replaceAll('_',' ');
}
function updatePlayButton(){playButton.setAttribute('aria-label',playing?'หยุดอนิเมชัน':'เล่นอนิเมชัน');playButton.innerHTML='<svg><use href="'+(playing?'#i-pause':'#i-play')+'"/></svg>';}
function startClip(){
 const clip=animSelect.value;
 if(!clip)return;
 viewer.animationName=clip;viewer.currentTime=0;playing=true;
 if(viewerVisible)viewer.play(/Shot_Death|Grab|Pounce|Bite|Roar/i.test(clip)?{repetitions:1}:{repetitions:Infinity});
 updatePlayButton();
}
function selectModel(index){
 activeModel=index;const m=modelData[index],record=manifest.find(x=>x.id===m.id);
 $$('.model-tab').forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
 $('#model-index').textContent=String(index+1).padStart(2,'0')+' / '+String(modelData.length).padStart(2,'0');
 $('#model-category').textContent=m.type;$('#model-name').textContent=m.name;$('#model-subtitle').textContent=m.latin;
 $('#model-description').textContent=m.desc;$('#model-learning').textContent=m.learn;$('#model-credit').textContent=m.credit;
 $('#model-clips').textContent=record?.animations?.length?record.animations.length+' clips':'Static prop';
 $('#model-triangles').textContent=record?record.triangles.toLocaleString()+' tris':'กำลังอ่านข้อมูล';
 $('#download-model').href='models/'+m.id+'.glb';$('#download-model').download='SMING-'+m.id+'.glb';
 viewer.classList.remove('is-loaded');viewer.setAttribute('data-ready','false');$('#model-fallback').hidden=true;$('#model-load-progress').style.width='0%';
 $('#model-load-text').textContent='กำลังโหลด '+m.name+'…';
 viewer.alt='โมเดล '+m.name+' สามมิติ สามารถหมุนและซูมดูได้';
 viewer.cameraOrbit=m.view;viewer.src='models/'+m.id+'.glb';
 animSelect.replaceChildren(new Option('กำลังอ่านอนิเมชัน…',''));animSelect.disabled=true;timeSlider.disabled=true;playButton.disabled=true;
 const token=++loadToken;
 setTimeout(()=>{if(token===loadToken&&viewer.getAttribute('data-ready')!=='true'){const t=$('#model-load-text');t.innerHTML='ไฟล์ 3 มิติกำลังโหลด กรุณารอสักครู่ &nbsp;·&nbsp; <a href="https://drive.google.com/drive/folders/18wG8fJ0JmpDbG4wnKGB4084HGvzkbHu4?usp=sharing" target="_blank" rel="noopener noreferrer" style="color:var(--gold);text-decoration:underline;text-underline-offset:3px">ดาวน์โหลดจาก Drive</a>';}},10000);
}
const tabs=$('#model-tabs');
modelData.forEach((m,i)=>{
 const b=document.createElement('button');b.type='button';b.className='model-tab';b.setAttribute('role','tab');b.setAttribute('aria-controls','model-stage');b.id='tab-'+m.id;
 b.innerHTML='<span class="model-tab-number">'+String(i+1).padStart(2,'0')+'</span><span class="model-tab-copy"><strong>'+m.name+'</strong><span>'+m.latin.split(' / ')[0]+'</span></span>';
 b.addEventListener('click',()=>selectModel(i));
 b.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();let target=e.key==='Home'?0:e.key==='End'?modelData.length-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+modelData.length)%modelData.length;selectModel(target);$$('.model-tab')[target].focus();}});
 tabs.append(b);
});
viewer.addEventListener('progress',e=>{$('#model-load-progress').style.width=Math.round(e.detail.totalProgress*100)+'%';});
viewer.addEventListener('load',()=>{
 viewer.classList.add('is-loaded');viewer.setAttribute('data-ready','true');
 const clips=viewer.availableAnimations||[];
 animSelect.replaceChildren();clips.forEach(name=>animSelect.add(new Option(animationLabel(name),name)));
 if(!clips.length)animSelect.add(new Option('โมเดลอุปกรณ์ · ไม่มีอนิเมชัน',''));
 animSelect.disabled=!clips.length;playButton.disabled=!clips.length;timeSlider.disabled=!clips.length;
 $('#model-clips').textContent=clips.length?clips.length+' clips':'Static prop';
 if(clips.length){animSelect.value=clips.find(x=>/Idle|Breathe|Sniff/i.test(x))||clips[0];startClip();}
 else{playing=false;$('#animation-clock').textContent='—';updatePlayButton();}
 viewer.autoRotate=rotate&&viewerVisible;
});
viewer.addEventListener('error',()=>{$('#model-fallback').hidden=false;viewer.classList.add('is-loaded');viewer.setAttribute('data-ready','error');});
viewer.addEventListener('finished',()=>{playing=false;updatePlayButton();});
$('#retry-model').addEventListener('click',()=>{const src=viewer.src;viewer.removeAttribute('src');requestAnimationFrame(()=>{viewer.src=src;$('#model-fallback').hidden=true;viewer.classList.remove('is-loaded');});});
animSelect.addEventListener('change',startClip);
playButton.addEventListener('click',()=>{playing=!playing;if(playing){if(viewer.currentTime>=viewer.duration-.05)viewer.currentTime=0;viewer.play(/Shot_Death|Grab|Pounce|Bite|Roar/i.test(animSelect.value)?{repetitions:1}:{repetitions:Infinity});}else viewer.pause();updatePlayButton();});
timeSlider.addEventListener('input',()=>{playing=false;viewer.pause();viewer.currentTime=Number(timeSlider.value)/1000*(viewer.duration||0);updatePlayButton();});
$('#rotate-model').addEventListener('click',e=>{rotate=!rotate;viewer.autoRotate=rotate&&viewerVisible;const b=e.currentTarget;b.classList.toggle('active',rotate);b.setAttribute('aria-pressed',String(rotate));b.setAttribute('aria-label',rotate?'หยุดหมุนโมเดลอัตโนมัติ':'หมุนโมเดลอัตโนมัติ');});
if(reduced){$('#rotate-model').classList.remove('active');$('#rotate-model').setAttribute('aria-pressed','false');viewer.autoRotate=false;}
$('#reset-model').addEventListener('click',()=>{viewer.cameraOrbit=modelData[activeModel].view;viewer.cameraTarget='auto auto auto';viewer.fieldOfView='30deg';viewer.resetTurntableRotation?.();toast('คืนมุมกล้องเริ่มต้นแล้ว');});
$$('[data-light]').forEach(button=>button.addEventListener('click',()=>{
 const forest=button.dataset.light==='forest';$('#model-stage').classList.toggle('forest-light',forest);viewer.exposure=forest?.65:1.3;
 $$('[data-light]').forEach(b=>{const chosen=b===button;b.classList.toggle('active',chosen);b.setAttribute('aria-pressed',String(chosen));});
}));
$('#fullscreen-model').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('#model-stage').requestFullscreen();}catch{toast('เบราว์เซอร์นี้ไม่รองรับการดูเต็มจอ ลองเปิดบน Chrome หรือ Edge');}});
new IntersectionObserver(entries=>{viewerVisible=entries[0].isIntersecting;if(viewerVisible){if(playing&&animSelect.value)viewer.play(/Shot_Death|Grab|Pounce|Bite|Roar/i.test(animSelect.value)?{repetitions:1}:{repetitions:Infinity});viewer.autoRotate=rotate;}else{viewer.pause?.();viewer.autoRotate=false;}},{threshold:.1}).observe($('#model-stage'));
function modelClock(){if(viewerVisible&&viewer.duration&&viewer.getAttribute('data-ready')==='true'){if(document.activeElement!==timeSlider)timeSlider.value=String(Math.round(viewer.currentTime/viewer.duration*1000));$('#animation-clock').textContent=viewer.currentTime.toFixed(1)+'s';}requestAnimationFrame(modelClock);}
async function initModels(){
 // ตรวจว่าเปิดผ่าน file:// หรือเปล่า (model-viewer ทำงานไม่ได้กับ file://)
 if(location.protocol==='file:'){
  $('#model-load-text').textContent='เปิดจาก file:// — โมเดลต้องเปิดผ่าน HTTP server';
  selectModel(0);modelClock();return;
 }
 try{manifest=await(await fetch('models/manifest.json')).json();}catch{}
 try{await Promise.race([customElements.whenDefined('model-viewer'),new Promise(r=>setTimeout(r,5000))]);}catch{}
 selectModel(0);modelClock();
}
initModels().catch(()=>{$('#model-fallback').hidden=false;});
// The following is an explanatory simulation, independent from the live Roblox game.
let fire=true,onPlatform=true,darkElapsed=0,simAngle=0,lastSim=performance.now(),tigerPos={x:455,y:165},ghostPos={x:126,y:165};
const fireButton=$('#toggle-fire'),platformButton=$('#toggle-platform'),simState=$('#sim-status'),distanceInput=$('#threat-distance');
function updateSimulation(){
 $('#sim-scene').classList.toggle('dark',!fire);
 fireButton.setAttribute('aria-pressed',String(fire));fireButton.innerHTML=fire?'ดับไฟบนห้าง <span>↗</span>':'เติมไฟบนห้าง <span>↗</span>';
 platformButton.setAttribute('aria-pressed',String(onPlatform));platformButton.textContent=onPlatform?'ลงจากห้าง':'กลับขึ้นห้าง';
 $('#sim-player').setAttribute('transform',onPlatform?'translate(0 0)':'translate(85 95)');
 const unsafe=!fire&&onPlatform&&darkElapsed>=20;
 let text=fire?(onPlatform?'ไฟติด · ศัตรูวนอยู่ด้านล่าง':'อยู่บนพื้น · ศัตรูเริ่มไล่ตาม'):onPlatform?(unsafe?'ครบ 20 วินาที · ผีเริ่มขึ้นห้าง':'ไฟดับ · ศัตรูถอยไปซ่อนรอ'):'อยู่บนพื้น · ศัตรูออกจากที่ซ่อน';
 simState.classList.toggle('danger',unsafe||!onPlatform);simState.replaceChildren();const dot=document.createElement('span');dot.className='status-dot';simState.append(dot,document.createTextNode(text));
 const timer=$('#dark-timer');timer.hidden=fire||!onPlatform;timer.textContent=String(Math.max(0,Math.ceil(20-darkElapsed)));
 updateDistance();
}
function updateDistance(){
 const distance=Number(distanceInput.value),chased=!onPlatform||(!fire&&darkElapsed>=20);
 $('#distance-label').textContent=String(distance);
 let text,level=0;
 if(!chased)text=fire?'บนห้างมีไฟ · ยังไม่เกิดการไล่ตาม':'หลบบนห้างมืด · รอครบ 20 วินาที';
 else if(distance>740)text='อยู่นอกระยะรับรู้ปกติ';
 else if(distance>200)text='เริ่มไล่ตาม · ยังไม่เข้าระยะกล้องเตือน';
 else{text='เข้าระยะ 200 · กล้องซูมออกและสั่นตามระยะ';level=(200-distance)/200;}
 $('#distance-status').textContent=text;$('#fear-level').style.width=(level*100)+'%';
 $('.simulation').classList.toggle('near-threat',level>.08);
}
fireButton.addEventListener('click',()=>{fire=!fire;darkElapsed=0;updateSimulation();});
platformButton.addEventListener('click',()=>{onPlatform=!onPlatform;darkElapsed=0;updateSimulation();});
$('#reset-sim').addEventListener('click',()=>{fire=true;onPlatform=true;darkElapsed=0;distanceInput.value='360';updateSimulation();});
distanceInput.addEventListener('input',updateDistance);
let simVisible=false;new IntersectionObserver(e=>simVisible=e[0].isIntersecting,{threshold:.05}).observe($('.simulation'));
function simLoop(now){
 const dt=Math.min((now-lastSim)/1000,.1);lastSim=now;
 if(simVisible){
  if(!fire&&onPlatform){const old=Math.ceil(20-darkElapsed);darkElapsed=Math.min(20,darkElapsed+dt);if(Math.ceil(20-darkElapsed)!==old)updateSimulation();}
  if(!reduced)simAngle+=dt*.22;
  let t,g;
  if(!onPlatform){t={x:350+Math.cos(simAngle*1.5)*13,y:245};g={x:405,y:245+Math.sin(simAngle)*10};}
  else if(fire){t={x:290+Math.cos(simAngle)*164,y:165+Math.sin(simAngle)*105};g={x:290+Math.cos(simAngle+Math.PI)*164,y:165+Math.sin(simAngle+Math.PI)*105};}
  else{t={x:65,y:80};g=darkElapsed>=20?{x:292,y:168}:{x:500,y:85};}
  for(const [id,pos,goal]of[['sim-tiger',tigerPos,t],['sim-ghost',ghostPos,g]]){const k=reduced?1:1-Math.exp(-2*dt);pos.x+=(goal.x-pos.x)*k;pos.y+=(goal.y-pos.y)*k;$('#'+id).setAttribute('transform','translate('+pos.x.toFixed(2)+' '+pos.y.toFixed(2)+')');}
 }
 requestAnimationFrame(simLoop);
}
updateSimulation();requestAnimationFrame(simLoop);
$$('.case-toggle').forEach(button=>button.addEventListener('click',()=>{const expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));const content=$('#'+button.getAttribute('aria-controls'));content.hidden=expanded;$('.case-symbol',button).textContent=expanded?'+':'−';if(!expanded&&!reduced)content.animate([{opacity:0,transform:'translateY(-6px)'},{opacity:1,transform:'none'}],{duration:350,easing:'ease-out'});}));
const mediaDialog=$('#media-dialog'),mediaContent=$('#media-content');
let lightboxItems=[],lightboxIndex=0;

function buildLightboxItems(clickedCard){
  // รวบรวม item ทุกอันในกลุ่มเดียวกัน (same data-grid) รวมทั้งที่ซ่อนอยู่
  const grid=clickedCard.closest('[data-grid]');
  if(!grid){lightboxItems=[];lightboxIndex=0;return;}
  // ดึงทุก card ที่มองเห็น (ไม่ถูก show-more ซ่อน และไม่ถูก filter ซ่อน)
  const cards=[...grid.querySelectorAll('.work-card[data-image],.work-card[data-open-video]')]
    .filter(c=>!c.classList.contains('show-more-hidden')&&!c.hidden);
  // ถ้า clickedCard ไม่อยู่ใน visible list (เช่นเพิ่งกด show-more) ให้ใช้ all cards แทน
  const allCards=[...grid.querySelectorAll('.work-card[data-image],.work-card[data-open-video]')];
  const useCards=cards.includes(clickedCard)?cards:allCards;
  lightboxItems=useCards.map(c=>({
    title:c.dataset.videoTitle||c.dataset.title||'',
    caption:c.dataset.caption||'',
    image:c.dataset.image||null,
    video:c.dataset.openVideo||null
  }));
  lightboxIndex=useCards.indexOf(clickedCard);
}

function showLightboxItem(index){
  if(!lightboxItems.length)return;
  lightboxIndex=Math.max(0,Math.min(lightboxItems.length-1,index));
  const item=lightboxItems[lightboxIndex];
  // หยุดวิดีโอเก่า
  const oldVideo=$('video',mediaContent);
  if(oldVideo){oldVideo.pause();oldVideo.removeAttribute('src');oldVideo.load();}
  mediaContent.replaceChildren();
  $('#media-title').textContent=item.title;
  $('#media-description').textContent=item.caption;
  if(item.video){
    const el=document.createElement('video');
    el.src=item.video;el.controls=true;el.playsInline=true;el.autoplay=true;
    el.setAttribute('aria-label',item.title);mediaContent.append(el);
  } else {
    const el=document.createElement('img');
    el.src=item.image;el.alt=item.title;mediaContent.append(el);
  }
  // อัปเดต prev/next
  const prevBtn=$('#lb-prev'),nextBtn=$('#lb-next');
  if(prevBtn)prevBtn.disabled=lightboxIndex<=0;
  if(nextBtn)nextBtn.disabled=lightboxIndex>=lightboxItems.length-1;
  // แสดง counter
  const counter=$('#lb-counter');
  if(counter)counter.textContent=(lightboxIndex+1)+' / '+lightboxItems.length;
}

function openMedia({title,caption='',image,video,card}){
  if(card)buildLightboxItems(card);
  else{lightboxItems=[];lightboxIndex=0;}
  if(lightboxItems.length===0){
    lightboxItems=[{title,caption,image:image||null,video:video||null}];
    lightboxIndex=0;
  }
  showLightboxItem(lightboxIndex);
  mediaDialog.showModal();
}
$$('[data-image]').forEach(b=>b.addEventListener('click',()=>openMedia({title:b.dataset.title,caption:b.dataset.caption,image:b.dataset.image,card:b})));
$$('[data-open-video]').forEach(b=>b.addEventListener('click',()=>openMedia({title:b.dataset.videoTitle,video:b.dataset.openVideo,caption:'วิดีโอตัวอย่างจากขั้นตอนเตรียมอนิเมชันใน Blender',card:b})));
$$('dialog').forEach(dialog=>{
 $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
});
// lightbox prev/next buttons
const lbPrev=$('#lb-prev'),lbNext=$('#lb-next');
if(lbPrev)lbPrev.addEventListener('click',e=>{e.stopPropagation();showLightboxItem(lightboxIndex-1);});
if(lbNext)lbNext.addEventListener('click',e=>{e.stopPropagation();showLightboxItem(lightboxIndex+1);});
mediaDialog.addEventListener('close',()=>{const video=$('video',mediaContent);if(video){video.pause();video.removeAttribute('src');video.load();}mediaContent.replaceChildren();});
$('#open-blueprint').addEventListener('click',()=>$('#blueprint-dialog').showModal());
let galleryFilter='all';
function filterGallery(filter){
  galleryFilter=filter;
  $$('[data-filter]').forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  // แสดง/ซ่อน gallery-group ตามหมวด
  $$('.gallery-group').forEach(group=>{
    const kind=group.dataset.group;
    const show=filter==='all'||filter===kind;
    group.hidden=!show;
  });
  // แสดง/ซ่อน work-card ใน grid
  $$('.work-card[data-kind]').forEach(card=>{
    card.hidden=filter!=='all'&&card.dataset.kind!==filter;
  });
  // เมื่อ filter เปลี่ยน ให้ขยาย show-more ออกทั้งหมด เพื่อให้เห็นทุกชิ้นในหมวดนั้น
  $$('.show-more-btn').forEach(btn=>{
    if(btn.dataset.expanded==='false')return; // ยังไม่ได้กด — ไม่ต้องแตะ
    // ถ้า filter ไม่ใช่ all และเป็น group อื่น ไม่ต้องทำอะไร
  });
  // ถ้า filter ไปที่หมวดใดหมวดหนึ่ง ให้ขยาย show-more ของกลุ่มนั้นออกอัตโนมัติ
  $$('.gallery-group:not([hidden]) .show-more-btn').forEach(btn=>{
    if(btn.dataset.expanded==='false'){
      // expand อัตโนมัติ
      const group=btn.closest('.gallery-group');
      const grid=group&&group.querySelector('.work-grid');
      if(!grid)return;
      const cards=[...grid.querySelectorAll('.work-card')].filter(c=>c.dataset.image||c.dataset.openVideo);
      cards.forEach((c,i)=>{if(i>=SHOW_MORE_THRESHOLD)c.classList.remove('show-more-hidden');});
      btn.dataset.expanded='true';
      btn.classList.add('is-expanded');
      btn.querySelector('.show-more-label').textContent='ซ่อนรูปเพิ่มเติม';
      btn.querySelector('.show-more-count').textContent='';
    }
  });
  if(!reduced){
    $$('.gallery-group:not([hidden])').forEach(g=>g.animate([{opacity:.4},{opacity:1}],{duration:300}));
  }
  updateGroupCounts();
}
function updateGroupCounts(){
  $$('.gallery-group').forEach(group=>{
    const kind=group.dataset.group;
    const total=$$('.work-card[data-kind="'+kind+'"]',group).length;
    const label=group.querySelector('.gallery-group-count');
    if(label)label.textContent=total+' items';
  });
}
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>filterGallery(b.dataset.filter)));
updateGroupCounts();

// ===== SHOW MORE / COLLAPSE =====
const SHOW_MORE_THRESHOLD = 6; // แสดงกี่ชิ้นก่อนซ่อน

function initShowMore(){
  $$('.gallery-group').forEach(group=>{
    const grid=group.querySelector('.work-grid');
    if(!grid)return;
    // นับเฉพาะ work-card จริง (ไม่นับ pending-card / design-card ที่ไม่มีรูป)
    const cards=[...grid.querySelectorAll('.work-card')].filter(c=>c.dataset.image||c.dataset.openVideo);
    if(cards.length<=SHOW_MORE_THRESHOLD)return; // ไม่ต้องมีปุ่มถ้าน้อยพอ

    // ซ่อน card ที่เกิน threshold
    cards.forEach((c,i)=>{if(i>=SHOW_MORE_THRESHOLD)c.classList.add('show-more-hidden');});

    // สร้างปุ่ม
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='show-more-btn';
    btn.dataset.expanded='false';
    btn.innerHTML='<span class="show-more-label">ดูเพิ่มเติม</span><span class="show-more-count">+'+String(cards.length-SHOW_MORE_THRESHOLD)+'</span><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>';
    group.appendChild(btn);

    btn.addEventListener('click',()=>{
      const expanded=btn.dataset.expanded==='true';
      btn.dataset.expanded=expanded?'false':'true';
      cards.forEach((c,i)=>{
        if(i>=SHOW_MORE_THRESHOLD){
          c.classList.toggle('show-more-hidden',expanded);
          // trigger lightbox re-index ไม่จำเป็น เพราะ buildLightboxItems ดึงทุก card อยู่แล้ว
        }
      });
      const label=btn.querySelector('.show-more-label');
      const count=btn.querySelector('.show-more-count');
      if(expanded){
        label.textContent='ดูเพิ่มเติม';
        count.textContent='+'+String(cards.length-SHOW_MORE_THRESHOLD);
        btn.classList.remove('is-expanded');
        // scroll กลับมาให้เห็น group
        if(!reduced)group.scrollIntoView({behavior:'smooth',block:'nearest'});
      } else {
        label.textContent='ซ่อนรูปเพิ่มเติม';
        count.textContent='';
        btn.classList.add('is-expanded');
        if(!reduced)btn.scrollIntoView({behavior:'smooth',block:'nearest'});
      }
    });
  });
}
initShowMore();
const presentationBar=$('.presentation-bar'),presentSelect=$('#present-section');
chapters.forEach((chapter,i)=>presentSelect.add(new Option(String(i+1).padStart(2,'0')+' — '+chapter.dataset.chapter,String(i))));
function goChapter(index){index=Math.max(0,Math.min(chapters.length-1,index));currentChapter=index;presentSelect.value=String(index);$('#present-count').textContent=String(index+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0');chapters[index].scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});}
function setPresentation(value){presentation=value;document.body.classList.toggle('presenting',value);presentationBar.hidden=!value;closeMenu();if(value){goChapter(0);toast('ใช้ปุ่ม ← → เปลี่ยนหัวข้อ และ Esc เพื่อออก');}else updateScroll();}
$$('[data-present]').forEach(b=>b.addEventListener('click',()=>setPresentation(true)));
$('#present-close').addEventListener('click',()=>setPresentation(false));$('#present-prev').addEventListener('click',()=>goChapter(currentChapter-1));$('#present-next').addEventListener('click',()=>goChapter(currentChapter+1));
presentSelect.addEventListener('change',()=>goChapter(Number(presentSelect.value)));
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){closeMenu();if(presentation&&!$$('dialog[open]').length)setPresentation(false);}
 // lightbox keyboard navigation
 if(mediaDialog.open){
  if(e.key==='ArrowLeft'){e.preventDefault();showLightboxItem(lightboxIndex-1);}
  if(e.key==='ArrowRight'){e.preventDefault();showLightboxItem(lightboxIndex+1);}
 }
 if(presentation&&!$$('dialog[open]').length&&!['INPUT','SELECT','TEXTAREA','MODEL-VIEWER'].includes(document.activeElement?.tagName)){
  if(e.key==='ArrowRight'){e.preventDefault();goChapter(currentChapter+1);}if(e.key==='ArrowLeft'){e.preventDefault();goChapter(currentChapter-1);}
 }
});
$('#print-portfolio').addEventListener('click',()=>window.print());let beforePrintFilter='all';
addEventListener('beforeprint',()=>{beforePrintFilter=galleryFilter;filterGallery('all');$$('.reveal').forEach(x=>x.classList.add('visible'));});
addEventListener('afterprint',()=>filterGallery(beforePrintFilter));
// Quiet, procedural wind and insect tones. Sound starts only after an explicit click.
let audioContext,ambientGain,ambientOn=false,chirpInterval;
const soundButtons=$$('.sound-toggle');
function updateSoundButtons(){soundButtons.forEach(b=>{b.setAttribute('aria-pressed',String(ambientOn));b.setAttribute('aria-label',ambientOn?'ปิดเสียงบรรยากาศป่า':'เปิดเสียงบรรยากาศป่า');b.innerHTML='<svg><use href="'+(ambientOn?'#i-sound':'#i-mute')+'"/></svg>';b.classList.toggle('active',ambientOn);});}
async function toggleSound(){
 try{
  if(!audioContext){
   const AC=window.AudioContext||window.webkitAudioContext;if(!AC){toast('เบราว์เซอร์นี้ไม่รองรับเสียงบรรยากาศ');return;}
   audioContext=new AC();ambientGain=audioContext.createGain();ambientGain.gain.value=0;ambientGain.connect(audioContext.destination);
   const buffer=audioContext.createBuffer(1,audioContext.sampleRate*4,audioContext.sampleRate),samples=buffer.getChannelData(0);let previous=0;
   for(let i=0;i<samples.length;i++){const white=Math.random()*2-1;previous=(previous+.02*white)/1.02;samples[i]=previous*3.5;}
   const noise=audioContext.createBufferSource();noise.buffer=buffer;noise.loop=true;
   const filter=audioContext.createBiquadFilter();filter.type='lowpass';filter.frequency.value=600;noise.connect(filter);filter.connect(ambientGain);noise.start();
   chirpInterval=setInterval(()=>{if(!ambientOn||document.hidden)return;const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(),t=audioContext.currentTime;oscillator.type='sine';oscillator.frequency.setValueAtTime(2800+Math.random()*900,t);gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.009,t+.05);gain.gain.exponentialRampToValueAtTime(.0001,t+.5);oscillator.connect(gain);gain.connect(ambientGain);oscillator.start(t);oscillator.stop(t+.55);},1350);
  }
  await audioContext.resume();ambientOn=!ambientOn;ambientGain.gain.cancelScheduledValues(audioContext.currentTime);ambientGain.gain.setTargetAtTime(ambientOn?.16:0,audioContext.currentTime,.35);updateSoundButtons();toast(ambientOn?'เปิดเสียงป่าเบา ๆ แล้ว':'ปิดเสียงบรรยากาศแล้ว');
 }catch{toast('เปิดเสียงไม่ได้ในเบราว์เซอร์นี้');}
}
soundButtons.forEach(b=>b.addEventListener('click',toggleSound));
document.addEventListener('visibilitychange',()=>{if(audioContext&&ambientGain){ambientGain.gain.setTargetAtTime(document.hidden?0:ambientOn?.16:0,audioContext.currentTime,.2);}});
const canvas=$('#fireflies'),ctx=canvas.getContext('2d');let flies=[];
function resizeCanvas(){const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);flies=Array.from({length:innerWidth<700?15:30},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,phase:Math.random()*Math.PI*2,r:.5+Math.random()*.9,s:.12+Math.random()*.25}));}
let lastCanvas=0;
function drawCanvas(now){if(!reduced&&now-lastCanvas>32&&!document.hidden){lastCanvas=now;ctx.clearRect(0,0,innerWidth,innerHeight);for(const f of flies){f.x+=Math.sin(now*.0002+f.phase)*.15;f.y-=f.s;if(f.y<0)f.y=innerHeight;if(f.x<0)f.x=innerWidth;if(f.x>innerWidth)f.x=0;const alpha=(Math.sin(now*.001+f.phase)+1)*.15;ctx.beginPath();ctx.fillStyle='rgba(209,194,139,'+alpha+')';ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();}}requestAnimationFrame(drawCanvas);}
if(!reduced){resizeCanvas();addEventListener('resize',resizeCanvas,{passive:true});requestAnimationFrame(drawCanvas);}
fetch('content.json').then(r=>r.json()).then(content=>{if(content.ownerName)$$('[data-owner]').forEach(el=>el.textContent=content.ownerName);}).catch(()=>{});

