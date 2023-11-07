import path from "path";
import fs from 'fs';

const dbPath = path.join(__dirname, '..', 'db', 'users.json');

export let data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

function save(){
    fs.writeFileSync(dbPath, JSON.stringify(data));
}

