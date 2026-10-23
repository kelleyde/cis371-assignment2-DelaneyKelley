import "./style.scss";
// import { setupCounter } from "./counter.ts";

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const bases: Record<string, string> = {
  blackTea: "#8B4513",
  greenTea: "#C8E6C9",
  coffee: "#6F4E37",
};

const creamers: Record<string, string> = {
  milk: "AliceBlue",
  cream: "#F5F5DC",
  half: "#FFFACD",
};

const syrups: Record<string, string> = {
  vanilla: "#FFEFD5",
  caramel: "#DAA520",
  hazelnut: "#6B4423",
};

function applyTemperature(input: HTMLInputElement): void {
  const container = document.getElementById(
    "condensation",
  ) as HTMLDivElement | null;
  if (!container) return;

  const children = container.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;

    if (input.value === "hot") {
      child.className = "stream";
    } else {
      child.className = "flake";
    }
  }
}

function applyBase(input: HTMLInputElement): void {
  const baseElements = document.getElementsByClassName("base");

  if (baseElements.length === 0) return;

  const baseDiv = baseElements[0] as HTMLDivElement;

  const color = bases[input.value];
  if (!color) return;

  baseDiv.style.backgroundColor = color;
}

function applyCream(input: HTMLInputElement): void {
  const creamElements = document.getElementsByClassName("foam");

  if (creamElements.length === 0) return;

  const color = creamers[input.value];
  if (!color) return;
  for (let i = 0; i < creamElements.length; i++) {
    const element = creamElements[i] as HTMLDivElement;
    element.style.backgroundColor = color;
  }
}

function applySyrup(input: HTMLInputElement): void {
  // TODO: implement this function
  // get syrup div element
  const syrupElements = document.getElementsByClassName("syrup");

  if (syrupElements.length === 0) return;

  const baseDiv = syrupElements[0] as HTMLDivElement; 
  // get color input
  const color = syrups[input.value];
  if (!color) return;
  
  baseDiv.style.setProperty("--syrup-color", color);
  console.log("Applied "+ color);
}

// source: https://www.youtube.com/watch?v=-9upCFOeX5A
function setupSyrupListeners(): void {
  // TODO: implement this function
  // source: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
  const syrup_elements = document.querySelectorAll("input[name=syrup]");

  for(const syrup_ele of syrup_elements){
    const syrup_input_ele = (syrup_ele as HTMLInputElement);
    syrup_input_ele.addEventListener("change", (event) => {applySyrup(syrup_input_ele)});
    console.log("Added event listener");
  }
}

setupSyrupListeners();

function setupCreamListeners(): void {
  // TODO: implement this function
    const cream_elements = document.querySelectorAll("input[name=cream]");

  for(const cream_ele of cream_elements){
    const cream_input_ele = (cream_ele as HTMLInputElement);
    cream_input_ele.addEventListener("change", (event) => {applyCream(cream_input_ele)});
    console.log("Added event listener");
  }
}
setupCreamListeners();

function setupTemperatureListeners(): void {
  // TODO: implement this function
  const temp_elements = document.querySelectorAll("input[name=temperature]");

  for(const temp_ele of temp_elements){
    const temp_input_ele = (temp_ele as HTMLInputElement);
    temp_input_ele.addEventListener("change", (event) => {applyTemperature(temp_input_ele)});
    console.log("Added event listener");
  }
}

setupTemperatureListeners();

function setupBaseListeners(): void {
  // TODO: implement this function
  const base_elements = document.querySelectorAll("input[name=base]");

  for(const base_ele of base_elements){
    const base_input_ele = (base_ele as HTMLInputElement);
    base_input_ele.addEventListener("change", (event) => {applyBase(base_input_ele)});
    console.log("Added event listener");
  }
}

setupBaseListeners();

// Applying automatic settings on page load
function onPageLoad(coffee_str: string){
  const selector = "input[name=" + coffee_str + "]";
  console.log("selector: "+ selector);
  const coffee_elements = document.querySelectorAll(selector);
  // sources: https://stackoverflow.com/questions/3559070/are-there-dictionaries-in-javascript-like-python
  // https://stackoverflow.com/questions/4908378/javascript-array-of-functions
  // https://www.geeksforgeeks.org/typescript/how-to-extend-the-possible-types-of-values-of-dictionary-in-typescript/
  type dict = {[key: string]: any};
  const apply_func: dict = {syrup: applySyrup, base: applyBase, cream: applyCream, temperature: applyTemperature};

  // source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
  for(const coffee_ele of coffee_elements){
    const coffee_input_ele = coffee_ele as HTMLInputElement;
    if(coffee_input_ele.checked){
      // source: https://stackoverflow.com/questions/11393200/how-to-find-value-using-key-in-javascript-dictionary
      apply_func[coffee_str](coffee_input_ele);
      break;
    }
  }
}

onPageLoad("base");
onPageLoad("syrup");
onPageLoad("cream");
onPageLoad("temperature");