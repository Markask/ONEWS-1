"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var AdmZip = require("adm-zip");
var voca_1 = __importDefault(require("voca"));
var formFile = "../../forms/ONEWS4-0.0.1.zip"; // hmmm
var formIds = [];
console.log("Loading from file: " + formFile);
if (!fs.existsSync(formFile)) {
    console.log("Sorry - the file does not exist");
}
else {
    if (fs.existsSync(formFile)) {
        console.log("Fila finnes");
        var zip = new AdmZip(formFile);
        var zipEntries = zip.getEntries();
        zipEntries.forEach(function (n) {
            if (n.entryName.endsWith("form_description.json")) {
                console.log(n.entryName);
                var desc = n.getData().toString('utf8');
                var formDescription = JSON.parse(desc);
                walk(formDescription, "");
                //console.log(formIds);
                var formFieldMap_1 = {};
                var out_1 = "export class FormDefinitions {\n";
                var varNumber_1 = 0;
                formIds.forEach(function (f) {
                    var id = voca_1["default"].snakeCase(f.name + "__" + f.rmType + "__" + f.atCode);
                    if (formFieldMap_1[id]) {
                        //console.log("Exists " + id);
                        id += varNumber_1;
                        varNumber_1++;
                    }
                    formFieldMap_1[id] = f;
                    out_1 += "/**\n";
                    out_1 += "* RmType:" + f.rmType + "\n*\n* Name: " + f.name + "\n*\n* AtCode: " + f.atCode + "\n";
                    out_1 += "\n* FormId: " + f.formId + "\n";
                    out_1 += "**/\n";
                    out_1 += "static readonly _" + id + " = \"" + f.formId + "\";\n";
                });
                out_1 += "}";
                fs.writeFileSync("formdef.ts", out_1);
                console.log("Wrote formdefinitions to formdef.ts");
                //fs.writeFileSync("form.fields.json", JSON.stringify(formFieldMap, null, 1));
                //console.log(formDescription);
                //fs.writeFileSync("form.desc.json", JSON.stringify(formDescription, null, 1));
            }
        });
    }
}
function walk(d, s) {
    var nodeId = d.nodeId ? d.nodeId : "NOT_SET";
    //console.log(d.rmType + "::" + atCode + "::" + s + "::" + d.name + "::" + d.formId);
    var fid = {
        rmType: d.rmType,
        atCode: nodeId,
        name: d.name,
        formId: d.formId
    };
    formIds.push(fid);
    if (d.children) {
        d.children.forEach(function (child) {
            walk(child, s + ".");
        });
    }
}
