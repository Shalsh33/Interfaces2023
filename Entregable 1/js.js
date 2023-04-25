//import { Figura , Circulo ,  Rectangulo } from "./figura";
class Figura {
  constructor(x, y, ancho, alto, color) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.color = color;
  }

  dibujar() {
    ctx.fillStyle = this.color;
  }
}

// Subclase Círculo
class Circulo extends Figura {
  constructor(x, y, radio, color) {
    super(x, y, radio * 2, radio * 2, color);
    this.radio = radio;
  }

  dibujar() {
    super.dibujar();
    ctx.beginPath();
    ctx.arc(this.x + this.radio, this.y + this.radio, this.radio, 0, Math.PI * 2);
    ctx.fill();
  }

  contienePunto(x, y) {
    const distancia = Math.sqrt((x - (this.x + this.radio)) ** 2 + (y - (this.y + this.radio)) ** 2);
    return distancia <= this.radio;
  }
}

// Subclase Rectángulo
class Rectangulo extends Figura {
  dibujar() {
    super.dibujar();
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
  }

  contienePunto(x, y) {
    return x >= this.x && x <= this.x + this.ancho && y >= this.y && y <= this.y + this.alto;
  }
}


// Obtener el canvas y el contexto
const canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 300;
const ctx = canvas.getContext("2d");

//las voy a guardar en un arreglo para poder redibujarlas con el drag and drop
const figuras = [];

// Crear figuras aleatorias y dibujarlas en el canvas
for (let i = 0; i < 15; i++) {
  let x = Math.random() * (canvas.width - 50);
  let y = Math.random() * (canvas.height - 50);
  let ancho = 20 + Math.random() * 30;
  let alto =  20 + Math.random() * 30;
  let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

  let figura;
  if (Math.random() < 0.5) {    
    let radio = ancho / 2;
    figura = new Circulo(x, y, radio, color);
  } else {
    figura = new Rectangulo(x, y, ancho, alto, color);
  }

  function drag(e){

    figura.x = e.offsetX - figura.difX;
    figura.y = e.offsetY + figura.difY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibujar el rectángulo en su nueva posición
    figuras.forEach(fig => {
      fig.dibujar();
    });
    
  }

  canvas.addEventListener('mousedown', function (e) {
    // Verificar si se hizo clic dentro del rectángulo
    if (figura.contienePunto(e.offsetX, e.offsetY) ) {
        // Agregar event listener para el mouse move en el canvas
        figura.difX = e.offsetX - figura.x;
        figura.difY = figura.y - e.offsetY;
        canvas.addEventListener('mousemove',drag);
    }
  });

  canvas.addEventListener('mouseup', function (e) {
    // Eliminar el event listener para el mouse move
    canvas.removeEventListener('mousemove', drag);
  });

  figuras.push(figura);
  figura.dibujar();
}








