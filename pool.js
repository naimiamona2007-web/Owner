class ParticleSystem {
  constructor() {
    this.particles = [];
    this.container = document.querySelector(".particles-container");
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    // أحجام وألوان عشوائية
    const size = Math.random() * 4 + 1;
    const colors = ["#00f3ff", "#8B5CEB", "#ff00ff", "#00ff41"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            opacity: ${Math.random() * 0.6 + 0.2};
            box-shadow: 0 0 ${size * 2}px ${color};
        `;

    this.container.appendChild(particle);
    this.particles.push({
      element: particle,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: size,
    });
  }

  animate() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // ارتداد من الحواف
      if (particle.x <= 0 || particle.x >= window.innerWidth) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= window.innerHeight)
        particle.vy *= -1;

      particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// نظام الكتابة
class CyberTyper {
  constructor() {
    this.commands = [
      "Full-Stack Developer",
      "UI/UX Architect",
      "Digital Innovator",
      "Code Alchemist",
      "Tech Visionary",
      "Problem Solver",
    ];
    this.currentIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = 100;
    this.element = document.querySelector(".typed-text");
    this.start();
  }

  start() {
    setTimeout(() => this.type(), 1000);
  }

  type() {
    const currentText = this.commands[this.currentIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.typingSpeed = 50;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
      this.typingSpeed = 100;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      this.typingSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.commands.length;
      this.typingSpeed = 500;
    }

    setTimeout(() => this.type(), this.typingSpeed);
  }
}

// عداد الأرقام
class Counter {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number");
    this.init();
  }

  init() {
    this.counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      // بدء العد عند الظهور
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(counter);
    });
  }
}

// التحكم بالموسيقى
class MusicController {
  constructor() {
    this.audio = document.getElementById("bg-music");
    this.toggleBtn = document.getElementById("music-toggle");
    this.isPlaying = false;
    this.init();
  }

  init() {
    this.toggleBtn.addEventListener("click", () => this.toggle());

    // تشغيل تلقائي مع تفاعل المستخدم
    document.addEventListener(
      "click",
      () => {
        if (!this.isPlaying) {
          this.audio.play();
          this.isPlaying = true;
          this.toggleBtn.textContent = "♫";
        }
      },
      { once: true }
    );
  }

  toggle() {
    if (this.isPlaying) {
      this.audio.pause();
      this.toggleBtn.textContent = "🔇";
    } else {
      this.audio.play();
      this.toggleBtn.textContent = "♫";
    }
    this.isPlaying = !this.isPlaying;
  }
}

// تأثيرات التنقل
class NavigationEffects {
  constructor() {
    this.links = document.querySelectorAll(".nav-link");
    this.init();
  }

  init() {
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.setActive(link);

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  setActive(activeLink) {
    this.links.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  }
}

// تأثيرات الكواكب
class PlanetSystem {
  constructor() {
    this.planets = document.querySelectorAll(".project-planet");
    this.init();
  }

  init() {
    this.positionPlanets();
    this.addHoverEffects();
  }

  positionPlanets() {
    const radius = 200;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    this.planets.forEach((planet, index) => {
      const angle = (index / this.planets.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius - 60;
      const y = centerY + Math.sin(angle) * radius - 60;

      planet.style.left = `${x}px`;
      planet.style.top = `${y}px`;
    });
  }

  addHoverEffects() {
    this.planets.forEach((planet) => {
      planet.addEventListener("mouseenter", () => {
        planet.style.filter = "brightness(1.5)";
        planet.style.zIndex = "10";
      });

      planet.addEventListener("mouseleave", () => {
        planet.style.filter = "brightness(1)";
        planet.style.zIndex = "1";
      });
    });
  }
}

// تهيئة كل التأثيرات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  new ParticleSystem();
  new CyberTyper();
  new Counter();
  new MusicController();
  new NavigationEffects();
  new PlanetSystem();

  // تأثيرات إضافية عند التمرير
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // مراقبة العناصر لإضافة تأثيرات الظهور
  document.querySelectorAll(".skill-orb, .contact-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "all 0.8s ease";
    observer.observe(el);
  });
});

// إعادة ترتيب الكواكب عند تغيير حجم النافذة
window.addEventListener("resize", () => {
  const planetSystem = new PlanetSystem();
});
