const columns = document.querySelectorAll(".col");

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === "space") {
    setRandomColors();
    console.log("ff");
  }
});

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.dataset.type === "lock") {
    const icon = target.querySelector("i");
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

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  columns.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random(); // либо свою функцию generateRandomColor();

    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.backgroundColor = color;

    setTextColors(text, color);
    setTextColors(button, color);

    updateColorsHash(colors);
  });
}

function setTextColors(el, color) {
  const luminance = chroma(color).luminance();
  el.style.color = luminance > 0.5 ? "black" : "white";
}

function copyToBuffer(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((color) => color.toString().slice(1))
    .join("-");
}

function getColorsFromHash() {
  const hash = document.location.hash;

  if (hash.length > 1) {
    return hash
      .slice(1)
      .split("-")
      .map((color) => `#${color}`);
  }

  return [];
}

setRandomColors(true);
