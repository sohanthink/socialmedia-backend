const { response } = require("express");

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

exports.validateLength = (text, min, max) => {
  if (text.length <= max && text.length >= min) {
    return true;
  } else {
    return false;
  }
};
