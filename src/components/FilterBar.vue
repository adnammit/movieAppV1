<template>
	<div class="container-fluid mt-4 filter-bar">
		<div>
			<v-toolbar dense short flat>
				<!-- <v-toolbar-title class="mr-5">As you wish</v-toolbar-title> -->
				<!-- <v-spacer></v-spacer> -->
				<v-btn @click="resetFilter()" rounded :text="!isUnfiltered">All</v-btn>
				<v-btn @click="toggleFavorites()" rounded :text="!isFilteredByFavorite">Favorites</v-btn>
				<v-btn @click="toggleTodo()" rounded :text="!isFilteredByTodo">To Do</v-btn>
				<v-btn @click="surprise()" rounded text><v-icon>mdi-pizza</v-icon></v-btn>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-text-field
						class="filter-bar__search"
						outlined
						dense
						clearable
						label="Search"
						v-model="search"
						@keyup.native.enter="doSearch()"
						prepend-inner-icon="mdi-magnify"
					></v-text-field>
				</v-toolbar-items>
			</v-toolbar>
		</div>
		<div class="text-center loader">
			<div v-if="isLoading">
				<v-progress-linear indeterminate color="cyan"></v-progress-linear>
			</div>
			<div v-else class="loader--placeholder">
				<span></span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { FilterModule } from '@/store/modules/filter';

@Component({})
export default class FilterBar extends Vue {
	private search = '';

	private get isLoading() {
		return AppModule.isLoading;
	}

	private get isFilteredByFavorite(): boolean {
		return FilterModule.filterByFavorite;
	}

	private get isFilteredByTodo(): boolean {
		return FilterModule.filterByTodo;
	}

	private get isUnfiltered(): boolean {
		return !FilterModule.filterByTodo && !FilterModule.filterByFavorite;
	}

	private doSearch(): void {
		FilterModule.Search(this.search);
	}

	private toggleFavorites(): void {
		FilterModule.toggleFavorites();
	}

	private toggleTodo(): void {
		FilterModule.toggleTodo();
	}

	private resetFilter(): void {
		FilterModule.resetFilter();
	}

	private surprise(): void {
		window.alert('Surpise!');
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.filter-bar .v-toolbar {
	color: $alto;
	background-color: $tundora !important;
	.filter-bar__search {
		padding-top: 4px;
	}
	.loader--placeholder {
		height: 20px;
		width: 1px;
	}
}
</style>
