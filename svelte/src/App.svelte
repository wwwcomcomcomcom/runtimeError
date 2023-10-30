
<script lang="ts">
	let questions:Question[] = [];
	import ioClient from 'socket.io-client';
    import type Question from './lib/implement';
	const ENDPOINT = "http://localhost:3000";
	const io = ioClient(ENDPOINT);

	function submit(value:string){
		io.emit('submit',value);
	}

	io.on('addQuestion',(value)=>{
		questions = [...questions, value];
		console.log(questions);
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
	<input type="text" on:keydown={(e)=>{if(e.key === "Enter"){submit(e.currentTarget.value)}}}>
	{#each questions as message}
		<div>{message}</div>
	{/each}
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
</style>