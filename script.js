const canvas = document.getElementById("wallpaper");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "assets/SonicScroll.jpeg";

// This controls the scroll speed
let scrollSpeed = 30; // pixels per second

// initial offset
let offsetX = 0;
let offsetY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

img.onload = () => {
  const patternWidth = img.width;
  const patternHeight = img.height;

  let lastTime = performance.now();

  function draw(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000; // seconds
    lastTime = currentTime;

    // This should apply a smooth diagonal movement
    offsetX = (offsetX - scrollSpeed * deltaTime) % patternWidth;
    offsetY = (offsetY - scrollSpeed * deltaTime) % patternHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cols = Math.ceil(canvas.width / patternWidth) + 1;
    const rows = Math.ceil(canvas.height / patternHeight) + 1;

    for (let col = -1; col < cols; col++) {
      for (let row = -1; row < rows; row++) {
        const drawX = col * patternWidth - offsetX;
        const drawY = row * patternHeight - offsetY;
        // Redondeo para evitar tearing por subpíxeles
        // Rounding to avoid tearing by subpixels otherwise it looks weird
        ctx.drawImage(img, Math.round(drawX), Math.round(drawY));
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
};