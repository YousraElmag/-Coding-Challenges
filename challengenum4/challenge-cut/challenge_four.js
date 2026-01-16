// challenge_cut.js
import fs from "fs";

const args = process.argv.slice(2);

let delimiter = "\t";
const dIndex = args.indexOf("-d");
if (dIndex !== -1 && args[dIndex + 1]) {
  delimiter = args[dIndex + 1];
}

const fIndex = args.indexOf("-f");
if (fIndex === -1 || !args[fIndex + 1]) {
  console.error("cut: missing -f option");
  process.exit(1);
}

const fields = args[fIndex + 1]
  .split(/[,\s]+/)
  .map(n => parseInt(n, 10) - 1)
  .filter(n => n >= 0);

const file = args.find(arg => !arg.startsWith("-") && arg !== args[fIndex + 1]);

function processInput(text) {
  text
    .trimEnd()
    .split("\n")
    .forEach(line => {
      const cols = line.split(delimiter);
      const selected = fields
        .map(i => cols[i])
        .filter(v => v !== undefined);
      console.log(selected.join(delimiter));
    });
}

if (!file || file === "-") {
  let input = "";
  process.stdin.on("data", chunk => (input += chunk));
  process.stdin.on("end", () => processInput(input));
} else {
  const text = fs.readFileSync(file, "utf8");
  processInput(text);
}
