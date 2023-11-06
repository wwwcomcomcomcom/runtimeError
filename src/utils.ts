export default interface QuestionObject {
    id: string;
    title: string;
    content: string;
    writer: string;
}

export function randomString(length: number): string{
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

export function listenChangesinArray(arr:any[], callback: Function) {
    // Add more methods here if you want to listen to them
    ["pop", "push", "reverse", "shift", "unshift", "splice", "sort"].forEach(
        (m) => {
            arr[m as unknown as number] = function () {
                let res = Array.prototype[m as unknown as number].apply(arr, arguments);
                callback.apply(arr,[arr,[...arguments]]); 
                return res;
            };
        }
    );
}
