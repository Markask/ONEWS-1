(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict"; // generic index.ts fil

exports.__esModule = true;

// Kommentert ut av byggescript = require("ehrcraft-form-api");

var respiration = "onews_saar/onews_dips/any_event/respiration_frequency";
var puls = "onews_saar/onews_dips/any_event/heart_rate";
var spo2 = "onews_saar/onews_dips/any_event/oxigen_saturation";
var systolic = "onews_saar/onews_dips/any_event/systolic_bp";
var diastolic = "onews_saar/onews_dips/any_event/diastolic_bp";
var temperature = "onews_saar/onews_dips/any_event/temperature";
var alert = "onews_saar/onews_dips/any_event/alertness";
var yellow = "onews_saar/onews_dips/any_event/yellow_score";
var red = "onews_saar/onews_dips/any_event/red_score";
var comment = "onews_saar/onews_dips/any_event/comments";
var time = "onews_saar/onews_dips/any_event/time";
var fields = [respiration, puls, spo2, systolic, diastolic, temperature, alert];

function main(api) {
  console.log(banner); // Create a function getYellowValue or something that has access to the relevant fields
  // This function calculates the yellow value and sets it
  // Bind this function as an onchange event listener to all the relevant fields

  function setRedAndYellow(api) {
    console.log("the setRedAndYellow function was triggered");
    var yellowValue = new DvCount();
    yellowValue.Magnitude = 0; //console.log("before yellow", yellowValue.Magnitude)

    var redValue = new DvCount();
    redValue.Magnitude = 0; //console.log("before red", redValue.Magnitude)
    //checking respiration field:

    if (api.getFieldValue(respiration)) {
      var valueOfResp = api.getFieldValue(respiration).Magnitude;

      if (valueOfResp >= 20 && valueOfResp <= 24) {
        yellowValue.Magnitude++;
      }

      if (valueOfResp <= 10 || valueOfResp >= 25) {
        redValue.Magnitude++;
      }
    } //checking heart rate field:


    if (api.getFieldValue(puls)) {
      var valueOfHR = api.getFieldValue(puls).Magnitude;
      var firstHeartYellow = valueOfHR >= 51 && valueOfHR <= 60;
      var secondHeartYellow = valueOfHR >= 100 && valueOfHR <= 119;

      if (firstHeartYellow || secondHeartYellow) {
        yellowValue.Magnitude++;
      }

      if (valueOfHR <= 50 || valueOfHR >= 120) {
        redValue.Magnitude++;
      }
    } //checking spo2 field:


    if (api.getFieldValue(spo2)) {
      var valueOfSPO2 = api.getFieldValue(spo2).Magnitude;

      if (valueOfSPO2 <= 95) {
        redValue.Magnitude++;
      }
    } //checking systolic field:


    if (api.getFieldValue(systolic)) {
      var valueOfSystolic = api.getFieldValue(systolic).Magnitude;
      var firstSystolicYellow = valueOfSystolic >= 90 && valueOfSystolic <= 99;
      var secondSystolicYellow = valueOfSystolic >= 140 && valueOfSystolic <= 159;

      if (firstSystolicYellow || secondSystolicYellow) {
        yellowValue.Magnitude++;
      }

      if (valueOfSystolic <= 90 || valueOfSystolic >= 160) {
        redValue.Magnitude++;
      }
    } //checking diastolic field:


    if (api.getFieldValue(diastolic)) {
      var valueOfDiastolic = api.getFieldValue(diastolic).Magnitude;
      var firstDiastolicYellow = valueOfDiastolic >= 40 && valueOfDiastolic <= 49;
      var secondDiastolicYellow = valueOfDiastolic >= 90 && valueOfDiastolic <= 99;

      if (firstDiastolicYellow || secondDiastolicYellow) {
        yellowValue.Magnitude++;
      }

      if (valueOfDiastolic <= 40 || valueOfDiastolic >= 100) {
        redValue.Magnitude++;
      }
    } //checking temperature field:


    if (api.getFieldValue(temperature)) {
      var valueOfTemp = api.getFieldValue(temperature).Magnitude;
      var inFirstYellowRange = valueOfTemp >= 35.1 && valueOfTemp <= 35.9;
      var inSecondYellowRange = valueOfTemp >= 37.5 && valueOfTemp <= 37.9;

      if (inFirstYellowRange || inSecondYellowRange) {
        yellowValue.Magnitude++;
      }

      if (valueOfTemp <= 35 || valueOfTemp >= 38) {
        redValue.Magnitude++;
      }
    } //checking alertness field:


    console.log("am i getting before the if?");

    if (api.getFieldValue(alert)) {
      console.log("am i getting here?");
      var valueOfAlert = api.getFieldValue(alert).value;

      if (valueOfAlert == "A") {
        console.log("den er lik A");
      } else {
        redValue.Magnitude++;
      }
    }

    console.log(redValue);
    api.setFieldValue(yellow, yellowValue);
    api.setFieldValue(red, redValue);
  }

  fields.forEach(function (field) {
    api.addListener(field, "OnChanged", function () {
      setRedAndYellow(api);
      console.log("the foreach is running");
    });
  });
}

exports.main = main;
var banner = "\n_______                              _       _   \n|__   __|                            (_)     | |  \n   | |_   _ _ __   ___  ___  ___ _ __ _ _ __ | |_ \n   | | | | | '_  / _ / __|/ __| '__| | '_ | __|\n   | | |_| | |_) |  __/__  (__| |  | | |_) | |_ \n   |_|__, | .__/ ___||___/___|_|  |_| .__/ __|\n       __/ | |                         | |        \n      |___/|_|                         |_|   \n";main(api);
},{}]},{},[1])