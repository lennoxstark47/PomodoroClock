// this setup can be found on the Get Started section of the tailwindcss website
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};
