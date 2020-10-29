import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import MediaProvider from '@/services/MediaProvider';
import oktaUser from '@/models/oktaUser';
import Collection from '@/models/collection';
import Movie from '@/models/movie';
import { FilterModule } from '@/store/modules/filter';

export interface AppState {
	isErrored: boolean;
	isLoading: boolean;
	currentUser: oktaUser;
	collection: Collection;
}

enum AppMutation {
	SET_IS_LOADING = 'SET_IS_LOADING',
	SET_IS_ERRORED = 'SET_IS_ERRORED',
	SET_USER = 'SET_USER',
	SET_COLLECTION = 'SET_COLLECTION',
}

@Module({ dynamic: true, namespaced: true, store, name: 'AppState' })
class App extends VuexModule implements AppState {
	public isErrored = false;
	public isLoading = false;
	public currentUser = new oktaUser();
	public collection = new Collection();

	public get userMovies() {
		const movies = this.collection ? this.collection?.movies : [];
		return movies.filter(m => (FilterModule.filterByFavorite ? m.favorite : FilterModule.filterByTodo ? !m.watched : true));
	}

	@Action
	async setIsLoading(val: boolean) {
		this.context.commit(AppMutation.SET_IS_LOADING, val);
	}

	@Action
	async setIsErrored(val: boolean) {
		this.context.commit(AppMutation.SET_IS_ERRORED, val);
	}

	@Action
	public async setCurrentUser(user: oktaUser) {
		if (this.currentUser != user) {
			this.context.commit(AppMutation.SET_USER, user);
		}
	}

	@Action
	public async getUserCollection() {
		// let user = this.user
		this.context.commit(AppMutation.SET_IS_LOADING, true);
		MediaProvider.getUserCollection(1)
			.then((res: Collection) => {
				this.context.commit(AppMutation.SET_COLLECTION, res);
			})
			.catch((e: any) => {
				/* eslint-disable no-console */
				console.log(e);
				this.context.commit(AppMutation.SET_IS_ERRORED, true);
			})
			.finally(() => {
				this.context.commit(AppMutation.SET_IS_LOADING, false);
			});
	}

	@Action
	public async updateUserMovie(movie: Movie) {
		// let user = this.user
		// this.context.commit(AppMutation.SET_IS_LOADING, true);
		let success = true;
		MediaProvider.updateUserMovie(1, movie)
			.then((res: boolean) => {
				success = res;
			})
			.catch((e: any) => {
				/* eslint-disable no-console */
				console.log(e);
				this.context.commit(AppMutation.SET_IS_ERRORED, true);
			});
		// .finally(() => {
		// 	this.context.commit(AppMutation.SET_IS_LOADING, false);
		// });
	}

	@Mutation
	SET_IS_LOADING(val: boolean) {
		this.isLoading = val;
	}

	@Mutation
	SET_IS_ERRORED(val: boolean) {
		this.isErrored = val;
	}

	@Mutation
	SET_USER(val: oktaUser) {
		this.currentUser = val;
	}

	@Mutation
	SET_COLLECTION(val: Collection) {
		this.collection = val;
	}
}

export const AppModule = getModule(App);
