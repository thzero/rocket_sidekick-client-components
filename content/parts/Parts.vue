<template>
	<ContentHeader :value="title" />
	<v-row dense>
		<v-col cols="12">
			<v-card
				v-if="!showDetailItem || showList"
				class="mb-4"
			>
				<v-card-text>
					filters go here
					{{ dialogDeleteMessage }}
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						v-if="!showDetailItem"
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
			[[ showList {{ showList }}]]
			[[ showDetailItem {{ showDetailItem }}]]
			<!-- [[ detailitem {{ JSON.stringify(detailItem) }}]] -->
		</v-col>
		<v-col
			v-show="colsSearchResults"
			:cols="colsSearchResults"
		>
			<v-row dense>
				<v-col
					cols="12"
					v-for="item in items"
					:key="item.name"
				>
					<v-card>
						<v-card-title>
							<slot name="panelTitle" :item="item">
								{{ item.name }}
							</slot>
							<span
								v-if="item.weight"
							>
								({{item.weight}} {{ measurementUnitTranslateWeight(item.weightMeasurementUnitsId, item.weightMeasurementUnitId) }})
							</span>
							<div class="float-right">{{ manufacturer(item) }}</div>
						</v-card-title>
						<v-card-text
								v-if="item.description"
							>
								<slot name="panelText" :item="item">
									{{ item.description }}
								</slot>
						</v-card-text>
						<v-card-actions>
							<v-chip
								v-if="isPublic(item)"
							>
								{{  $t('strings.content.parts.isPublic') }}
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
			<slot :detailItem="detailItem" :detailClose="detailClose" :detailOk="detailOk" />
		</v-col>
	</v-row>
	<PartCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyCancel"
		@ok="dialogCopyOk"
	/>
	<VConfirmationDialog
		ref="dialoDeleteRef"
		:message="dialogDeleteMessage"
		:messageRaw=true
		:signal="dialogDeleteManager.signal"
		@cancel="dialogDeleteCancel"
		@ok="dialogDeleteOk"
	/>
</template>

<script>
import { usePartsBaseComponent } from '@/components/content/parts/partsComponent';
import { usePartsBaseProps } from '@/components/content/parts/partsComponentProps';

import Part from '@/components/content/parts/part/Part';
import PartCopyDialog from '@/components/content/parts/dialogs/PartCopyDialog';
import ContentHeader from '@/components/content/Header';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';

export default {
	name: 'Parts',
	components: {
		Part,
		PartCopyDialog,
		ContentHeader,
		VConfirmationDialog
	},
	props: {
		...usePartsBaseProps
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
			contentLoadSignal,
			serviceStore,
			sort,
			target,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			dialogCopyManager,
			dialogCopyRef,
			dialogDeleteManager,
			dialogDeleteMessage,
			detailItem,
			items,
			colsEditPanel,
			colsSearchResults,
			displayEditPanel,
			displaySearchResults,
			showDetailItem,
			showList,
			canCopy,
			canDelete,
			canEdit,
			canView,
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
			handleAdd,
			handleEdit,
			handleView,
			initEdit,
			initNew,
			initView,
			isCopying,
			isDeleting,
			display,
			manufacturers,
			params,
			title,
			isPublic,
			manufacturer,
			measurementUnitTranslateWeight
		} = usePartsBaseComponent(props, context);

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
			contentLoadSignal,
			serviceStore,
			sort,
			target,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			dialogCopyManager,
			dialogCopyRef,
			dialogDeleteManager,
			dialogDeleteMessage,
			detailItem,
			items,
			colsEditPanel,
			colsSearchResults,
			displayEditPanel,
			displaySearchResults,
			showDetailItem,
			showList,
			canCopy,
			canDelete,
			canEdit,
			canView,
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
			handleAdd,
			handleEdit,
			handleView,
			initEdit,
			initNew,
			initView,
			isCopying,
			isDeleting,
			display,
			manufacturers,
			params,
			title,
			isPublic,
			manufacturer,
			measurementUnitTranslateWeight
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
