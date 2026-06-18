let menu = document.querySelector('#menu-icon-js');
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

if (menu) {
	menu.onclick = () => {
		menuicon.classList.toggle('bx-x');
		navbar.classList.toggle('open');
		navtc.classList.toggle("nav-touch-close-open");
	}
}

if (navtc) {
	navtc.onclick = () => {
		menuicon.classList.toggle('bx-x');
		navbar.classList.remove('open');
		navtc.classList.remove('nav-touch-close-open');
		navtc.classList.remove("nav-tc-z");
		navtc.classList.remove("nav-LR-TC");
	}
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;
	const headerEl = document.getElementById("header");

	if (headerEl) {
		headerEl.classList.add('scrolled');
		if (currentScrollPos === 0) {
			headerEl.classList.remove('scrolled');
		}
		if (navtc && navtc.classList.contains('nav-touch-close-open')) {
			return;
		}
		if (prevScrollpos > currentScrollPos) {
			headerEl.style.top = "0";
		} else {
			headerEl.style.top = "-100px";
		}
	}
	prevScrollpos = currentScrollPos;
}


const contactSection = document.querySelector('.contact-section');
const formSection = document.querySelector('.form-section');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK = document.querySelector('.csa-ok');


const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');

if (csaOK) {
	csaOK.onclick = () => {
		contactSubmitAfter.classList.remove('show');
		formSection.classList.remove('hide');
		contactSection.classList.remove('csa-cs');
		contactForm.classList.remove('csa-cf');
		contactButton.classList.remove('loading');
		contactLoad.classList.remove('show');
		submitText.classList.remove('hide');
	}
}

// Function to validate the form
function validateForm(event) {
	event.preventDefault(); // Prevent the form from submitting
	let isValid = true;
	let emailIsValid = true;
	let nameIsValid = true;
	let messageIsValid = true;

	// Check if Name field is empty
	if (nameInput.value.trim() === '') {
		isValid = false;
		nameIsValid = false;
	}

	// Check if Email field is empty or not a valid email address
	if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
		isValid = false;
		if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value)) {
			emailIsValid = false;
		}
	}

	// Check if Message field is empty
	if (messageInput.value.trim() === '') {
		isValid = false;
		messageIsValid = false;
	}

	if (!isValid) {
		// Display the error message
		errorDiv.classList.add('error-show');
		emailErrorDiv.classList.remove('error-show');
		if (nameIsValid && messageIsValid && !emailIsValid) {
			errorDiv.classList.remove('error-show');
			emailErrorDiv.classList.add('error-show');
		}
	} else {
		// Form is valid, it can be sumbitted now
		emailErrorDiv.classList.remove('error-show');
		errorDiv.classList.remove('error-show');
		contactButton.classList.add('loading');
		contactLoad.classList.add('show');
		submitText.classList.add('hide');
		setTimeout(function () {
			sendMail();
		}, 2000);
	}
}

// Function to validate email format using a regular expression
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Event listener for form submission
if (contactForm) {
	contactForm.classList.add('default-cf'); // Apply updated visual border class
	contactForm.addEventListener('submit', validateForm);
}


function sendMail() {
	contactSubmitAfter.classList.add('show');
	formSection.classList.add('hide');
	contactSection.classList.add('csa-cs');
	contactForm.classList.add('csa-cf');
}

/**
 * ----------------------------------------------------
 * PREMIUM MODERN ENHANCEMENTS (VISUAL ONLY)
 * ----------------------------------------------------
 */

// Initialize Theme from localStorage - Dark is Default
const currentSavedTheme = localStorage.getItem('portfolio-theme');
if (currentSavedTheme === 'light') {
	document.body.classList.add('light-theme');
} else {
	// Ensure dark mode is treated as default if nothing is saved
	localStorage.setItem('portfolio-theme', 'dark');
}

document.addEventListener("DOMContentLoaded", () => {
	// 1. DYNAMICALLY INJECT AMBIENT GLOW AND MOTION CANVAS
	if (!document.querySelector(".ambient-glow")) {
		const ambientGlow = document.createElement("div");
		ambientGlow.className = "ambient-glow";
		ambientGlow.innerHTML = `
			<div class="blob"></div>
			<div class="blob"></div>
			<div class="blob"></div>
			<div class="blob white-light"></div>
			<div class="blob white-light"></div>
		`;
		document.body.prepend(ambientGlow);
	}

	if (!document.getElementById("bg-particles-canvas")) {
		const canvas = document.createElement("canvas");
		canvas.id = "bg-particles-canvas";
		document.body.appendChild(canvas);
		initParticleBackground(canvas);
	}

	// 2. DYNAMICALLY INJECT THE DAY/NIGHT SWITCH BUTTON
	const headerMain = document.querySelector('.header .main');
	if (headerMain) {
		const themeToggle = document.createElement('div');
		themeToggle.className = 'main-items theme-toggle-container';
		themeToggle.id = 'theme-toggle-js';
		themeToggle.title = 'Switch Mode';

		const isLight = document.body.classList.contains('light-theme');
		themeToggle.innerHTML = `<i class="fas ${isLight ? 'fa-sun' : 'fa-moon'}" id="theme-icon-js"></i>`;

		const menuIconContainer = document.getElementById('menu-icon-js');
		if (menuIconContainer) {
			headerMain.insertBefore(themeToggle, menuIconContainer);
		} else {
			headerMain.appendChild(themeToggle);
		}

		// Handle theme click actions
		themeToggle.onclick = () => {
			const themeIcon = document.getElementById('theme-icon-js');
			document.body.classList.toggle('light-theme');

			if (document.body.classList.contains('light-theme')) {
				themeIcon.className = 'fas fa-sun';
				localStorage.setItem('portfolio-theme', 'light');
			} else {
				themeIcon.className = 'fas fa-moon';
				localStorage.setItem('portfolio-theme', 'dark');
			}
		};
	}

	// 3. DYNAMICALLY APPLY SCROLL-REVEAL FOR GORGEOUS ENTRANCE
	const selectorsToReveal = [
		'.about-content',
		'.column.right img',
		'.skills-group-row',
		'.study',
		'.gallery-section .column img',
		'.professional-summary .texts',
		'.goals-row',
		'.hobbies',
		'.block',
		'.contact-full'
	];

	const revealElements = [];
	selectorsToReveal.forEach(sel => {
		document.querySelectorAll(sel).forEach(el => {
			el.classList.add('reveal');
			revealElements.push(el);
		});
	});

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
				observer.unobserve(entry.target); // Reveal once
			}
		});
	}, {
		threshold: 0.05,
		rootMargin: "0px 0px -40px 0px"
	});

	revealElements.forEach(el => observer.observe(el));
});

// Particle Net Animation Engine
function initParticleBackground(canvas) {
	const ctx = canvas.getContext("2d");
	let particles = [];
	let animationFrameId;

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	window.addEventListener("resize", resize);
	resize();

	class Particle {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.vx = (Math.random() - 0.5) * 0.6; // Slightly faster for transition feel
			this.vy = (Math.random() - 0.5) * 0.6;
			this.radius = Math.random() * 2 + 0.8; 
			this.alpha = Math.random() * 0.4 + 0.1;
			this.pulse = Math.random() * Math.PI;
		}

		update() {
			this.x += this.vx;
			this.y += this.vy;
			this.pulse += 0.02;

			if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
			if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
		}

		draw() {
			const isLight = document.body.classList.contains('light-theme');
			const pulsingAlpha = this.alpha * (0.8 + Math.sin(this.pulse) * 0.2);
			
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			if (isLight) {
				ctx.fillStyle = `rgba(37, 99, 235, ${pulsingAlpha * 0.5})`; // Vibrant Blue
			} else {
				ctx.fillStyle = `rgba(124, 58, 237, ${pulsingAlpha})`; // Violet
			}
			ctx.fill();
		}
	}

	function createParticles() {
		particles = [];
		const density = Math.floor((canvas.width * canvas.height) / 8000); // Increased density
		const count = Math.min(Math.max(density, 60), 150);
		for (let i = 0; i < count; i++) {
			particles.push(new Particle());
		}
	}

	createParticles();
	window.addEventListener("resize", createParticles);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const isLight = document.body.classList.contains('light-theme');

		// Draw ambient connection lines
		for (let i = 0; i < particles.length; i++) {
			const p1 = particles[i];
			p1.update();
			p1.draw();

			for (let j = i + 1; j < particles.length; j++) {
				const p2 = particles[j];
				const dx = p1.x - p2.x;
				const dy = p1.y - p2.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 120) {
					// Draw faint lines
					const alpha = (1 - dist / 120) * 0.08;
					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);
					if (isLight) {
						ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.18})`; // More defined blue lines
					} else {
						ctx.strokeStyle = `rgba(124, 58, 237, ${alpha * 0.25})`; // Subtle violet lines
					}
					ctx.lineWidth = 0.8;
					ctx.stroke();
				}
			}
		}

		animationFrameId = requestAnimationFrame(animate);
	}

	animate();
}
