// Mobile-optimized JavaScript for PM Solutions 360
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Mobile navigation toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
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
                
                // Smooth scroll to top on mobile
                if (window.innerWidth <= 768) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
            
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                
                // Reset hamburger animation
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
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

    // Touch-friendly interactions
    if ('ontouchstart' in window) {
        // Add touch-friendly classes
        document.body.classList.add('touch-device');
        
        // Prevent zoom on double tap for buttons
        const buttons = document.querySelectorAll('.nav-link, .scenario-tab');
        buttons.forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            });
        });
    }

    // Initialize charts with mobile optimization
    initializeCharts();
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (projectionChart) projectionChart.resize();
            if (marketChart) marketChart.resize();
            if (opportunityChart) opportunityChart.resize();
            if (investmentChart) investmentChart.resize();
        }, 100);
    });
});

// Chart data
const chartData = {
    marketSize: {
        labels: ['Nutricionistas', 'Personal Trainers'],
        data: [194018, 100326],
        colors: ['#00d4ff', '#00ff88']
    },
    projections: {
        pessimistic: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            receita: [2700, 3249, 3249, 6049, 6049, 6049, 6049, 6049, 6049, 6049, 6049, 6049],
            lucro: [-1383, -834, -834, 1966, 1966, 1966, 1966, 1966, 1966, 1966, 1966, 1966]
        },
        realistic: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            receita: [2700, 4647, 5196, 8996, 9545, 10094, 10643, 13642, 14191, 14740, 15289, 16837],
            lucro: [-1383, 564, 1113, 4913, 5462, 6011, 6560, 9559, 10108, 10657, 11206, 12754]
        },
        optimistic: {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            receita: [6199, 9545, 11043, 13541, 16039, 18537, 21035, 23533, 26031, 28529, 31027, 33525],
            lucro: [2116, 5462, 6960, 9458, 11956, 14454, 16952, 19450, 21948, 24446, 26944, 29442]
        }
    },
    opportunities: {
        labels: ['Mercado Total', 'Concorrência Especializada', 'Oportunidade'],
        data: [294344, 15000, 279344],
        colors: ['#00d4ff', '#ff6b6b', '#00ff88']
    },
    investment: {
        labels: ['Investimento Inicial', 'Operacional (3 meses)', 'Margem Segurança'],
        data: [1950, 12250, 800],
        colors: ['#00d4ff', '#00ff88', '#ffd700']
    }
};

// Chart instances
let marketChart = null;
let projectionChart = null;
let opportunityChart = null;
let investmentChart = null;

// Mobile-optimized chart configuration
const mobileChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: window.innerWidth <= 768 ? 'bottom' : 'right',
            labels: {
                padding: window.innerWidth <= 768 ? 10 : 20,
                font: {
                    size: window.innerWidth <= 768 ? 10 : 12
                },
                color: '#ffffff'
            }
        },
        tooltip: {
            titleFont: {
                size: window.innerWidth <= 768 ? 12 : 14
            },
            bodyFont: {
                size: window.innerWidth <= 768 ? 10 : 12
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#ffffff',
                font: {
                    size: window.innerWidth <= 768 ? 10 : 12
                }
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            }
        },
        y: {
            ticks: {
                color: '#ffffff',
                font: {
                    size: window.innerWidth <= 768 ? 10 : 12
                },
                callback: function(value) {
                    return 'R$ ' + value.toLocaleString('pt-BR');
                }
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            }
        }
    }
};

function initializeCharts() {
    // Market Size Chart
    const marketCtx = document.getElementById('marketChart');
    if (marketCtx) {
        marketChart = new Chart(marketCtx, {
            type: 'doughnut',
            data: {
                labels: chartData.marketSize.labels,
                datasets: [{
                    data: chartData.marketSize.data,
                    backgroundColor: chartData.marketSize.colors,
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: window.innerWidth <= 768 ? 'bottom' : 'right',
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: window.innerWidth <= 768 ? 10 : 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed.toLocaleString('pt-BR') + ' profissionais';
                            }
                        }
                    }
                }
            }
        });
    }

    // Projection Chart (starts with realistic scenario)
    const projectionCtx = document.getElementById('projectionChart');
    if (projectionCtx) {
        projectionChart = new Chart(projectionCtx, {
            type: 'line',
            data: {
                labels: chartData.projections.realistic.labels,
                datasets: [
                    {
                        label: 'Receita',
                        data: chartData.projections.realistic.receita,
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        fill: false,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'Lucro',
                        data: chartData.projections.realistic.lucro,
                        borderColor: '#00ff88',
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        fill: false,
                        tension: 0.4,
                        borderWidth: 3
                    }
                ]
            },
            options: mobileChartOptions
        });
    }

    // Opportunity Chart
    const opportunityCtx = document.getElementById('opportunityChart');
    if (opportunityCtx) {
        opportunityChart = new Chart(opportunityCtx, {
            type: 'bar',
            data: {
                labels: chartData.opportunities.labels,
                datasets: [{
                    data: chartData.opportunities.data,
                    backgroundColor: chartData.opportunities.colors,
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                ...mobileChartOptions,
                plugins: {
                    ...mobileChartOptions.plugins,
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Investment Chart
    const investmentCtx = document.getElementById('investmentChart');
    if (investmentCtx) {
        investmentChart = new Chart(investmentCtx, {
            type: 'pie',
            data: {
                labels: chartData.investment.labels,
                datasets: [{
                    data: chartData.investment.data,
                    backgroundColor: chartData.investment.colors,
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: window.innerWidth <= 768 ? 'bottom' : 'right',
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: window.innerWidth <= 768 ? 10 : 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': R$ ' + context.parsed.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateProjectionChart(scenario) {
    if (!projectionChart || !chartData.projections[scenario]) return;
    
    const data = chartData.projections[scenario];
    
    projectionChart.data.labels = data.labels;
    projectionChart.data.datasets[0].data = data.receita;
    projectionChart.data.datasets[1].data = data.lucro;
    
    projectionChart.update('active');
}

// Handle window resize for mobile optimization
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Update chart options for new screen size
        const isMobile = window.innerWidth <= 768;
        
        if (marketChart) {
            marketChart.options.plugins.legend.position = isMobile ? 'bottom' : 'right';
            marketChart.options.plugins.legend.labels.font.size = isMobile ? 10 : 12;
            marketChart.update();
        }
        
        if (projectionChart) {
            projectionChart.options.plugins.legend.position = isMobile ? 'bottom' : 'right';
            projectionChart.options.plugins.legend.labels.font.size = isMobile ? 10 : 12;
            projectionChart.options.scales.x.ticks.font.size = isMobile ? 10 : 12;
            projectionChart.options.scales.y.ticks.font.size = isMobile ? 10 : 12;
            projectionChart.update();
        }
        
        if (opportunityChart) {
            opportunityChart.options.scales.x.ticks.font.size = isMobile ? 10 : 12;
            opportunityChart.options.scales.y.ticks.font.size = isMobile ? 10 : 12;
            opportunityChart.update();
        }
        
        if (investmentChart) {
            investmentChart.options.plugins.legend.position = isMobile ? 'bottom' : 'right';
            investmentChart.options.plugins.legend.labels.font.size = isMobile ? 10 : 12;
            investmentChart.update();
        }
    }, 250);
});

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

// Prevent zoom on input focus (iOS Safari)
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
}

