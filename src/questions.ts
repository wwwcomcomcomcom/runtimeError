import fs from 'fs';
import path from 'path';
import QuestionObject from './utils';
const dbPath = path.join(__dirname, '..', 'db', 'questions.json');
export let data:QuestionObject[] = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

function save(){
    fs.writeFileSync(dbPath,JSON.stringify(data));
}
// setInterval(save,10000);

export function addQuestion(question:QuestionObject){
    data.push(question);
    save();
}

export function removeQuestion(id:string){

}

export function removeAllQuestions(){
    data = [];
    save();
}

export function getQuestionById(id:string):QuestionObject | undefined {
    for(let i=0; i<data.length; i++){
        if(data[i].id === id){
            return data[i];
        }
    }
    return;
}

export function getAllQuestions(){
    return data
}

function onChangeDB(){
    // asdf
}