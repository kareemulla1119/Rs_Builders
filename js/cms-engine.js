/**
 * RS BUILDERS - Client-Side CMS Engine
 * Head Office: Siddipet
 * Phone: 9618972105
 * 
 * This engine powers dynamic content across all pages without requiring a backend server.
 * It loads content from localStorage (managed via admin.html) or falls back to professional defaults.
 */

(function() {
    'use strict';

    const CMS_STORAGE_KEY = 'rs_builders_cms_config';

    const DEFAULT_CONFIG = {
        companyName: "RS BUILDERS",
        tagline: "BUILDING CONSTRUCTION",
        phone: "📲 9618972105 📱",
        phoneRaw: "9618972105",
        location: "🌏 HEAD OFFICE SIDDIPET 😎",
        email: "info@rsbuilders.com",
        logoUrl: "images/rsbuilderslogo.jpg",
        heroTitle: "We Build <br>Great Projects",
        heroDesc: "From the foundation of the house to the finishing touches – you will see the quality and its Siddipet oriented office.",
        aboutSubTitle: "Welcome to RS BUILDERS",
        aboutTitle: "RS BUILDERS - BUILDING CONSTRUCTION",
        aboutQuote: "From the foundation of the house to the finishing touches – you will see the quality and its Siddipet oriented office.",
        aboutDesc: "We specialize in building construction, residential and commercial projects with uncompromising quality. Our head office is proudly located in Siddipet, bringing top-tier construction excellence to every project from foundation to finishing touches.",
        social: {
            facebook: "#",
            twitter: "#",
            instagram: "#",
            whatsapp: "https://wa.me/919618972105"
        },
        services: [
            {
                icon: "flaticon-engineer-1",
                title: "Quality Construction",
                desc: "From foundation to finishing touches, we deliver unmatched construction quality for residential and commercial buildings."
            },
            {
                icon: "flaticon-worker-1",
                title: "Professional Planning & Design",
                desc: "Our Siddipet oriented office provides expert architectural planning, structural designs, and execution."
            },
            {
                icon: "flaticon-engineer",
                title: "Dedicated Client Supervision",
                desc: "We ensure total transparency, timely project completion, and adherence to top safety standards."
            },
            {
                icon: "flaticon-crane",
                title: "Heavy Equipment & Execution",
                desc: "Equipped with modern construction machinery and skilled manpower to handle projects of any scale."
            },
            {
                icon: "flaticon-hammer",
                title: "Renovation & Remodeling",
                desc: "Transforming existing structures with modern finishes, structural upgrades, and aesthetic redesigns."
            },
            {
                icon: "flaticon-hook",
                title: "Interior & Exterior Finishing",
                desc: "Premium exterior elevations and interior craftsmanship that make your building stand out."
            }
        ],
        projects: [
            {
                title: "Luxury Residential Villa",
                category: "Building Construction",
                location: "Siddipet, Telangana",
                image: "images/project-1.jpg"
            },
            {
                title: "Commercial Complex",
                category: "Commercial",
                location: "Siddipet Head Office Area",
                image: "images/project-2.jpg"
            },
            {
                title: "Modern Apartment Building",
                category: "Residential",
                location: "Siddipet, Telangana",
                image: "images/project-3.jpg"
            },
            {
                title: "Corporate Office Tower",
                category: "Architecture & Execution",
                location: "Hyderabad / Siddipet",
                image: "images/project-4.jpg"
            },
            {
                title: "Community Shopping Center",
                category: "Commercial Construction",
                location: "Siddipet District",
                image: "images/project-5.jpg"
            },
            {
                title: "Premium Duplex Houses",
                category: "Building Construction",
                location: "Siddipet, Telangana",
                image: "images/project-6.jpg"
            }
        ]
    };

    // Public API
    window.RSCMS = {
        getConfig: function() {
            try {
                const stored = localStorage.getItem(CMS_STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    return Object.assign({}, DEFAULT_CONFIG, parsed);
                }
            } catch (e) {
                console.error("Error reading CMS config from localStorage:", e);
            }
            return Object.assign({}, DEFAULT_CONFIG);
        },

        saveConfig: function(newConfig) {
            try {
                localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(newConfig));
                console.log("CMS Config successfully saved to localStorage.");
                return true;
            } catch (e) {
                console.error("Error saving CMS config:", e);
                return false;
            }
        },

        resetConfig: function() {
            try {
                localStorage.removeItem(CMS_STORAGE_KEY);
                console.log("CMS Config reset to defaults.");
                return true;
            } catch (e) {
                console.error("Error resetting CMS config:", e);
                return false;
            }
        },

        applyToDOM: function() {
            const config = this.getConfig();

            // 1. Update document title
            if (document.title && (document.title.includes('Wilcon') || document.title.includes('Colorlib') || document.title.includes('RS BUILDERS'))) {
                document.title = `${config.companyName} - ${config.tagline} | Siddipet`;
            }

            // 2. Update data-cms attributes
            document.querySelectorAll('[data-cms]').forEach(el => {
                const key = el.getAttribute('data-cms');
                if (config[key] !== undefined) {
                    if (el.tagName === 'IMG' && key === 'logoUrl') {
                        el.src = config[key];
                    } else if (el.tagName === 'A' && key === 'phoneRaw') {
                        el.href = `tel://${config[key]}`;
                    } else if (el.tagName === 'A' && key === 'email') {
                        el.href = `mailto:${config[key]}`;
                    } else {
                        el.innerHTML = config[key];
                    }
                }
            });

            // 3. Update standard classes if present
            document.querySelectorAll('.cms-company-name').forEach(el => el.innerHTML = config.companyName);
            document.querySelectorAll('.cms-tagline').forEach(el => el.innerHTML = config.tagline);
            document.querySelectorAll('.cms-phone').forEach(el => el.innerHTML = config.phone);
            document.querySelectorAll('.cms-location').forEach(el => el.innerHTML = config.location);
            document.querySelectorAll('.cms-email').forEach(el => el.innerHTML = config.email);
            document.querySelectorAll('.cms-hero-title').forEach(el => el.innerHTML = config.heroTitle);
            document.querySelectorAll('.cms-hero-desc').forEach(el => el.innerHTML = config.heroDesc);
            document.querySelectorAll('.cms-about-subtitle').forEach(el => el.innerHTML = config.aboutSubTitle);
            document.querySelectorAll('.cms-about-title').forEach(el => el.innerHTML = config.aboutTitle);
            document.querySelectorAll('.cms-about-quote').forEach(el => el.innerHTML = config.aboutQuote);
            document.querySelectorAll('.cms-about-desc').forEach(el => el.innerHTML = config.aboutDesc);
            document.querySelectorAll('.cms-logo').forEach(el => {
                if (el.tagName === 'IMG') el.src = config.logoUrl;
            });

            // 4. Update dynamic containers (Services & Projects) if present
            const servicesContainer = document.getElementById('cms-services-container');
            if (servicesContainer && config.services && config.services.length > 0) {
                servicesContainer.innerHTML = config.services.map(s => `
                    <div class="col-md-4 d-flex align-self-stretch ftco-animate fadeInUp ftco-animated mb-4">
                        <div class="media block-6 services d-flex w-100 p-4" style="background: #fff; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border-radius: 8px;">
                            <div class="icon justify-content-center align-items-center d-flex"><span class="${s.icon || 'flaticon-engineer-1'}"></span></div>
                            <div class="media-body pl-4">
                                <h3 class="heading mb-3">${s.title}</h3>
                                <p>${s.desc}</p>
                            </div>
                        </div>      
                    </div>
                `).join('');
            }

            const projectsContainer = document.getElementById('cms-projects-container');
            if (projectsContainer && config.projects && config.projects.length > 0) {
                projectsContainer.innerHTML = config.projects.map(p => `
                    <div class="col-md-4 ftco-animate fadeInUp ftco-animated mb-4">
                        <div class="project-wrap" style="box-shadow: 0 5px 20px rgba(0,0,0,0.08); border-radius: 8px; overflow: hidden; background: #fff;">
                            <a href="#" class="img" style="background-image: url(${p.image}); height: 300px; display: block; background-size: cover; background-position: center;">
                                <span class="price">${p.category}</span>
                            </a>
                            <div class="text p-4">
                                <h3><a href="#">${p.title}</a></h3>
                                <p class="location"><span class="fa fa-map-marker mr-2"></span>${p.location}</p>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
    };

    // Auto-apply on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.RSCMS.applyToDOM();
        });
    } else {
        window.RSCMS.applyToDOM();
    }

})();
