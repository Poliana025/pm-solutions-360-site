// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
            }
            
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Scenario tabs functionality
    const scenarioTabs = document.querySelectorAll('.scenario-tab');
    scenarioTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            scenarioTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update chart based on scenario
            const scenario = this.getAttribute('data-scenario');
            updateProjectionChart(scenario);
        });
    });

    // Initialize charts
    initializeCharts();
});

// Chart data
const chartData = {
    marketSize: {
        labels: ['Nutricionistas', 'Personal Trainers'],
        data: [194018, 100000],
        colors: ['#00d4ff', '#00ff88']
    },
    projections: {
        pessimista: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            receita: [2700, 3249, 3249, 6049, 6049, 6049, 6049, 6049, 6049, 6049, 6049, 6049],
            lucro: [-1383, -834, -834, 1966, 1966, 1966, 1966, 1966, 1966, 1966, 1966, 1966]
        },
        realista: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            receita: [2700, 4647, 5196, 8996, 9545, 10094, 10643, 13642, 14191, 14740, 15289, 16837],
            lucro: [-1383, 564, 1113, 4913, 5462, 6011, 6560, 9559, 10108, 10657, 11206, 12754]
        },
        otimista: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            receita: [6199, 9545, 11043, 13541, 16039, 18537, 21035, 23533, 26031, 28529, 31027, 33525],
            lucro: [2116, 5462, 6960, 9458, 11956, 14454, 16952, 19450, 21948, 24446, 26944, 29442]
        }
    }
};

// Chart instances
let marketSizeChart = null;
let projectionChart = null;

function initializeCharts() {
    // Market Size Chart
    const marketCtx = document.getElementById('marketSizeChart');
    if (marketCtx) {
        marketSizeChart = new Chart(marketCtx, {
            type: 'pie',
            data: {
                labels: chartData.marketSize.labels,
                datasets: [{
                    data: chartData.marketSize.data,
                    backgroundColor: chartData.marketSize.colors,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: 14
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 15, 35, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: 'rgba(0, 212, 255, 0.5)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Projection Chart (default to realista)
    const projectionCtx = document.getElementById('projectionChart');
    if (projectionCtx) {
        createProjectionChart('realista');
    }
}

function createProjectionChart(scenario) {
    const ctx = document.getElementById('projectionChart');
    if (!ctx) return;

    const data = chartData.projections[scenario];
    
    if (projectionChart) {
        projectionChart.destroy();
    }

    projectionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Receita Total',
                    data: data.receita,
                    backgroundColor: 'rgba(0, 212, 255, 0.7)',
                    borderColor: '#00d4ff',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                },
                {
                    label: 'Lucro Líquido',
                    data: data.lucro,
                    backgroundColor: 'rgba(0, 255, 136, 0.7)',
                    borderColor: '#00ff88',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(0, 212, 255, 0.5)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString();
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function updateProjectionChart(scenario) {
    createProjectionChart(scenario);
}

// Smooth scrolling for anchor links
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

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.fixed-nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(15, 15, 35, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(15, 15, 35, 0.95)';
            nav.style.boxShadow = 'none';
        }
    }
});

// Add intersection observer for section highlighting
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const correspondingNavLink = document.querySelector(`[data-section="${sectionId}"]`);
            
            if (correspondingNavLink) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                correspondingNavLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add hover effects to cards
document.querySelectorAll('.market-stat-card, .financial-card, .opportunity-card, .investment-card, .roi-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Add parallax effect to floating cards
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Add counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Initialize counter animations when elements come into view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
            
            if (target && !element.classList.contains('animated')) {
                element.classList.add('animated');
                animateCounter(element, target);
            }
        }
    });
}, { threshold: 0.5 });

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

// Add click effect to buttons
document.querySelectorAll('.scenario-tab, .nav-link').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link, .scenario-tab {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

