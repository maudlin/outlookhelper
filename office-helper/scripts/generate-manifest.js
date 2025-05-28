const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const hostUrl = `https://localhost:${port}`;

const templatePath = path.join(__dirname, "../manifest.template.xml");
const outputPath = path.join(__dirname, "../manifest.xml");

if (!fs.existsSync(templatePath)) {
  console.error("❌ manifest.template.xml not found. Please create it.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const output = template.replace(/{{HOST_URL}}/g, hostUrl);

fs.writeFileSync(outputPath, output);
console.log(`✅ manifest.xml generated using HOST_URL=${hostUrl}`);
