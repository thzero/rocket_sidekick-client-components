<template>
	<Header v-model="title" />
	<v-row>
		<v-col cols="12">
			<v-card class="mb-4">
				<v-card-text>
					filters go here
				</v-card-text>
			</v-card>
			<v-row dense>
				<v-col cols="12"
					v-for="item in checklists"
					:key="item.name"
				>
					<v-card>
						<v-card-title>
							{{ item.name }}
							<!-- <v-chip
								v-if="isDefault"
								style="float: right;"
							>
								{{  $t('strings.checklists.isdefault') }}
							</v-chip> -->
						</v-card-title>
						<v-card-text>
							{{ item.description }}
						</v-card-text>
						<v-card-actions>
							<v-chip
								v-if="isDefault"
							>
								{{  $t('strings.checklists.isdefault') }}
							</v-chip>
							<v-spacer></v-spacer>
							<v-btn
								v-if="canCopy(item)"
								size="large"
								color="blue"
								variant="flat"
								@click="dialogCopyOpen(item)"
							>
								{{ $t('buttons.copy') }}
							</v-btn>
							<v-btn
								v-if="canDelete(item)"
								size="large"
								color="red"
								variant="flat"
							>
								{{ $t('buttons.delete') }}
							</v-btn>
							<v-btn
								v-if="canStart(item)"
								size="large"
								color="green"
								variant="flat"
							>
								{{ $t('buttons.start') }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
	<ChecklistCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopy.signal"
		@close="dialogCopyClose"
		@ok="dialogCopyOk"
	/>
</template>

<script>
import { useChecklistsBaseComponent } from '@/components/checklists/checklistsBase';
import { useChecklistsBaseProps } from '@/components/checklists/checklistsBaseProps';

import ChecklistCopyDialog from '@/components/checklists/ChecklistCopyDialog';
import Header from '@/components/content/Header';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'Checklists',
	components: {
		ChecklistCopyDialog,
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
			checklistTypeIcon,
			checklistTypeIconDetermine,
			checklists,
			dialogCopy,
			dialogCopyRef,
			title,
			canCopy,
			canDelete,
			canStart,
			checklistUrl,
			dialogCopyClose,
			dialogCopyParams,
			dialogCopyOk,
			dialogCopyOpen,
			isCompleted,
			isDefault,
			isInProgress
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
			checklistTypeIcon,
			checklistTypeIconDetermine,
			checklists,
			dialogCopy,
			dialogCopyRef,
			title,
			canCopy,
			canDelete,
			canStart,
			checklistUrl,
			dialogCopyClose,
			dialogCopyParams,
			dialogCopyOk,
			dialogCopyOpen,
			isCompleted,
			isDefault,
			isInProgress
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
