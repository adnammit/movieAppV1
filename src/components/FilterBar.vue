<template>
	<div class="container-fluid mt-4 filter-bar">
		<div>
			<v-toolbar dense short flat>
				<!-- <v-toolbar-title>As You Wish</v-toolbar-title> -->
				<v-btn text @click="toggleFavorites()">Favorites</v-btn>
				<v-btn text @click="toggleWatched()">To Do</v-btn>
				<v-btn text>Add</v-btn>
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
						append-icon-cb="mdi-magnify"
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
// import { SearchResult } from '@/models/search';

@Component({})
export default class FilterBar extends Vue {
	private filterFavorites = false;
	private filterWatched = false;
	private search = '';

	private get isLoading() {
		return AppModule.isLoading;
	}

	private clearSearch() {
		console.log('clear!');
	}

	private doSearch(): void {
		FilterModule.Search(this.search);
	}

	private toggleFavorites(): void {
		this.filterFavorites = !this.filterFavorites;
	}

	private toggleWatched(): void {
		this.filterWatched = !this.filterWatched;
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
