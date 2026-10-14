const pages=[['index.html','Главная'],['about.html','О клубе'],['characters.html','Персонажи'],['news.html','Новости'],['contacts.html','Контакты']];
const current=location.pathname.split('/').pop()||'index.html';
document.getElementById('site-header').outerHTML=`
<header><div class="wrap">
<a class="brand" href="index.html"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 34V18a12 12 0 0 1 24 0v16h-7V18a5 5 0 0 0-10 0v16z" fill="#f4b942"/><circle cx="11.5" cy="30" r="1.2" fill="#0f3d2a"/><circle cx="28.5" cy="30" r="1.2" fill="#0f3d2a"/></svg>Uma Club «Финиш»</a>
<button class="burger" aria-label="Открыть меню" aria-expanded="false">☰</button>
<nav><ul>${pages.map(([h,t])=>`<li><a href="${h}"${h===current?' class="active" aria-current="page"':''}>${t}</a></li>`).join('')}</ul></nav>
</div></header>`;
document.getElementById('site-footer').outerHTML=`
<footer><div class="wrap"><span>© 2026 Uma Club «Финиш» — фан-клуб, не связан с Cygames</span>
<span>Мы на <a href="https://github.com/">GitHub</a></span></div></footer>`;
const burger=document.querySelector('.burger'),nav=document.querySelector('nav');
burger.onclick=()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
// счётчики статистики
document.querySelectorAll('[data-count]').forEach(el=>{
  const end=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(end/60));
  const t=setInterval(()=>{n=Math.min(end,n+step);el.textContent=n;if(n>=end)clearInterval(t)},25);
});
// форма обратной связи
const f=document.getElementById('feedback');
if(f){f.addEventListener('submit',e=>{
  e.preventDefault();let ok=true;
  const rules={name:v=>v.trim().length>=2||'Введите имя (минимум 2 буквы)',
    email:v=>/^\S+@\S+\.\S+$/.test(v)||'Введите email вида name@mail.ru',
    message:v=>v.trim().length>=10||'Напишите сообщение (минимум 10 символов)'};
  for(const k in rules){const r=rules[k](f[k].value);f.querySelector(`[data-err=${k}]`).textContent=r===true?'':r;if(r!==true)ok=false}
  if(ok){f.reset();document.querySelector('.ok').classList.add('show')}
})}
