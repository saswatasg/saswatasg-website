const SCHEDULE_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true';

let initialized = false;

function createContainer() {
  const container = document.createElement('div');
  container.id = 'gsched-container';
  container.style.cssText = 'position:fixed;z-index:-1;opacity:0;pointer-events:none;';
  document.body.appendChild(container);
  return container;
}

function initScheduler() {
  if (initialized) return true;
  const { calendar } = window;
  if (!calendar?.schedulingButton) return false;

  initialized = true;
  const container = document.getElementById('gsched-container') || createContainer();
  calendar.schedulingButton.load({
    url: SCHEDULE_URL,
    color: '#E85D3A',
    label: 'Book',
    target: container,
  });
  return true;
}

// Try to init on load, poll up to 10s
if (typeof window !== 'undefined') {
  let attempts = 0;
  const tryInit = () => {
    if (!initScheduler() && attempts < 20) {
      attempts++;
      setTimeout(tryInit, 500);
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
}

export function openScheduleBooking() {
  if (initScheduler()) {
    const container = document.getElementById('gsched-container');
    requestAnimationFrame(() => {
      const btn = container?.querySelector('button');
      if (btn) {
        btn.click();
      } else {
        window.open(SCHEDULE_URL, '_blank', 'noopener,noreferrer');
      }
    });
  } else {
    // Script not loaded yet — brief retry before falling back
    setTimeout(() => {
      if (initScheduler()) {
        openScheduleBooking();
      } else {
        window.open(SCHEDULE_URL, '_blank', 'noopener,noreferrer');
      }
    }, 600);
  }
}
