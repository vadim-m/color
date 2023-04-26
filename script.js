const columns = document.querySelectorAll(".col");

document.addEventListener("keydown", (e) => {
  if (e.code.toLowerCase() === "space") setRandomColors();
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

setRandomColors();
