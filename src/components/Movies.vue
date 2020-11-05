<template>
	<div class="text-center movie-table">
		<v-data-table :headers="headers" :items="movies" :sort-by="['title']" hide-default-footer>
			<!-- Watched -->
			<template v-slot:[`item.watched`]="{ item }">
				<td @click="toggleWatched(item)">
					<v-icon v-if="item.watched" class="complete">mdi-check-bold</v-icon>
					<v-icon v-else class="icon--deselected">mdi-panorama-fisheye</v-icon>
				</td>
			</template>

			<!-- Title -->
			<template v-slot:[`item.title`]="{ item }">
				<v-tooltip left open-delay="500">
					<template v-slot:activator="{ on }">
						<v-btn @click="openDetail(item)" v-on="on" rounded text>{{ item.title }}</v-btn>
					</template>
					<v-img :src="getPosterPath(item)" style="max-height: 140px; max-width: 100px" contain>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
							</v-row>
						</template>
					</v-img>
				</v-tooltip>
			</template>

			<!-- Year -->
			<template v-slot:[`item.releaseDate`]="{ item }">
				{{ item.releaseDate | formatYear }}
			</template>

			<!-- Genre Icons -->
			<template v-slot:[`item.genres`]="{ item }">
				<GenreSet v-bind:genres="item.genres" />
			</template>

			<!-- Rating -->
			<template v-slot:[`item.rating`]="{ item }">
				<!-- maybe remove td -->
				<td>{{ item.rating }}</td>
			</template>

			<!-- Favorite -->
			<template v-slot:[`item.favorite`]="{ item }">
				<td @click="toggleFavorite(item)">
					<v-icon v-if="item.favorite" class="favorite">mdi-star-circle</v-icon>
					<v-icon v-else class="icon--deselected">mdi-star-circle-outline</v-icon>
				</td>
			</template>
		</v-data-table>
		<MovieDetail v-model="showDetail" />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { FilterModule } from '@/store/modules/filter';
import MovieDetail from '@/components/MovieDetail.vue';
import GenreSet from '@/components/GenreSet.vue';
import Movie from '@/models/movie';
import config from '@/config.json';

@Component({
	components: {
		MovieDetail,
		GenreSet,
	},
})
export default class Movies extends Vue {
	private showDetail = false;

	private headers = [
		{ text: 'Watched', sortable: true, value: 'watched' },
		{ text: 'Movie', sortable: true, value: 'title' },
		{ text: 'Year', sortable: true, value: 'releaseDate' },
		{ text: 'Genre', sortable: false, value: 'genres', align: 'center' },
		{ text: 'Rating', sortable: true, value: 'userRating' },
		{ text: 'Favorite', sortable: true, value: 'favorite' },
	];

	private get movies(): Movie[] {
		return AppModule.userMovies;
	}

	private getPosterPath(movie: Movie): string {
		return `${config.movieDbBasePosterPath}${movie.poster}`;
	}

	private toggleFavorite(movie: Movie): void {
		movie.favorite = !movie.favorite;
		AppModule.updateUserMovie(movie);
	}

	private toggleWatched(movie: Movie): void {
		movie.watched = !movie.watched;
		AppModule.updateUserMovie(movie);
	}

	private openDetail(movie: Movie) {
		AppModule.setSelectedMovie(movie);
		this.showDetail = true;
	}

	async mounted() {
		await AppModule.getUserCollection();
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';
@import '@/style/main';

.movie-table::v-deep {
	padding: 0;
	align-items: center;
	justify-content: center;
	text-align: center;
	.loading {
		padding-top: 23px;
	}
	thead tr th {
		background-color: $tundora-shaft;
		text-transform: uppercase;
		letter-spacing: 2px;
		font-weight: 600;
	}
	td {
		letter-spacing: 1px;
		color: $alto;
	}
}
</style>
