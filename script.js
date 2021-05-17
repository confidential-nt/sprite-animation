window.onload = () => {
  const canvas = document.createElement("canvas");
  canvas.id = "target";
  canvas.width = 900;
  canvas.height = 600;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  let current;
  let montionCounter = 0;

  let isBgImgLoaded = false;
  let isSpriteImgLoaded = false;

  const scene = 6;
  let startPoint = 0;
  const SPEED = 80;

  const spriteImg = new Image();
  const bgImg = new Image();

  function updateVector() {
    const { width } = spriteImg;
    startPoint += 20;
    if (startPoint > canvas.width && width !== 0) {
      startPoint = (width / scene) * -1;
    }
  }

  function updateMotion() {
    montionCounter++;
    montionCounter %= scene;
  }

  function update() {
    updateMotion();
    updateVector();
  }

  function drawSpriteMoving(sprite) {
    const { width: imgWidth, height: imgHeight } = sprite;
    const cellLength = imgWidth / scene;

    const groundPoint = 410;

    const spriteWidth = 150;
    const spriteHeight = 110;

    ctx.drawImage(
      sprite,
      montionCounter * cellLength,
      0,
      cellLength,
      imgHeight,
      startPoint,
      groundPoint,
      spriteWidth,
      spriteHeight
    );
  }

  function drawSprite() {
    if (!isSpriteImgLoaded) return;
    const sprite = spriteImg;
    drawSpriteMoving(sprite);
  }

  function drawBackground() {
    if (!isBgImgLoaded) return;
    const bg = bgImg;
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  }

  function draw() {
    drawBackground();
    drawSprite();
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function animate(timestamp) {
    window.requestAnimationFrame(animate);
    let start = timestamp;
    clear();
    draw();
    if (start - current < SPEED) return;
    update();
    current = null;
    if (!current) current = start;
  }

  function setImage() {
    bgImg.src = "images/back.png";
    bgImg.onload = () => (isBgImgLoaded = true);

    spriteImg.src = "images/sprite.png";
    spriteImg.onload = () => (isSpriteImgLoaded = true);
  }

  setImage();
  window.requestAnimationFrame(animate);
};
