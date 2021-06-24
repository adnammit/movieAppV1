import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import MediaProvider from '@/services/MediaProvider';
import oktaUser from '@/models/oktaUser';
import Collection from '@/models/collection';
import Media from '@/models/media';
import Movie from '@/models/movie';
import Tv from '@/models/tv';
import SearchResult from '@/models/searchResult';
import { FilterModule } from '@/store/modules/filter';

export interface AppState {
	isNoData: boolean;
	isLoading: boolean;
	isErrored: boolean;
	currentUser: oktaUser;
	collection: Collection;
}

enum AppMutation {
	SET_NO_DATA = 'SET_NO_DATA',
	SET_IS_LOADING = 'SET_IS_LOADING',
	SET_IS_ERRORED = 'SET_IS_ERRORED',
	SET_USER = 'SET_USER',
	SET_COLLECTION = 'SET_COLLECTION',
	SET_SELECTED_ITEM = 'SET_SELECTED_ITEM',
}

@Module({ dynamic: true, namespaced: true, store, name: 'AppState' })
class App extends VuexModule implements AppState {
	public isNoData = false;
	public isLoading = false;
	public isErrored = false;
	public currentUser = new oktaUser();
	public collection = new Collection();
	public selectedItem: Media = new Movie();

	public get userItems() {
		const items = this.collection ? this.collection?.items : [];
		return items
			.filter(m => (FilterModule.filterByFavorite ? m.favorite : FilterModule.filterByTodo ? !m.watched : FilterModule.filterByUpNext ? m.queued : true))
			.filter(i => (FilterModule.filterToMovies ? i instanceof Movie : FilterModule.filterToTv ? i instanceof Tv : true));
	}

	public get noData() {
		return this.isNoData;
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
	public setSelectedItem(val: Media) {
		this.context.commit(AppMutation.SET_SELECTED_ITEM, val);
	}

	@Action
	public async getUserCollection() {
		// let user = this.user
		this.context.commit(AppMutation.SET_NO_DATA, false);
		this.context.commit(AppMutation.SET_IS_LOADING, true);
		MediaProvider.getUserCollection(1)
			.then((res: Collection) => {
				this.context.commit(AppMutation.SET_COLLECTION, res);
				if (res.items.length == 0) {
					this.context.commit(AppMutation.SET_NO_DATA, true);
				}
			})
			.catch((e: any) => {
				/* eslint-disable no-console */
				console.error(e);
				this.context.commit(AppMutation.SET_IS_ERRORED, true);
			})
			.finally(() => {
				this.context.commit(AppMutation.SET_IS_LOADING, false);
			});
	}

	@Action
	public async updateUserItem(item: Media) {
		// let user = this.user
		MediaProvider.updateUserItem(1, item)
			.then((res: boolean) => {
				if (!res) {
					throw Error('Error updating item');
				}
			})
			.catch((e: any) => {
				/* eslint-disable no-console */
				console.log(e);
				this.context.commit(AppMutation.SET_IS_ERRORED, true);
			});
	}

	@Action
	public async addSearch(item: SearchResult) {
		// let user = this.user
		MediaProvider.addSearch(1, item)
			.then((res: boolean) => {
				if (res) {
					this.getUserCollection();
				} else {
					throw Error('Error saving searched item to user collection ');
				}
			})
			.catch((e: any) => {
				/* eslint-disable no-console */
				console.log(e);
				this.context.commit(AppMutation.SET_IS_ERRORED, true);
			});
	}

	@Action
	public async removeFromCollection(item: Media) {
		// let user = this.user
		MediaProvider.removeFromCollection(1, item)
			.then((res: boolean) => {
				if (res) {
					this.getUserCollection();
				} else {
					throw Error('Error removing item from user collection');
				}
			})
			.catch((e: any) => {
				/* eslint-disable no-console */
				console.log(e);
				this.context.commit(AppMutation.SET_IS_ERRORED, true);
			});
	}

	@Mutation
	SET_NO_DATA(val: boolean) {
		this.isNoData = val;
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

	@Mutation
	SET_SELECTED_ITEM(val: Media) {
		this.selectedItem = val;
	}
}

export const AppModule = getModule(App);
