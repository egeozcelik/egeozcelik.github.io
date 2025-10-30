// ===========================
// SAYFA GEÃ‡Ä°ÅLERÄ°
// ===========================

function showImagePage(event) {
  event.preventDefault();

  const homeContent = document.getElementById('home-content');
  const imageContent = document.getElementById('image-content');
  const navMenu = document.querySelector('.nav-menu');
  const navbarTitle = document.querySelector('.navbar-title');

  // Navbar menÃ¼yÃ¼ yumuÅŸakÃ§a gizle
  navMenu.classList.add('hidden');

  // Ana sayfayÄ± yumuÅŸakÃ§a gizle
  homeContent.classList.remove('active');
  homeContent.classList.add('fade-out');

  // TÃ¼m geÃ§iÅŸleri 0.6s bekledikten sonra yeni sayfayÄ± aÃ§
  setTimeout(() => {
    navbarTitle.classList.add('visible');
    imageContent.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 600);
}

function showHome() {
  const homeContent = document.getElementById('home-content');
  const imageContent = document.getElementById('image-content');
  const navMenu = document.querySelector('.nav-menu');
  const navbarTitle = document.querySelector('.navbar-title');

  // Navbar baÅŸlÄ±ÄŸÄ±nÄ± yumuÅŸakÃ§a gizle
  navbarTitle.classList.remove('visible');

  // 0.6s sonra menÃ¼yÃ¼ geri getir
  setTimeout(() => {
    navMenu.classList.remove('hidden');
  }, 600);

  // Image sayfasÄ±nÄ± gizle
  imageContent.classList.remove('active');

  // 0.3s sonra home iÃ§eriÄŸini yumuÅŸakÃ§a getir
  setTimeout(() => {
    homeContent.classList.remove('fade-out');
    homeContent.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
}
// ===========================
// HERO SCROLL ANIMATION
// ===========================

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollY = window.scrollY;
  
  // Scroll pozisyonuna göre hero'ya "scrolled" class'ı ekle/çıkar
  if (scrollY > 100) {
    hero.classList.add('scrolled');
  } else {
    hero.classList.remove('scrolled');
  }
});


// ===========================
// PARALLAX EFEKTLERÄ°
// ===========================

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Hero parallax
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPositionY = `${scrollY * -0.2}px`;
  }

  // Image section parallax

  const imageSection = document.querySelector('.image-section');
  if (imageSection) {
    const sectionTop = imageSection.offsetTop;
    const offset = scrollY - sectionTop;
    // Parallax efektini daha yumuşak yap ve sınırla
    if (offset > -500 && offset < 1000) {
      imageSection.style.backgroundPositionY = `${50 + (offset * 0.05)}%`;
    }
  }
});

// ===========================
// HORIZONTAL SCROLL
// ===========================

// HORIZONTAL SCROLL - Sadece desktop'ta çalışsın
// HORIZONTAL SCROLL - Sadece desktop'ta çalışsın
const horizontalSection = document.querySelector('.horizontal-scroll');
const scrollContainer = document.querySelector('.scroll-container');

if (horizontalSection && scrollContainer) {
  // Desktop kontrolü
  function initHorizontalScroll() {
    if (window.innerWidth > 1024) {
      const cardCount = document.querySelectorAll('.artifact-card').length;
      const totalHorizontalDistance = window.innerWidth * (cardCount - 1);
      const requiredHeight = (totalHorizontalDistance / window.innerHeight) * 110;
      
      // Height'ı ayarla
      horizontalSection.style.height = `${requiredHeight}vh`;

      // Scroll event
      const scrollHandler = () => {
        const sectionTop = horizontalSection.offsetTop;
        const scrollY = window.scrollY;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + totalHorizontalDistance) {
          const progress = scrollY - sectionTop;
          scrollContainer.style.transform = `translateX(-${progress}px)`;
        } else if (scrollY < sectionTop) {
          scrollContainer.style.transform = `translateX(0)`;
        } else {
          scrollContainer.style.transform = `translateX(-${totalHorizontalDistance}px)`;
        }
      };
      
      window.addEventListener('scroll', scrollHandler);
    } else {
      // Mobil/Tablet için height sıfırla
      horizontalSection.style.height = '100vh';
    }
  }
  
  // İlk yükleme
  initHorizontalScroll();
  
  // Resize olunca yeniden hesapla
  window.addEventListener('resize', () => {
    initHorizontalScroll();
  });
}

// ===========================
// IMAGE GENERATION PAGE
// ===========================

// Mode Toggle (Text to Image / Image to Image)
const modeTextToImage = document.getElementById('mode-tti');
const modeImageToImage = document.getElementById('mode-iti');
const promptTextarea = document.getElementById('prompt');

function setMode(isTextToImage) {
  modeTextToImage.classList.toggle('active', isTextToImage);
  modeImageToImage.classList.toggle('active', !isTextToImage);
  
  promptTextarea.placeholder = isTextToImage
    ? 'Describe the image you want to create... (e.g., Black and white portrait of a man in rain, cinematic lighting)'
    : 'Upload or describe how to transform your image (e.g., make it surreal, dark tone, add fog)';
}

if (modeTextToImage && modeImageToImage) {
  modeTextToImage.addEventListener('click', () => setMode(true));
  modeImageToImage.addEventListener('click', () => setMode(false));
}

// Tab Toggle (Styles / Tips)
const tabStyles = document.getElementById('tab-styles');
const tabTips = document.getElementById('tab-tips');
const contentStyles = document.getElementById('content-styles');
const contentTips = document.getElementById('content-tips');

function switchTab(isStylesTab) {
  tabStyles.classList.toggle('active', isStylesTab);
  tabTips.classList.toggle('active', !isStylesTab);
  contentStyles.classList.toggle('active', isStylesTab);
  contentTips.classList.toggle('active', !isStylesTab);
}

if (tabStyles && tabTips) {
  tabStyles.addEventListener('click', () => switchTab(true));
  tabTips.addEventListener('click', () => switchTab(false));
}

// Generate Button - SeÃ§ilen deÄŸerleri topla
const generateBtn = document.getElementById('generate');
if (generateBtn) {
  generateBtn.addEventListener('click', () => {
    const prompt = document.getElementById('prompt').value;
    const style = document.getElementById('style-select').value;
    const aspectRatio = document.getElementById('aspect-select').value;
    const imageCount = document.getElementById('count-select').value;

    // Burada n8n'e gÃ¶nderilecek veriyi hazÄ±rlayabilirsiniz
    const generationData = {
      prompt: prompt,
      style: style,
      aspectRatio: aspectRatio,
      count: imageCount,
      mode: modeTextToImage.classList.contains('active') ? 'text-to-image' : 'image-to-image'
    };

    console.log('Generation Data:', generationData);
    
    // TODO: n8n webhook'una POST request gÃ¶nderilebilir
    // fetch('YOUR_N8N_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(generationData)
    // });
  });
}

// Styles Grid - Random Images with Prompts
const masonryGrid = document.getElementById('masonry-grid');
const imageCategories = [
  { category: 'portrait', prompt: 'Professional portrait with natural lighting, sharp focus, elegant composition' },
  { category: 'nature', prompt: 'Stunning natural landscape, golden hour lighting, breathtaking scenery' },
  { category: 'technology', prompt: 'Futuristic technology concept, sleek design, modern aesthetic, high detail' },
  { category: 'art', prompt: 'Abstract digital artwork, vibrant colors, creative composition, artistic style' },
  { category: 'ai', prompt: 'AI and robotics theme, cybernetic elements, sci-fi atmosphere, advanced tech' },
  { category: 'city', prompt: 'Urban cityscape, architectural beauty, dynamic perspective, city lights' },
  { category: 'fashion', prompt: 'High fashion photography, elegant styling, professional lighting, editorial quality' },
  { category: 'mountain', prompt: 'Majestic mountain peaks, dramatic clouds, epic scale, nature photography' },
  { category: 'abstract', prompt: 'Abstract geometric patterns, bold colors, modern minimalist design' },
  { category: 'wildlife', prompt: 'Wildlife in natural habitat, crisp detail, natural behavior, nature documentary style' },
  { category: 'ocean', prompt: 'Ocean waves and seascape, turquoise water, peaceful atmosphere, coastal view' },
  { category: 'architecture', prompt: 'Modern architecture design, clean lines, minimalist aesthetic, urban landscape' },
  { category: 'space', prompt: 'Cosmic space scene, stars and nebula, deep space photography, astronomical wonder' },
  { category: 'food', prompt: 'Gourmet food photography, appetizing presentation, professional styling, delicious' },
  { category: 'music', prompt: 'Music and performance, dynamic energy, stage lighting, artistic expression' }
];

function loadRandomImages() {
  if (!masonryGrid) return;
  
  masonryGrid.innerHTML = '';
  
  for (let i = 0; i < 15; i++) {
    const width = 300 + Math.floor(Math.random() * 300);
    const height = 400 + Math.floor(Math.random() * 400);
    const randomCategory = imageCategories[Math.floor(Math.random() * imageCategories.length)];
    
    const card = document.createElement('div');
    card.className = 'style-image-card';
    
    const img = document.createElement('img');
    img.src = `https://picsum.photos/${width}/${height}?random=${i}&${randomCategory.category}`;
    img.alt = "Style example";
    
    const overlay = document.createElement('div');
    overlay.className = 'style-prompt-overlay';
    overlay.textContent = `"${randomCategory.prompt}"`;
    
    card.appendChild(img);
    card.appendChild(overlay);
    masonryGrid.appendChild(card);
  }
}

// Sayfa yÃ¼klendiÄŸinde resimleri yÃ¼kle
if (masonryGrid) {
  loadRandomImages();
}


// ===========================
// RESPONSIVE CSS DYNAMIC LOADING
// ===========================

function loadResponsiveCSS() {
  // Eğer ekran 1024px ve altındaysa responsive CSS'i yükle
  if (window.innerWidth <= 1024) {
    // Responsive CSS zaten yüklü mü kontrol et
    if (!document.getElementById('responsive-css')) {
      const link = document.createElement('link');
      link.id = 'responsive-css';
      link.rel = 'stylesheet';
      link.href = '/lumosAI/responsiveness.css';
      document.head.appendChild(link);
    }
  } else {
    // Desktop'taysa responsive CSS'i kaldır
    const existingLink = document.getElementById('responsive-css');
    if (existingLink) {
      existingLink.remove();
    }
  }
}

// Sayfa yüklendiğinde kontrol et
loadResponsiveCSS();

// Ekran boyutu değiştiğinde kontrol et
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    loadResponsiveCSS();
  }, 250);
});