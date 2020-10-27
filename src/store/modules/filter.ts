import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
// import { SearchResult } from '@/models/search';
// import { Collection } from '@/models/interfaces';
// import Movie from '@/models/movie';
// import AccountService from '@/services/AccountService';

export interface FilterState {
	// move these to app?
	isErrored: boolean;
	isLoading: boolean;
}

@Module({ dynamic: true, namespaced: true, store, name: 'FilterState' })
class Filter extends VuexModule implements FilterState {
	public isErrored = false;
	public isLoading = false;
	public showSearch = false;
	// private movies: Movie[] = [];
	// private results: SearchResult[] = [];

	// public get MovieList(): Movie[] {
	// 	return this.movies;
	// }

	// public get SearchResults(): SearchResult[] {
	// 	return this.results;
	// }

	// public set SearchResults(results: SearchResult[]) {
	// 	this.results = results;
	// }

	@Action
	async setIsLoading(val: boolean) {
		this.context.commit('SET_IS_LOADING', val);
	}

	@Action
	async setIsErrored(val: boolean) {
		this.context.commit('SET_IS_ERRORED', val);
	}

	// @Action
	// public async LoadMovieList() {
	// 	this.context.commit('SET_IS_LOADING', true);

	// 	let collection: Collection = AccountService.getCollection();

	// 	MovieApi.getMovies(collection)
	// 		.then(movies => {
	// 			this.context.commit('SET_MOVIES', movies);
	// 		})
	// 		.catch((e: any) => {
	// 			/* eslint-disable no-console */
	// 			console.log(e);
	// 			this.context.commit('SET_IS_ERRORED', true);
	// 		})
	// 		.finally(() => {
	// 			this.context.commit('SET_IS_LOADING', false);
	// 		});
	// }

	// @Action
	// public async Search(search: string) {
	// 	this.context.commit('SET_IS_LOADING', true);

	// 	MovieApi.search(search)
	// 		.then((results: any) => {
	// 			if (results.Error != null) {
	// 				this.context.commit('SET_IS_ERRORED', true);
	// 			} else {
	// 				this.context.commit('SET_SEARCH_RESULTS', results);
	// 				this.context.commit('SET_SHOW_SEARCH', true);
	// 			}
	// 		})
	// 		.catch((e: any) => {
	// 			/* eslint-disable no-console */
	// 			console.log(e);
	// 			this.context.commit('SET_IS_ERRORED', true);
	// 		})
	// 		.finally(() => {
	// 			this.context.commit('SET_IS_LOADING', false);
	// 		});
	// }

	@Mutation
	SET_IS_LOADING(val: boolean) {
		this.isLoading = val;
	}

	@Mutation
	SET_IS_ERRORED(val: boolean) {
		this.isErrored = val;
	}

	@Mutation
	SET_SHOW_SEARCH(val: boolean) {
		this.showSearch = val;
	}

	// @Mutation
	// SET_MOVIES(val: Movie[]) {
	// 	this.movies = val;
	// }

	// @Mutation
	// SET_SEARCH_RESULTS(val: SearchResult[]) {
	// 	this.results = val;
	// }
}

export const FilterModule = getModule(Filter);
