(function () {
  const noBtn = document.getElementById('no-btn');
  const yesBtn = document.getElementById('yes-btn');
  const escapeInfo = document.getElementById('escape-info');
  const escapeCount = document.getElementById('escape-count');
  const yesInfo = document.getElementById('yes-info');
  const rsvpBox = document.getElementById('rsvp-box');

  if (!noBtn || !yesBtn || !rsvpBox) return;

  let attempts = 0;

  function getRandomCoords() {
    const boxRect = rsvpBox.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const padding = 14;

    const maxX = Math.max(0, boxRect.width - btnRect.width - padding * 2);
    const maxY = Math.max(0, boxRect.height - btnRect.height - padding * 2);

    return {
      left: Math.floor(Math.random() * maxX) + padding,
      top: Math.floor(Math.random() * maxY) + padding,
    };
  }

  function dodge() {
    attempts += 1;
    escapeCount.textContent = attempts;
    escapeInfo.hidden = false;
    yesInfo.hidden = true;

    if (!noBtn.classList.contains('dodging')) {
      noBtn.classList.add('dodging');
    }

    const { left, top } = getRandomCoords();
    noBtn.style.left = left + 'px';
    noBtn.style.top = top + 'px';
  }

  // Desktop: dodge on hover so click can never land
  noBtn.addEventListener('mouseenter', dodge);
  noBtn.addEventListener('focus', dodge);

  // Click guard (in case hover skips, e.g. touch -> click)
  noBtn.addEventListener('click', function (event) {
    event.preventDefault();
    dodge();
  });

  // Touch devices: dodge on first touch
  noBtn.addEventListener('touchstart', function (event) {
    event.preventDefault();
    dodge();
  }, { passive: false });

  function fireConfetti() {
    if (typeof confetti !== 'function') return;

    var colors = ['#6ecccc', '#328685', '#630d15', '#ffd166', '#ffffff', '#ff5e6c'];
    var defaults = {
      spread: 70,
      ticks: 90,
      gravity: 0.9,
      decay: 0.94,
      startVelocity: 35,
      colors: colors,
      zIndex: 9999,
    };

    confetti(Object.assign({}, defaults, {
      particleCount: 90,
      origin: { x: 0.2, y: 0.7 },
      angle: 60,
    }));
    confetti(Object.assign({}, defaults, {
      particleCount: 90,
      origin: { x: 0.8, y: 0.7 },
      angle: 120,
    }));
    confetti(Object.assign({}, defaults, {
      particleCount: 140,
      spread: 110,
      origin: { x: 0.5, y: 0.6 },
      startVelocity: 45,
    }));

    setTimeout(function () {
      confetti(Object.assign({}, defaults, {
        particleCount: 60,
        spread: 100,
        origin: { x: 0.3, y: 0.5 },
      }));
      confetti(Object.assign({}, defaults, {
        particleCount: 60,
        spread: 100,
        origin: { x: 0.7, y: 0.5 },
      }));
    }, 250);
  }

  // Yes button celebrates
  yesBtn.addEventListener('click', function () {
    escapeInfo.hidden = true;
    yesInfo.hidden = false;
    yesBtn.classList.add('btn-yes-celebrate');
    setTimeout(function () {
      yesBtn.classList.remove('btn-yes-celebrate');
    }, 600);
    fireConfetti();
  });

  // Reposition if window resizes while dodging
  window.addEventListener('resize', function () {
    if (!noBtn.classList.contains('dodging')) return;
    const { left, top } = getRandomCoords();
    noBtn.style.left = left + 'px';
    noBtn.style.top = top + 'px';
  });
})();
