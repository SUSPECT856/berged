const state = {
  chatTheme: localStorage.getItem('berged.chatTheme') || 'plain',
  font: localStorage.getItem('berged.font') || 'normal',
  bubble: localStorage.getItem('berged.bubble') || 'plain',
  appTheme: localStorage.getItem('berged.appTheme') || 'system'
};
const themes=[['plain','Sade'],['hearts','Kalpler'],['dog','Köpek'],['frog','Kurbağa'],['cat','Kedi'],['flower','Çiçekler'],['dino','Dino'],['ocean','Okyanus']];
const fonts=[['normal','Normal'],['bold','Kalın'],['thin','İnce'],['script','El yazısı'],['mono','Daktilo']];
const bubbles=[['plain','Sade'],['hearts','Kalpler'],['frog','Kurbağa'],['dog','Köpek'],['cat','Kedi'],['flower','Çiçek'],['capy','Kapibara'],['dino','Dino']];
const appThemes=[['system','Sistem'],['light','Beyaz'],['dark','Koyu']];
const messagesEl=document.getElementById('messages');
const welcome=document.getElementById('welcome');
function save(k,v){state[k]=v;localStorage.setItem('berged.'+k,v)}
function renderThemeCards(){document.getElementById('themeGrid').innerHTML=themes.map(([id,name])=>`<button class="theme-card ${state.chatTheme===id?'selected':''}" data-theme="${id}"><div class="theme-preview ${id}"><div class="mini-chat"></div></div><div class="card-name">${name}</div></button>`).join('');
  document.querySelectorAll('[data-theme]').forEach(el=>el.onclick=()=>{save('chatTheme',el.dataset.theme);applySettings();renderThemeCards()});}
function renderFonts(){document.getElementById('fontGrid').innerHTML=fonts.map(([id,name])=>`<button class="font-option ${state.font===id?'selected':''}" data-font="${id}"><div class="font-preview ${id}">Berged mesaj örneği</div><div style="margin-top:8px;color:var(--muted);font-size:12px">${name}</div></button>`).join('');document.querySelectorAll('[data-font]').forEach(el=>el.onclick=()=>{save('font',el.dataset.font);applySettings();renderFonts()})}
function renderBubbles(){document.getElementById('bubbleGrid').innerHTML=bubbles.map(([id,name])=>`<button class="bubble-card ${state.bubble===id?'selected':''}" data-bubble="${id}"><div class="bubble-preview bubble-${id}"><div class="bubble-sample">Senin mesajın</div></div><div class="card-name">${name}</div></button>`).join('');document.querySelectorAll('[data-bubble]').forEach(el=>el.onclick=()=>{save('bubble',el.dataset.bubble);applySettings();renderBubbles()})}
function renderAppThemes(){document.getElementById('appThemeGrid').innerHTML=appThemes.map(([id,name])=>`<button class="app-option ${state.appTheme===id?'selected':''}" data-apptheme="${id}"><div class="swatch ${id}"></div><strong>${name}</strong></button>`).join('');document.querySelectorAll('[data-apptheme]').forEach(el=>el.onclick=()=>{save('appTheme',el.dataset.apptheme);applyAppTheme();renderAppThemes()})}
function applyAppTheme(){document.body.classList.remove('app-theme-light','app-theme-dark');const mode=state.appTheme==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):state.appTheme;if(mode==='light')document.body.classList.add('app-theme-light');else document.body.classList.add('app-theme-dark')}
function applySettings(){document.body.className=document.body.className.replace(/\btheme-\S+/g,'').trim();if(state.chatTheme!=='plain')document.body.classList.add('theme-'+state.chatTheme);applyAppTheme();refreshMessageClasses()}
function refreshMessageClasses(){document.querySelectorAll('.message.user').forEach(m=>{m.className=m.className.replace(/font-\S+/g,'').replace(/bubble-\S+/g,'').trim();if(state.font!=='normal')m.classList.add('font-'+state.font);if(state.bubble!=='plain')m.classList.add('bubble-'+state.bubble);})}
function addMessage(text,role){welcome.style.display='none';const row=document.createElement('div');row.className='message-row '+role;const m=document.createElement('div');m.className='message '+role;m.textContent=text;if(role==='user'){if(state.font!=='normal')m.classList.add('font-'+state.font);if(state.bubble!=='plain'){m.classList.add('bubble-'+state.bubble);const d=document.createElement('span');d.className='bubble-decor';m.appendChild(d)}}row.appendChild(m);messagesEl.appendChild(row);document.getElementById('chatArea').scrollTop=999999;}
function demoReply(text){let reply='Bunu şu anda demo arayüzünde görüyorum. Gerçek Berged modeli henüz bağlanmadı.';if(/merhaba|selam/i.test(text))reply='Merhaba 👋 Ben Berged. Şimdilik arayüz prototipindeyim; kendi yapay zekâ motorumuzu geliştiriyoruz.';else if(/tema|baloncuk|yazı/i.test(text))reply='Bunları Özelleştir panelinden ayrı ayrı değiştirebilirsin. Sadece senin mesajın yazı tipiyle değişir; sohbet teması ve baloncuk birbirinden bağımsızdır.';else if(/ne yapabili/i.test(text))reply='Şimdilik sohbet arayüzünü test ediyoruz. Bir sonraki aşamada kendi Berged modelimizi bağlayacağız.';setTimeout(()=>addMessage(reply,'assistant'),350)}
document.getElementById('composerForm').onsubmit=e=>{e.preventDefault();const c=document.getElementById('composer');const text=c.value.trim();if(!text)return;addMessage(text,'user');c.value='';c.style.height='auto';demoReply(text)};
document.getElementById('composer').addEventListener('input',e=>{e.target.style.height='auto';e.target.style.height=Math.min(e.target.scrollHeight,140)+'px'});
document.getElementById('composer').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();document.getElementById('composerForm').requestSubmit()}});
const sheet=document.getElementById('customizeSheet'),back=document.getElementById('backdrop');
function openSheet(){sheet.classList.add('open');back.classList.add('open');sheet.setAttribute('aria-hidden','false')}
function closeSheet(){sheet.classList.remove('open');back.classList.remove('open');sheet.setAttribute('aria-hidden','true')}
document.getElementById('openSettings').onclick=openSheet;document.getElementById('closeSettings').onclick=closeSheet;back.onclick=closeSheet;
document.querySelectorAll('.tab').forEach(tab=>tab.onclick=()=>{document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));tab.classList.add('active');document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active')});
document.getElementById('newChat').onclick=()=>{messagesEl.innerHTML='';welcome.style.display='block';document.getElementById('topTitle').textContent='Yeni sohbet'};
renderThemeCards();renderFonts();renderBubbles();renderAppThemes();applySettings();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(state.appTheme==='system')applyAppTheme()});
