require("babel-register")();

global.__CLIENT__ = false;
global.__SERVER__ = true;

if( require("piping")({hook: true}) )
  process.exit(1);

require("./server");
