function convert() {
    const fromUnit = document.getElementById("from").value;
    const toUnit = document.getElementById("to").value;
    let input = document.getElementById("input").value;
    let output = document.getElementById("output");
  
    if (input === "") {
      input = 0;
    }
  
    if (fromUnit === "celsius" && toUnit === "fahrenheit") {
      output.value = input * 1.8 + 32;
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
      output.value = parseInt(input) + 273.15;
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
      output.value = ((input - 32) * 5) / 9;
    } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
      output.value = ((input - 32) * 5) / 9 + 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
      output.value = input - 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
      output.value = (input - 273.15) * 1.8 + 32;
    } else {
      output.value = input;
    }
  }
  
  document.getElementById("from").value = "celsius";
  document.getElementById("to").value = "fahrenheit";
  document.getElementById("input").value = 0;
  convert();
  
  document.getElementById("input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      convert();
    }
  });
  
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && document.activeElement === document.body) {
      convert();
    }
  });
  