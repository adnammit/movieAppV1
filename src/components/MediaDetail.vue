<template>
	<v-row justify="center">
		<v-dialog v-model="showDialog" scrollable max-width="40vw">
			<v-card class="item-details">
				<v-card-title>{{ title }}</v-card-title>
				<v-card-subtitle>{{ subtitle }}</v-card-subtitle>
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
								<div @click="toggleQueued()">
									<v-icon v-if="queued" class="queued">mdi-fire</v-icon>
									<v-icon v-else class="icon--deselected">mdi-fire</v-icon>
								</div>
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
							<v-col cols="6" v-if="showPoster">
								<v-img :src="posterPath" class="poster" contain @click="showPosterDetail">
									<template v-slot:placeholder>
										<v-row class="fill-height ma-0" align="center" justify="center">
											<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
										</v-row>
									</template>
								</v-img>
							</v-col>
							<v-col cols="6" class="align-self-center">
								<v-row>
									<v-col align-self="center"> {{ year }} • {{ popularRating }} </v-col>
								</v-row>
								<v-row>
									<v-col align-self="center"> <GenreSet v-bind:genres="genres" /> </v-col>
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
		<Poster v-model="poster" :path="posterPath" />
	</v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { formatYear } from '@/filters/formatYear';
import Rating from '@/components/Rating.vue';
import GenreSet from '@/components/GenreSet.vue';
import SimpleAlert from '@/components/SimpleAlert.vue';
import Poster from '@/components/Poster.vue';
import Genre from '@/models/genre';
import Movie from '@/models/movie';
import Tv from '@/models/tv';
import config from '@/config.json';
import App from '@/App.vue';

@Component({
	components: {
		Rating,
		GenreSet,
		SimpleAlert,
		Poster,
	},
})
export default class MediaDetail extends Vue {
	@Prop(Boolean) readonly value: boolean = false;
	@Prop(Function) readonly onSave!: () => void;

	private queued = false;
	private favorite = false;
	private watched = false;
	private rating = 0;
	private alert = false;
	private alertTitle = 'Confirm Removal';
	private poster = false;

	private get alertMessage(): string {
		return 'Are you sure you want "' + AppModule.selectedItem.title + '" out of your life forever?';
	}

	private get title(): string {
		return AppModule.selectedItem.title;
	}

	private get subtitle(): string {
		return AppModule.selectedItem instanceof Movie ? 'Movie' : AppModule.selectedItem instanceof Tv ? 'Television Show' : '';
	}

	private get year(): string {
		return formatYear(AppModule.selectedItem.released);
	}

	private get popularRating(): string {
		return 'IMDB Rating ' + String(AppModule.selectedItem.popularRating);
	}

	private get genres(): Genre[] {
		return AppModule.selectedItem.genres;
	}

	private get description(): string {
		return AppModule.selectedItem.summary;
	}

	private get showPoster(): boolean {
		return AppModule.selectedItem.poster != null && AppModule.selectedItem.poster != '';
	}

	private get posterPath(): string {
		return `${config.movieDbBasePosterPath}${AppModule.selectedItem.poster}`;
	}

	private get showDialog(): boolean {
		return this.value;
	}

	private set showDialog(value: boolean) {
		this.$emit('input', value);
	}

	private toggleQueued(): void {
		this.queued = !this.queued;
	}

	private toggleFavorite(): void {
		this.favorite = !this.favorite;
	}

	private toggleWatched(): void {
		this.watched = !this.watched;
	}

	private showPosterDetail(): void {
		this.poster = true;
	}

	private reset() {
		this.queued = AppModule.selectedItem.queued;
		this.favorite = AppModule.selectedItem.favorite;
		this.watched = AppModule.selectedItem.watched;
		this.rating = AppModule.selectedItem.rating;
	}

	private closeDialog() {
		this.showDialog = false;
	}

	private async save() {
		const item = Object.assign(AppModule.selectedItem);
		item.queued = this.queued;
		item.favorite = this.favorite;
		item.watched = this.watched;
		item.rating = this.rating;
		await AppModule.updateUserItem(item);
		await AppModule.getUserCollection();
		this.closeDialog();
	}

	private confirmRemove() {
		this.alert = true;
	}

	private remove() {
		AppModule.removeFromCollection(AppModule.selectedItem);
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

.item-details::v-deep {
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
