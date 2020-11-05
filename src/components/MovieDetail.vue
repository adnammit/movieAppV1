<template>
	<v-row justify="center">
		<v-dialog v-model="showDialog" scrollable max-width="30vw">
			<v-card class="movie-details">
				<v-card-title>{{ title }}</v-card-title>
				<v-card-subtitle>{{ subtitle }}</v-card-subtitle>
				<v-divider></v-divider>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col>
								<GenreSet v-bind:genres="genres" />
							</v-col>
							<v-col>
								<div @click="toggleWatched()">
									<v-icon v-if="watched" class="complete">mdi-check-bold</v-icon>
									<v-icon v-else class="icon--deselected">mdi-panorama-fisheye</v-icon>
								</div>
							</v-col>
							<v-col>
								<div @click="toggleFavorite()">
									<v-icon v-if="favorite" class="favorite">mdi-star-circle</v-icon>
									<v-icon v-else class="icon--deselected">mdi-star-circle-outline</v-icon>
								</div>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								{{ description }}
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click.stop="removeItem" class="remove">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
					<v-btn @click.stop="closeDialog">Cancel</v-btn>
					<v-btn @click.stop="save" class="save">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { formatYear } from '@/filters/formatYear';
import GenreSet from '@/components/GenreSet.vue';
import Movie from '@/models/movie';
import Genre from '@/models/genre';

@Component({
	components: {
		GenreSet,
	},
})
export default class MovieDetail extends Vue {
	@Prop(Boolean) readonly value: boolean = false;
	@Prop(Function) readonly onSave!: () => void;

	private favorite = false;
	private watched = false;

	private get title(): string {
		return AppModule.selectedMovie.title;
	}

	private get subtitle(): string {
		// add:
		//	runtime
		//	original_language
		return `${formatYear(AppModule.selectedMovie.releaseDate)} • IMDB Rating: ${AppModule.selectedMovie.popularRating}`;
	}

	private get genres(): Genre[] {
		return AppModule.selectedMovie.genres;
	}

	private get description(): string {
		return AppModule.selectedMovie.summary;
	}

	private get showDialog(): boolean {
		return this.value;
	}

	private set showDialog(value: boolean) {
		this.$emit('input', value);
	}

	private toggleFavorite(): void {
		this.favorite = !this.favorite;
	}

	private toggleWatched(): void {
		this.watched = !this.watched;
	}

	private reset() {
		this.favorite = AppModule.selectedMovie.favorite;
		this.watched = AppModule.selectedMovie.watched;
	}

	private closeDialog() {
		this.showDialog = false;
	}

	private async save() {
		const movie = Object.assign(AppModule.selectedMovie);
		movie.favorite = this.favorite;
		movie.watched = this.watched;
		// movie.rating = this.rating;
		await AppModule.updateUserMovie(movie);
		await AppModule.getUserCollection();
		this.closeDialog();
	}

	private removeItem(movie: Movie) {
		AppModule.removeFromCollection(AppModule.selectedMovie);
		this.closeDialog();
	}

	@Watch('value')
	onValueChanged() {
		if (this.value) {
			this.reset();
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';
@import '@/style/main';

.movie-details::v-deep {
	.v-card__subtitle {
		letter-spacing: 1px;
	}

	.v-card__text {
		height: 60vh;
		.row {
			padding: 10px 30px;
		}
	}
}
</style>
