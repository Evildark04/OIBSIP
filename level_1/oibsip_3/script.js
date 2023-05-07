function convert() {
  const fromUnit = document.getElementById("from").value;
  const toUnit = document.getElementById("to").value;
  let input = document.getElementById("input").value;
  let output = document.getElementById("output");
  let fromUnitText = document.getElementById("from-unit");
  let toUnitText = document.getElementById("to-unit");

  if (input === "") {
    input = 0;
  }

  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    output.value = input * 1.8 + 32;
    fromUnitText.textContent = "°C";
    toUnitText.textContent = "°F";
  } else if (fromUnit === "celsius" && toUnit === "kelvin") {
    output.value = parseInt(input) + 273.15;
    fromUnitText.textContent = "°C";
    toUnitText.textContent = "°K";
  } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    output.value = ((input - 32) * 5) / 9;
    fromUnitText.textContent = "°F";
    toUnitText.textContent = "°C";
  } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
    output.value = ((input - 32) * 5) / 9 + 273.15;
    fromUnitText.textContent = "°F";
    toUnitText.textContent = "°K";
  } else if (fromUnit === "kelvin" && toUnit === "celsius") {
    output.value = input - 273.15;
    fromUnitText.textContent = "°K";
    toUnitText.textContent = "°C";
  } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
    output.value = (input - 273.15) * 1.8 + 32;
    fromUnitText.textContent = "°K";
    toUnitText.textContent = "°F";
  } else if (fromUnit === "kelvin" && toUnit === "kelvin") {
    output.value = input;
    fromUnitText.textContent = "°K";
    toUnitText.textContent = "°K";
  } else if (fromUnit === "celsius" && toUnit === "celsius") {
    output.value = input;
    fromUnitText.textContent = "°C";
    toUnitText.textContent = "°C";
  } else if (fromUnit === "fahrenheit" && toUnit === "fahrenheit") {
    output.value = input;
    fromUnitText.textContent = "°F";
    toUnitText.textContent = "°F";
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
