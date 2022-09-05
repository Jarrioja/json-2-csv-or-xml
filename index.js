const { readFile, writeFile } = require("fs").promises;
const { json2csvAsync } = require("json-2-csv");
const json2xml = require("json2xml");

const inputFile = "users.json";
const outputCSVFile = "./users.csv";
const outputXMLFile = "./users.xml";
var formatXML = require("xml-formatter");

async function parseJSONFile(fileName) {
  try {
    const file = await readFile(fileName);
    return JSON.parse(file);
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  const data = await parseJSONFile(inputFile);
  const csv = await json2csvAsync(data);
  const xml = "<root>" + (await json2xml(data)) + "</root>";
  const formattedXML = formatXML(xml);
  await writeFile(outputCSVFile, csv, "utf-8");
  await writeFile(outputXMLFile, formattedXML, "utf-8");
}

main();
