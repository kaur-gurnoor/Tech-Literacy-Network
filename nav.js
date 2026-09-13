/* Tech Literacy Network - shared navigation behaviour
   Handles the mobile hamburger menu and the About dropdown.
   Loaded on every page from /nav.js */
(function () {
  var burger = document.getElementById('nav-toggle');
  var links  = document.getElementById('nav-links');
  var drop   = document.getElementById('nav-about');
  var dropBtn = document.getElementById('nav-about-toggle');
  var mobile = window.matchMedia('(max-width: 900px)');

  function closeDrop() {
    if (!drop) return;
    drop.classList.remove('open');
    dropBtn.setAttribute('aria-expanded', 'false');
  }

  function openDrop() {
    if (!drop) return;
    drop.classList.add('open');
    dropBtn.setAttribute('aria-expanded', 'true');
  }

  /* hamburger */
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      if (!links.classList.contains('open')) closeDrop();
    });
  }

  if (!drop || !dropBtn) return;

  /* click / tap / keyboard toggle, works on both breakpoints */
  dropBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (drop.classList.contains('open')) { closeDrop(); } else { openDrop(); }
  });

  /* hover on desktop only */
  drop.addEventListener('mouseenter', function () {
    if (!mobile.matches) openDrop();
  });
  drop.addEventListener('mouseleave', function () {
    if (!mobile.matches) closeDrop();
  });

  /* close when clicking anywhere else */
  document.addEventListener('click', function (e) {
    if (!drop.contains(e.target)) closeDrop();
  });

  /* escape closes the dropdown, then the mobile menu */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    if (drop.classList.contains('open')) {
      closeDrop();
      dropBtn.focus();
    } else if (links) {
      links.classList.remove('open');
    }
  });

  /* reset state when crossing the breakpoint */
  var onChange = function () { closeDrop(); if (links) links.classList.remove('open'); };
  if (mobile.addEventListener) { mobile.addEventListener('change', onChange); }
  else if (mobile.addListener) { mobile.addListener(onChange); }
})();
