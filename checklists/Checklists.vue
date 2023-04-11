<template>
	<Header v-model="title" />
	<v-row dense>
		<v-col cols="12">
			<v-card class="mb-4">
				<v-card-text>
					filters go here
					{{ dialogDeleteMessage }}
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						v-if="!hasDetailItem"
						color="blue"
						variant="flat"
						@click="handleAdd(item)"
					>
						{{ $t('buttons.add') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
		<v-col cols="12">
			<v-snackbar
				ref="notifyRef"
				v-model="notifySignal"
				:color="notifyColor"
				:timeout="notifyTimeout"
			>
				{{ notifyMessage }}
			</v-snackbar>
			[[ colsSearchResults {{ colsSearchResults }}]]
			[[ colsEditPanel {{ colsEditPanel }}]]
			[[ hasDetailItem {{ hasDetailItem }}]]
			[[ detailitem {{ JSON.stringify(detailItem) }}]]
		</v-col>
		<v-col
			v-show="colsSearchResults"
			:cols="colsSearchResults"
		>
			<v-row dense>
				<v-col
					cols="12"
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
								v-if="isDefault(item)"
							>
								{{  $t('strings.checklists.isdefault') }}
							</v-chip>
							<v-spacer></v-spacer>
							<v-btn
								v-if="canCopy(item)"
								color="blue"
								variant="flat"
								@click="dialogCopyOpen(item)"
							>
								{{ $t('buttons.copy') }}
							</v-btn>
							<v-btn
								v-if="canDelete(item)"
								color="red"
								variant="flat"
								@click="dialogDeleteOpen(item)"
							>
								{{ $t('buttons.delete') }}
							</v-btn>
							<v-btn
								v-if="canEdit(item)"
								color="blue"
								variant="flat"
								@click="handleEdit(item)"
							>
								{{ $t('buttons.edit') }}
							</v-btn>
							<v-btn
								v-if="canStart(item)"
								color="green"
								variant="flat"
								@click="dialogStartOpen(item)"
							>
								{{ $t('buttons.start') }}
							</v-btn>
							<v-btn
								v-if="canView(item)"
								color="green"
								variant="flat"
								@click="handleView(item)"
							>
								{{ $t('buttons.view') }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
		<v-col
			v-show="colsEditPanel"
			:cols="colsEditPanel"
		>
			<ChecklistControl
				:detail-item="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@ok="detailOk"
			>
			</ChecklistControl>
		</v-col>
	</v-row>
	<ChecklistCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyClose"
		@ok="dialogCopyOk"
	/>
	<VConfirmationDialog
		:message="dialogDeleteMessage"
		:messageRaw=true
		:signal="dialogDeleteManager.signal"
		@cancel="dialogDeleteClose"
		@ok="dialogDeleteOk"
	/>
	<VConfirmationDialog
		:message="dialogStartMessage"
		:messageRaw=true
		:signal="dialogStartManager.signal"
		@cancel="dialogStartClose"
		@ok="dialogStartOk"
	/>
</template>

<script>
import { useChecklistsBaseComponent } from '@/components/checklists/checklistsBase';
import { useChecklistsBaseProps } from '@/components/checklists/checklistsBaseProps';

import ChecklistControl from '@/components/checklists/checklist/ChecklistControl';
import ChecklistCopyDialog from '@/components/checklists/dialogs/ChecklistCopyDialog';
import Header from '@/components/content/Header';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'Checklists',
	components: {
		ChecklistControl,
		ChecklistCopyDialog,
		Header,
		VConfirmationDialog,
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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			checklists,
			dialogCopyManager,
			dialogCopyRef,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogStartManager,
			dialogStartMessage,
			detailItem,
			title,
			colsEditPanel,
			colsSearchResults,
			displayEditPanel,
			displaySearchResults,
			hasDetailItem,
			canCopy,
			canDelete,
			canEdit,
			canStart,
			canView,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			checklistUrl,
			detailClose,
			detailOk,
			dialogCopyClose,
			dialogCopyParams,
			dialogCopyOk,
			dialogCopyOpen,
			dialogDeleteClose,
			dialogDeleteParams,
			dialogDeleteOk,
			dialogDeleteOpen,
			dialogStartClose,
			dialogStartParams,
			dialogStartOk,
			dialogStartOpen,
			params,
			handleAdd,
			handleEdit,
			handleView,
			initEdit,
			initNew,
			initView,
			isCompleted,
			isDefault,
			isInProgress,
			isShared
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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			checklists,
			dialogCopyManager,
			dialogCopyRef,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogStartManager,
			dialogStartMessage,
			detailItem,
			title,
			colsEditPanel,
			colsSearchResults,
			displayEditPanel,
			displaySearchResults,
			hasDetailItem,
			canCopy,
			canDelete,
			canEdit,
			canStart,
			canView,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			checklistUrl,
			detailClose,
			detailOk,
			dialogCopyClose,
			dialogCopyParams,
			dialogCopyOk,
			dialogCopyOpen,
			dialogDeleteClose,
			dialogDeleteParams,
			dialogDeleteOk,
			dialogDeleteOpen,
			dialogStartClose,
			dialogStartParams,
			dialogStartOk,
			dialogStartOpen,
			params,
			handleAdd,
			handleEdit,
			handleView,
			initEdit,
			initNew,
			initView,
			isCompleted,
			isDefault,
			isInProgress,
			isShared
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
