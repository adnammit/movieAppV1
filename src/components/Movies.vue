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
				<v-btn @click="openDetail(item)" rounded text>{{ item.title }}</v-btn>
			</template>

			<!-- Year -->
			<template v-slot:[`item.releaseDate`]="{ item }">
				{{ item.releaseDate | formatYear }}
			</template>

			<!-- Genre Icons -->
			<template v-slot:[`item.genres`]="{ item }">
				<div class="genre-set align-center">
					<v-tooltip top v-if="getGenreMatch(item, 'Action')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="car-crash" />
						</template>
						<span>Action</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Adventure')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="hiking" />
						</template>
						<span>Adventure</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Animation')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="paint-brush" />
						</template>
						<span>Animation</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Comedy')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="laugh-beam" />
						</template>
						<span>Comedy</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Crime')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="gavel" />
						</template>
						<span>Crime</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Documentary')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="film" />
						</template>
						<span>Documentary</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Drama')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="theater-masks" />
						</template>
						<span>Drama</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Family')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="baby" />
						</template>
						<span>Kids</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Fantasy')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="hat-wizard" />
						</template>
						<span>Fantasy</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'History')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="scroll" />
						</template>
						<span>History</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Horror')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="skull" />
						</template>
						<span>Horror</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Music')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="music" />
						</template>
						<span>Music</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Mystery')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="search" />
						</template>
						<span>Mystery</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Romance')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="heart" />
						</template>
						<span>Romance</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Science Fiction')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="robot" />
						</template>
						<span>Sci-Fi</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'TV Movie')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="tv" />
						</template>
						<span>TV Movie</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Thriller')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="exclamation-triangle" />
						</template>
						<span>Thriller</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'War')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="fighter-jet" />
						</template>
						<span>War</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Western')">
						<template v-slot:activator="{ on }">
							<font-awesome-icon v-on="on" icon="hat-cowboy-side" />
						</template>
						<span>Western</span>
					</v-tooltip>
				</div>
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
import Movie from '@/models/movie';

@Component({
	components: {
		MovieDetail,
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

	private toggleFavorite(movie: Movie): void {
		movie.favorite = !movie.favorite;
		AppModule.updateUserMovie(movie);
	}

	private toggleWatched(movie: Movie): void {
		movie.watched = !movie.watched;
		AppModule.updateUserMovie(movie);
	}

	private getGenreMatch(movie: Movie, genre: string) {
		if (movie.genres) {
			return movie.genres.some(g => g.name == genre);
		}
		return false;
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
	.genre-set .svg-inline--fa {
		margin-left: 5px;
		margin-right: 5px;
		font-size: 18px;
	}
}
.favorite {
	color: $turmeric;
}
.complete {
	color: $goblin;
}
</style>
