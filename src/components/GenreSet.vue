<template>
	<div class="genre-set align-center">
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Action')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="car-crash" />
			</template>
			<span>Action</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Adventure')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="hiking" />
			</template>
			<span>Adventure</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Animation')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="paint-brush" />
			</template>
			<span>Animation</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Comedy')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="laugh-beam" />
			</template>
			<span>Comedy</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Crime')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="gavel" />
			</template>
			<span>Crime</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Documentary')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="film" />
			</template>
			<span>Documentary</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Drama')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="theater-masks" />
			</template>
			<span>Drama</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Family')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="baby" />
			</template>
			<span>Kids</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Fantasy')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="hat-wizard" />
			</template>
			<span>Fantasy</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('History')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="scroll" />
			</template>
			<span>History</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Horror')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="skull" />
			</template>
			<span>Horror</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Music')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="music" />
			</template>
			<span>Music</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Mystery')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="question-circle" />
			</template>
			<span>Mystery</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Romance')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="heart" />
			</template>
			<span>Romance</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Science Fiction')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="robot" />
			</template>
			<span>Sci-Fi</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('TV Movie')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="tv" />
			</template>
			<span>TV Movie</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Thriller')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="exclamation-triangle" />
			</template>
			<span>Thriller</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('War')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="fighter-jet" />
			</template>
			<span>War</span>
		</v-tooltip>
		<v-tooltip top open-delay="300" v-if="getGenreMatch('Western')">
			<template v-slot:activator="{ on }">
				<font-awesome-icon v-on="on" icon="hat-cowboy-side" />
			</template>
			<span>Western</span>
		</v-tooltip>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Genre from '@/models/genre';

@Component({})
export default class GenreSet extends Vue {
	@Prop() readonly genres!: Genre[];

	private getGenreMatch(genre: string) {
		if (this.genres) {
			return this.genres.some(g => g.name == genre);
		}
		return false;
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';
@import '@/style/main';

.genre-set::v-deep {
	.svg-inline--fa {
		margin-left: 5px;
		margin-right: 5px;
		font-size: 18px;
	}
}
</style>
