// น้องถั่ว ถัวหุ้น — Landing Page interactions (no dependencies)
(function () {
  'use strict';

  // ---------- Feature tabs (WAI-ARIA tabs pattern) ----------
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  // ---------- FAQ accordion (one open at a time) ----------
  var faqButtons = Array.prototype.slice.call(document.querySelectorAll('.faq-q'));

  function setFaq(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.closest('.faq-item').classList.toggle('is-open', open);
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  }

  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      faqButtons.forEach(function (b) { setFaq(b, false); });
      if (willOpen) setFaq(btn, true);
    });
  });

  // ---------- "สมัคร Pro ใน 3 ขั้นตอน" disclosure ----------
  var payBtn = document.querySelector('[data-toggle-pay]');
  var payBox = document.getElementById('pay-how');
  if (payBtn && payBox) {
    payBtn.addEventListener('click', function () {
      var open = payBtn.getAttribute('aria-expanded') !== 'true';
      payBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      payBox.hidden = !open;
    });
  }
})();
