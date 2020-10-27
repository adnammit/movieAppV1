<template>
	<v-app>
		<NavBar />
		<v-content class="content">
			<router-view />
		</v-content>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import { AppModule } from '@/store/modules/app';

@Component({
	components: {
		NavBar,
	},
})
export default class App extends Vue {
	private async refreshActiveUser() {
		AppModule.setCurrentUser(await this.$auth.getUser());
	}

	async mounted() {
		await this.refreshActiveUser();
	}

	@Watch('$route')
	onRouteChanged() {
		this.refreshActiveUser(); // i don't love this - do it better
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
