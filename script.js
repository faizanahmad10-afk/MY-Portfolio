/**
 * FAIZAN AHMAD — FINWA PORTFOLIO SCRIPT
 * Functionality:
 * 1. Dark / Light Mode Switcher (Finwa Light Default with LocalStorage)
 * 2. Mobile Drawer Navigation
 * 3. Header Sticky State & Scrollspy Active Nav Tracker
 * 4. Finwa Portfolio Tab Filtering with Smooth Animations
 * 5. Interactive Contact Form with Validation & Feedback Toast
 * 6. Dynamic Year & Back-To-Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Theme Toggle (Finwa Light as Default, with Dark Mode Support)
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const STORAGE_KEY = 'faizan_finwa_theme';

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    // Finwa template is famous for its crisp clean light blue/white palette
    htmlElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      htmlElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem(STORAGE_KEY, targetTheme);
    });
  }

  // -------------------------------------------------------------------------
  // 2. Mobile Hamburger Menu Toggle
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Header Sticky & Active Section Tracker
  // -------------------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // -------------------------------------------------------------------------
  // 4. Finwa Portfolio Tab Filter System
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.finwa-filter-btn');
  const portfolioCards = document.querySelectorAll('.finwa-project-card');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioCards.forEach((card) => {
          const category = card.getAttribute('data-category');

          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.transition = 'all 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 40);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. Interactive Contact Form with REAL Email Delivery & WhatsApp Fallback
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');
  const submitBtn = document.getElementById('submitBtn');
  const whatsappFormBtn = document.getElementById('whatsappFormBtn');

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const phoneInput = document.getElementById('userPhone');
  const serviceInput = document.getElementById('serviceInterest');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const serviceError = document.getElementById('serviceError');
  const messageError = document.getElementById('messageError');

  const FAIZAN_EMAIL = 'muhammadfaizanahmad10@gmail.com';
  const FAIZAN_WHATSAPP = '923109943462';

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const bindClearInput = (input, error) => {
    input.addEventListener('input', () => {
      input.classList.remove('invalid');
      if (error) error.classList.remove('visible');
    });
  };

  if (contactForm) {
    bindClearInput(nameInput, nameError);
    bindClearInput(emailInput, emailError);
    bindClearInput(serviceInput, serviceError);
    bindClearInput(messageInput, messageError);

    // Form Submission: Real Email Delivery via FormSubmit AJAX Endpoint
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const serviceVal = serviceInput.value;
      const messageVal = messageInput.value.trim();

      // Validate Name
      if (!nameVal) {
        nameInput.classList.add('invalid');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        nameError.classList.remove('visible');
      }

      // Validate Email
      if (!emailVal || !isValidEmail(emailVal)) {
        emailInput.classList.add('invalid');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
        emailError.classList.remove('visible');
      }

      // Validate Service
      if (!serviceVal) {
        serviceInput.classList.add('invalid');
        serviceError.classList.add('visible');
        isValid = false;
      } else {
        serviceInput.classList.remove('invalid');
        serviceError.classList.remove('visible');
      }

      // Validate Message
      if (!messageVal || messageVal.length < 5) {
        messageInput.classList.add('invalid');
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
        messageError.classList.remove('visible');
      }

      if (!isValid) {
        formAlert.className = 'form-alert error';
        formAlert.innerHTML = '⚠️ Please fill out all required fields marked with * before submitting.';
        formAlert.style.display = 'block';
        return;
      }

      // Show Sending Loading State
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Email to Faizan...</span>`;
      formAlert.style.display = 'none';

      // Send payload via FormSubmit AJAX
      const payload = {
        name: nameVal,
        email: emailVal,
        phone: phoneVal || 'Not provided',
        service: serviceVal,
        message: messageVal,
        _subject: `New Project Inquiry from ${nameVal} (Faizan.dev Portfolio)`,
        _template: 'table',
        _captcha: 'false'
      };

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${FAIZAN_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `✅ <strong>Inquiry Sent Successfully!</strong> Your message was delivered directly to <strong>${FAIZAN_EMAIL}</strong>. Faizan will get back to you within 15 minutes!`;
          formAlert.style.display = 'block';

          contactForm.reset();
        } else {
          throw new Error(data.message || 'Server error occurred');
        }
      } catch (err) {
        // Fallback: Mailto link if internet/firewall blocks third-party form delivery
        const mailtoSubject = encodeURIComponent(`Project Inquiry: ${serviceVal} - ${nameVal}`);
        const mailtoBody = encodeURIComponent(`Hi Faizan,

Name: ${nameVal}
Email: ${emailVal}
Phone: ${phoneVal || 'N/A'}
Service: ${serviceVal}

Message:
${messageVal}`);

        formAlert.className = 'form-alert error';
        formAlert.innerHTML = `⚠️ Notice: If the email server is blocked by your browser, <a href="mailto:${FAIZAN_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}" style="color: inherit; text-decoration: underline; font-weight: bold;">Click Here to Send via Your Email Client</a> or click "Send via WhatsApp Instead" below.`;
        formAlert.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });

    // Secondary WhatsApp Action: Instantly formats whatever user entered and opens WhatsApp
    if (whatsappFormBtn) {
      whatsappFormBtn.addEventListener('click', () => {
        const nameVal = nameInput.value.trim() || 'Prospective Client';
        const serviceVal = serviceInput.value || 'Web Development / Graphic Design';
        const phoneVal = phoneInput ? phoneInput.value.trim() : 'N/A';
        const emailVal = emailInput.value.trim() || 'N/A';
        const messageVal = messageInput.value.trim() || 'Hello Faizan, I would like to inquire about your services and 1-day delivery guarantee!';

        const textMessage = `*New Project Inquiry — Faizan.dev*
👤 *Client Name:* ${nameVal}
📧 *Email:* ${emailVal}
📞 *Phone/WhatsApp:* ${phoneVal}
🛠️ *Service Required:* ${serviceVal}
📝 *Project Details:*
${messageVal}`;

        const waUrl = `https://wa.me/${FAIZAN_WHATSAPP}?text=${encodeURIComponent(textMessage)}`;
        window.open(waUrl, '_blank');
      });
    }
  }

  // -------------------------------------------------------------------------
  // 6. Dynamic Year & Back-To-Top Button
  // -------------------------------------------------------------------------
  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
