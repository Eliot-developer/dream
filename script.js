/* =====================================
   SECTIONS
===================================== */

const sections = {

    intro:
        document.getElementById("intro"),

    welcome:
        document.getElementById("welcome"),

    gratitude:
        document.getElementById("gratitude"),

    dream:
        document.getElementById("dream"),

    birthday:
        document.getElementById("birthday"),

    letter:
        document.getElementById("letter"),

    wish:
        document.getElementById("wish")

};


/* =====================================
   BACKGROUND MUSIC
===================================== */

const bgMusic =
    document.getElementById("bgMusic");


function startMusic() {

    bgMusic.volume = 0.35;

    bgMusic.play().catch(() => {});

    document.removeEventListener(
        "click",
        startMusic
    );

}


document.addEventListener(
    "click",
    startMusic
);


/* =====================================
   BUTTONS
===================================== */

const enterButton =
    document.getElementById("enterButton");

const continueButton =
    document.getElementById("continueButton");

const lightButton =
    document.getElementById("lightButton");

const birthdayButton =
    document.getElementById("birthdayButton");

const letterButton =
    document.getElementById("letterButton");

const wishButton =
    document.getElementById("wishButton");

const blowButton =
    document.getElementById("blowButton");

const wishAgainButton =
    document.getElementById("wishAgainButton");


/* =====================================
   WISH ELEMENTS
===================================== */

const wishSection =
    document.getElementById("wish");

const wishText =
    document.getElementById("wishText");

const wishFinale =
    document.getElementById("wishFinale");

const candleFlame =
    document.getElementById("candleFlame");

const candleLight =
    document.getElementById("candleLight");


/* =====================================
   CANVAS
===================================== */

const canvas =
    document.getElementById(
        "particleCanvas"
    );

const ctx =
    canvas.getContext("2d");

let particles = [];


/* =====================================
   CURRENT SECTION
===================================== */

let currentSection = "intro";


/* =====================================
   CHANGE SECTION
===================================== */

function showSection(sectionName) {

    currentSection = sectionName;


    Object.values(sections).forEach(
        section => {

            if (section) {

                section.classList.remove(
                    "active"
                );

            }

        }
    );


    /*
     * وقتی وارد صفحه نامه می‌شویم:
     *
     * تمام ذرات قبلی پاک می‌شوند
     * و فقط کرم‌های شب‌تاب اجازه نمایش دارند.
     */

    if (
        sectionName === "letter"
    ) {

        particles =
            particles.filter(
                particle =>
                    particle.type === "firefly"
            );

    }


    setTimeout(() => {

        if (sections[sectionName]) {

            sections[sectionName]
                .classList.add("active");

        }

    }, 100);

}


/* =====================================
   SECTION 1 → 2
===================================== */

enterButton.addEventListener(
    "click",
    () => {

        showSection("welcome");

    }
);


/* =====================================
   SECTION 2 → 3
===================================== */

continueButton.addEventListener(
    "click",
    () => {

        showSection("gratitude");

    }
);


/* =====================================
   SECTION 3 → 4
===================================== */

lightButton.addEventListener(
    "click",
    () => {

        createLightExplosion();

        setTimeout(() => {

            showSection("dream");

        }, 1800);

    }
);


/* =====================================
   SECTION 4 → 5
===================================== */

birthdayButton.addEventListener(
    "click",
    () => {

        setTimeout(() => {

            showSection("birthday");

        }, 1200);

    }
);


/* =====================================
   SECTION 5 → 6
   BIRTHDAY → LETTER
===================================== */

letterButton.addEventListener(
    "click",
    () => {

        createCelebration();


        setTimeout(() => {

            /*
             * پاک کردن تمام ذرات رنگی
             * قبل از ورود به نامه
             */

            particles =
                particles.filter(
                    particle =>
                        particle.type === "firefly"
                );


            showSection("letter");


            /*
             * ساخت کرم‌های شب‌تاب
             */

            setTimeout(() => {

                createFireflies();

            }, 900);

        }, 1000);

    }
);


/* =====================================
   SECTION 6 → 7
===================================== */

wishButton.addEventListener(
    "click",
    () => {

        /*
         * کرم‌های شب‌تاب دیگر
         * وارد صفحه آخر نمی‌شوند.
         */

        particles =
            particles.filter(
                particle =>
                    particle.type !== "firefly"
            );


        showSection("wish");

    }
);


/* =====================================
   BLOW OUT CANDLE
===================================== */

blowButton.addEventListener(
    "click",
    () => {

        /*
         * جلوگیری از چندبار کلیک
         */

        blowButton.disabled = true;


        /*
         * خاموش کردن شعله
         */

        candleFlame.classList.add(
            "off"
        );

        candleLight.classList.add(
            "off"
        );


        /*
         * محو کردن متن
         */

        wishText.style.opacity =
            "0";

        wishText.style.transform =
            "translateY(-50%) scale(.92)";


        /*
         * آتش‌بازی
         */

        setTimeout(() => {

            createFireworks();

        }, 450);


        /*
         * محو شدن پری و کیک
         */

        setTimeout(() => {

            const fairyScene =
                document.getElementById(
                    "fairyScene"
                );


            fairyScene.style.opacity =
                "0";


            fairyScene.style.transform =
                "translateY(20px) scale(.95)";

        }, 900);


        /*
         * پیام نهایی
         */

        setTimeout(() => {

            wishFinale.classList.add(
                "show"
            );

        }, 1800);

    }
);


/* =====================================
   RESTART
===================================== */

wishAgainButton.addEventListener(
    "click",
    () => {

        location.reload();

    }
);


/* =====================================
   RESIZE CANVAS
===================================== */

function resizeCanvas() {

    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        window.innerWidth * ratio;


    canvas.height =
        window.innerHeight * ratio;


    canvas.style.width =
        window.innerWidth + "px";


    canvas.style.height =
        window.innerHeight + "px";


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =====================================
   PARTICLE CLASS
===================================== */

class Particle {

    constructor(
        x,
        y,
        size,
        speedX,
        speedY,
        life,
        type = "star"
    ) {

        this.x = x;

        this.y = y;

        this.size = size;

        this.speedX = speedX;

        this.speedY = speedY;

        this.life = life;

        this.maxLife = life;

        this.type = type;

        this.angle =
            Math.random() *
            Math.PI *
            2;


        this.rotationSpeed =
            (Math.random() - 0.5) *
            0.04;


        /*
         * رنگ‌های افکت‌های معمولی
         *
         * این رنگ‌ها در صفحه نامه
         * اصلاً نمایش داده نمی‌شوند.
         */

        const colors = [

            "#ff72b6",
            "#c084fc",
            "#60a5fa",
            "#34d399",
            "#facc15",
            "#ffffff"

        ];


        this.color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

    }


    /* =================================
       UPDATE
    ================================= */

    update() {

        this.x +=
            this.speedX;


        this.y +=
            this.speedY;


        /*
         * حرکت بسیار آرام
         */

        this.speedY +=
            0.000002;


        this.life--;


        this.angle +=
            this.rotationSpeed;


        /*
         * کرم شب‌تاب
         *
         * حرکت طبیعی و آرام
         */

        if (
            this.type === "firefly"
        ) {

            this.x +=
                Math.sin(
                    Date.now() * 0.0005 +
                    this.y
                ) * 0.03;


            this.y +=
                Math.cos(
                    Date.now() * 0.0004 +
                    this.x
                ) * 0.02;

        }

    }


    /* =================================
       DRAW
    ================================= */

    draw() {

        /*
         * مهم:
         *
         * در صفحه نامه فقط Firefly
         * اجازه رسم شدن دارد.
         */

        if (
            currentSection === "letter" &&
            this.type !== "firefly"
        ) {

            return;

        }


        const opacity =
            Math.max(
                0,
                this.life /
                this.maxLife
            );


        ctx.save();


        ctx.globalAlpha =
            opacity;


        /* =================================
           FIREFLY
        ================================= */

        if (
            this.type === "firefly"
        ) {

            /*
             * نور طبیعی و بسیار ظریف
             */

            const pulse =
                0.40 +
                Math.sin(
                    Date.now() * 0.0025 +
                    this.x * 0.04
                ) * 0.18;


            ctx.globalAlpha =
                Math.max(
                    0.20,
                    pulse
                );


            /*
             * رنگ خود کرم
             */

            ctx.fillStyle =
                "#eaff9b";


            /*
             * هاله بسیار کوچک
             *
             * بدون نور صورتی
             * بدون نور بنفش
             * بدون نور آبی
             */

            ctx.shadowBlur =
                4;


            ctx.shadowColor =
                "#eaff9b";


            ctx.beginPath();


            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );


            ctx.fill();


            /*
             * هسته روشن
             */

            ctx.shadowBlur =
                0;


            ctx.fillStyle =
                "#fffde0";


            ctx.beginPath();


            ctx.arc(
                this.x,
                this.y,
                this.size * 0.38,
                0,
                Math.PI * 2
            );


            ctx.fill();


            ctx.restore();


            return;

        }


        /* =================================
           STAR
        ================================= */

        if (
            this.type === "star"
        ) {

            ctx.globalAlpha =
                opacity;


            ctx.fillStyle =
                this.color;


            ctx.shadowBlur =
                15;


            ctx.shadowColor =
                this.color;


            ctx.beginPath();


            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }


        /* =================================
           DIAMOND
        ================================= */

        if (
            this.type === "diamond"
        ) {

            ctx.globalAlpha =
                opacity;


            ctx.fillStyle =
                this.color;


            ctx.shadowBlur =
                15;


            ctx.shadowColor =
                this.color;


            ctx.translate(
                this.x,
                this.y
            );


            ctx.rotate(
                this.angle
            );


            ctx.beginPath();


            ctx.moveTo(
                0,
                -this.size * 2
            );


            ctx.lineTo(
                this.size,
                0
            );


            ctx.lineTo(
                0,
                this.size * 2
            );


            ctx.lineTo(
                -this.size,
                0
            );


            ctx.closePath();


            ctx.fill();

        }


        ctx.restore();

    }

}


/* =====================================
   PARTICLE LOOP
===================================== */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    /*
     * حذف ذرات تمام‌شده
     */

    particles =
        particles.filter(
            particle =>
                particle.life > 0
        );


    /*
     * در صفحه نامه:
     *
     * فقط Firefly ها باقی می‌مانند.
     */

    if (
        currentSection === "letter"
    ) {

        particles =
            particles.filter(
                particle =>
                    particle.type === "firefly"
            );

    }


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* =====================================
   BACKGROUND STARS
===================================== */

function createBackgroundStars() {

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        particles.push(

            new Particle(

                Math.random() *
                window.innerWidth,

                Math.random() *
                window.innerHeight,

                Math.random() *
                1.5 + 0.5,

                (Math.random() - 0.5) *
                0.1,

                (Math.random() - 0.5) *
                0.1,

                999999,

                "star"

            )

        );

    }

}


createBackgroundStars();


/* =====================================
   LIGHT EXPLOSION
===================================== */

function createLightExplosion() {

    const centerX =
        window.innerWidth / 2;


    const centerY =
        window.innerHeight / 2;


    for (
        let i = 0;
        i < 180;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            5 + 1;


        particles.push(

            new Particle(

                centerX,

                centerY,

                Math.random() *
                2 + 1,

                Math.cos(angle) *
                speed,

                Math.sin(angle) *
                speed,

                Math.random() *
                80 + 80,

                "diamond"

            )

        );

    }

}


/* =====================================
   FIREFLIES
===================================== */

function createFireflies() {

    /*
     * اول همه ذرات غیر کرم پاک شوند
     */

    particles =
        particles.filter(
            particle =>
                particle.type === "firefly"
        );


    /*
     * تعداد کرم‌ها
     */

    for (
        let i = 0;
        i < 55;
        i++
    ) {

        /*
         * جای شروع تصادفی
         */

        const x =
            Math.random() *
            window.innerWidth;


        const y =
            Math.random() *
            window.innerHeight;


        /*
         * اندازه کوچک
         */

        const size =
            Math.random() *
            1.2 + 1;


        /*
         * حرکت خیلی آرام
         */

        const speedX =
            (Math.random() - 0.5) *
            0.25;


        const speedY =
            (Math.random() - 0.5) *
            0.2;


        particles.push(

            new Particle(

                x,

                y,

                size,

                speedX,

                speedY,

                999999,

                "firefly"

            )

        );

    }

}


/* =====================================
   CELEBRATION
===================================== */

function createCelebration() {

    const centerX =
        window.innerWidth / 2;


    const centerY =
        window.innerHeight / 2;


    for (
        let i = 0;
        i < 300;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            8 + 2;


        particles.push(

            new Particle(

                centerX,

                centerY,

                Math.random() *
                2 + 1,

                Math.cos(angle) *
                speed,

                Math.sin(angle) *
                speed,

                Math.random() *
                120 + 100,

                "diamond"

            )

        );

    }

}


/* =====================================
   NIGHT SKY
===================================== */

function createNightSky() {

    /*
     * جلوگیری از ساخت چندباره
     */

    if (
        wishSection.querySelector(
            ".night-sky-container"
        )
    ) {

        return;

    }


    const sky =
        document.createElement(
            "div"
        );


    sky.className =
        "night-sky-container";


    sky.style.position =
        "absolute";


    sky.style.inset =
        "0";


    sky.style.pointerEvents =
        "none";


    sky.style.zIndex =
        "1";


    /*
     * ستاره‌های آسمان
     */

    for (
        let i = 0;
        i < 110;
        i++
    ) {

        const star =
            document.createElement(
                "div"
            );


        star.className =
            "night-sky-star";


        /*
         * بعضی ستاره‌ها بزرگ‌تر
         */

        if (
            Math.random() < 0.15
        ) {

            star.classList.add(
                "big"
            );

        }


        star.style.left =
            Math.random() *
            100 +
            "%";


        star.style.top =
            Math.random() *
            100 +
            "%";


        star.style.setProperty(
            "--duration",
            Math.random() * 3 +
            2 +
            "s"
        );


        star.style.animationDelay =
            Math.random() *
            4 +
            "s";


        sky.appendChild(
            star
        );

    }


    wishSection.appendChild(
        sky
    );

}


/* =====================================
   SHOOTING STAR
===================================== */

function createShootingStar() {

    /*
     * فقط وقتی صفحه آخر باز است
     * ستاره دنباله‌دار ساخته شود.
     */

    if (
        currentSection !== "wish"
    ) {

        return;

    }


    const star =
        document.createElement(
            "div"
        );


    star.className =
        "shooting-star";


    /*
     * نقطه شروع
     */

    star.style.left =
        Math.random() *
        90 +
        5 +
        "%";


    star.style.top =
        Math.random() *
        45 +
        "%";


    /*
     * حرکت آهسته
     */

    const duration =
        Math.random() *
        1.5 +
        1.5;


    star.style.animation =
        `shootingStar ${duration}s linear forwards`;


    wishSection.appendChild(
        star
    );


    setTimeout(() => {

        star.remove();

    }, duration * 1000 + 100);

}


/* =====================================
   START NIGHT SKY
===================================== */

createNightSky();


/*
 * هر چند ثانیه یک
 * ستاره دنباله‌دار
 */

setInterval(() => {

    createShootingStar();

}, 5000);


/* =====================================
   FIREWORKS
===================================== */

function createFireworks() {

    const colors = [

        "#ff72b6",
        "#c084fc",
        "#60a5fa",
        "#34d399",
        "#facc15",
        "#ffffff"

    ];


    for (
        let firework = 0;
        firework < 12;
        firework++
    ) {

        setTimeout(() => {

            const x =
                Math.random() *
                window.innerWidth;


            const y =
                Math.random() *
                window.innerHeight *
                0.62 +
                40;


            const color =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            for (
                let i = 0;
                i < 45;
                i++
            ) {

                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    Math.random() *
                    150 +
                    45;


                const particle =
                    document.createElement(
                        "div"
                    );


                particle.className =
                    "firework";


                particle.style.left =
                    x + "px";


                particle.style.top =
                    y + "px";


                particle.style.color =
                    color;


                particle.style.background =
                    color;


                particle.style.setProperty(
                    "--x",
                    Math.cos(angle) *
                    distance +
                    "px"
                );


                particle.style.setProperty(
                    "--y",
                    Math.sin(angle) *
                    distance +
                    "px"
                );


                wishSection.appendChild(
                    particle
                );


                setTimeout(() => {

                    particle.remove();

                }, 1400);

            }

        }, firework * 280);

    }

}


/* =====================================
   CLICK MAGIC
===================================== */

document.addEventListener(
    "click",
    event => {

        /*
         * روی دکمه‌ها افکت نده
         */

        if (
            event.target.tagName ===
            "BUTTON"
        ) {

            return;

        }


        /*
         * خیلی مهم:
         *
         * در صفحه نامه هیچ ذره رنگی
         * با کلیک ساخته نمی‌شود.
         */

        if (
            currentSection === "letter"
        ) {

            return;

        }


        /*
         * در صفحه آخر هم ذرات Canvas
         * کلیکی ساخته نشوند؛
         * چون آسمان با ستاره‌های مخصوص خودش است.
         */

        if (
            currentSection === "wish"
        ) {

            return;

        }


        for (
            let i = 0;
            i < 10;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const speed =
                Math.random() *
                2 +
                0.5;


            particles.push(

                new Particle(

                    event.clientX,

                    event.clientY,

                    Math.random() *
                    2 +
                    1,

                    Math.cos(angle) *
                    speed,

                    Math.sin(angle) *
                    speed,

                    70,

                    "star"

                )

            );

        }

    }
);