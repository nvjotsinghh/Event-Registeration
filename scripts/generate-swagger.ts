import fs from "fs";
import path from "path";
import { swaggerSpec } from "../src/config/swagger.config";

const docsDir = path.join(__dirname, "../docs");
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

fs.writeFileSync(
  path.join(docsDir, "openapi.json"),
  JSON.stringify(swaggerSpec, null, 2)
);

console.log("OpenAPI spec generated at docs/openapi.json");