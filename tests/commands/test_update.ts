import * as path from "path";
import * as fs from "fs";
import { execSync } from "child_process";
import * as tmp from "tmp";

const originalPo = `msgid ""
msgstr ""
"Content-Type: text/plain; charset=utf-8\n"
"Plural-Forms: nplurals=2; plural=(n!=1);\n"


msgid "old"
msgstr "old trans"

msid "obsolete"
msgstr "obsolete trans"
`;

const srcPath = path.resolve(__dirname, "../fixtures/updateTest");

test("test update po", () => {
    const tmpFile = tmp.fileSync();
    fs.writeFileSync(tmpFile.name, originalPo);
    execSync(`ts-node src/index.ts update ${tmpFile.name} ${srcPath}`);
    const result = fs.readFileSync(tmpFile.name).toString();
    expect(result).toMatchSnapshot();
    tmpFile.removeCallback();
});
