
<script lang="ts">
	import ioClient from 'socket.io-client';
    import type QuestionObject from './lib/implement';
    import LikeButton from './lib/LikeButton.svelte';
	let questions:QuestionObject[] = [];
	const ENDPOINT = "http://localhost:3000";
	const io = ioClient(ENDPOINT);

	function submit(){
		const titleElement = document.getElementById("inputTitle") as HTMLInputElement;
		const contentElement = document.getElementById("inputQuestion") as HTMLInputElement;
		const title = titleElement.value;
		const content = contentElement.value;
		io.emit('submit',{title:title,content:content});
		titleElement.value ="";
		contentElement.value = "";
	}

	function removeAll(){
		io.emit('removeAll');
	}

	io.on('addQuestion',(value:QuestionObject)=>{
		questions = [...questions, value];
	});

	io.on('removeQuestion',(id:string)=>{
		document.getElementById(id).remove();
	});

	io.on('removeAllQuestion',()=>{
		const questions = document.getElementsByClassName('question');
		for (let i = 0; i < questions.length; i++) {
			const element = questions.item(i);
			element.remove();
		}
	});

</script>

<main>
	<div class="nav">
		<h1 class="title">Runtime Error</h1>
		<div class="searchBar">
			<div class="searcher">
				<input type="text" name="search" id="searchInput">
			</div>
		</div>
	</div>
	<div class="inputBox">
		<input id="inputTitle" type="text">
		<input id="inputQuestion" type="text">
		<button on:click={submit}>질문하기</button>
		<button on:click={removeAll}>Remove All</button>
	</div>
	{#each questions as question}
		<div class="question" id={question.id}>
			<h1 class="Qtitle">{question.title}</h1>
			<p class="Qcontent">{question.content}</p>
			<LikeButton></LikeButton>
			<input type="text" placeholder="답변">
		</div>
	{/each}
	<div class="footer"></div>
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