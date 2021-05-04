
import * as fs from 'fs';
import AdmZip = require('adm-zip');
import voca from 'voca';




let formFile = "../../forms/ONEWS4-0.0.1.zip"; // hmmm
let formIds: FormField[] = [];
console.log("Loading from file: " + formFile);
if (!fs.existsSync(formFile)) {
    console.log("Sorry - the file does not exist");
} else {


    if (fs.existsSync(formFile)) {
        console.log("Fila finnes");
        var zip = new AdmZip(formFile);
        let zipEntries = zip.getEntries();
        zipEntries.forEach(n => {

            if (n.entryName.endsWith("form_description.json")) {
                console.log(n.entryName);
                const desc = n.getData().toString('utf8');
                const formDescription = <FormDescription>JSON.parse(desc);
                walk(formDescription, "");
                //console.log(formIds);
                let formFieldMap: FormFieldMap = {};
                let out: string = "export class FormDefinitions {\n";
                let varNumber = 0;
                formIds.forEach(f => {
                    let id = voca.snakeCase(f.name + "__" + f.rmType + "__" + f.atCode);
                    if (formFieldMap[id]) {
                        //console.log("Exists " + id);
                        id += varNumber;
                        varNumber++;
                    }
                    formFieldMap[id] = f;
                    out += "/**\n";
                    out += "* RmType:" + f.rmType + "\n*\n* Name: " + f.name + "\n*\n* AtCode: " + f.atCode + "\n";
                    out += "\n* FormId: " + f.formId + "\n";
                    out += "**/\n";
                    out += "static readonly _" + id + " = \"" + f.formId + "\";\n"
                })
                out += "}";
                fs.writeFileSync("formdef.ts", out);
                console.log("Wrote formdefinitions to formdef.ts");
                //fs.writeFileSync("form.fields.json", JSON.stringify(formFieldMap, null, 1));
                //console.log(formDescription);
                //fs.writeFileSync("form.desc.json", JSON.stringify(formDescription, null, 1));
            }
        })
    }
}

function walk(d: FormDescription, s: string) {
    let nodeId = d.nodeId ? d.nodeId : "NOT_SET";

    //console.log(d.rmType + "::" + atCode + "::" + s + "::" + d.name + "::" + d.formId);
    let fid: FormField = {
        rmType: d.rmType,
        atCode: nodeId,
        name: d.name,
        formId: d.formId

    }
    formIds.push(fid);

    if (d.children) {
        d.children.forEach(child => {
            walk(child, s + ".");
        })
    }
}
interface FormFieldMap {
    [id: string]: FormField;
}
interface FormField {
    rmType: string;
    atCode: string;
    name: string;
    formId: string;

}

interface MyConfig {
    form_scripts: string;
    form_name: string;
    fileserver_config: string;
}
interface FormDescription {
    name: string;
    localizedName?: string;
    rmType: string;
    nodeId: string;
    min: number;
    max: number;
    aqlPath: string;
    formId: string;
    children?: FormDescription[];

}


