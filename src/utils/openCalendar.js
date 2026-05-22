const SCHEDULE_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3wx11wN9wr9kdE7TBGU3impXZ4_MkcsGh6NsUD7F854Fnr5XsJnsR2mnPQ-K1IFLGydbxR_KKZ?gv=true';

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

  const iframe = document.createElement('iframe');
  iframe.src = SCHEDULE_URL;
  iframe.title = 'Book an appointment';
  Object.assign(iframe.style, {
    width: '100%', height: 'calc(100% - 53px)', border: 'none', display: 'block',
  });
  iframe.setAttribute('allow', 'calendar *');

  container.appendChild(header);
  container.appendChild(iframe);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', onKeyDown); }
  };
  document.addEventListener('keydown', onKeyDown);
}
