<template>
	<Header v-model="title" />
	<v-row>
		<v-col cols="12">
			<v-card>
				<v-card-text>
					<v-row dense>
						<v-col cols="6"
							v-for="item in checklists"
							:key="item.name"
						>
							<v-card
								v-for="item in checklists"
								:key="item.name"
								class="mx-auto"
								max-width="400"
								color="secondary"
							>
								<v-img
									v-if="hasCoverUrl(item)"
									:src="item.coverUrl"
									cover
								></v-img>

								<v-card-title>
									<v-row dense>
										<v-col>
											<v-btn
												:to="checklistUrl(item)"
												size="large"
												variant="text"
											>
												{{ item.name }}
											</v-btn>
										</v-col>
										<v-col>
											<img :src="checklistTypeIcon(item)" style="height: 48px; float: right;" />
										</v-col>
									</v-row>
								</v-card-title>
							</v-card>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { useChecklistsBaseComponent } from '@/components/checklists/checklistsBase';
import { useChecklistsBaseProps } from '@/components/checklists/checklistsBaseProps';

import Header from '@/components/content/Header';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'Checklists',
	components: {
		Header,
		VMarkdown
	},
	props: {
		...useChecklistsBaseProps
	},
	setup(props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			serviceStore,
			sort,
			target,
			hasCoverUrl,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			checklists,
			title,
			checklistUrl
		} = useChecklistsBaseComponent(props, context);

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			serviceStore,
			sort,
			target,
			hasCoverUrl,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			checklists,
			title,
			checklistUrl
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
