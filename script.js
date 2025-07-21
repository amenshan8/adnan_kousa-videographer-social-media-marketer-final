// GSAP and ScrollTrigger registration
gsap.registerPlugin(ScrollTrigger);

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero animations
gsap.timeline()
    .from('.hero-title-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2
    })
    .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.8')
    .from('.scroll-indicator', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5');

// Parallax effect for hero
gsap.to('.hero-video-container', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// Logo animation
gsap.from('.logo-animation', {
    y: -30,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.1
});

// Section reveal animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('.section-title, .about-text, .service-item, .testimonial-item'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Portfolio items animation
gsap.from('.portfolio-item', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                gsap.fromTo(item, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
                );
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }

    lastScroll = currentScroll;
});

// Service items animation - Fixed to ensure services are visible
gsap.from('.service-item', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
            // Ensure services are visible
            document.querySelectorAll('.service-item').forEach(item => {
                item.style.opacity = '1';
                item.style.visibility = 'visible';
            });
        }
    }
});

// Service items hover effect - Fixed
document.querySelectorAll('.service-item').forEach(item => {
    item.style.opacity = '1';
    item.style.visibility = 'visible';
    
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Force services to be visible on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.service-item').forEach(item => {
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.style.display = 'block';
    });
});

// Social links animation
gsap.from('.social-link', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.social-links',
        start: 'top 80%'
    }
});

// Initialize Swiper for video carousel - Fixed initialization
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the container exists before initializing
    const swiperContainer = document.querySelector('.portfolio .swiper-container');
    if (swiperContainer) {
        const swiper = new Swiper(swiperContainer, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 800,
            pagination: {
                el: '.portfolio .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.portfolio .swiper-button-next',
                prevEl: '.portfolio .swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 42,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 42,
                },
            },
            grabCursor: true,
            effect: 'slide',
            centeredSlides: false,
        });
    }
});

// Initialize Fancybox for video lightbox - Fixed to use YouTube
document.addEventListener('DOMContentLoaded', function() {
    Fancybox.bind("[data-fancybox]", {
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["close"],
            },
        },
        Thumbs: false,
        autoFocus: false,
        closeButton: true,
        keyboard: true,
        arrows: true,
        infobar: false,
        toolbar: false,
        click: false,
        wheel: false,
        dragToClose: false,
        closeExisting: false,
        trapFocus: false,
        idle: false,
        preload: 1,
        animationEffect: "fade",
        animationDuration: 366,
        transitionEffect: "fade",
        transitionDuration: 366,
    });
});

// Language System
const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            work: "Work",
            services: "Services",
            contact: "Contact"
        },
        hero: {
            title: "Adnan Kousa",
            subtitle: "Videographer & Social Media Marketer",
            scroll: "Scroll to explore"
        },
        about: {
            title: "About Me",
            text: "Adnan Kousa is a creative professional who turns ideas into cinematic stories. As a videographer and social media marketer, Adnan helps brands, artists, and entrepreneurs grow through visual storytelling and digital content strategy."
        },
        work: {
            title: "My Work",
            subtitle: "Latest videos showcasing my creative vision",
            viewMore: "View More Videos"
        },
        services: {
            title: "Services",
            subtitle: "Professional creative services tailored to your needs",
            items: {
                videography: {
                    title: "Videography",
                    desc: "Professional shooting, editing, and drone footage for all your visual needs. From concept to final cut, we create stunning visuals that tell your story."
                },
                social: {
                    title: "Social Media Marketing",
                    desc: "Strategic content creation, ad campaigns, and growth strategies across platforms. Build your brand presence and engage your audience effectively."
                },
                commercial: {
                    title: "Commercials & Ads",
                    desc: "High-impact commercial production for brands and businesses. Create compelling advertisements that drive results and elevate your brand."
                },
                event: {
                    title: "Event Videography",
                    desc: "Complete event coverage with cinematic storytelling approach. Capture every moment of your special events with professional quality."
                },
                content: {
                    title: "Content Creation",
                    desc: "Platform-specific content for Instagram, TikTok, YouTube, and X. Stay relevant with trending content that resonates with your audience."
                },
                drone: {
                    title: "Drone Photography",
                    desc: "Aerial cinematography and photography services. Get stunning bird's-eye views that add production value to your projects."
                }
            }
        },
        testimonials: {
            title: "Client Stories",
            items: {
                1: { text: "Adnan transformed our brand's visual identity with stunning videos that doubled our engagement.", name: "- Sarah Johnson, Tech Startup CEO" },
                2: { text: "Working with Adnan was incredible. His creative vision brought our music to life visually.", name: "- Marcus Rivera, Recording Artist" },
                3: { text: "The wedding video exceeded all expectations. Every moment was captured perfectly.", name: "- Emily & David Chen" }
            }
        },
        contact: {
            title: "Let's Create Together",
            phone: "06 3872 4909",
            email: "adnankousa24@gmail.com",
            bioLink: "Bio Link",
            businessCard: "Business Card"
        },
        portfolio: {
            title: "Latest Work",
            subtitle: "A selection of recent projects shot in cinematic Reels format, optimized for social media impact.",
            viewMore: "View More Projects",
            items: [
                { title: "Cinematic Reel", category: "Brand Video" },
                { title: "Social Media Campaign", category: "Content Creation" },
                { title: "Event Highlights", category: "Event Coverage" },
                { title: "Product Showcase", category: "Commercial" },
                { title: "Behind the Scenes", category: "Documentary" }
            ]
        }
    },
    nl: {
        nav: {
            home: "Home",
            about: "Over Mij",
            work: "Werk",
            services: "Diensten",
            contact: "Contact"
        },
        hero: {
            title: "Adnan Kousa",
            subtitle: "Videograaf & Social Media Marketeer",
            scroll: "Ontdek meer"
        },
        about: {
            title: "Over Mij",
            text: "Adnan Kousa is een creatieve professional die ideeën omzet in cinematische verhalen. Als videograaf en social media marketeer helpt Adnan merken, artiesten en ondernemers te groeien door visueel storytelling en digitale contentstrategie."
        },
        work: {
            title: "Mijn Werk",
            subtitle: "Nieuwste video's die mijn creatieve visie tonen",
            viewMore: "Meer Video's Bekijken"
        },
        services: {
            title: "Diensten",
            subtitle: "Professionele creatieve diensten op maat",
            items: {
                videography: {
                    title: "Videografie",
                    desc: "Professionele opnames, montage en dronebeelden voor al uw visuele behoeften. Van concept tot eindmontage creëren we prachtige beelden die uw verhaal vertellen."
                },
                social: {
                    title: "Social Media Marketing",
                    desc: "Strategische contentcreatie, advertentiecampagnes en groeistrategieën op alle platforms. Bouw uw merk aanwezigheid op en betrek uw publiek effectief."
                },
                commercial: {
                    title: "Commercials & Ads",
                    desc: "Impactvolle commercial productie voor merken en bedrijven. Creëer boeiende advertenties die resultaten opleveren en uw merk verheffen."
                },
                event: {
                    title: "Event Videografie",
                    desc: "Complete eventdekking met cinematische storytelling aanpak. Leg elk moment van uw speciale gebeurtenissen vast met professionele kwaliteit."
                },
                content: {
                    title: "Content Creatie",
                    desc: "Platform-specifieke content voor Instagram, TikTok, YouTube en X. Blijf relevant met trending content die resoneert met uw publiek."
                },
                drone: {
                    title: "Drone Fotografie",
                    desc: "Luchtcinematografie en fotografiediensten. Krijg adembenemende vogelvluchtbeelden die productiewaarde toevoegen aan uw projecten."
                }
            }
        },
        testimonials: {
            title: "Klantverhalen",
            items: {
                1: { text: "Adnan transformeerde de visuele identiteit van ons merk met prachtige video's die onze betrokkenheid verdubbelden.", name: "- Sarah Johnson, Tech Startup CEO" },
                2: { text: "Met Adnan samenwerken was ongelooflijk. Zijn creatieve visie bracht onze muziek visueel tot leven.", name: "- Marcus Rivera, Muzikant" },
                3: { text: "De trouwfilm overtrof alle verwachtingen. Elk moment werd perfect vastgelegd.", name: "- Emily & David Chen" }
            }
        },
        contact: {
            title: "Laten We Creëren",
            phone: "06 3872 4909",
            email: "adnankousa24@gmail.com",
            bioLink: "Bio Link",
            businessCard: "Visitekaartje"
        }
    },
    ar: {
        nav: {
            home: "الرئيسية",
            about: "عنّي",
            work: "أعمالي",
            services: "الخدمات",
            contact: "تواصل"
        },
        hero: {
            title: "عدنان كوسا",
            subtitle: "مصور فيديو ومسوق لوسائل التواصل",
            scroll: "استكشف"
        },
        about: {
            title: "عنّي",
            text: "عدنان كوسا هو محترف إبداعي يحول الأفكار إلى قصص سينمائية. كمصور فيديو ومسوق لوسائل التواصل الاجتماعي، يساعد عدنان العلامات التجارية والفنانين ورواد الأعمال على النمو من خلال السرد البصري واستراتيجية المحتوى الرقمي."
        },
        work: {
            title: "أعمالي",
            subtitle: "أحدث مقاطع الفيديو التي تعرض رؤيتي الإبداعية",
            viewMore: "عرض المزيد من الفيديوهات"
        },
        services: {
            title: "الخدمات",
            subtitle: "خدمات إبداعية احترافية مصممة حسب احتياجاتك",
            items: {
                videography: {
                    title: "تصوير الفيديو",
                    desc: "تصوير احترافي، مونتاج، ولقطات من الطائرات بدون طيار لجميع احتياجاتك البصرية. من الفكرة إلى اللقطة النهائية، نحن نخلق لقطات مذهلة تروي قصتك."
                },
                social: {
                    title: "تسويق وسائل التواصل",
                    desc: "إنشاء محتوى استراتيجي، حملات إعلانية، واستراتيجيات نمو عبر جميع المنصات. بناء حضور علامتك التجارية والتفاعل مع جمهورك بشكل فعال."
                },
                commercial: {
                    title: "الإعلانات والتجارية",
                    desc: "إنتاج تجاري عالي التأثير للعلامات التجارية والشركات. إنشاء إعلانات جذابة تحقق نتائج وتعزز علامتك التجارية."
                },
                event: {
                    title: "تصوير المناسبات",
                    desc: "تغطية كاملة للمناسبات مع نهج سينمائي للسرد. التقاط كل لحظة من مناسباتك الخاصة بجودة احترافية."
                },
                content: {
                    title: "إنشاء المحتوى",
                    desc: "محتوى مخصص للمنصات لإنستغرام، تيك توك، يوتيوب، وإكس. ابقَ مرتبطًا بمحتوى يتناسب مع جمهورك ويعكس تطلعاتهم."
                },
                drone: {
                    title: "تصوير الطائرات بدون طيار",
                    desc: "خدمات التصوير الجوي والسينمائي. الحصول على مناظر مذهلة من الجو تضيف قيمة إنتاجية لمشاريعك."
                }
            }
        },
        testimonials: {
            title: "قصص العملاء",
            items: {
                1: { text: "عدنان غيّر الهوية البصرية لعلامتنا التجارية بفيديوهات مذهلة مضاعفتة لمعدلات التفاعل.", name: "- سارة جونسون، الرئيس التنفيذي لشركة تكنولوجيا" },
                2: { text: "العمل مع عدنان كان لا يصدق. رؤيته الإبداعية أحيت موسيقانا بصريًا.", name: "- ماركوس ريفيرا، فنان موسيقي" },
                3: { text: "فيديو الزفاف تفوق على جميع التوقعات. تم التقاط كل لحظة بشكل مثالي.", name: "- إميلي وديفيد تشين" }
            }
        },
        contact: {
            title: "لنبدع معًا",
            phone: "06 3872 4909",
            email: "adnankousa24@gmail.com",
            bioLink: "رابط السيرة",
            businessCard: "بطاقة العمل"
        }
    }
};

let currentLang = 'en';

// Language switcher component
function createLanguageSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
        <div class="language-toggle">
            <div class="language-option active" data-lang="en">EN</div>
            <div class="language-option" data-lang="nl">NL</div>
            <div class="language-option" data-lang="ar">ع</div>
            <div class="language-slider"></div>
        </div>
    `;
    
    document.querySelector('.nav-container').appendChild(switcher);
    
    // Add event listeners
    switcher.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    if (currentLang === lang) return;
    
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Special handling for portfolio section
    const portfolioSection = document.querySelector('.portfolio');
    if (portfolioSection) {
        // Always keep video content LTR
        portfolioSection.setAttribute('dir', 'ltr');
        
        // Update video items
        const videoItems = portfolioSection.querySelectorAll('.video-item, .swiper-container, .swiper-slide');
        videoItems.forEach(item => {
            item.setAttribute('dir', 'ltr');
        });
    }
    
    // Update active state
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    });
    
    // Animate slider
    const slider = document.querySelector('.language-slider');
    const activeOption = document.querySelector(`.language-option[data-lang="${lang}"]`);
    if (slider && activeOption) {
        const rect = activeOption.getBoundingClientRect();
        const containerRect = document.querySelector('.language-toggle').getBoundingClientRect();
        slider.style.transform = `translateX(${rect.left - containerRect.left}px)`;
    }
    
    // Update all text content
    updateTextContent();
    
    // Add transition effect
    document.body.style.opacity = '0.9';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
}

function updateTextContent() {
    const t = translations[currentLang];
    
    // Safely update elements
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 5) {
        navLinks[0].textContent = t.nav.home;
        navLinks[1].textContent = t.nav.about;
        navLinks[2].textContent = t.nav.work;
        navLinks[3].textContent = t.nav.services;
        navLinks[4].textContent = t.nav.contact;
    }
    
    // Hero
    const heroTitle = document.querySelector('.hero-title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const scrollText = document.querySelector('.scroll-indicator span');
    
    if (heroTitle) heroTitle.textContent = t.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    if (scrollText) scrollText.textContent = t.hero.scroll;
    
    // About
    const aboutTitle = document.querySelector('#about .section-title');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutTitle) aboutTitle.textContent = t.about.title;
    if (aboutText) aboutText.textContent = t.about.text;
    
    // Work
    const workTitle = document.querySelector('#work .section-title');
    const workSubtitle = document.querySelector('.portfolio-subtitle');
    const viewMoreBtn = document.querySelector('.view-more .btn');
    
    if (workTitle) workTitle.textContent = t.work.title;
    if (workSubtitle) workSubtitle.textContent = t.work.subtitle;
    if (viewMoreBtn) viewMoreBtn.textContent = t.work.viewMore;
    
    // Services
    const servicesTitle = document.querySelector('#services .section-title');
    const servicesSubtitle = document.querySelector('.services-subtitle');
    
    if (servicesTitle) servicesTitle.textContent = t.services.title;
    if (servicesSubtitle) servicesSubtitle.textContent = t.services.subtitle;
    
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceKeys = Object.keys(t.services.items);
    serviceItems.forEach((item, index) => {
        if (serviceKeys[index]) {
            const service = t.services.items[serviceKeys[index]];
            const title = item.querySelector('h3');
            const desc = item.querySelector('p');
            
            if (title) title.textContent = service.title;
            if (desc) desc.textContent = service.desc;
        }
    });
    
    // Testimonials
    const testimonialsTitle = document.querySelector('#testimonials .section-title');
    if (testimonialsTitle) testimonialsTitle.textContent = t.testimonials.title;
    
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    Object.keys(t.testimonials.items).forEach((key, index) => {
        if (testimonialItems[index]) {
            const testimonial = t.testimonials.items[key];
            const text = testimonialItems[index].querySelector('p');
            const name = testimonialItems[index].querySelector('.client-name');
            
            if (text) text.textContent = testimonial.text;
            if (name) name.textContent = testimonial.name;
        }
    });
    
    // Contact
    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) contactTitle.textContent = t.contact.title;
    
    const phoneText = document.querySelector('.contact-info .elementor-icon-list-text');
    const emailText = document.querySelectorAll('.contact-info .elementor-icon-list-text')[1];
    const bioLink = document.querySelector('.contact-links .btn-outline');
    const businessCard = document.querySelectorAll('.contact-links .btn-outline')[1];
    
    if (phoneText) phoneText.textContent = t.contact.phone;
    if (emailText) emailText.textContent = t.contact.email;
    if (bioLink) bioLink.textContent = t.contact.bioLink;
    if (businessCard) businessCard.textContent = t.contact.businessCard;
}

// Add language support for portfolio section
function updatePortfolioLanguage() {
    const t = translations[currentLang];
    
    const portfolioTitle = document.querySelector('.portfolio-reels .section-title');
    const portfolioSubtitle = document.querySelector('.portfolio-reels .portfolio-subtitle');
    
    if (portfolioTitle) {
        portfolioTitle.textContent = t.portfolio.title;
    }
    
    if (portfolioSubtitle) {
        portfolioSubtitle.textContent = t.portfolio.subtitle;
    }
}

// Add this new script for the video carousel functionality
let currentIndex = 0;
let autoScrollInterval;
const videos = [
    { id: 'YIOlYJsue7Y', title: 'Cinematic Reel', category: 'Brand Video' },
    { id: 'vb51D45qwEY', title: 'Social Media Campaign', category: 'Content Creation' },
    { id: 'nkB2xi8BemI', title: 'Event Highlights', category: 'Event Coverage' },
    { id: 'UbiA1oCroDw', title: 'Product Showcase', category: 'Commercial' },
    { id: '1SK88WUWjEE', title: 'Behind the Scenes', category: 'Documentary' },
    { id: '23XPsrLJz_U', title: 'Travel Vlog', category: 'Lifestyle' },
    { id: 'z6833KdxZWE', title: 'Music Video', category: 'Creative' },
    { id: 'xQPCVxtSdzw', title: 'Tutorial Reel', category: 'Educational' }
];

const videosPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;

function createVideoCard(video, index) {
    return `
        <div class="video-card" data-index="${index}">
            <div class="video-wrapper">
                <iframe class="video-iframe" 
                        src="https://www.youtube.com/embed/${video.id}?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
                <div class="video-overlay">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="video-info">
                        <h3 class="video-title">${video.title}</h3>
                        <p class="video-category">${video.category}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateCarousel() {
    const carousel = document.getElementById('videoCarousel');
    const indicators = document.getElementById('indicators');
    
    // Clear existing content
    carousel.innerHTML = '';
    indicators.innerHTML = '';
    
    // Calculate visible videos
    const visibleVideos = videos.slice(currentIndex, currentIndex + videosPerView);
    
    // Add videos
    visibleVideos.forEach(video => {
        const videoIndex = videos.indexOf(video);
        carousel.innerHTML += createVideoCard(video, videoIndex);
    });
    
    // Add indicators
    for (let i = 0; i <= videos.length - videosPerView; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === currentIndex) indicator.classList.add('active');
        indicator.onclick = () => goToSlide(i);
        indicators.appendChild(indicator);
    }
}

function nextVideo() {
    if (currentIndex < videos.length - videosPerView) {
        currentIndex++;
        updateCarousel();
    } else {
        currentIndex = 0;
        updateCarousel();
    }
}

function previousVideo() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    } else {
        currentIndex = videos.length - videosPerView;
        updateCarousel();
    }
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        nextVideo();
    }, 4000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startAutoScroll();
    
    // Restart auto-scroll on hover
    document.querySelector('.video-carousel-container').addEventListener('mouseenter', stopAutoScroll);
    document.querySelector('.video-carousel-container').addEventListener('mouseleave', startAutoScroll);
});

// Handle responsive changes
window.addEventListener('resize', () => {
    const newVideosPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
    if (newVideosPerView !== videosPerView) {
        updateCarousel();
    }
});

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    createLanguageSwitcher();
    updateTextContent();
});

// Add this to ensure video content doesn't flip
document.addEventListener('DOMContentLoaded', () => {
    // Force LTR direction for video content in RTL mode
    const portfolioSection = document.querySelector('.portfolio');
    if (portfolioSection) {
        portfolioSection.setAttribute('dir', 'ltr');
    }
    
    // Ensure video items maintain LTR
    const videoItems = document.querySelectorAll('.video-item, .swiper-container, .swiper-slide');
    videoItems.forEach(item => {
        item.setAttribute('dir', 'ltr');
    });
});

// Add staggered animation for reels
document.addEventListener('DOMContentLoaded', () => {
    const reelItems = document.querySelectorAll('.reel-item');
    reelItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
});