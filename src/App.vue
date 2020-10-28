<template>
	<v-app>
		<NavBar />
		<Error v-if="isErrored" />
		<v-content v-else class="content">
			<router-view />
		</v-content>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import Error from '@/components/Error.vue';
import { AppModule } from '@/store/modules/app';

@Component({
	components: {
		NavBar,
		Error,
	},
})
export default class App extends Vue {
	private get isErrored() {
		return AppModule.isErrored;
	}

	private async refreshActiveUser() {
		AppModule.setCurrentUser(await this.$auth.getUser());
	}

	async mounted() {
		await this.refreshActiveUser();
	}

	@Watch('$route')
	onRouteChanged() {
		this.refreshActiveUser();
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.content {
	padding: 0;
	padding-top: 35px !important;
}
</style>
