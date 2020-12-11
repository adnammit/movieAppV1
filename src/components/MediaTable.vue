<template>
	<div class="text-center movie-table">
		<v-data-table :headers="headers" :items="items" item-key="movieDbId" :sort-by="['title']" hide-default-footer>
			<!-- Type -->
			<template v-slot:[`item.controls`]="{ item }">
				<td>
					<v-icon v-if="isMovie(item)">mdi-filmstrip</v-icon>
					<v-icon v-if="isTv(item)">mdi-television</v-icon>
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
			<template v-slot:[`item.released`]="{ item }">
				{{ item.released | formatYear }}
			</template>

			<!-- Genres -->
			<template v-slot:[`item.genres`]="{ item }">
				<GenreSet v-bind:genres="item.genres" />
			</template>

			<!-- Rating -->
			<template v-slot:[`item.rating`]="{ item }">
				<Rating v-model="item.rating" @input="updateRating(item)" />
			</template>

			<!-- Favorite -->
			<template v-slot:[`item.favorite`]="{ item }">
				<td @click="toggleFavorite(item)">
					<v-icon v-if="item.favorite" class="favorite">mdi-star-circle</v-icon>
					<v-icon v-else class="icon--deselected">mdi-star-circle-outline</v-icon>
				</td>
			</template>

			<!-- Watched -->
			<template v-slot:[`item.watched`]="{ item }">
				<td @click="toggleWatched(item)">
					<v-icon v-if="item.watched" class="complete">mdi-check-bold</v-icon>
					<v-icon v-else class="icon--deselected">mdi-panorama-fisheye</v-icon>
				</td>
			</template>

			<!-- Queued -->
			<template v-slot:[`item.queued`]="{ item }">
				<td @click="toggleQueued(item)">
					<v-icon v-if="item.queued" class="queued">mdi-fire</v-icon>
					<v-icon v-else class="icon--deselected">mdi-fire</v-icon>
				</td>
			</template>
		</v-data-table>
		<MediaDetail v-model="showDetail" />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { FilterModule } from '@/store/modules/filter';
import Rating from '@/components/Rating.vue';
import GenreSet from '@/components/GenreSet.vue';
import MediaDetail from '@/components/MediaDetail.vue';
import Media from '@/models/media';
import Movie from '@/models/movie';
import Tv from '@/models/tv';
import config from '@/config.json';

@Component({
	components: {
		Rating,
		GenreSet,
		MediaDetail,
	},
})
export default class MediaTable extends Vue {
	private showDetail = false;

	private headers = [
		{ text: 'Type', sortable: true, value: 'controls' },
		{ text: 'Title', sortable: true, value: 'title' },
		{ text: 'Year', sortable: true, value: 'released' },
		{ text: 'Genre', sortable: false, value: 'genres', align: 'center' },
		{ text: 'Rating', sortable: true, value: 'rating' },
		{ text: 'Favorite', sortable: true, value: 'favorite' },
		{ text: 'Watched', sortable: true, value: 'watched' },
		{ text: 'Up Next', sortable: true, value: 'queued' },
	];

	private get items(): Media[] {
		return AppModule.userItems;
	}

	private isMovie(item: Media): boolean {
		return item instanceof Movie;
	}

	private isTv(item: Media): boolean {
		return item instanceof Tv;
	}

	private getPosterPath(item: Media): string {
		return `${config.movieDbBasePosterPath}${item.poster}`;
	}

	private toggleQueued(item: Media): void {
		item.queued = !item.queued;
		AppModule.updateUserItem(item);
	}

	private toggleFavorite(item: Media): void {
		item.favorite = !item.favorite;
		AppModule.updateUserItem(item);
	}

	private toggleWatched(item: Media): void {
		item.watched = !item.watched;
		AppModule.updateUserItem(item);
	}

	private updateRating(item: Media): void {
		AppModule.updateUserItem(item);
	}

	private openDetail(item: Media) {
		AppModule.setSelectedItem(item);
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
