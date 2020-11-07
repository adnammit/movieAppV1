<template>
	<v-rating v-model="rating">
		<template v-slot:item="props">
			<v-icon :color="props.isFilled ? 'pink' : 'blue lighten-3'" @click="updateRating(props)">{{ props.isFilled ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
		</template>
	</v-rating>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class Rating extends Vue {
	@Prop(Number) readonly value!: number;

	private get rating(): number {
		return this.value;
	}

	private set rating(value: number) {
		this.$emit('input', value);
	}

	private updateRating(props: any) {
		const rating = props.index + 1;
		this.rating = rating == this.value ? 0 : rating;
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';
@import '@/style/main';
</style>
