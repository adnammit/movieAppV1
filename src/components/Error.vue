<template>
	<div class="hero">
		<div>
			<h1 class="display-3">ERROR</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';

@Component({})
export default class ErrorComponent extends Vue {}
</script>

<style scoped lang="scss">
@import '@/style/colors';
</style>
