import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { AppModule } from '@/store/modules/app';
// import { SearchResult } from '@/models/search';

export interface FilterState {
	filterByFavorite: boolean;
	filterByTodo: boolean;
	showSearch: boolean;
}

enum FilterMutation {
	SET_FILTER_FAVORITES = 'SET_FILTER_FAVORITES',
	SET_FILTER_TODO = 'SET_FILTER_TODO',
	SET_SHOW_SEARCH = 'SET_SHOW_SEARCH',
}

@Module({ dynamic: true, namespaced: true, store, name: 'FilterState' })
class Filter extends VuexModule implements FilterState {
	public filterByFavorite = false;
	public filterByTodo = false;
	public showSearch = false;
	// private results: SearchResult[] = [];

	// public get SearchResults(): SearchResult[] {
	// 	return this.results;
	// }

	// public set SearchResults(results: SearchResult[]) {
	// 	this.results = results;
	// }

	@Action
	async toggleFavorites() {
		const val = !this.filterByFavorite;
		this.context.commit(FilterMutation.SET_FILTER_FAVORITES, val);
		if (val && this.filterByTodo) this.context.commit(FilterMutation.SET_FILTER_TODO, false);
	}

	@Action
	async toggleTodo() {
		const val = !this.filterByTodo;
		this.context.commit(FilterMutation.SET_FILTER_TODO, val);
		if (val && this.filterByFavorite) this.context.commit(FilterMutation.SET_FILTER_FAVORITES, false);
	}

	@Action
	async resetFilter() {
		this.context.commit(FilterMutation.SET_FILTER_FAVORITES, false);
		this.context.commit(FilterMutation.SET_FILTER_TODO, false);
	}

	@Action
	public async Search(search: string) {
		// AppModule.setIsLoading(true);
		// MovieApi.search(search)
		// 	.then((results: any) => {
		// 		if (results.Error != null) {
		// 			this.context.commit('SET_IS_ERRORED', true);
		// 		} else {
		// 			this.context.commit('SET_SEARCH_RESULTS', results);
		// 			this.context.commit('SET_SHOW_SEARCH', true);
		// 		}
		// 	})
		// 	.catch((e: any) => {
		// 		/* eslint-disable no-console */
		// 		console.log(e);
		// 		this.context.commit('SET_IS_ERRORED', true);
		// 	})
		// 	.finally(() => {
		// 		this.context.commit('SET_IS_LOADING', false);
		// 	});
	}

	@Mutation
	SET_FILTER_FAVORITES(val: boolean) {
		this.filterByFavorite = val;
	}

	@Mutation
	SET_FILTER_TODO(val: boolean) {
		this.filterByTodo = val;
	}

	@Mutation
	SET_SHOW_SEARCH(val: boolean) {
		this.showSearch = val;
	}

	// @Mutation
	// SET_SEARCH_RESULTS(val: SearchResult[]) {
	// 	this.results = val;
	// }
}

export const FilterModule = getModule(Filter);
