<template>
	<div class="hero">
		<div>
			<h1 class="display-3">Nothin' in your collection</h1>
			<font-awesome-icon icon="kiwi-bird" size="6x" style="margin: 20px;" />
			<font-awesome-icon icon="seedling" size="2x" style="margin: 20px;" />
			<p class="lead">Use the search field up top to start adding</p>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { FilterModule } from '@/store/modules/filter';

@Component({})
export default class NoData extends Vue {}
</script>

<style scoped lang="scss">
@import '@/style/colors';
@import '@/style/main';
</style>
