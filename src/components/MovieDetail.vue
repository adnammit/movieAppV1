<template>
	<v-row justify="center">
		<v-dialog v-model="showDialog" scrollable max-width="40vw">
			<v-card class="movie-details">
				<v-card-title>{{ title }}</v-card-title>
				<v-divider></v-divider>
				<v-card-text>
					<v-container>
						<v-row justify="center" align="center">
							<v-spacer></v-spacer>
							<v-col cols="auto">
								<div @click="toggleWatched()">
									<v-icon v-if="watched" class="complete">mdi-check-bold</v-icon>
									<v-icon v-else class="icon--deselected">mdi-panorama-fisheye</v-icon>
								</div>
							</v-col>
							<v-spacer></v-spacer>
							<v-col cols="auto">
								<Rating v-model="rating" />
							</v-col>
							<v-spacer></v-spacer>
							<v-col cols="auto">
								<div @click="toggleFavorite()">
									<v-icon v-if="favorite" class="favorite">mdi-star-circle</v-icon>
									<v-icon v-else class="icon--deselected">mdi-star-circle-outline</v-icon>
								</div>
							</v-col>
							<v-spacer></v-spacer>
						</v-row>
						<v-row class="details--body">
							<v-col cols="6">
								<a :href="posterPath" target="_blank">
									<v-img :src="posterPath" class="poster" contain>
										<template v-slot:placeholder>
											<v-row class="fill-height ma-0" align="center" justify="center">
												<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
											</v-row>
										</template>
									</v-img>
								</a>
							</v-col>
							<v-col cols="6" class="align-self-center">
								<v-row>
									<v-col align-self="center"> {{ year }} • {{ popularRating }} • <GenreSet v-bind:genres="genres" /> </v-col>
								</v-row>
								<v-row>
									<v-col align-self="center">
										{{ description }}
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click.stop="confirmRemove" class="remove">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
					<v-btn @click.stop="closeDialog">Cancel</v-btn>
					<v-btn @click.stop="save" class="save">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<SimpleAlert v-model="alert" :titleText="alertTitle" :messageText="alertMessage" :onConfirm="remove" />
	</v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { formatYear } from '@/filters/formatYear';
import Rating from '@/components/Rating.vue';
import GenreSet from '@/components/GenreSet.vue';
import SimpleAlert from '@/components/SimpleAlert.vue';
import Movie from '@/models/movie';
import Genre from '@/models/genre';
import config from '@/config.json';
import App from '@/App.vue';

@Component({
	components: {
		Rating,
		GenreSet,
		SimpleAlert,
	},
})
export default class MovieDetail extends Vue {
	@Prop(Boolean) readonly value: boolean = false;
	@Prop(Function) readonly onSave!: () => void;

	private favorite = false;
	private watched = false;
	private rating = 0;
	private alert = false;
	private alertTitle = 'Confirm Removal';

	private get alertMessage(): string {
		return 'Are you sure you want "' + AppModule.selectedMovie.title + '" out of your life forever?';
	}

	private get title(): string {
		return AppModule.selectedMovie.title;
	}

	private get year(): string {
		return formatYear(AppModule.selectedMovie.releaseDate);
	}

	private get popularRating(): string {
		return String(AppModule.selectedMovie.popularRating);
	}

	private get genres(): Genre[] {
		return AppModule.selectedMovie.genres;
	}

	private get description(): string {
		return AppModule.selectedMovie.summary;
	}

	private get posterPath(): string {
		return `${config.movieDbBasePosterPath}${AppModule.selectedMovie.poster}`;
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
		this.rating = AppModule.selectedMovie.rating;
	}

	private closeDialog() {
		this.showDialog = false;
	}

	private async save() {
		const movie = Object.assign(AppModule.selectedMovie);
		movie.favorite = this.favorite;
		movie.watched = this.watched;
		movie.rating = this.rating;
		await AppModule.updateUserMovie(movie);
		await AppModule.getUserCollection();
		this.closeDialog();
	}

	private confirmRemove() {
		this.alert = true;
	}

	private remove() {
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
		padding: 10px 30px;

		.row.details--body {
			padding: 10px 30px;
		}
	}
	.poster {
		max-height: 40vh;
		display: flex;
	}
}
</style>
