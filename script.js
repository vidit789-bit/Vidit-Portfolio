/* =========================================================
   DATA
========================================================= */
const skillsList = [
  'Angular','TypeScript','JavaScript (ES6+)','HTML5','CSS3',
  'Bootstrap','Tailwind CSS','UI/UX Design','Photoshop','Git','GitHub',
  'HIPAA Compliance','Healthcare Systems','EDI 837','WebRTC','Agora Video API'
];

const projectsData = [
  {
    tag:'01', period:'Healthcare Platform',
    image:'images/proj-patient-portal.svg',
    title:'Patient Portal & Healthcare Management Platform',
    desc:'Built a modern patient engagement platform that simplifies appointment scheduling, provider discovery, secure messaging, medical document sharing, and online payments.',
    stack:['Angular','TypeScript','HIPAA Compliance','Bootstrap'],
    features:[
      'Advanced provider search with filters',
      'Real-time appointment booking system',
      'Secure messaging between patients and healthcare professionals',
      'Medical document sharing with HIPAA compliance',
      'Integrated billing history and online payments',
      'Digital healthcare delivery portal'
    ]
  },
  {
    tag:'02', period:'Healthcare EHR Platform',
    image:'proj-ehr-billing.svg',
    title:'HIPAA-Compliant Medical Billing & EHR Platform with EDI 837 Claims',
    desc:'Developed a HIPAA-compliant Electronic Health Records (EHR) and Medical Billing platform for behavioral healthcare providers, enabling secure patient management and automated insurance claim processing.',
    stack:['Angular','HIPAA','EDI 837','TypeScript','Healthcare APIs'],
    features:[
      'Multi-role authentication for agencies, providers, and patients',
      'Provider dashboards and staff management',
      'Secure messaging and appointment workflows',
      'EDI 837 Claims Engine with billing provider validation',
      'Automated claim generation with payer information',
      'Role-based access control and audit logging',
      'Clearinghouse integrations for claims processing'
    ]
  },
  {
    tag:'03', period:'Telehealth Platform',
    image:'proj-telehealth.svg',
    title:'HIPAA Compliant Telehealth Platform | Video Consultation & Virtual Care',
    desc:'Developed a HIPAA-compliant Telehealth platform enabling healthcare providers to conduct secure virtual consultations while delivering a seamless digital healthcare experience.',
    stack:['Angular','Agora Video API','HIPAA','TypeScript','WebRTC'],
    features:[
      'Multi-role portals for administrators, providers, and patients',
      'Integrated appointment scheduling system',
      'Real-time Agora video consultations',
      'Secure messaging with encryption',
      'Online payment processing integration',
      'Encrypted communication and audit logging',
      'Role-based access control for secure patient interactions'
    ]
  },
];

/* =========================================================
   LOADER
========================================================= */
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 900);
});

/* =========================================================
   SCROLL PROGRESS + NAVBAR
========================================================= */
const progressBar = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';

  navbar.classList.toggle('scrolled', scrollTop > 40);
  navbar.classList.toggle('hide-nav', scrollTop > lastScroll && scrollTop > 200);
  lastScroll = scrollTop;

  backToTop.classList.toggle('show', scrollTop > 600);

  const sections = document.querySelectorAll('main section, #hero');
  let activeId = 'hero';
  sections.forEach(sec => { if(scrollTop >= sec.offsetTop - 200) activeId = sec.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
  });
});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* =========================================================
   LIGHT PARTICLE BACKGROUND (hero only)
========================================================= */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){ canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
function initParticles(){
  particles = [];
  const count = Math.min(50, Math.floor(canvas.width / 26));
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: Math.random()*1.6 + 0.6,
      vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25,
      c: Math.random() > 0.5 ? '255,159,28' : '255,93,93'
    });
  }
}
function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${p.c},0.55)`;
    ctx.fill();
  });
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 110){
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255,159,28,${0.12 * (1 - dist/110)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
resizeCanvas(); initParticles(); drawParticles();

/* =========================================================
   TYPED.JS ROLES
========================================================= */
if(typeof Typed !== 'undefined'){
  new Typed('#typed-role', {
    strings:['Angular Developer','Web Designer','UI/UX Enthusiast','Frontend Developer'],
    typeSpeed:55, backSpeed:30, backDelay:1400, loop:true, showCursor:false
  });
}

/* =========================================================
   AOS INIT
========================================================= */
if(typeof AOS !== 'undefined'){ AOS.init({ duration:750, once:true, easing:'ease-out-cubic', offset:60 }); }

/* =========================================================
   VANILLA TILT
========================================================= */
function applyTilt(selector){
  if(typeof VanillaTilt === 'undefined') return;
  VanillaTilt.init(document.querySelectorAll(selector), { max: 7, speed: 400, glare: true, 'max-glare': 0.12, scale: 1.02 });
}
applyTilt('[data-tilt]');

/* =========================================================
   COUNTERS
========================================================= */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.count;
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 50));
      const tick = () => {
        count += step;
        if(count >= target){ el.textContent = target; return; }
        el.textContent = count;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(c => counterObserver.observe(c));

/* =========================================================
   SKILL TAG CLOUD
========================================================= */
const skillsCloud = document.getElementById('skills-cloud');
skillsList.forEach(name => {
  const pill = document.createElement('span');
  pill.className = 'tag-pill';
  pill.textContent = name;
  skillsCloud.appendChild(pill);
});

/* =========================================================
   LANGUAGE PROGRESS RINGS
========================================================= */
const svgDefs = document.createElementNS('http://www.w3.org/2000/svg','svg');
svgDefs.setAttribute('width','0'); svgDefs.setAttribute('height','0'); svgDefs.style.position='absolute';
svgDefs.innerHTML = `<defs><linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#FF9F1C"/><stop offset="100%" stop-color="#FF5D5D"/>
</linearGradient></defs>`;
document.body.appendChild(svgDefs);

const R = 38, C = 2 * Math.PI * R;
document.querySelectorAll('.ring-fg').forEach(ring => {
  ring.setAttribute('stroke-dasharray', C);
  ring.setAttribute('stroke-dashoffset', C);
});

document.querySelectorAll('.lang-card').forEach(card => {
  const ring = card.querySelector('.ring-fg');
  const label = card.querySelector('.skill-pct');
  const pct = +ring.dataset.pct;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        ring.style.strokeDashoffset = C - (pct/100) * C;
        let p = 0;
        const tick = () => { p++; label.textContent = p + '%'; if(p < pct) requestAnimationFrame(tick); };
        tick();
        obs.unobserve(card);
      }
    });
  }, { threshold:0.4 });
  obs.observe(card);
});

/* =========================================================
   PROJECTS RENDER + MODAL
========================================================= */
const projectsGrid = document.getElementById('projects-grid');
projectsData.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'glass-card project-card';
  card.setAttribute('data-aos','fade-up');
  card.setAttribute('data-aos-delay', (i%4)*100);
  card.setAttribute('data-tilt','');
  card.setAttribute('data-tilt-max','5');
  const mediaInner = p.image
    ? `<img src="${p.image}" alt="${p.title}" loading="lazy" class="project-cover">
       <span class="project-period-chip">${p.period}</span>`
    : `<span class="project-tag">${p.tag}</span>`;

  card.innerHTML = `
    <div class="project-media">${mediaInner}</div>
    <div class="project-body">
      <span class="project-period">${p.period}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-stack">${p.stack.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
    </div>
  `;
  card.addEventListener('click', () => openProjectModal(p));
  projectsGrid.appendChild(card);
});
applyTilt('.project-card[data-tilt]');

const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
function openProjectModal(p){
  modalBody.innerHTML = `
    <span class="project-period">${p.period}</span>
    <h2 style="font-family:var(--font-display);margin:10px 0 14px;">${p.title}</h2>
    <p style="color:var(--muted);margin-bottom:18px;">${p.desc}</p>
    <div class="project-stack" style="margin-bottom:22px;">${p.stack.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
    <h4 style="margin-bottom:10px;">Key Features</h4>
    <ul style="color:var(--muted);padding-left:18px;line-height:1.9;">
      ${p.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
function closeModal(){ modal.classList.remove('open'); document.body.style.overflow = 'auto'; }

/* =========================================================
   CONTACT FORM (mailto fallback - no external activation needed)
========================================================= */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const submitLabel = document.getElementById('submit-label');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Honeypot check: if this hidden field got filled, silently pretend success and stop.
  const honeypot = form.querySelector('#company');
  if (honeypot && honeypot.value.trim() !== '') {
    statusEl.textContent = 'Message sent successfully!';
    statusEl.className = 'form-status success';
    form.reset();
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const subject = formData.get('subject').trim();
  const message = formData.get('message').trim();
  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message
  ].join('\n');

  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  submitLabel.textContent = 'Opening Email...';
  statusEl.textContent = 'Your email app will open with this message ready to send.';
  statusEl.className = 'form-status';

  window.location.href = `mailto:viditbhardwaj999@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitLabel.textContent = 'Contact Me';
  }, 1500);
});

/* =========================================================
   FOOTER YEAR
========================================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =========================================================
   CURSOR GLOW (desktop only, lightweight, throttled via rAF)
========================================================= */
(function initCursorGlow(){
  if (!window.matchMedia('(pointer:fine)').matches) return;
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);
  let gx = window.innerWidth/2, gy = window.innerHeight/2, cx = gx, cy = gy, active = false;

  window.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; }, { passive:true });

  function loop(){
    cx += (gx - cx) * 0.16;
    cy += (gy - cy) * 0.16;
    glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('mouseover', e => {
    const hit = e.target.closest('a, button, .project-card, [data-tilt]');
    if (hit && !active){ active = true; glow.classList.add('active'); }
    else if (!hit && active){ active = false; glow.classList.remove('active'); }
  }, { passive:true });
})();

/* =========================================================
   MAGNETIC PRIMARY BUTTONS (cheap transform-only effect)
========================================================= */
(function initMagneticButtons(){
  if (!window.matchMedia('(pointer:fine)').matches) return;
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate3d(${x*0.16}px, ${y*0.3}px, 0)`;
    }, { passive:true });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();
