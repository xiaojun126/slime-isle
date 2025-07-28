const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 100, y: 100, size: 40 };
let slime = { x: 300, y: 200, size: 40, inFarm: false };
let crystals = 0;
let inFarm = false;

// 虚拟摇杆方向
let direction = { x: 0, y: 0 };

// 控制按钮监听
document.getElementById('up').ontouchstart = () => direction.y = -1;
document.getElementById('down').ontouchstart = () => direction.y = 1;
document.getElementById('left').ontouchstart = () => direction.x = -1;
document.getElementById('right').ontouchstart = () => direction.x = 1;
['up', 'down', 'left', 'right'].forEach(id => {
  document.getElementById(id).ontouchend = () => direction = { x: 0, y: 0 };
});

// 更新水晶数量
function updateHUD() {
  document.getElementById('crystalCount').innerText = crystals;
}

// 每 5 秒史莱姆产水晶（如果已进农场）
setInterval(() => {
  if (slime.inFarm) {
    crystals++;
    updateHUD();
  }
}, 5000);

// 主循环
function gameLoop() {
  // 移动
  player.x += direction.x * 3;
  player.y += direction.y * 3;

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制主角
  ctx.fillStyle = 'orange';
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // 绘制史莱姆
  if (!slime.inFarm) {
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.arc(slime.x, slime.y, slime.size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.arc(100, 400, slime.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 检测拾取
  let dx = player.x - slime.x;
  let dy = player.y - slime.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 40 && !slime.inFarm) {
    slime.inFarm = true;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();