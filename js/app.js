/**
 * DEV KUMAR RAJU — PREMIUM ANIMATED POLITICAL WEBSITE JAVASCRIPT
 * Official Interactive Application Controller
 * Version: 2.0
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. PRELOADER CONTROLLER
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');
  const skipPreloaderBtn = document.getElementById('skipPreloaderBtn');

  let loadProgress = 0;
  const progressInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 25) + 15;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(progressInterval);
      setTimeout(dismissPreloader, 350);
    }
    if (preloaderFill) {
      preloaderFill.style.width = `${loadProgress}%`;
    }
  }, 100);

  function dismissPreloader() {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
    }
  }

  if (skipPreloaderBtn) {
    skipPreloaderBtn.addEventListener('click', () => {
      clearInterval(progressInterval);
      dismissPreloader();
    });
  }

  /* ==========================================================================
     2. AMBIENT GOLDEN PARTICLE CANVAS ENGINE
     ========================================================================== */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 55;

    class GoldenParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -Math.random() * 0.5 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.8) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.1) this.growing = true;
        }

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
          this.y = height + 10;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new GoldenParticle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    // Only run animation if user does not prefer reduced motion
    const motionPref = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionPref.matches) {
      animateParticles();
    }
  }

  /* ==========================================================================
     3. STICKY HEADER & SCROLL SPY & PROGRESS BAR
     ========================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header styling
    if (siteHeader) {
      if (scrollPos > 60) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Top progress bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollPos / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy for navigation
    let currentSectionId = '';
    sections.forEach((sec) => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     4. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  /* ==========================================================================
     5. STATS ANIMATED COUNTERS
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsCounted = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                counter.textContent = `${target}+`;
                clearInterval(timer);
              } else {
                counter.textContent = current;
              }
            }, 30);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroRibbon = document.querySelector('.hero-stats-ribbon');
  if (heroRibbon) {
    statsObserver.observe(heroRibbon);
  }

  /* ==========================================================================
     6. SECTOR COMMITMENTS TABS
     ========================================================================== */
  const sectorTabBtns = document.querySelectorAll('.sector-tab-btn');
  const sectorPanels = document.querySelectorAll('.sector-panel');

  sectorTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      sectorTabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      sectorPanels.forEach((p) => {
        p.style.display = 'none';
        p.classList.remove('active');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(`panel-${tabId}`);
      if (targetPanel) {
        targetPanel.style.display = 'block';
        targetPanel.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     7. CONSTITUENCY 8-DISTRICT SELECTOR
     ========================================================================== */
  const districtData = {
    varanasi: {
      title: 'जनपद वाराणसी (Varanasi)',
      tagline: 'आध्यात्मिक व सांस्कृतिक राजधानी • प्रमुख शैक्षणिक केंद्र (BHU, MGKVP, सम्पूर्णानंद)',
      desc: 'काशी के हजारों शिक्षकों, अधिवक्ताओं, छात्र-छात्राओं एवं व्यापारियों की समस्याओं के समाधान हेतु चौबीसों घंटे तत्पर। शैक्षणिक संस्थानों का विकास एवं नागरिक कल्याण हमारी सर्वोच्च प्राथमिकता।',
    },
    jaunpur: {
      title: 'जनपद जौनपुर (Jaunpur)',
      tagline: 'शिराज़-ए-हिंद • पूर्वांचल विश्वविद्यालय व शिक्षक-छात्र केंद्र',
      desc: 'वीर बहादुर सिंह पूर्वांचल विश्वविद्यालय से संबद्ध हजारों स्नातकों एवं शिक्षकों की पुरानी पेंशन, समयबद्ध पदोन्नति एवं रोजगार के अवसरों हेतु सतत संघर्ष।',
    },
    ghazipur: {
      title: 'जनपद गाजीपुर (Ghazipur)',
      tagline: 'लहुरी काशी • शहीदों व वीरों की पावन भूमि',
      desc: 'गाजीपुर के युवाओं को प्रतियोगी परीक्षाओं में निष्पक्ष अवसर, गंगा किनारे के कृषकों को सिंचाई व फसल का उचित मूल्य दिलाने की मजबूत कार्ययोजना।',
    },
    chandauli: {
      title: 'जनपद चंदौली (Chandauli)',
      tagline: 'धान का कटोरा • कृषि, उद्योग व युवा शक्ति का संगम',
      desc: 'कृषि स्नातकों, छोटे व्यापारियों एवं ग्रामीण युवाओं के स्वरोजगार हेतु आधुनिक स्किल सेंटर व बुनियादी ढांचे का विस्तार हमारा संकल्प है।',
    },
    mirzapur: {
      title: 'जनपद मिर्जापुर (Mirzapur)',
      tagline: 'मां विंध्यवासिनी की पवित्र भूमि • पीतल उद्योग व हस्तशिल्प',
      desc: 'स्थानीय हस्तशिल्पियों, पीतल उद्योग के व्यापारियों की समस्याओं का समाधान तथा विंध्य क्षेत्र के कॉलेजों में गुणवत्तापूर्ण उच्च शिक्षा की उपलब्धता।',
    },
    sonbhadra: {
      title: 'जनपद सोनभद्र (Sonbhadra)',
      tagline: 'ऊर्जा राजधानी • प्राकृतिक संसाधन व जनजातीय संस्कृति',
      desc: 'औद्योगिक व ऊर्जा परियोजनाओं में स्थानीय स्नातक युवाओं को प्राथमिकता, शुद्ध पेयजल, स्वास्थ्य सेवाएं एवं पर्यावरण संरक्षण के ठोस कदम।',
    },
    bhadohi: {
      title: 'जनपद भदोही (Bhadohi)',
      tagline: 'कालीन नगरी (Carpet City) • वैश्विक निर्यात हब',
      desc: 'कालीन उद्योग के निर्यातकों, स्थानीय व्यापारियों एवं बुनकरों के हितों की रक्षा, जीएसटी सरलीकरण व व्यावसायिक सुरक्षा तंत्र की स्थापना।',
    },
    ballia: {
      title: 'जनपद बलिया (Ballia)',
      tagline: 'बागी बलिया • स्वतंत्रता संग्राम व साहित्य की अमर भूमि',
      desc: 'जननायक चंद्रशेखर विश्वविद्यालय के छात्रों, युवा अधिवक्ताओं एवं शिक्षकों के मान-सम्मान व रोजगार संवर्धन के लिए सतत समर्पण।',
    },
  };

  const districtChips = document.querySelectorAll('.district-chip');
  const distTitle = document.getElementById('distTitle');
  const distTagline = document.getElementById('distTagline');
  const distDesc = document.getElementById('distDesc');

  districtChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const distKey = chip.getAttribute('data-district');
      districtChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      if (districtData[distKey]) {
        if (distTitle) distTitle.textContent = districtData[distKey].title;
        if (distTagline) distTagline.textContent = districtData[distKey].tagline;
        if (distDesc) distDesc.textContent = districtData[distKey].desc;
      }
    });
  });

  /* ==========================================================================
     8. PHOTO GALLERY FILTERING & LIGHTBOX
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  let currentGalleryIndex = 0;
  let activeGalleryItems = Array.from(galleryItems);

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach((item) => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      activeGalleryItems = Array.from(galleryItems).filter((item) => item.style.display !== 'none');
    });
  });

  function openLightbox(index) {
    if (activeGalleryItems.length === 0) return;
    currentGalleryIndex = (index + activeGalleryItems.length) % activeGalleryItems.length;
    const item = activeGalleryItems[currentGalleryIndex];
    const src = item.getAttribute('data-src') || item.querySelector('img').getAttribute('src');
    const caption = item.getAttribute('data-caption') || '';

    if (lightboxImg) lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightboxModal) lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const activeIdx = activeGalleryItems.indexOf(item);
      openLightbox(activeIdx !== -1 ? activeIdx : idx);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => openLightbox(currentGalleryIndex - 1));
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => openLightbox(currentGalleryIndex + 1));
  }

  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentGalleryIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentGalleryIndex + 1);
    }
  });

  /* ==========================================================================
     9. VIDEO MODAL PLAYER
     ========================================================================== */
  const videoModal = document.getElementById('videoModal');
  const videoModalCloseBtn = document.getElementById('videoModalCloseBtn');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const videoIframe = document.getElementById('videoIframe');
  const videoStage = document.querySelector('.video-thumbnail-stage');
  const videoSideCards = document.querySelectorAll('.video-side-card');

  function openVideoModal(url) {
    if (videoIframe && videoModal) {
      videoIframe.src = url || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
      videoModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeVideoModal() {
    if (videoIframe && videoModal) {
      videoIframe.src = '';
      videoModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (videoStage) {
    videoStage.addEventListener('click', () => {
      const url = videoStage.getAttribute('data-video-url');
      openVideoModal(url);
    });
  }

  videoSideCards.forEach((card) => {
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-video-url');
      openVideoModal(url);
    });
  });

  if (videoModalCloseBtn) videoModalCloseBtn.addEventListener('click', closeVideoModal);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideoModal);

  /* ==========================================================================
     10. NEWS DETAIL MODAL
     ========================================================================== */
  const newsArticles = {
    '1': {
      title: 'वाराणसी में स्नातक सम्मेलन: "शिक्षित समाज ही सशक्त राष्ट्र की नींव है"',
      date: '20 अगस्त 2026',
      cat: 'जनसंपर्क एवं सम्मेलन',
      image: 'assets/images/1.png',
      body: `<p>वाराणसी में आयोजित विशाल स्नातक संवाद सम्मेलन में प्रत्याशी देव कुमार राजू ने हजारों प्रबुद्ध नागरिकों, अधिवक्ताओं और छात्र-छात्राओं को संबोधित किया।</p>
             <p>उन्होंने कहा कि काशी हमेशा से ज्ञान, संस्कृति और न्याय की वैश्विक राजधानी रही है। विधान परिषद में जब तक शिक्षित वर्ग के प्रतिनिधि मुखरता से अपनी आवाज़ नहीं उठाएंगे, तब तक शिक्षा व रोजगार की नीतियों में अपेक्षित सुधार संभव नहीं होगा।</p>
             <p>देव कुमार राजू ने सभी उपस्थित स्नातकों से आह्वान किया कि वे प्रथम वरीयता का मत देकर शिक्षित समाज के स्वाभिमान की लड़ाई को विजयी बनाएं।</p>`,
    },
    '2': {
      title: 'अधिवक्ता सुरक्षा कानून लागू कराने के लिए विधान परिषद में उठाएंगे मजबूत आवाज़',
      date: '15 अगस्त 2026',
      cat: 'विधिक सम्मेलन',
      image: 'assets/images/2.png',
      body: `<p>वाराणसी व आसपास के जनपदों की बार एसोसिएशनों के पदाधिकारियों के साथ आयोजित बैठक में देव कुमार राजू ने अधिवक्ता समाज की समस्याओं पर गंभीर मंथन किया।</p>
             <p>उन्होंने स्पष्ट किया कि साथी अधिवक्ताओं की सुरक्षा व सम्मान के लिए प्रदेश स्तर पर एडवोकेट प्रोटेक्शन एक्ट की तत्काल आवश्यकता है। साथ ही नए व युवा अधिवक्ताओं को शुरुआती वर्षों में सम्मानजनक मासिक स्टाइपेंड व निःशुल्क डिजिटल कानूनी लाइब्रेरी उपलब्ध कराई जानी चाहिए।</p>`,
    },
    '3': {
      title: 'व्यापारियों के सम्मान और सुरक्षा के लिए हर स्तर पर लड़ाई लड़ी जाएगी',
      date: '10 अगस्त 2026',
      cat: 'व्यापारी सम्मेलन',
      image: 'assets/images/32.png',
      body: `<p>पूर्वांचल के प्रमुख व्यापारिक मंडलों और संघों के साथ आयोजित जनसंवाद में देव कुमार राजू ने जीएसटी की जटिलताओं और व्यापारियों के शोषण पर चिंता व्यक्त की।</p>
             <p>उन्होंने कहा कि व्यापारी देश की अर्थव्यवस्था के स्तंभ हैं। उन्हें भयमुक्त वातावरण, त्वरित ऋण सुविधाएं एवं व्यावसायिक दुर्घटना सुरक्षा बीमा मिलना उनका मौलिक अधिकार है।</p>`,
    },
  };

  const newsModal = document.getElementById('newsModal');
  const newsModalBody = document.getElementById('newsModalBody');
  const newsModalCloseBtn = document.getElementById('newsModalCloseBtn');
  const newsModalBackdrop = document.getElementById('newsModalBackdrop');
  const readNewsBtns = document.querySelectorAll('.btn-read-news');

  readNewsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-news-id');
      const article = newsArticles[id];
      if (article && newsModalBody && newsModal) {
        newsModalBody.innerHTML = `
          <div style="margin-bottom:20px;">
            <span style="background:var(--primary);color:#FFF;padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:700;">${article.cat}</span>
            <span style="color:var(--text-light);font-size:0.85rem;margin-left:10px;">${article.date}</span>
          </div>
          <h2 style="font-size:1.8rem;font-weight:800;color:var(--primary-dark);line-height:1.3;margin-bottom:20px;">${article.title}</h2>
          <img src="${article.image}" alt="${article.title}" style="width:100%;max-height:350px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:20px;">
          <div style="font-size:1.05rem;line-height:1.7;color:var(--text-main);">
            ${article.body}
          </div>
        `;
        newsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeNewsModal() {
    if (newsModal) newsModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (newsModalCloseBtn) newsModalCloseBtn.addEventListener('click', closeNewsModal);
  if (newsModalBackdrop) newsModalBackdrop.addEventListener('click', closeNewsModal);

  /* ==========================================================================
     11. VCARD (.VCF) GENERATOR & DOWNLOADER
     ========================================================================== */
  function generateAndDownloadVCard() {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:गुप्ता;देव कुमार (राजू);;;',
      'FN:देव कुमार (राजू गुप्ता)',
      'ORG:स्नातक MLC प्रत्याशी — वाराणसी खंड',
      'TITLE:अधिवक्ता एवं स्नातक MLC प्रत्याशी',
      'TEL;TYPE=CELL,VOICE:+919335603042',
      'TEL;TYPE=WORK,VOICE:+918176986030',
      'EMAIL;TYPE=PREF,INTERNET:info@devkumarraju.in',
      'URL:https://devkumarraju.in',
      'ADR;TYPE=WORK:;;वाराणसी;उत्तर प्रदेश;221001;भारत',
      'NOTE:शिक्षित समाज, सशक्त समाज। प्रथम वरीयता का मत दें [ 1 ]।',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Dev_Kumar_Raju_MLC_Contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('✅ डिजिटल विजिटिंग कार्ड (.vcf) डाउनलोड हो गया है!');
  }

  const heroVCardBtn = document.getElementById('heroVCardBtn');
  const downloadVCardBtn = document.getElementById('downloadVCardBtn');
  const mfVCardBtn = document.getElementById('mfVCardBtn');

  if (heroVCardBtn) heroVCardBtn.addEventListener('click', generateAndDownloadVCard);
  if (downloadVCardBtn) downloadVCardBtn.addEventListener('click', generateAndDownloadVCard);
  if (mfVCardBtn) mfVCardBtn.addEventListener('click', generateAndDownloadVCard);

  /* ==========================================================================
     12. NATIVE WEB SHARE & CLIPBOARD FALLBACK
     ========================================================================== */
  const nativeShareBtn = document.getElementById('nativeShareBtn');
  if (nativeShareBtn) {
    nativeShareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'देव कुमार (राजू गुप्ता) — स्नातक MLC प्रत्याशी, वाराणसी खंड',
        text: 'शिक्षित समाज, सशक्त समाज। वाराणसी खंड स्नातक एमएलसी चुनाव में प्रथम वरीयता [ 1 ] का मत दें। अधिक जानकारी व संपर्क हेतु वेबसाइट देखें:',
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log('Share canceled or error:', err);
        }
      } else {
        // Clipboard fallback
        try {
          await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          showToast('📋 लिंक कॉपी हो गया है! WhatsApp या सोशल मीडिया पर साझा करें।');
        } catch (e) {
          showToast('लिंक कॉपी करने में असमर्थ।');
        }
      }
    });
  }

  /* ==========================================================================
     13. CITIZEN GRIEVANCE / FEEDBACK FORM HANDLER
     ========================================================================== */
  const citizenForm = document.getElementById('citizenContactForm');
  const formToast = document.getElementById('formToast');
  const sendDirectWhatsAppBtn = document.getElementById('sendDirectWhatsAppBtn');

  function validateCitizenForm() {
    let isValid = true;
    const name = document.getElementById('fullName');
    const mobile = document.getElementById('mobileNumber');
    const district = document.getElementById('districtSelect');
    const category = document.getElementById('categorySelect');
    const message = document.getElementById('messageContent');

    const nameError = document.getElementById('nameError');
    const mobileError = document.getElementById('mobileError');
    const districtError = document.getElementById('districtError');
    const categoryError = document.getElementById('categoryError');
    const messageError = document.getElementById('messageError');

    // Reset errors
    if (nameError) nameError.textContent = '';
    if (mobileError) mobileError.textContent = '';
    if (districtError) districtError.textContent = '';
    if (categoryError) categoryError.textContent = '';
    if (messageError) messageError.textContent = '';

    if (!name.value.trim() || name.value.trim().length < 2) {
      if (nameError) nameError.textContent = 'कृपया अपना पूरा नाम दर्ज करें।';
      isValid = false;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile.value.trim() || !mobileRegex.test(mobile.value.trim().replace(/\D/g, ''))) {
      if (mobileError) mobileError.textContent = 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।';
      isValid = false;
    }

    if (!district.value) {
      if (districtError) districtError.textContent = 'कृपया अपना जनपद चुनें।';
      isValid = false;
    }

    if (!category.value) {
      if (categoryError) categoryError.textContent = 'कृपया अपना वर्ग चुनें।';
      isValid = false;
    }

    if (!message.value.trim() || message.value.trim().length < 5) {
      if (messageError) messageError.textContent = 'कृपया अपना संदेश या सुझाव विस्तार से लिखें।';
      isValid = false;
    }

    return isValid;
  }

  if (citizenForm) {
    citizenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateCitizenForm()) return;

      const name = document.getElementById('fullName').value.trim();
      const mobile = document.getElementById('mobileNumber').value.trim();
      const district = document.getElementById('districtSelect').value;
      const category = document.getElementById('categorySelect').value;
      const message = document.getElementById('messageContent').value.trim();

      // Save submission to localStorage for record
      const submissions = JSON.parse(localStorage.getItem('dkr_submissions') || '[]');
      submissions.push({
        name,
        mobile,
        district,
        category,
        message,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('dkr_submissions', JSON.stringify(submissions));

      if (formToast) {
        formToast.className = 'form-toast success';
        formToast.innerHTML = `🙏 धन्यवाद <strong>${name} जी</strong>! आपका संदेश सफलतापूर्वक प्राप्त हो गया है। हमारी टीम आपसे शीघ्र संपर्क करेगी।`;
        formToast.style.display = 'block';
      }

      citizenForm.reset();
      showToast('✅ संदेश सफलतापूर्वक भेजा गया!');
    });
  }

  if (sendDirectWhatsAppBtn) {
    sendDirectWhatsAppBtn.addEventListener('click', () => {
      const name = document.getElementById('fullName').value.trim() || 'शुभचिंतक';
      const district = document.getElementById('districtSelect').value || 'वाराणसी खंड';
      const category = document.getElementById('categorySelect').value || 'नागरिक';
      const message = document.getElementById('messageContent').value.trim() || 'मैं आपके अभियान से जुड़ना चाहता हूं।';

      const waText = encodeURIComponent(
        `*सादर प्रणाम देव कुमार राजू जी,*\n\n` +
          `*नाम:* ${name}\n` +
          `*जनपद:* ${district}\n` +
          `*वर्ग:* ${category}\n` +
          `*संदेश/सुझाव:* ${message}\n\n` +
          `_शिक्षित समाज, सशक्त समाज अभियान_`
      );

      window.open(`https://wa.me/918176986030?text=${waText}`, '_blank');
    });
  }

  /* ==========================================================================
     14. WEB AUDIO AMBIENT DRONE SYNTHESIZER
     ========================================================================== */
  let audioCtx = null;
  let isAudioPlaying = false;
  let synthGain = null;

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIconMuted = document.getElementById('audioIconMuted');
  const audioIconPlaying = document.getElementById('audioIconPlaying');

  function initAmbientSynth() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Master gain
      synthGain = audioCtx.createGain();
      synthGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      synthGain.connect(audioCtx.destination);

      // Frequencies for a soothing meditative Indian raga / tanpura drone (Sa-Pa fundamental)
      const droneFreqs = [130.81, 196.0, 261.63, 392.0]; // C3, G3, C4, G4

      droneFreqs.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        // Subtle detune for shimmer
        osc.detune.setValueAtTime(Math.random() * 8 - 4, audioCtx.currentTime);

        oscGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(synthGain);
        osc.start();
      });
    } catch (err) {
      console.warn('Web Audio Synth not supported:', err);
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (!audioCtx) {
        initAmbientSynth();
        isAudioPlaying = true;
      } else {
        if (isAudioPlaying) {
          audioCtx.suspend();
          isAudioPlaying = false;
        } else {
          audioCtx.resume();
          isAudioPlaying = true;
        }
      }

      if (audioIconMuted && audioIconPlaying) {
        audioIconMuted.style.display = isAudioPlaying ? 'none' : 'block';
        audioIconPlaying.style.display = isAudioPlaying ? 'block' : 'none';
      }

      showToast(isAudioPlaying ? '🎵 बैकग्राउंड संगीत चालू' : '🔇 बैकग्राउंड संगीत बंद');
    });
  }

  /* ==========================================================================
     15. LIVE CAMPAIGN ADMIN CUSTOMIZER DRAWER
     ========================================================================== */
  const adminTriggerBtn = document.getElementById('adminTriggerBtn');
  const adminDrawer = document.getElementById('adminDrawer');
  const adminCloseBtn = document.getElementById('adminCloseBtn');
  const saveAdminChangesBtn = document.getElementById('saveAdminChangesBtn');
  const resetAdminChangesBtn = document.getElementById('resetAdminChangesBtn');

  function openAdminDrawer() {
    if (adminDrawer) {
      adminDrawer.style.display = 'flex';
      loadAdminValues();
    }
  }

  function closeAdminDrawer() {
    if (adminDrawer) adminDrawer.style.display = 'none';
  }

  function loadAdminValues() {
    const saved = JSON.parse(localStorage.getItem('dkr_admin_settings') || '{}');
    if (document.getElementById('admName')) {
      document.getElementById('admName').value = saved.name || 'देव कुमार (राजू गुप्ता)';
    }
    if (document.getElementById('admDesignation')) {
      document.getElementById('admDesignation').value = saved.designation || 'स्नातक MLC प्रत्याशी – वाराणसी खंड';
    }
    if (document.getElementById('admTagline')) {
      document.getElementById('admTagline').value = saved.slogan || '“शिक्षित समाज, सशक्त समाज”';
    }
    if (document.getElementById('admPhone')) {
      document.getElementById('admPhone').value = saved.phone || '9335603042';
    }
    if (document.getElementById('admPhone2')) {
      document.getElementById('admPhone2').value = saved.phone2 || '8176986030';
    }
    if (document.getElementById('admEmail')) {
      document.getElementById('admEmail').value = saved.email || 'info@devkumarraju.in';
    }
  }

  function applyAdminValues(settings) {
    const nameEls = document.querySelectorAll('[data-admin-key="candidate_name"], [data-admin-key="hero_name"]');
    nameEls.forEach((el) => (el.textContent = settings.name));

    const desigEls = document.querySelectorAll('[data-admin-key="candidate_tagline"], [data-admin-key="hero_designation"]');
    desigEls.forEach((el) => (el.textContent = settings.designation));

    const sloganEls = document.querySelectorAll('[data-admin-key="slogan_tag"]');
    sloganEls.forEach((el) => (el.textContent = settings.slogan));
  }

  // Initial load
  const initialSettings = JSON.parse(localStorage.getItem('dkr_admin_settings') || '{}');
  if (Object.keys(initialSettings).length > 0) {
    applyAdminValues(initialSettings);
  }

  if (adminTriggerBtn) adminTriggerBtn.addEventListener('click', openAdminDrawer);
  if (adminCloseBtn) adminCloseBtn.addEventListener('click', closeAdminDrawer);

  if (saveAdminChangesBtn) {
    saveAdminChangesBtn.addEventListener('click', () => {
      const settings = {
        name: document.getElementById('admName').value.trim(),
        designation: document.getElementById('admDesignation').value.trim(),
        slogan: document.getElementById('admTagline').value.trim(),
        phone: document.getElementById('admPhone').value.trim(),
        phone2: document.getElementById('admPhone2').value.trim(),
        email: document.getElementById('admEmail').value.trim(),
      };

      localStorage.setItem('dkr_admin_settings', JSON.stringify(settings));
      applyAdminValues(settings);
      closeAdminDrawer();
      showToast('✅ सभी परिवर्तन सफलतापूर्वक सहेज लिए गए हैं!');
    });
  }

  if (resetAdminChangesBtn) {
    resetAdminChangesBtn.addEventListener('click', () => {
      localStorage.removeItem('dkr_admin_settings');
      const defaults = {
        name: 'देव कुमार (राजू गुप्ता)',
        designation: 'स्नातक MLC प्रत्याशी – वाराणसी खंड',
        slogan: '“शिक्षित समाज, सशक्त समाज”',
      };
      applyAdminValues(defaults);
      loadAdminValues();
      showToast('🔄 मूल डिफ़ॉल्ट सेटिंग्स पुनर्स्थापित कर दी गईं।');
    });
  }

  /* ==========================================================================
     16. GLOBAL TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  function showToast(message, duration = 3500) {
    const toast = document.getElementById('globalToast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  /* ==========================================================================
     17. CINEMATIC SCROLL REVEAL & STAGGER ENGINE
     ========================================================================== */
  const revealTargets = document.querySelectorAll(`
    .section-heading,
    .mission-card,
    .commit-card,
    .timeline-item,
    .achieve-card,
    .district-chips-grid,
    .district-detail-card,
    .news-card,
    .gallery-item,
    .video-featured-card,
    .video-side-card,
    .social-box,
    .contact-card-glass,
    .about-emblem-card,
    .about-content,
    .announcement-banner
  `);

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal-on-scroll');
    const delayIndex = (i % 6) + 1;
    el.classList.add(`stagger-${delayIndex}`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ==========================================================================
     18. INTERACTIVE 3D CARD TILT EFFECT (DESKTOP)
     ========================================================================== */
  if (window.matchMedia('(pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll(`
      .mission-card,
      .commit-card,
      .news-card,
      .achieve-card,
      .district-detail-card
    `);

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / (rect.height / 2)) * 4;
        const rotateY = (x / (rect.width / 2)) * 4;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ==========================================================================
     19. BUTTON & CHIP CLICK RIPPLE EFFECT
     ========================================================================== */
  const rippleTargets = document.querySelectorAll('.btn, .district-chip, .filter-btn, .mf-btn, .ctrl-btn');
  rippleTargets.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-wave');

      const existingRipple = this.querySelector('.ripple-wave');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
});
