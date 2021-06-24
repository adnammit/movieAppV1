import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { AppModule } from '@/store/modules/app';
import MovieDbApi from '@/services/MovieDbApi';
import SearchResult from '@/models/searchResult';

export interface FilterState {
	filterByFavorite: boolean;
	filterByTodo: boolean;
	filterByUpNext: boolean;
	filterToMovies: boolean;
	filterToTv: boolean;
	showSearch: boolean;
	results: SearchResult[];
}

enum FilterMutation {
	SET_FILTER_FAVORITES = 'SET_FILTER_FAVORITES',
	SET_FILTER_TODO = 'SET_FILTER_TODO',
	SET_FILTER_UPNEXT = 'SET_FILTER_UPNEXT',
	SET_SHOW_MOVIES = 'SET_SHOW_MOVIES',
	SET_SHOW_TV = 'SET_SHOW_TV',
	SET_SHOW_SEARCH = 'SET_SHOW_SEARCH',
	SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
}

@Module({ dynamic: true, namespaced: true, store, name: 'FilterState' })
class Filter extends VuexModule implements FilterState {
	public filterByFavorite = false;
	public filterByTodo = false;
	public filterByUpNext = false;
	public filterToMovies = false;
	public filterToTv = false;
	public showSearch = false;
	public results: SearchResult[] = [];

	@Action
	async toggleFavorites() {
		const val = !this.filterByFavorite;
		this.context.commit(FilterMutation.SET_FILTER_FAVORITES, val);
		if (val && this.filterByTodo) this.context.commit(FilterMutation.SET_FILTER_TODO, false);
		if (val && this.filterByUpNext) this.context.commit(FilterMutation.SET_FILTER_UPNEXT, false);
	}

	@Action
	async toggleTodo() {
		const val = !this.filterByTodo;
		this.context.commit(FilterMutation.SET_FILTER_TODO, val);
		if (val && this.filterByFavorite) this.context.commit(FilterMutation.SET_FILTER_FAVORITES, false);
		if (val && this.filterByUpNext) this.context.commit(FilterMutation.SET_FILTER_UPNEXT, false);
	}

	@Action
	async toggleUpNext() {
		const val = !this.filterByUpNext;
		this.context.commit(FilterMutation.SET_FILTER_UPNEXT, val);
		if (val && this.filterByFavorite) this.context.commit(FilterMutation.SET_FILTER_FAVORITES, false);
		if (val && this.filterByTodo) this.context.commit(FilterMutation.SET_FILTER_TODO, false);
	}

	@Action
	async toggleMovies() {
		const val = !this.filterToMovies;
		this.context.commit(FilterMutation.SET_SHOW_MOVIES, val);
		if (val && this.filterToTv) this.context.commit(FilterMutation.SET_SHOW_TV, false);
	}

	@Action
	async toggleTv() {
		const val = !this.filterToTv;
		this.context.commit(FilterMutation.SET_SHOW_TV, val);
		if (val && this.filterToMovies) this.context.commit(FilterMutation.SET_SHOW_MOVIES, false);
	}

	@Action
	async resetFilter() {
		this.context.commit(FilterMutation.SET_FILTER_FAVORITES, false);
		this.context.commit(FilterMutation.SET_FILTER_TODO, false);
		this.context.commit(FilterMutation.SET_FILTER_UPNEXT, false);
		this.context.commit(FilterMutation.SET_SHOW_TV, false);
		this.context.commit(FilterMutation.SET_SHOW_MOVIES, false);
	}

	@Action
	async setShowSearch(val: boolean) {
		this.context.commit(FilterMutation.SET_SHOW_SEARCH, val);
	}

	@Action
	public async Search(search: string) {
		AppModule.setIsLoading(true);
		MovieDbApi.search(search)
			.then((results: any) => {
				if (results.Error != null) {
					/* eslint-disable no-console */
					throw Error('Error contacting movie api ' + JSON.stringify(results.Error));
				} else {
					this.context.commit(FilterMutation.SET_SEARCH_RESULTS, results);
					this.context.commit(FilterMutation.SET_SHOW_SEARCH, true);
				}
			})
			.catch((e: any) => {
				/* eslint-disable no-console */
				console.log(e);
				AppModule.setIsErrored(true);
			})
			.finally(() => {
				AppModule.setIsLoading(false);
			});
	}

	@Action
	async clearSearch() {
		this.context.commit(FilterMutation.SET_SEARCH_RESULTS, []);
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
	SET_FILTER_UPNEXT(val: boolean) {
		this.filterByUpNext = val;
	}

	@Mutation
	SET_SHOW_MOVIES(val: boolean) {
		this.filterToMovies = val;
	}

	@Mutation
	SET_SHOW_TV(val: boolean) {
		this.filterToTv = val;
	}

	@Mutation
	SET_SHOW_SEARCH(val: boolean) {
		this.showSearch = val;
	}

	@Mutation
	SET_SEARCH_RESULTS(val: SearchResult[]) {
		this.results = val;
	}
}

export const FilterModule = getModule(Filter);
