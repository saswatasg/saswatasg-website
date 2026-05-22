const SCHEDULE_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ibq0OoR_jlsEkRC4bqMHktw4l2xPn-cgO1GY7xCqhA63VxmyJa2KgMdevw1coatF5CpBaLy6i?gv=true';

let initialized = false;

export function openScheduleBooking() {
  const { calendar } = window;

  if (!calendar?.schedulingButton) {
    window.open(SCHEDULE_URL, '_blank', 'noopener,noreferrer');
    return;
  }

  let container = document.getElementById('gsched-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'gsched-container';
    container.style.cssText = 'position:fixed;z-index:-1;opacity:0;pointer-events:none;';
    document.body.appendChild(container);
  }

  if (!initialized) {
    initialized = true;
    calendar.schedulingButton.load({
      url: SCHEDULE_URL,
      color: '#E85D3A',
      label: 'Book',
      target: container,
    });
  }

  requestAnimationFrame(() => {
    const btn = container.querySelector('button');
    if (btn) {
      btn.click();
    } else {
      window.open(SCHEDULE_URL, '_blank', 'noopener,noreferrer');
    }
  });
}
