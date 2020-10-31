<template>
	<v-row justify="center">
		<v-dialog v-model="showDialog" scrollable max-width="50vw">
			<v-card>
				<v-card-title>Search Results</v-card-title>
				<v-divider></v-divider>
				<v-card-text class="search-table" style="height: 60vh;">
					<v-simple-table>
						<template v-slot:default>
							<thead>
								<!-- <tr>
									checkbox: add
									<th class="text-center">Title</th>
									type
									date
									rating
									genres
									mark as watched
									mark as favorite
								</tr> -->
							</thead>
							<tbody>
								<tr v-for="item in results" :key="item.id">
									<td>{{ item.title }}</td>
									<td>
										<div class="my-2">
											<v-btn small color="primary" @click="addMovie(item)">Save</v-btn>
										</div>
									</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click.stop="closeDialog">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import { FilterModule } from '@/store/modules/filter';
import SearchResult from '@/models/searchResult';

@Component({})
export default class SearchDialog extends Vue {
	@Prop(Boolean) readonly value: boolean = false;

	private get showDialog(): boolean {
		return this.value;
	}

	private set showDialog(value: boolean) {
		this.$emit('input', value);
	}

	private closeDialog() {
		this.showDialog = false;
	}

	private get results(): SearchResult[] {
		return FilterModule.results;
	}

	private addMovie(item: SearchResult) {
		AppModule.addSearchAsMovie(item);
	}

	@Watch('value')
	onValueChanged() {
		if (!this.value) {
			FilterModule.clearSearch();
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/style/colors';
</style>
