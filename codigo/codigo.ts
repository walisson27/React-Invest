import * as fs from 'fs';

function beta(input: number[]): number {
  return input.reduce((acc, x) => acc + x * x + 1, 0);
}

const defPath = './network-definition.json';
const procPath = './network-processing.json';

if (!fs.existsSync(defPath) || !fs.existsSync(procPath)) {
  console.error('Arquivos network-definition.json e network-processing.json não encontrados.');
  process.exit(1);
}

const definitionData: number[] = JSON.parse(fs.readFileSync(defPath, 'utf-8'));
const processingData: number[] = JSON.parse(fs.readFileSync(procPath, 'utf-8'));

const layerSizes = [300, 200, 100, 1];

interface Element {
  alpha: number;
}

const network: Element[][] = layerSizes.map(size =>
  Array.from({ length: size }, () => ({ alpha: 5 }))
);

for (let layerIndex = 0; layerIndex < network.length; layerIndex++) {
  const layer = network[layerIndex];

  for (let i = 0; i < layer.length; i++) {
    const elem = layer[i];
    const b = beta(definitionData);
    const out = elem.alpha * b;
    elem.alpha = Math.round(out) % 10;
  }
}

const sumAlphas = network
  .flat()
  .reduce((acc, e) => acc + e.alpha, 0);

let inputs = processingData.slice();
let sumOutputs = 0;

for (let layer of network) {
  const layerOutputs: number[] = [];

  for (let elem of layer) {
    const out = elem.alpha * beta(inputs);
    layerOutputs.push(out);
    sumOutputs += out;
  }

  inputs = layerOutputs;
}

console.log('Soma dos fatores alfa: ', sumAlphas);
console.log('Soma dos outputs:    ', sumOutputs);