const columns = document.querySelectorAll(".col");

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
    col.style.backgroundColor = generateRandomColor();
  });
}

setRandomColors();
