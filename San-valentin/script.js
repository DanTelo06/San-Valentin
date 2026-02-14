const unlockBtn = document.getElementById("unlock");
const passwordInput = document.getElementById("password");
const login = document.querySelector(".login");
const experience = document.querySelector(".experience");
const music = document.getElementById("music");
const typingText = document.getElementById("typingText");

const correctPassword = "palomita";

unlockBtn.addEventListener("click", () => {
    if (passwordInput.value === correctPassword) {
        // pequeño efecto al presionar: ráfaga de corazones desde el login
        burstFromLogin();
        // animación de salida del login
        login.classList.add('fade-out');
        setTimeout(() => {
            login.style.display = "none";
            experience.classList.remove("hidden");
            experience.classList.add('revealed');
            // música con fundido
            fadeInAudio(music, 0.8, 1400);
            startBackground();
            startTyping();
            startHearts();
        }, 700);
    } else {
        passwordInput.value = "";
        passwordInput.style.border = "2px solid #ff4d6d";
    }
});


/* EFECTO MÁQUINA */
const message = "No hablamos mucho… pero hay personas que no necesitan hablar todos los días para sentirse especiales.";

function startTyping() {
    let i = 0;
    typingText.innerHTML = "";

    function typing() {
        if (i < message.length) {
            typingText.innerHTML += message.charAt(i);
            i++;
            setTimeout(typing, 40);
        }
    }

    typing();
}


/* FADE IN AUDIO */
function fadeInAudio(audio, targetVolume = 1, duration = 1000) {
    try {
        audio.volume = 0;
        // Some browsers require play to be triggered by user gesture; unlock button qualifies
        const p = audio.play();
        if (p && p.then) p.catch(() => {});
    } catch (e) {}

    const steps = Math.max(6, Math.floor(duration / 50));
    const step = targetVolume / steps;
    let current = 0;
    const iv = setInterval(() => {
        current += step;
        audio.volume = Math.min(current, targetVolume);
        if (audio.volume >= targetVolume - 0.01) {
            audio.volume = targetVolume;
            clearInterval(iv);
        }
    }, duration / steps);
}


/* RÁFAGA DE CORAZONES (al desbloquear) */
function burstFromLogin() {
    const parent = document.querySelector('.login');
    const box = document.querySelector('.login-box');
    if (!parent || !box) return;

    const rect = box.getBoundingClientRect();
    const containerRect = parent.getBoundingClientRect();

    for (let i = 0; i < 12; i++) {
        const el = document.createElement('span');
        el.className = 'burst-heart';
    el.textContent = '🌹';
        // random position around the login-box
        const left = rect.left + rect.width * (Math.random() * 0.8 + 0.1) - containerRect.left;
        const top = rect.top + rect.height * (Math.random() * 0.6 + 0.1) - containerRect.top;
        el.style.left = left + 'px';
        el.style.top = top + 'px';
        el.style.fontSize = (12 + Math.random() * 20) + 'px';
        el.style.opacity = 0.95;
        el.style.transform = 'translateY(0)';

        parent.appendChild(el);

        // remove after animation
        setTimeout(() => {
            el.remove();
        }, 1600 + Math.random() * 400);
    }
}



/* FONDO PARTÍCULAS */
function startBackground() {
    const canvas = document.getElementById("background");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.3
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.fillStyle = "rgba(255,255,255,0.6)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            p.y += p.speed;
            if (p.y > canvas.height) p.y = 0;
        });

        requestAnimationFrame(animate);
    }

    animate();
}


/* CORAZONES DESDE EL ÁRBOL */
function startHearts() {
    const container = document.querySelector(".tree-container");

    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
    heart.innerHTML = "♥";

        heart.style.left = "50%";
        heart.style.bottom = "140px";
        heart.style.fontSize = (Math.random() * 10 + 14) + "px";
        heart.style.animationDuration = (Math.random() * 2 + 3) + "s";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 800);
}
