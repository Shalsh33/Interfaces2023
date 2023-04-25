const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 300;
let radio = (canvas.height -50) / 2;

//Me posiciono en el centro del canvas
ctx.translate((canvas.width - 2*radio),(canvas.height - radio-25));

function dibujarReloj() {

    ctx.beginPath();
    ctx.arc(0, 0, radio, 0, 2*Math.PI);
    ctx.fillStyle = '#eee';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.stroke();
  
    for (let i = 1; i <= 12; i++) {
      let angulo = i * Math.PI / 6;
      ctx.rotate(angulo);
      ctx.beginPath();
      ctx.moveTo(0, -radio);
      ctx.lineTo(0, -radio + 20);
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#999';
      ctx.stroke();

      // los números rotan conforme se van dibujando las lineas
      ctx.font = "12px Arial";
      ctx.fillStyle = "#111";
      ctx.fillText(i, -6,-radio + 35);

      ctx.rotate(-angulo);
    }
    
    const horaActual = new Date();
    let hora = horaActual.getHours();
    let minutos = horaActual.getMinutes();
    let segundos = horaActual.getSeconds();
  
    hora = hora % 12;
    hora = (hora * Math.PI / 6) +
          (minutos * Math.PI / (6 * 60)) +
          (segundos * Math.PI / (360 * 60));
    ctx.rotate(hora);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radio / 2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#111";
    ctx.stroke();
    ctx.rotate(-hora);
  
    minutos = (minutos * Math.PI / 30) + (segundos * Math.PI / (30 * 60));
    ctx.rotate(minutos);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radio + 35);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.rotate(-minutos);
  
    segundos = segundos * Math.PI / 30;
    ctx.rotate(segundos);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radio + 20);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#777";
    ctx.stroke();
    ctx.rotate(-segundos);
  }

  setInterval(dibujarReloj,1000);