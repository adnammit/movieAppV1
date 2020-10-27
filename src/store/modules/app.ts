import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import MediaProvider from '@/services/MediaProvider';
import oktaUser from '@/models/oktaUser';
import Collection from '@/models/collection';

export interface AppState {
	isErrored: boolean;
	isLoading: boolean;
	currentUser: oktaUser;
}

@Module({ dynamic: true, namespaced: true, store, name: 'AppState' })
class App extends VuexModule implements AppState {
	public isErrored = false;
	public isLoading = false;
	public currentUser = new oktaUser();
	private collection?: Collection;

	@Action
	async setIsLoading(val: boolean) {
		this.context.commit('SET_IS_LOADING', val);
	}

	@Action
	async setIsErrored(val: boolean) {
		this.context.commit('SET_IS_ERRORED', val);
	}

	@Action
	public async setCurrentUser(user: oktaUser) {
		this.context.commit('SET_IS_LOADING', true);
		this.context.commit('SET_USER', user);

		// to-do: mapping between okta user and our users -- or just replace our model with okta?
		MediaProvider.getUserCollection(1)
			.then((res: Collection) => {
				this.context.commit('SET_COLLECTION', res);
			})
			.catch((e: any) => {
				/* eslint-disable no-console */
				console.log(e);
				this.context.commit('SET_IS_ERRORED', true);
			})
			.finally(() => {
				this.context.commit('SET_IS_LOADING', false);
			});
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
