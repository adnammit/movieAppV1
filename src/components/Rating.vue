<template>
	<v-rating v-model="rating" hover background-color="blue lighten-3" color="pink"></v-rating>
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
}
</script>

<style scoped lang="scss">
@import '@/style/colors';
@import '@/style/main';
</style>
