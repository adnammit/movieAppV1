<template>
	<v-row justify="center">
		<v-dialog v-model="showDialog" scrollable max-width="50vw">
			<v-card>
				<v-card-title>{{ title }}</v-card-title>
				<v-divider></v-divider>
				<v-card-text class="search-table" style="height: 60vh;">
					hello
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click.stop="removeItem">
						<v-icon class="remove">mdi-delete</v-icon>
					</v-btn>
					<v-btn @click.stop="closeDialog">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { FilterModule } from '@/store/modules/filter';
import Movie from '@/models/movie';

@Component({})
export default class MovieDetail extends Vue {
	@Prop(Boolean) readonly value: boolean = false;

	private get title(): string {
		return AppModule.selectedMovie.title;
	}

	private get showDialog(): boolean {
		return this.value;
	}

	private set showDialog(value: boolean) {
		this.$emit('input', value);
	}

	private closeDialog() {
		this.showDialog = false;
	}

	private removeItem(movie: Movie) {
		AppModule.removeFromCollection(AppModule.selectedMovie);
		this.closeDialog();
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';

.remove:hover {
	color: $cinnabar;
}
</style>
