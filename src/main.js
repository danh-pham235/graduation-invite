import './style.css';

const eventDetails = {
  start: new Date('2026-11-07T10:00:00+07:00'),
  end: new Date('2026-11-07T13:00:00+07:00'),
  location: 'Trường Đại học FPT TP.HCM',
  mapQuery: 'Trường Đại học FPT TP.HCM',
};
const photoSources = {
  'travel-01': '/photos/chuong3-1.jpg',
  'travel-02': '/photos/chuong3-2.jpg',
  'travel-03': '/photos/chuong3-3.jpg',
  'travel-04': '/photos/chuong3-4.jpg',
  'travel-05': '/photos/chuong3-5.jpg',
  'travel-06': '/photos/chuong3-6.jpg',
  'travel-07': '/photos/chuong3-7.jpg',
  'travel-08': '/photos/chuong3-8.jpg',
  'friends-01': '/photos/chuong4-1.jpg',
  'friends-02': '/photos/chuong4-2.jpg',
  'friends-03': '/photos/chuong4-3.jpg',
  'friends-04': '/photos/chuong4-4.jpg',
  'friends-05': '/photos/chuong4-5.jpg',
  'chapter-05': '/photos/chuong5.jpg',
};
const startButton = document.querySelector('#start-film');
const progressBar = document.querySelector('#scroll-progress');
const progressLabel = document.querySelector('#chapter-progress');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const travelSection = document.querySelector('#chapter-three');
const travelTrack = document.querySelector('.travel-scroll-track');
const travelStage = document.querySelector('.travel-stage');
const travelPhotos = [...document.querySelectorAll('.travel-photo')];
const friendsTrack = document.querySelector('.friends-scroll-track');
const friendsGallery = document.querySelector('.friends-gallery');
const friendsPhotos = [...document.querySelectorAll('.friends-photo')];

let scrollFrame = 0;

document.querySelectorAll('.photo-slot').forEach((slot) => {
  const source = photoSources[slot.dataset.photoId];
  if (!source) return;
  const image = new Image();
  image.alt = slot.dataset.photoAlt;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('load', () => slot.classList.add('has-photo'), { once: true });
  image.addEventListener('error', () => {
    console.error(`Không tải được ảnh ${slot.dataset.photoId}: ${source}`);
  }, { once: true });
  image.src = source;
  slot.prepend(image);
});

startButton.addEventListener('click', () => {
  startButton.classList.add('is-playing');
  document.querySelector('.hero').classList.add('is-playing');
  document.querySelector('#chapter-one').scrollIntoView({
    behavior: reducedMotion.matches ? 'auto' : 'smooth',
    block: 'start',
  });
});

document.querySelector('#replay-film').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
});

document.querySelector('#calendar-button').addEventListener('click', () => {
  const toCalendarDate = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const event = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Graduation Memory Tape//VI',
    'BEGIN:VEVENT',
    'UID:graduation-memory-tape-20261107',
    `DTSTAMP:${toCalendarDate(new Date())}`,
    `DTSTART:${toCalendarDate(eventDetails.start)}`,
    `DTEND:${toCalendarDate(eventDetails.end)}`,
    'SUMMARY:Lễ tốt nghiệp',
    `LOCATION:${eventDetails.location}`,
    'DESCRIPTION:Một cột mốc mới — hẹn gặp bạn ở đó.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'loi-moi-tot-nghiep.ics';
  document.body.append(link);
  link.click();
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 1000);
});

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.transform = `scaleY(${progress})`;
  const visibleChapter = [...document.querySelectorAll('main > .chapter')]
    .reduce((current, section, index) => section.getBoundingClientRect().top <= window.innerHeight * 0.5 ? index + 1 : current, 1);
  const chapter = Math.min(5, visibleChapter);
  progressLabel.textContent = String(chapter).padStart(2, '0');
  const travelStart = travelTrack.getBoundingClientRect().top + window.scrollY;
  const travelDistance = Math.max(1, travelTrack.offsetHeight - window.innerHeight);
  const travelProgress = reducedMotion.matches
    ? 1
    : Math.min(1, Math.max(0, (window.scrollY - travelStart) / travelDistance));
  travelSection.style.setProperty('--travel-progress', travelProgress.toFixed(3));
  layoutTravelPhotos(travelProgress);

  const friendsStart = friendsTrack.getBoundingClientRect().top + window.scrollY;
  const friendsDistance = Math.max(1, friendsTrack.offsetHeight - window.innerHeight);
  const friendsProgress = reducedMotion.matches
    ? 0.5
    : Math.min(1, Math.max(0, (window.scrollY - friendsStart) / friendsDistance));
  layoutFriendsPhotos(friendsProgress);
}

function layoutFriendsPhotos(progress) {
  const galleryWidth = friendsGallery.clientWidth;
  const photoWidth = friendsPhotos[0].offsetWidth;
  const isMobile = window.innerWidth <= 760;
  const pitch = Math.min(photoWidth + 32, galleryWidth * (isMobile ? 0.48 : 0.32));
  const center = progress * (friendsPhotos.length - 1);
  const count = friendsPhotos.length;

  friendsPhotos.forEach((photo, index) => {
    const offset = index - center;
    const distance = Math.abs(offset);
    const rotation = Math.max(-42, Math.min(42, -offset * (isMobile ? 25 : 22)));
    const scale = Math.max(0.76, 1 - distance * (isMobile ? 0.14 : 0.12));
    const opacity = distance > 1.9 ? 0.08 : distance > 1.35 ? 0.58 : 1;

    photo.style.transform = `translate3d(calc(-50% + ${offset * pitch}px), -50%, ${-distance * (isMobile ? 75 : 125)}px) rotateY(${rotation}deg) scale(${scale})`;
    photo.style.zIndex = String(count - Math.round(distance * 2));
    photo.style.opacity = String(opacity);
  });
  friendsGallery.style.setProperty('--friends-progress', progress.toFixed(3));
}

function layoutTravelPhotos(progress) {
  const stageWidth = travelStage.clientWidth;
  const stageHeight = travelStage.clientHeight;
  const isMobile = window.innerWidth <= 760;
  const columns = isMobile ? 2 : 4;
  const rows = travelPhotos.length / columns;
  const photoWidth = travelPhotos[0].offsetWidth;
  const photoHeight = travelPhotos[0].offsetHeight;
  const columnGap = Math.min(photoWidth + 26, stageWidth * (isMobile ? 0.7 : 0.84) / (columns - 1));
  const rowGap = Math.min(isMobile ? photoHeight - 12 : photoHeight + 20, stageHeight * (isMobile ? 0.16 : 0.3) / (rows - 1));
  const centerY = stageHeight * (isMobile ? 0.52 : 0.62);
  const stackCenterY = stageHeight * (isMobile ? 0.78 : 0.75) - stageHeight / 2;

  travelPhotos.forEach((photo, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const openX = (column - (columns - 1) / 2) * columnGap;
    const openY = centerY - stageHeight / 2 + (row - (rows - 1) / 2) * rowGap;
    const stackOffset = (index - (travelPhotos.length - 1) / 2) * 7.5;
    const stackRotation = (index - (travelPhotos.length - 1) / 2) * 2;
    const x = stackOffset + (openX - stackOffset) * progress;
    const stackY = stackCenterY + stackOffset * 0.55;
    const y = stackY + (openY - stackY) * progress;
    const rotation = stackRotation * (1 - progress);
    const scale = 1.18 - progress * 0.18;

    photo.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(${scale})`;
    photo.style.zIndex = String(progress < 0.98 ? travelPhotos.length - index : travelPhotos.length - row);
    photo.style.setProperty('--cable-opacity', progress.toFixed(3));
  });
  travelSection.style.setProperty('--cable-opacity', progress.toFixed(3));
  const heading = travelSection.querySelector('.travel-heading');
  heading.style.opacity = String(Math.max(0, 1 - progress * 2.5));
  heading.style.transform = `translateY(${-24 * progress}px)`;
}

function requestScrollUpdate() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0;
    updateScrollProgress();
  });
}

window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate);
reducedMotion.addEventListener('change', requestScrollUpdate);
window.addEventListener('load', requestScrollUpdate, { once: true });
updateScrollProgress();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function updateCountdown() {
  const target = eventDetails.start.getTime();
  const remaining = Math.max(0, target - Date.now());
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining / 3_600_000) % 24);
  const minutes = Math.floor((remaining / 60_000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  document.querySelector('#count-days').textContent = String(days).padStart(3, '0');
  document.querySelector('#count-hours').textContent = String(hours).padStart(2, '0');
  document.querySelector('#count-minutes').textContent = String(minutes).padStart(2, '0');
  document.querySelector('#count-seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

function formatEventDate(date, options) {
  return new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', ...options }).format(date);
}

document.querySelector('#event-date').textContent = formatEventDate(eventDetails.start, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}).replaceAll('/', '.');
document.querySelector('#event-date').dateTime = eventDetails.start.toISOString();
document.querySelector('#event-time').textContent = `${formatEventDate(eventDetails.start, {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})} — ${formatEventDate(eventDetails.end, {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})}`;
document.querySelector('#event-place').textContent = eventDetails.location;
document.querySelector('#event-stamp-date').textContent = formatEventDate(eventDetails.start, {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
}).replaceAll('/', ' / ');
document.querySelector('#map-link').href = `https://maps.google.com/?q=${encodeURIComponent(eventDetails.mapQuery)}`;
