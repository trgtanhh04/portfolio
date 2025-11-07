// Galaxy Background Animation Module

;(function initGalaxy(){
    // Respect prefers-reduced-motion
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) return;

    const canvas = document.getElementById('galaxy-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0, DPR = Math.max(1, window.devicePixelRatio || 1);

    function resize(){
        width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        canvas.width = Math.floor(width * DPR);
        canvas.height = Math.floor(height * DPR);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    // Stars
    const STAR_COUNT = Math.min(220, Math.floor((window.innerWidth * window.innerHeight) / 6000));
    const stars = [];
    function rand(min, max){ return Math.random() * (max - min) + min; }

    function createStars(){
        stars.length = 0;
        for(let i=0;i<STAR_COUNT;i++){
            stars.push({
                x: rand(0, width),
                y: rand(0, height),
                r: rand(0.3, 1.8),
                alpha: rand(0.25, 0.95),
                speed: rand(0.02, 0.4),
                twinkle: rand(0.001, 0.008)
            });
        }
    }

    // Nebula blobs (soft colored gradients)
    const blobs = [];
    const NEBULA_COUNT = Math.max(2, Math.floor(Math.min(width, height) / 400));
    const nebulaColors = ['#0ef', '#6ee7b7', '#a78bfa', '#00b7ff'];
    
    function createBlobs(){
        blobs.length = 0;
        for(let i=0;i<NEBULA_COUNT;i++){
            blobs.push({
                x: rand(-width*0.2, width*1.2),
                y: rand(-height*0.2, height*1.2),
                size: rand(Math.min(width,height)*0.4, Math.min(width,height)*0.9),
                color: nebulaColors[i % nebulaColors.length],
                vx: rand(-0.03, 0.03),
                vy: rand(-0.02, 0.02),
                phase: rand(0, Math.PI*2)
            });
        }
    }

    // Planets
    const planets = [];
    const PLANET_DEFS = [
        {name: 'Jupiter', color: '#f5d08a', sizeFactor: 0.045, orbitRadiusFactor: 0.18, speed: 0.0006},
        {name: 'Saturn',  color: '#e6cfa3', sizeFactor: 0.038, orbitRadiusFactor: 0.26, speed: 0.00045},
        {name: 'Uranus',  color: '#9fe7f0', sizeFactor: 0.03,  orbitRadiusFactor: 0.35, speed: 0.00032},
        {name: 'Neptune', color: '#7cc6ff', sizeFactor: 0.028, orbitRadiusFactor: 0.44, speed: 0.00028}
    ];
    
    function createPlanets(){
        planets.length = 0;
        const cx = width * 0.5;
        const cy = height * 0.45;
        for(let i=0;i<PLANET_DEFS.length;i++){
            const d = PLANET_DEFS[i];
            const orbitR = Math.min(width, height) * d.orbitRadiusFactor;
            const angle = rand(0, Math.PI*2);
            planets.push({
                name: d.name,
                color: d.color,
                baseSize: Math.max(8, Math.min(width,height) * d.sizeFactor),
                orbitR,
                angle,
                speed: d.speed * (rand(0.8, 1.2)),
                cx, cy,
                highlight: false
            });
        }
    }

    // Constellations
    const CONSTELLATIONS = [
        {
            name: 'Orion',
            color: '#cfe6ff',
            points: [ {x:0.25,y:0.55,m:1.0}, {x:0.32,y:0.45,m:0.9}, {x:0.42,y:0.5,m:0.6}, {x:0.53,y:0.45,m:1.0}, {x:0.60,y:0.53,m:0.8} ]
        },
        {
            name: 'Cassiopeia',
            color: '#d6faff',
            points: [ {x:0.75,y:0.12,m:0.7}, {x:0.82,y:0.18,m:0.6}, {x:0.88,y:0.12,m:0.6}, {x:0.94,y:0.18,m:0.7} ]
        },
        {
            name: 'UrsaMajor',
            color: '#c1f7ff',
            points: [ {x:0.9,y:0.02,m:0.9}, {x:0.94,y:0.12,m:0.6}, {x:0.86,y:0.16,m:0.5}, {x:0.78,y:0.08,m:0.7} ]
        }
    ];

    function mapRel(rel){ return {x: rel.x * width, y: rel.y * height, m: rel.m}; }

    function snapToStar(px, py, threshold){
        let best = null; let bestDist = threshold;
        for(const s of stars){
            const dx = s.x - px; const dy = s.y - py; const d = Math.hypot(dx, dy);
            if (d < bestDist){ bestDist = d; best = s; }
        }
        return best;
    }

    function hexToRgba(hex, alpha){
        const h = hex.replace('#','');
        const bigint = parseInt(h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r},${g},${b},${alpha})`;
    }

    function draw(){
        ctx.clearRect(0,0,width, height);

        // Background gradient
        const g = ctx.createLinearGradient(0,0,0,height);
        g.addColorStop(0, 'rgba(8,12,18,0.9)');
        g.addColorStop(1, 'rgba(12,16,22,0.95)');
        ctx.fillStyle = g;
        ctx.fillRect(0,0,width,height);

        // Draw nebula blobs
        for(const b of blobs){
            const grd = ctx.createRadialGradient(b.x, b.y, b.size*0.02, b.x, b.y, b.size);
            grd.addColorStop(0, hexToRgba(b.color, 0.25 + 0.15*Math.sin(b.phase)));
            grd.addColorStop(0.4, hexToRgba(b.color, 0.09));
            grd.addColorStop(1, 'rgba(10,12,16,0)');
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI*2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }

        // Draw stars
        for(const s of stars){
            s.alpha += Math.sin((Date.now() * s.twinkle) + s.speed) * 0.02;
            s.alpha = Math.min(1, Math.max(0.1, s.alpha));
            ctx.beginPath();
            const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r*3);
            grad.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
            grad.addColorStop(0.6, `rgba(200,220,255,${s.alpha*0.3})`);
            grad.addColorStop(1, 'rgba(200,220,255,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(s.x - s.r*2, s.y - s.r*2, s.r*4, s.r*4);
            
            // Star motion
            s.x += Math.cos(Date.now()*0.0001 + s.speed) * (s.speed*0.2);
            s.y += Math.sin(Date.now()*0.0001 + s.speed) * (s.speed*0.15);
            if (s.x < -10) s.x = width + 10;
            if (s.x > width + 10) s.x = -10;
            if (s.y < -10) s.y = height + 10;
            if (s.y > height + 10) s.y = -10;
        }

        // Draw planets
        for(const p of planets){
            const px = p.cx + Math.cos(p.angle) * p.orbitR;
            const py = p.cy + Math.sin(p.angle) * p.orbitR * 0.9;

            // Planet glow
            const glow = ctx.createRadialGradient(px, py, 0, px, py, p.baseSize*6);
            glow.addColorStop(0, hexToRgba(p.color, 0.25));
            glow.addColorStop(0.4, hexToRgba(p.color, 0.08));
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(px, py, p.baseSize*6, 0, Math.PI*2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';

            // Planet body
            ctx.beginPath();
            ctx.fillStyle = p.highlight ? '#ffffff' : p.color;
            ctx.arc(px, py, p.baseSize, 0, Math.PI*2);
            ctx.fill();

            // Saturn's ring
            if (p.name === 'Saturn'){
                ctx.save();
                ctx.translate(px, py);
                ctx.rotate(-0.4);
                ctx.strokeStyle = hexToRgba('#e2caa6', 0.6);
                ctx.lineWidth = Math.max(2, p.baseSize*0.6);
                ctx.beginPath();
                ctx.ellipse(0, 0, p.baseSize*2.6, p.baseSize*1.1, 0, 0, Math.PI*2);
                ctx.stroke();
                ctx.restore();
            }
        }

        // Draw constellations
        drawConstellations();
    }

    function drawConstellations(){
        const now = Date.now();
        for(const c of CONSTELLATIONS){
            const pts = c.points.map(mapRel);
            
            for(let i=0;i<pts.length;i++){
                const s = snapToStar(pts[i].x, pts[i].y, Math.max(40, Math.min(width,height)*0.06));
                if (s) { pts[i].x = s.x; pts[i].y = s.y; }
            }

            // Draw constellation lines
            ctx.save();
            ctx.lineWidth = 1.4;
            ctx.strokeStyle = hexToRgba(c.color, 0.18 + 0.06*Math.sin(now*0.0008));
            ctx.shadowColor = hexToRgba(c.color, 0.14);
            ctx.shadowBlur = 6;
            ctx.beginPath();
            for(let i=0;i<pts.length;i++){
                const p = pts[i];
                if (i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
            }
            ctx.stroke();
            ctx.restore();

            // Draw constellation stars
            for(const p of pts){
                const tw = 0.9 + 0.15*Math.sin(now*0.002 + (p.x+p.y));
                const size = Math.max(1.6, (p.m || 0.6) * 3.2 * tw);
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size*3);
                grad.addColorStop(0, hexToRgba('#ffffff', 0.95));
                grad.addColorStop(0.4, hexToRgba(c.color, 0.6));
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size*1.6, 0, Math.PI*2);
                ctx.fill();
            }
        }
    }

    function animate(){
        for(const b of blobs){
            b.x += b.vx;
            b.y += b.vy;
            b.phase += 0.002;
            
            if(b.x < -width*0.4) b.x = width*1.2;
            if(b.x > width*1.2) b.x = -width*0.4;
            if(b.y < -height*0.4) b.y = height*1.2;
            if(b.y > height*1.2) b.y = -height*0.4;
        }
        draw();
        requestAnimationFrame(animate);
    }

    // Update planet positions
    (function updatePlanets(){
        for(const p of planets){
            p.angle += p.speed;
        }
        setTimeout(updatePlanets, 30);
    })();

    function start(){
        resize();
        createStars();
        createBlobs();
        createPlanets();
        animate();
    }

    window.addEventListener('resize', ()=>{
        if (this._resizeTO) clearTimeout(this._resizeTO);
        this._resizeTO = setTimeout(()=>{
            resize();
            createStars();
            createBlobs();
        }, 180);
    });

    setTimeout(start, 120);
})();

export { };
