(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const root=document.documentElement;$('#y').textContent=new Date().getFullYear();

/* theme with circular reveal */
try{const t=localStorage.getItem('theme');root.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}
function toggle(e){const next=root.dataset.theme==='dark'?'light':'dark',apply=()=>{root.dataset.theme=next;try{localStorage.setItem('theme',next)}catch(_){}};
 if(!document.startViewTransition||reduce)return apply();
 const x=e?.clientX??innerWidth/2,y=e?.clientY??0,r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
 document.startViewTransition(apply).ready.then(()=>root.animate({clipPath:[`circle(0 at ${x}px ${y}px)`,`circle(${r}px at ${x}px ${y}px)`]},{duration:650,easing:'ease-in',pseudoElement:'::view-transition-new(root)'}))}
$('#theme').onclick=toggle;

/* text scramble */
const G='!<>-_/[]{}=+*^?#';
function scramble(el,txt,d=900){if(reduce){el.innerHTML=txt;return}const t0=performance.now();
 (function f(n){const p=Math.min((n-t0)/d,1);el.textContent=[...txt].map((c,i)=>c===' '||c==='\n'?c:(i/txt.length<p?c:G[Math.random()*G.length|0])).join('');if(p<1)requestAnimationFrame(f)})(t0)}
const nm=$('#name');nm.addEventListener('pointerenter',()=>{const h=nm.innerHTML;nm.dataset.h=h;scramble(nm,'Neel Bhavsar',700);setTimeout(()=>nm.innerHTML=nm.dataset.h,720)});
const roles=['Full Stack Developer','MERN Stack Developer','PHP & MySQL Developer','Data Entry & Office Support'];let ri=0;
setInterval(()=>{ri=(ri+1)%roles.length;scramble($('#role'),roles[ri],600)},3000);

/* cursor */
if(fine){document.body.classList.add('cur');let mx=0,my=0,rx=0,ry=0;const dot=$('#dot'),ring=$('#ring');
 addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`;const el=e.target.closest('[data-cursor]');ring.classList.toggle('big',!!el);if(el)$('span',ring).textContent=el.dataset.cursor});
 (function l(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(l)})()}

/* spotlight, tilt, magnetic */
$$('.tile').forEach(t=>t.addEventListener('pointermove',e=>{const r=t.getBoundingClientRect();t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px')}));
if(!reduce&&fine){
 $$('.tilt').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*12}deg) rotateX(${-y*12}deg)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
 $$('[data-mag]').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')})}

/* project mock tabs */
$$('.tabs button').forEach(b=>b.onclick=()=>{const m=b.closest('.mock');$$('.tabs button',m).forEach(x=>x.classList.toggle('on',x===b));$$('.mc',m).forEach((p,k)=>p.hidden=k!==+b.dataset.p)});

/* clock */
const tick=()=>$('#clock').textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata'});tick();setInterval(tick,1000);

/* reveal + counters + progress */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target;
 if(el.dataset.n){const n=+el.dataset.n,s=performance.now(),d=reduce?1:1000;(function f(now){const p=Math.min((now-s)/d,1);el.textContent=Math.round(n*p);if(p<1)requestAnimationFrame(f)})(s)}else el.classList.add('in')}),{threshold:.15});
$$('[data-n],.rv').forEach(el=>io.observe(el));
addEventListener('scroll',()=>{const h=root;$('#bar').style.width=h.scrollTop/(h.scrollHeight-h.clientHeight)*100+'%';
 const p=$('.path').getBoundingClientRect();$('#lf').style.height=Math.max(0,Math.min(1,(innerHeight*.6-p.top)/p.height))*100+'%'},{passive:true});

/* confetti */
const cv=$('#fx'),cx=cv.getContext('2d');let parts=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
function boom(x,y){if(reduce)return;const cols=['#ff3d8b','#ffd23f','#2d3bff','#7ff0cf','#ff7eb3'];
 for(let i=0;i<90;i++){const a=Math.random()*6.28,s=4+Math.random()*9;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,r:3+Math.random()*5,c:cols[i%5],l:90+Math.random()*40})}
 if(!run){run=true;(function f(){cx.clearRect(0,0,cv.width,cv.height);parts=parts.filter(p=>p.l-->0);parts.forEach(p=>{p.vy+=.3;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.r*1.6,p.r)});if(parts.length)requestAnimationFrame(f);else run=false})()}}
const mail='neelbhavsar440@gmail.com';
function copy(e){const r=e?.target?.getBoundingClientRect?.(),x=r?r.left+r.width/2:innerWidth/2,y=r?r.top+r.height/2:innerHeight/2;
 (navigator.clipboard?navigator.clipboard.writeText(mail):Promise.reject()).then(()=>$('#hint').textContent='Copied! Now send me something good.').catch(()=>$('#hint').textContent='Copy failed. Select the email text instead.');boom(x,y)}
$('#copy').onclick=copy;

/* command palette */
const pal=$('#pal'),q=$('#q'),list=$('#list');let cur=0,items=[];
const jump=id=>()=>{pal.close();location.hash=id};
const cmds=[['Go to Work',jump('work')],['Go to Toolbox',jump('stack')],['Go to Path',jump('path')],['Go to Contact',jump('contact')],['Copy email',()=>{pal.close();copy()}],['Toggle dark mode',()=>{pal.close();toggle()}],['Open GitHub',()=>open('https://github.com/Neel2377')],['Open LinkedIn',()=>open('https://linkedin.com/in/neel-bhavsar23')]];
function render(){items=cmds.filter(c=>c[0].toLowerCase().includes(q.value.toLowerCase()));cur=Math.min(cur,Math.max(items.length-1,0));list.innerHTML=items.map((c,i)=>`<li class="${i===cur?'on':''}">${c[0]}</li>`).join('');$$('li',list).forEach((li,i)=>li.onclick=()=>items[i][1]())}
function openPal(){q.value='';cur=0;render();pal.showModal();q.focus()}
$('#cmdk').onclick=openPal;
addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal.open?pal.close():openPal()}});
q.addEventListener('input',()=>{cur=0;render()});
q.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();cur=Math.min(cur+1,items.length-1);render()}else if(e.key==='ArrowUp'){e.preventDefault();cur=Math.max(cur-1,0);render()}else if(e.key==='Enter'&&items[cur])items[cur][1]()});
pal.addEventListener('click',e=>{if(e.target===pal)pal.close()});
scramble($('#role'),roles[0],900);
})();
