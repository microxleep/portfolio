/**
 * MUHAMMAD RIDHA IRSYAD — PORTFOLIO JAVASCRIPT
 * Senior Graphic Designer & Visual Specialist Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. STICKY NAVBAR & SCROLL SPY
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-xl', 'bg-[#080b11]/95', 'border-dark-border/80');
      navbar.classList.remove('bg-[#080b11]/80');
    } else {
      navbar.classList.remove('shadow-xl', 'bg-[#080b11]/95', 'border-dark-border/80');
      navbar.classList.add('bg-[#080b11]/80');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. PORTFOLIO FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden-item');
          item.classList.add('show-item');
        } else {
          item.classList.remove('show-item');
          item.classList.add('hidden-item');
        }
      });
    });
  });

  // 4. INTERACTIVE MODAL DETAIL PREVIEW
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalYear = document.getElementById('modal-year');
  const modalClient = document.getElementById('modal-client');
  const modalRole = document.getElementById('modal-role');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const projectCards = document.querySelectorAll('.portfolio-item');

  function openModal(card) {
    const title = card.getAttribute('data-title') || 'Project Title';
    const categoryLabel = card.getAttribute('data-category-label') || 'Design';
    const year = card.getAttribute('data-year') || '2023';
    const client = card.getAttribute('data-client') || 'Client';
    const role = card.getAttribute('data-role') || 'Graphic Designer';
    const desc = card.getAttribute('data-desc') || '';
    const tagsString = card.getAttribute('data-tags') || '';

    modalTitle.textContent = title;
    modalCategory.textContent = categoryLabel;
    modalYear.textContent = year;
    modalClient.textContent = client;
    modalRole.textContent = role;
    modalDesc.textContent = desc;

    // Build tags
    modalTags.innerHTML = '';
    if (tagsString) {
      const tags = tagsString.split(',').map((t) => t.trim());
      tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'text-[11px] px-2.5 py-1 rounded-md bg-dark-surface border border-dark-border text-slate-300';
        span.textContent = `#${tag}`;
        modalTags.appendChild(span);
      });
    }

    // Show modal
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      const dialog = modal.querySelector('div');
      if (dialog) {
        dialog.classList.remove('scale-95');
        dialog.classList.add('scale-100');
      }
    }, 10);

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    const dialog = modal.querySelector('div');
    if (dialog) {
      dialog.classList.remove('scale-100');
      dialog.classList.add('scale-95');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      openModal(card);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  // 5. TOAST NOTIFICATION UTILITY
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3500);
  }

  // 6. COPY TO CLIPBOARD HANDLERS
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Berhasil disalin: ${textToCopy}`);
        }).catch(() => {
          showToast(`Salin: ${textToCopy}`);
        });
      }
    });
  });

  // 7. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Mengirim Pesan...</span>
      `;

      // Simulate sending brief
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
        contactForm.reset();
        showToast('Terima kasih! Pesan Anda telah terkirim kepada Muhammad Ridha Irsyad.');
        if (window.lucide) window.lucide.createIcons();
      }, 1200);
    });
  }
});

