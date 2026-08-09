// Sri Ramlingeshwar Prassanna — site interactions
document.addEventListener('DOMContentLoaded', function () {

  // Mobile menu toggle
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Carousel prev/next buttons (Festivals, Articles)
  document.querySelectorAll('.car-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var track = document.getElementById(btn.getAttribute('data-target'));
      if (!track) return;
      var firstCard = track.firstElementChild;
      var step = firstCard ? firstCard.getBoundingClientRect().width + 18 : 300;
      track.scrollBy({ left: btn.classList.contains('next') ? step : -step, behavior: 'smooth' });
    });
  });

  // Media modal (video OR image) triggered by any .media-card
  var modal = document.getElementById('videoModal');
  if (modal) {
    var modalTitle = document.getElementById('modalTitle');
    var videoFrame = document.getElementById('videoFrame');
    var videoWrap = videoFrame ? videoFrame.closest('.video-frame') : null;
    var closeBtn = modal.querySelector('.modal-close');
    var backdrop = modal.querySelector('.modal-backdrop');
    var box = modal.querySelector('.modal-box');

    // create an image frame slot once, next to the video frame
    var imageFrame = document.createElement('div');
    imageFrame.className = 'image-frame';
    imageFrame.style.display = 'none';
    if (videoWrap) videoWrap.after(imageFrame);

    function openModal(title) {
      modalTitle.textContent = title || 'Temple Gallery';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (videoFrame) videoFrame.src = '';
      imageFrame.innerHTML = '';
    }

    document.querySelectorAll('.media-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var videoUrl = card.getAttribute('data-video');
        var imageUrl = card.getAttribute('data-image');
        var title = card.getAttribute('data-title') || card.querySelector('strong') ? card.querySelector('strong').textContent : 'Gallery';

        if (videoUrl) {
          if (videoWrap) videoWrap.style.display = 'block';
          imageFrame.style.display = 'none';
          if (videoFrame) videoFrame.src = videoUrl;
          openModal(title);
        } else {
          // Image mode: use the card's own art-image swatch (placeholder art),
          // or a real <img> if data-image points to an actual photo file.
          if (videoWrap) videoWrap.style.display = 'none';
          imageFrame.style.display = 'flex';
          if (imageUrl) {
            imageFrame.innerHTML = '<img src="' + imageUrl + '" alt="' + title + '">';
          } else {
            var artClone = card.querySelector('.art-image');
            imageFrame.innerHTML = '';
            if (artClone) imageFrame.appendChild(artClone.cloneNode(true));
          }
          openModal(title);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }
});
