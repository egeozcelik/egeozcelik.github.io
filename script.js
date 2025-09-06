// Animasyonlu kelime değiştirme
document.addEventListener("DOMContentLoaded", () => {
  const words = ['apps.', 'games.', 'social media.', 'fun.'];
  const colors = [
    ['#610C9F', '#940B92'],
    ['#940B92', '#DA0C81'], 
    ['#610C9F', '#DA0C81'],
    ['#DA0C81', '#610C9F']
  ];
  
  const animatedWord = document.getElementById('animatedWord');
  let currentIndex = 0;

  function changeWord() {
    // Fade out
    animatedWord.style.opacity = '0';
    animatedWord.style.transform = 'translateY(-20px)';
    
    // Kelime ve renk değişimi (fade out sırasında)
    setTimeout(() => {
      // Yeni renk
      const colorPair = colors[currentIndex % colors.length];
      animatedWord.style.background = `linear-gradient(45deg, ${colorPair[0]}, ${colorPair[1]})`;
      animatedWord.style.backgroundSize = '300% 300%';
      animatedWord.style.backgroundClip = 'text';
      animatedWord.style.webkitBackgroundClip = 'text';
      animatedWord.style.webkitTextFillColor = 'transparent';
      
      // Yeni kelime
      animatedWord.textContent = words[currentIndex];
      currentIndex = (currentIndex + 1) % words.length;
      
      // Fade in
      animatedWord.style.transform = 'translateY(20px)';
      setTimeout(() => {
        animatedWord.style.opacity = '1';
        animatedWord.style.transform = 'translateY(0px)';
      }, 50);
    }, 600);
  }

  // İlk setup
  const initialColorPair = colors[0];
  animatedWord.style.background = `linear-gradient(45deg, ${initialColorPair[0]}, ${initialColorPair[1]})`;
  animatedWord.style.backgroundSize = '300% 300%';
  animatedWord.style.backgroundClip = 'text';
  animatedWord.style.webkitBackgroundClip = 'text';
  animatedWord.style.webkitTextFillColor = 'transparent';
  animatedWord.textContent = words[0];
  currentIndex = 1;
  
  // 5 saniye bekle, sonra 5 saniyede bir değiştir
  setTimeout(() => {
    changeWord();
    setInterval(changeWord, 5000);
  }, 3000);

  // Smooth section scrolling
  let isScrolling = false;
  let currentSection = 0;
  const sections = document.querySelectorAll('.section');

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      currentSection = index;
    }
  }

  // Wheel event for section-by-section scrolling
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    isScrolling = true;
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      // Aşağı scroll
      scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      // Yukarı scroll
      scrollToSection(currentSection - 1);
    }
    
    // Scroll işlemini sınırla
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }, { passive: false });

  // Navigation button clicks
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('href');
      
      // Section'lara yönlendirme
      if (target === '#games') scrollToSection(1);
      else if (target === '#apps') scrollToSection(2);
      else if (target === '#social') scrollToSection(3);
      else if (target === '#about') scrollToSection(4);
    });
  });

  // ACCORDION ANIMATION - Sağdan sola açılma
  let isAccordionAnimating = false;
  let accordionOpenTimeout;
  
  // Akordeon container ve resimler
  const accordionContainer = document.querySelector('.accordion-container');
  const accordionImages = document.querySelectorAll('.accordion-img');
  
  console.log('Akordeon container:', accordionContainer);
  console.log('Akordeon resim sayısı:', accordionImages.length);

  // İlk durumda tüm resimleri kapalı (sağda) konuma al
  function initializeAccordion() {
    accordionImages.forEach((img, index) => {
      img.style.transform = 'translateX(100%)'; // Sağda gizli
      img.style.opacity = '0';
      img.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    });
  }

  // Akordeon açma - sağdan sola
  function openAccordion() {
    if (isAccordionAnimating) return;
    
    console.log('🎯 Akordeon açılıyor - sağdan sola');
    isAccordionAnimating = true;
    
    // Sağdan sola doğru sırayla açıl (son resimden başla)
    for (let i = accordionImages.length - 1; i >= 0; i--) {
      const img = accordionImages[i];
      const delay = (accordionImages.length - 1 - i) * 150; // Sağdan sola delay
      
      setTimeout(() => {
        img.style.transform = 'translateX(0)';
        img.style.opacity = '1';
        console.log(`Resim ${i + 1} açıldı`);
      }, delay);
    }
    
    // Animasyon bitince flag'i sıfırla
    setTimeout(() => {
      isAccordionAnimating = false;
    }, accordionImages.length * 150 + 600);
  }

  // Akordeon kapama - soldan sağa
  function closeAccordion() {
    console.log('🔒 Akordeon kapanıyor - soldan sağa');
    
    // Timeout'u temizle
    if (accordionOpenTimeout) {
      clearTimeout(accordionOpenTimeout);
      accordionOpenTimeout = null;
    }
    
    isAccordionAnimating = true;
    
    // Soldan sağa doğru sırayla kapan (ilk resimden başla)
    accordionImages.forEach((img, index) => {
      const delay = index * 100; // Soldan sağa delay
      
      setTimeout(() => {
        img.style.transform = 'translateX(100%)';
        img.style.opacity = '0';
        console.log(`Resim ${index + 1} kapandı`);
      }, delay);
    });
    
    // Animasyon bitince flag'i sıfırla
    setTimeout(() => {
      isAccordionAnimating = false;
    }, accordionImages.length * 100 + 600);
  }

  // Intersection Observer - Section 3'ü izle
  const section3Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('📍 Section 3 intersection:', entry.isIntersecting, 'Target:', entry.target.id);
      
      if (entry.isIntersecting) {
        console.log('✅ Section 3 görünür - 1 saniye sonra akordeon açılacak');
        
        // 1 saniye sonra aç
        accordionOpenTimeout = setTimeout(() => {
          openAccordion();
        }, 1000);
        
      } else {
        console.log('❌ Section 3 görünmez - akordeon kapanıyor');
        closeAccordion();
      }
    });
  }, {
    threshold: 0.4 // %40 görünürlük
  });

  // Section 3'ü bul ve observe et
  const section3 = document.getElementById('section3');
  if (section3) {
    console.log('✅ Section 3 bulundu:', section3);
    initializeAccordion(); // İlk durumu ayarla
    section3Observer.observe(section3);
  } else {
    console.error('❌ Section 3 bulunamadı! HTML\'de id="section3" var mı?');
  }

  // Hover efektini koru (sadece akordeon açıkken)
  accordionImages.forEach((img, index) => {
    img.addEventListener('mouseenter', () => {
      if (!isAccordionAnimating && img.style.opacity === '1') {
        // CSS hover kuralları otomatik çalışacak, ekstra bir şey yapmaya gerek yok
        img.classList.add('hovered');
      }
    });
    
    img.addEventListener('mouseleave', () => {
      if (!isAccordionAnimating && img.style.opacity === '1') {
        // CSS transition ile normale dönecek
        img.classList.remove('hovered');
      }
    });
  });
});