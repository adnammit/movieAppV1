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

@Component({
	components: {
		NavBar,
	},
})
export default class App extends Vue {
	private activeUser: string | null = null;

	@Watch('$route')
	onRouteChanged() {
		this.refreshActiveUser();
	}

	private async refreshActiveUser() {
		this.activeUser = await this.$auth.getUser();
	}

	async mounted() {
		await this.refreshActiveUser();
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
