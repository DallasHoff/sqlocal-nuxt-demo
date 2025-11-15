<script setup lang="ts">
import { useReactiveQuery } from 'sqlocal/vue';
import { db } from '~/sqlocal/client';

type Item = { id: number; title: string | null; checked: number };
const { data: items, status } = useReactiveQuery<Item>(
	db,
	(sql) => sql`SELECT * FROM items`,
);

async function add() {
	await db.sql`INSERT INTO items ('title') VALUES ('')`;
}

async function remove(item: Item) {
	await db.sql`DELETE FROM items WHERE id=${item.id}`;
}

async function toggle(item: Item) {
	await db.sql`UPDATE items SET checked=${item.checked ? 0 : 1} WHERE id=${item.id}`;
}

async function edit(item: Item, event: InputEvent) {
	const title =
		event.target instanceof HTMLInputElement ? event.target.value : '';
	await db.sql`UPDATE items SET title=${title} WHERE id=${item.id}`;
}
</script>

<template>
	<main class="min-w-60 px-8 py-12">
		<h1 class="text-4xl text-center">To Do</h1>
		<div v-if="status === 'ok'">
			<ul class="list max-w-100 mx-auto bg-base-200 rounded-box shadow-md my-6">
				<li v-for="item of items" :key="item.id" class="list-row items-center">
					<div>
						<input
							type="checkbox"
							class="checkbox checkbox-lg checkbox-primary"
							:checked="!!item.checked"
							@change="toggle(item)"
						/>
					</div>
					<div>
						<input
							type="text"
							class="input input-ghost"
							:value="item.title"
							@input="edit(item, $event)"
						/>
					</div>
					<div>
						<button
							type="button"
							class="btn btn-sm btn-square btn-soft btn-primary over:btn-error text-lg"
							@click="remove(item)"
						>
							&times;
						</button>
					</div>
				</li>
			</ul>
			<div class="flex justify-center">
				<button type="button" class="btn btn-wide btn-primary" @click="add()">
					<span class="text-lg mb-0.5">&plus;</span>
					New
				</button>
			</div>
		</div>
	</main>
</template>
