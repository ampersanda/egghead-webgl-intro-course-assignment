let gl,
    shaderProgram;

initGL();
createShaders();
draw();

function initGL() {
  const canvas = document.getElementById('canvas');
  gl = canvas.getContext('webgl');
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}

function createShaders() {
  let vertexShaderSource = "";
  vertexShaderSource += "void main(void) {";
  vertexShaderSource += "  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);";
  vertexShaderSource += "  gl_PointSize = 100.0;";
  vertexShaderSource += "}";

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  let fragmentShaderSource = "";
  fragmentShaderSource += "void main(void) {";
  fragmentShaderSource += "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);";
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

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}
