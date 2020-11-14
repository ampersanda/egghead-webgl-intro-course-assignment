let gl,
    shaderProgram,
    vertices;

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
  vertexShaderSource += "  gl_Position = coords;";
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
  vertices = [
    -0.9, -0.9, 0.0,
     0.9, -0.9, 0.0,
     0.0,  0.9, 0.0
  ];

  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const coords = gl.getAttribLocation(shaderProgram, 'coords');
  // gl.vertexAttrib3f(coords, 0.0, 0.0, 0.0);
  gl.vertexAttribPointer(
    coords,
    3, // 3 dimensional
    gl.FLOAT,
    false, 0, 0
  );

  gl.enableVertexAttribArray(coords);
  gl.bindBuffer(
    gl.ARRAY_BUFFER,
    null // unbind
  );

  const size = gl.getAttribLocation(shaderProgram, 'size');
  gl.vertexAttrib1f(size, 10.0);

  const color = gl.getUniformLocation(shaderProgram, 'color');
  gl.uniform4f(color, 0, 1, 0, 1);
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.POINTS, 0,
  // 3 // points count
  // );
  gl.drawArrays(gl.LINE_LOOP, 0, 3);

}
