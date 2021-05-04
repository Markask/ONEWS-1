(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict"; // generic index.ts fil

exports.__esModule = true;
exports.main = void 0;

function main(api) {
  console.log(banner);
  console.log("Takk Borisa");
}

exports.main = main;
var banner = "\n_______                              _       _   \n|__   __|                            (_)     | |  \n   | |_   _ _ __   ___  ___  ___ _ __ _ _ __ | |_ \n   | | | | | '_  / _ / __|/ __| '__| | '_ | __|\n   | | |_| | |_) |  __/__  (__| |  | | |_) | |_ \n   |_|__, | .__/ ___||___/___|_|  |_| .__/ __|\n       __/ | |                         | |        \n      |___/|_|                         |_|   \n";main(api);
},{}]},{},[1])