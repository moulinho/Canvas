window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "green";

  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;

  /* effect settings */

  let size =
    canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
  const maxLevel = 10;
  const branches = 1;

  let sides = Math.floor(Math.random() * 18 + 2);
  let scale = 0.85;
  let spread = -0.2;
  let color = "hsl(" + Math.random() * 360 + ",100%,50%)";
  let lineWidth = 30;
  /* controls */
  const randomizeButton = document.getElementById("randomizeButton");
  const resetButton = document.getElementById("resetButton");
  const slider_spread = document.getElementById("spread");
  const label_spread = document.querySelector('[for="spread"]');
  slider_spread.addEventListener("change", function (e) {
    // console.log(e.target.value);
    spread = e.target.value;
    updateSliders();
    drawFactal();
  });

  const slider_slides = document.getElementById("sides");
  const label_slides = document.querySelector('[for="sides"]');

  slider_slides.addEventListener("change", function (e) {
    console.log(e.target.value);
    sides = e.target.value;
    updateSliders();
    drawFactal();
  });
  let pointX = 0;
  let pointY = size;
  function drawBranch(level) {
    if (level > maxLevel) return;
    /* Branche principale */
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineTo(size, 0);
    ctx.bezierCurveTo(
      0,
      size * spread * -50,
      size * 5,
      size * 10 * spread,
      0,
      0
    );
    ctx.stroke();
    /* Fin Branche principale */

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(pointX, pointY);
      ctx.scale(scale, scale);

      /* secondary Branche */

      ctx.save();
      ctx.rotate(spread);

      drawBranch(level + 1);
      ctx.restore();

      //   ctx.save();
      //   ctx.rotate(-spread);
      //   drawBranch(level + 1);
      //   ctx.restore();

      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(-size / 2, 0, 40, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawFactal(scale, rot) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.setTransform(scale, 0, 0, scale, canvas.width / 2, canvas.height / 2);
    ctx.rotate(rot);

    // ctx.fillRect(-size / 2, -size / 2, size, size);

    for (let i = 0; i < sides; i++) {
      ctx.scale(0.95, 0.95);
      ctx.rotate((Math.PI * 6) / sides);

      drawBranch(0);
    }

    ctx.restore();

    randomizeButton.style.background = color;
  }
  drawFactal();

  function ramdomizeFractal() {
    sides = Math.floor(Math.random() * 18 + 2);
    // scale = Math.random() * 0.6 - 0.3;
    spread = Math.random() * 0.6 - 0.3;
    color = "hsl(" + Math.random() * 360 + ",100%,50%)";
    lineWidth = Math.floor(Math.random() * 30 + 20);
  }

  randomizeButton.addEventListener("click", function () {
    ramdomizeFractal();
    updateSliders();
    drawFactal();
  });

  function resetFractal() {
    sides = 15;
    scale = 0.85;
    spread = 0.2;

    color = "hsl(290,100%,50%)";
    lineWidth = 15;
  }
  resetButton.addEventListener("click", function () {
    resetFractal();
    updateSliders();
    drawFactal();
  });
  function update(time) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // draw none rotated box
    drawFactal(0.95, time / 10000); // draw rotating box
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset to default transform

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update)
  function updateSliders() {
    slider_spread.value = spread;
    label_spread.innerText = "spread : " + Number(spread).toFixed(2);
    slider_slides.value = sides;
    label_slides.innerText = "sides : " + sides;
  }

  updateSliders();
;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    /* Adapt draws with screens */
    size =
      canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;

    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    drawFactal();
    
  });

  // function drawBox(col, size, x, y, scale, rot) {
  //   ctx.fillStyle = col;
  //   // use setTransform as it overwrites the canvas transform rather than multiply it as the other transform functions do
  //   ctx.setTransform(scale, 0, 0, scale, x, y);
  //   ctx.rotate(rot);
  //   ctx.fillRect(-size / 2, -size / 2, size, size);
  // }

  // console.log('ctx',ctx);
  // console.log('canvas',canvas);
});
