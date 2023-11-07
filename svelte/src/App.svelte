<script lang="ts">
    import ioClient from "socket.io-client";
    import type QuestionObject from "./lib/utils.ts";
    import LikeButton from "./lib/LikeButton.svelte";
    import { randomString } from "./lib/utils.ts";
    let questions: QuestionObject[] = [];
    const ENDPOINT = "http://localhost:3000";
    const io = ioClient(ENDPOINT);

    /** random uuid for new browser
     * @default "Unknown"
     * */
    export let uuid = "Unknown";
    if (localStorage.getItem("browser-uuid") === null) {
        const newID = randomString(5);
        localStorage.setItem("browser-uuid", newID);
        uuid = newID;
    } else {
        uuid = localStorage.getItem("browser-uuid")!;
    }
	//Send uuid for auto login or cheking
	io.emit("handshake", uuid);

    function submit() {
        const titleElement = document.getElementById(
            "inputTitle"
        ) as HTMLInputElement;
        const contentElement = document.getElementById(
            "inputQuestion"
        ) as HTMLInputElement;
        const title = titleElement.value;
        const content = contentElement.value;
        if (title.length === 0 || content.length === 0) {
            return;
        }
        io.emit("addQuestion", { title: title, content: content });
        titleElement.value = "";
        contentElement.value = "";
    }

    function removeAll() {
        io.emit("removeAllQuestion");
    }

    io.on("addQuestion", (value: QuestionObject) => {
        questions = [...questions, value];
    });
    io.on("removeQuestion", (id: string) => {
        document.getElementById(id).remove();
    });
    io.on("removeAllQuestion", () => {
        const questions = document.getElementsByClassName("question");
        //새 배열은 element.remove를 하면서 questions의 Record가 즉각적으로 바뀌어 for문이 제대로 돌지 못하는것을 막기 위함.
        let elementArr: Element[] = [];
        for (let i = 0; i < questions.length; i++) {
            const element = questions.item(i);
            elementArr.push(element);
        }
        elementArr.forEach((element) => {
            element.remove();
        });
    });
</script>

<main>
    <div class="nav">
        <h1 class="title">Runtime Error</h1>
        <div class="searchBar">
            <div class="searcher">
                <input type="text" name="search" id="searchInput" />
            </div>
        </div>
    </div>
    <div class="inputBox">
        <input id="inputTitle" type="text" />
        <input id="inputQuestion" type="text" />
        <button on:click={submit}>질문하기</button>
        <button on:click={removeAll}>Remove All</button>
    </div>
    {#each questions as question}
        <div class="question" id={question.id}>
            <h1 class="Qtitle">{question.title}</h1>
            <p class="Qcontent">{question.content}</p>
            <LikeButton />
            <input type="text" placeholder="답변" />
        </div>
    {/each}
    <div class="footer" />
</main>

<style lang="css">
    * {
        margin: 0;
    }
    :global(body) {
        padding: 0;
    }
    .nav {
        border-bottom: 2px solid black;
        display: flex;
        height: 10%;
    }
    .title {
        padding: 10px;
        flex-grow: 1;
    }
    .searchBar {
        flex-grow: 5;
    }
    .searcher {
        display: inline-block;
        padding: 1.5%;
        width: 60%;
        height: 100%;
    }
    #searchInput {
        vertical-align: bottom;
        width: 100%;
    }
    .question {
        text-align: center;
    }
</style>
