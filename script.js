const columns = document.querySelectorAll(".col");

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === "space") setRandomColors();
});

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.dataset.type === "lock") {
    const icon = target.querySelector("i");
    console.log(icon);
    icon.classList.toggle("fa-lock");
    icon.classList.toggle("fa-lock-open");
  }

  if (target.dataset.type === "copy") {
    copyToBuffer(target.textContent);
  }
});

function generateRandomColor() {
  let color = "";
  const hexSymbols = "0123456789ABCDEF";

  for (let i = 6; i > 0; i--) {
    color += hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
  }

  return `#${color}`;
}

function setRandomColors() {
  columns.forEach((col) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    if (isLocked) {
      return;
    }

    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = chroma.random(); // либо свою функцию generateRandomColor();

    text.textContent = color;
    col.style.backgroundColor = color;

    setTextColors(text, color);
    setTextColors(button, color);
  });
}

function setTextColors(el, color) {
  const luminance = chroma(color).luminance();
  el.style.color = luminance > 0.5 ? "black" : "white";
}

function copyToBuffer(text) {
  return navigator.clipboard.writeText(text);
}

setRandomColors();
