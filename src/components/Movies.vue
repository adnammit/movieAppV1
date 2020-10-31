<template>
	<div class="text-center movie-table">
		<v-data-table :headers="headers" :items="movies" :sort-by="['title']" hide-default-footer>
			<!-- Favorite -->
			<template v-slot:[`item.favorite`]="{ item }">
				<td @click="toggleFavorite(item)">
					<v-icon v-if="item.favorite" class="favorite">mdi-star-circle</v-icon>
					<v-icon v-else class="icon--deselected">mdi-star-circle-outline</v-icon>
				</td>
			</template>

			<!-- Title -->
			<template v-slot:[`item.title`]="{ item }">
				<td>{{ item.title }}</td>
			</template>

			<!-- Genre Icons -->
			<template v-slot:[`item.genres`]="{ item }">
				<td class="genre-set">
					<v-tooltip top v-if="getGenreMatch(item, 'Horror')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-skull</v-icon>
						</template>
						<span>Horror</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Science Fiction')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-death-star-variant</v-icon>
						</template>
						<span>Sci-Fi</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Action')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-karate</v-icon>
						</template>
						<span>Action</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Comedy')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-emoticon-excited</v-icon>
						</template>
						<span>Comedy</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Drama')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-guy-fawkes-mask</v-icon>
						</template>
						<span>Drama</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Romance')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-heart-multiple</v-icon>
						</template>
						<span>Romance</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Animation')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-brush</v-icon>
						</template>
						<span>Animation</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Western')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-cactus</v-icon>
						</template>
						<span>Western</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Documentary')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-video-vintage</v-icon>
						</template>
						<span>Documentary</span>
					</v-tooltip>
					<v-tooltip top v-if="getGenreMatch(item, 'Family')">
						<template v-slot:activator="{ on }">
							<v-icon v-on="on">mdi-account-child</v-icon>
						</template>
						<span>Kids</span>
					</v-tooltip>
				</td>
			</template>

			<!-- Year -->
			<template v-slot:[`item.releaseDate`]="{ item }">
				<td>{{ item.releaseDate | formatYear }}</td>
			</template>

			<!-- Rating -->
			<template v-slot:[`item.rating`]="{ item }">
				<td>{{ item.rating }}</td>
			</template>

			<!-- Watched -->
			<template v-slot:[`item.watched`]="{ item }">
				<td @click="toggleWatched(item)">
					<v-icon v-if="item.watched" class="complete">mdi-check-bold</v-icon>
					<v-icon v-else class="icon--deselected">mdi-panorama-fisheye</v-icon>
				</td>
			</template>

			<!-- Delete -->
			<template v-slot:[`item.delete`]="{ item }">
				<td @click="removeItem(item)">
					<v-icon class="remove">mdi-delete</v-icon>
				</td>
			</template>
		</v-data-table>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { FilterModule } from '@/store/modules/filter';
import Movie from '@/models/movie';

@Component({})
export default class Movies extends Vue {
	private headers = [
		{ text: 'Favorite', sortable: true, value: 'favorite' },
		{ text: 'Movie', sortable: true, value: 'title' },
		{ text: 'Genre', sortable: false, value: 'genres' },
		{ text: 'Year', sortable: true, value: 'releaseDate' },
		{ text: 'Rating', sortable: true, value: 'userRating' },
		{ text: 'Watched', sortable: true, value: 'watched' },
		{ text: 'Remove', sortable: false, value: 'delete' },
	];

	private selected: Movie[] = [];

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

	private removeItem(movie: Movie) {
		AppModule.removeFromCollection(movie);
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
	td.genre-set .v-icon {
		padding: 0 5px;
	}
}
.favorite {
	color: $turmeric;
}
.complete {
	color: $goblin;
}
.remove:hover {
	color: $cinnabar;
}
</style>
