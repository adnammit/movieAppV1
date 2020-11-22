<template>
	<div class="container-fluid mt-4">
		<FilterBar />
		<NoData v-if="noData" />
		<MediaTable v-else />
		<Search v-model="showSearch" />
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { FilterModule } from '@/store/modules/filter';
import { AppModule } from '@/store/modules/app';
import FilterBar from '@/components/FilterBar.vue';
import NoData from '@/components/NoData.vue';
import MediaTable from '@/components/MediaTable.vue';
import Search from '@/components/Search.vue';

@Component({
	components: {
		FilterBar,
		NoData,
		MediaTable,
		Search,
	},
})
export default class Collection extends Vue {
	private get noData() {
		return AppModule.noData;
	}

	private get showSearch() {
		return FilterModule.showSearch;
	}

	private set showSearch(val: boolean) {
		FilterModule.setShowSearch(val);
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';
</style>
