let gl,
    shaderProgram;

initGL();
createShaders();
createVertices();
draw();

function initGL() {
  const canvas = document.getElementById('canvas');
  gl = canvas.getContext('webgl');
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}

function createShaders() {
  let vertexShaderSource = "";
  vertexShaderSource += "attribute vec4 coords;";
  vertexShaderSource += "attribute float size;";
  vertexShaderSource += '';
  vertexShaderSource += "void main(void) {";
  vertexShaderSource += "  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);";
  vertexShaderSource += "  gl_PointSize = size;";
  vertexShaderSource += "}";

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  let fragmentShaderSource = "";
  fragmentShaderSource += "precision mediump float;";
  fragmentShaderSource += "uniform vec4 color;";
  fragmentShaderSource += "";
  fragmentShaderSource += "void main(void) {";
  fragmentShaderSource += "  gl_FragColor = color;";
  fragmentShaderSource += "}";

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVertices() {
  const coords = gl.getAttribLocation(shaderProgram, 'coords');
  gl.vertexAttrib3f(coords, 0.0, 0.0, 0.0);

  const size = gl.getAttribLocation(shaderProgram, 'size');
  gl.vertexAttrib1f(size, 100.0);

  const color = gl.getUniformLocation(shaderProgram, 'color');
  gl.uniform4f(color, 0, 1, 0, 1);
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}
