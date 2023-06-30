<template>
	<ContentHeader :value="title" />
	<v-row dense>
		<v-col cols="12">
			<v-card
				v-if="!hasDetailItem || hasList"
				class="mb-4"
			>
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
			[[ hasList {{ hasList }}]]
			[[ hasDetailItem {{ hasDetailItem }}]]
			<!-- [[ detailitem {{ JSON.stringify(detailItem) }}]] -->
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
								:disabled="isCopying(item)"
								@click="dialogCopyOpen(item)"
							>
								{{ $t('buttons.copy') }}
							</v-btn>
							<v-btn
								v-if="canDelete(item)"
								color="red"
								variant="flat"
								:disabled="isDeleting(item)"
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
								:disabled="isStarting(item)"
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
			<Checklist
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@ok="detailOk"
			>
			</Checklist>
		</v-col>
	</v-row>
	<ChecklistCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyCancel"
		@ok="dialogCopyOk"
	/>
	<VConfirmationDialog
		:message="dialogDeleteMessage"
		:messageRaw=true
		:signal="dialogDeleteManager.signal"
		@cancel="dialogDeleteCancel"
		@ok="dialogDeleteOk"
	/>
	<VConfirmationDialog
		:message="dialogStartMessage"
		:messageRaw=true
		:signal="dialogStartManager.signal"
		@cancel="dialogStartCancel"
		@ok="dialogStartOk"
	/>
</template>

<script>
import { useChecklistsBaseComponent } from '@/components/content/checklists/checklistsComponent';
import { useChecklistsBaseProps } from '@/components/content/checklists/checklistsComponentProps';

import Checklist from '@/components/content/checklists/checklist/Checklist';
import ChecklistCopyDialog from '@/components/content/checklists/dialogs/ChecklistCopyDialog';
import ContentHeader from '@/components/content/Header';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'Checklists',
	components: {
		Checklist,
		ChecklistCopyDialog,
		ContentHeader,
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
			hasList,
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
			dialogCopyCancel,
			dialogCopyParams,
			dialogCopyOk,
			dialogCopyOpen,
			dialogDeleteCancel,
			dialogDeleteParams,
			dialogDeleteOk,
			dialogDeleteOpen,
			dialogStartCancel,
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
			isCopying,
			isDefault,
			isDeleting,
			isInProgress,
			isShared,
			isStarting,
			display
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
			hasList,
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
			dialogCopyCancel,
			dialogCopyParams,
			dialogCopyOk,
			dialogCopyOpen,
			dialogDeleteCancel,
			dialogDeleteParams,
			dialogDeleteOk,
			dialogDeleteOpen,
			dialogStartCancel,
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
			isCopying,
			isDefault,
			isDeleting,
			isInProgress,
			isShared,
			isStarting,
			display
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
