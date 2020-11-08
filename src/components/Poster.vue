<template>
	<v-dialog v-model="showDialog" max-width="600px" class="poster--container">
		<v-card fill>
			<v-card-text>
				<v-container class="pa-0">
					<v-row justify="center" align="center">
						<v-col cols="auto">
							<v-img :src="path" class="poster--max-view" contain>
								<template v-slot:placeholder>
									<v-row class="fill-height ma-0" align="center" justify="center">
										<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
									</v-row>
								</template>
							</v-img>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import App from '@/App.vue';

@Component
export default class Poster extends Vue {
	@Prop(Boolean) readonly value!: boolean;
	@Prop(String) readonly path!: string;

	private get showDialog(): boolean {
		return this.value;
	}

	private set showDialog(value: boolean) {
		this.$emit('input', value);
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';
@import '@/style/modal';
.poster--container {
	.container {
		padding: 0;
	}
	.poster--max-view {
		max-height: 80vh;
		display: flex;
		padding: 25px;
	}
}
</style>
