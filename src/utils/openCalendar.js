const SCHEDULE_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3wx11wN9wr9kdE7TBGU3impXZ4_MkcsGh6NsUD7F854Fnr5XsJnsR2mnPQ-K1IFLGydbxR_KKZ?gv=true';

const loadingMessages = [
  { text: 'Finding the perfect time slot...', icon: 'calendar' },
  { text: 'Brewing some coffee while you wait...', icon: 'coffee' },
  { text: 'Almost there, just a moment!', icon: 'clock' },
  { text: 'Polishing the scheduling widget...', icon: 'sparkles' },
];

const icons = {
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  coffee: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E85D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
};

export function openScheduleBooking() {
  const existing = document.getElementById('booking-modal');
  if (existing) {
    existing.style.display === 'none' ? existing.style.display = '' : existing.remove();
    return;
  }

  const overlay = document.createElement('div');
  overlay.id = 'booking-modal';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', zIndex: '9999',
    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '16px',
  });

  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'relative', width: '100%', maxWidth: '820px',
    height: '90vh', maxHeight: '720px',
    background: '#fff', borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)', border: '3px solid #0A0A0A',
  });

  const header = document.createElement('div');
  Object.assign(header.style, {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', borderBottom: '2px solid #0A0A0A',
    background: '#0A0A0A',
  });

  const title = document.createElement('span');
  title.textContent = 'Book a Call';
  Object.assign(title.style, {
    color: '#fff', fontWeight: '700', fontSize: '16px',
  });

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  Object.assign(closeBtn.style, {
    width: '32px', height: '32px', borderRadius: '8px',
    border: '2px solid #fff', background: 'transparent',
    fontSize: '20px', fontWeight: '700', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff',
  });
  closeBtn.onclick = () => overlay.remove();
  closeBtn.setAttribute('aria-label', 'Close');

  header.appendChild(title);
  header.appendChild(closeBtn);

  // --- Loading Screen ---
  const loadingEl = document.createElement('div');
  Object.assign(loadingEl.style, {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', height: 'calc(100% - 53px)', gap: '16px',
    padding: '0 24px', background: '#F5F2EC',
  });

  const iconWrapper = document.createElement('div');
  iconWrapper.id = 'loader-icon-wrapper';
  Object.assign(iconWrapper.style, {
    width: '64px', height: '64px', borderRadius: '16px',
    border: '2px solid #E85D3A', background: 'rgba(232,93,58,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  });
  iconWrapper.innerHTML = icons.calendar;
  iconWrapper.querySelector('svg').style.transition = 'opacity 0.3s';

  const sparkle = document.createElement('div');
  Object.assign(sparkle.style, {
    position: 'absolute', top: '-4px', right: '-4px',
    width: '16px', height: '16px',
  });
  sparkle.innerHTML = icons.sparkles;
  sparkle.querySelector('svg').style.width = '100%';
  sparkle.querySelector('svg').style.height = '100%';
  iconWrapper.appendChild(sparkle);

  const textEl = document.createElement('p');
  textEl.id = 'loader-text';
  Object.assign(textEl.style, {
    fontSize: '14px', fontWeight: '700', color: 'rgba(10,10,10,0.6)',
    margin: '0', display: 'flex', alignItems: 'center', gap: '8px',
    height: '32px',
  });
  textEl.innerHTML = loadingMessages[0].text;

  const dotContainer = document.createElement('span');
  Object.assign(dotContainer.style, { display: 'inline-flex', gap: '2px', alignItems: 'center' });
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    const size = '6px';
    Object.assign(dot.style, {
      width: size, height: size, borderRadius: '50%',
      background: 'rgba(10,10,10,0.4)', display: 'inline-block',
      animation: i === 0 ? 'ldot 1s infinite' : i === 1 ? 'ldot 1s infinite 0.3s' : 'ldot 1s infinite 0.6s',
    });
    dotContainer.appendChild(dot);
  }
  textEl.appendChild(dotContainer);

  loadingEl.appendChild(iconWrapper);
  loadingEl.appendChild(textEl);

  // Progress bar at bottom of loading
  const progressBar = document.createElement('div');
  Object.assign(progressBar.style, {
    width: '100%', height: '3px', background: 'rgba(10,10,10,0.08)',
    borderRadius: '2px', overflow: 'hidden', maxWidth: '200px',
  });
  const progressFill = document.createElement('div');
  Object.assign(progressFill.style, {
    height: '100%', width: '0%', background: '#E85D3A',
    borderRadius: '2px', transition: 'width 0.5s ease',
  });
  progressBar.appendChild(progressFill);
  loadingEl.appendChild(progressBar);

  // --- Keyframes for dot animation ---
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes ldot { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
    @keyframes lbounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes lpulse { 0%,100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 0.6; } }
    @keyframes lfadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes lfadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-8px); } }
  `;
  document.head.appendChild(styleSheet);

  // Animate icon bounce
  iconWrapper.style.animation = 'lbounce 2s ease-in-out infinite';

  // --- Message rotation ---
  let msgIndex = 0;
  const msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % loadingMessages.length;
    const msg = loadingMessages[msgIndex];
    textEl.childNodes[0].textContent = msg.text + ' ';

    // Update icon
    const svg = iconWrapper.querySelector('svg');
    if (svg && svg !== sparkle.querySelector('svg')) {
      const newSvgHtml = icons[msg.icon];
      const temp = document.createElement('div');
      temp.innerHTML = newSvgHtml;
      const newSvg = temp.firstElementChild;
      Object.assign(newSvg.style, {
        transition: 'opacity 0.3s', position: 'absolute',
      });
      svg.style.opacity = '0';
      setTimeout(() => {
        iconWrapper.removeChild(svg);
        iconWrapper.insertBefore(newSvg, sparkle);
      }, 300);
    }

    // Update progress
    const pct = ((msgIndex + 1) / loadingMessages.length) * 100;
    progressFill.style.width = pct + '%';
  }, 3000);

  // --- Iframe ---
  const iframe = document.createElement('iframe');
  iframe.src = SCHEDULE_URL;
  iframe.title = 'Book an appointment';
  Object.assign(iframe.style, {
    width: '100%', height: 'calc(100% - 53px)', border: 'none',
    display: 'none',
  });
  iframe.setAttribute('allow', 'calendar *');

  iframe.addEventListener('load', () => {
    // Smooth transition: fade out loader, show iframe
    loadingEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    loadingEl.style.opacity = '0';
    loadingEl.style.transform = 'translateY(10px)';
    clearInterval(msgInterval);

    setTimeout(() => {
      loadingEl.style.display = 'none';
      iframe.style.display = 'block';
      iframe.style.animation = 'lfadeIn 0.3s ease';
    }, 400);
  });

  // Fallback: iframe fails to load within 12s, show a message
  const loadTimeout = setTimeout(() => {
    if (iframe.style.display === 'none') {
      textEl.childNodes[0].textContent = 'Taking a bit longer than expected. Hang tight! ';
      progressFill.style.background = '#F59E0B';
    }
  }, 12000);

  iframe.addEventListener('load', () => clearTimeout(loadTimeout));

  container.appendChild(header);
  container.appendChild(loadingEl);
  container.appendChild(iframe);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
      clearInterval(msgInterval);
      clearTimeout(loadTimeout);
    }
  });

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      clearInterval(msgInterval);
      clearTimeout(loadTimeout);
      document.removeEventListener('keydown', onKeyDown);
    }
  };
  document.addEventListener('keydown', onKeyDown);
}
