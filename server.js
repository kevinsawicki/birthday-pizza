var path = require('path');
var fork = require('child_process').fork;

var servePath = path.join(__dirname, 'node_modules', 'serve', 'bin', 'serve');
var serve = fork(servePath, [], {stdio: 'inherit'});
serve.on('exit', function(code, signal) {
  console.log('serve terminated', code, signal);
  process.exit(code);
});

var compilePath = path.join(__dirname, 'node_modules', 'typescript', 'bin', 'tsc');
var compile = fork(compilePath, ['-w', 'index.ts'], {stdio: 'inherit'});
compile.on('exit', function(code, signal) {
  console.log('compile terminated', code, signal);
  process.exit(code);
});
