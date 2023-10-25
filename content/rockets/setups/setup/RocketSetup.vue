<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ isEditable {{ isEditable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ canAddSecondary {{ canAddSecondary }} ]]
		[[ canDeleteSecondary {{ canDeleteSecondary }} ]]
		[[ canEditSecondary {{ canEditSecondary }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VtFormControl
		ref="formControlRef"
		:validation="validation"
		:button-cancel="isEditable"
		:button-close="true"
		:button-clear="isEditable"
		button-clear-name="buttons.reset"
		:button-delete="false"
		:button-ok="isEditable"
		:dirty-callback="dirtyCallback"
		:invalid-callback="invalidCallback"
		:readonly="!isEditable "
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
		:debug="debug"
	>
		<v-row dense>
			<v-col cols="12" md="8">
				<VtTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:counter="30"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VtTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.description')"
					:counter="300"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<div class="d-flex">
					<!-- <VtTextField
						ref="detailItemRocketNameRef"
						v-model="detailItemRocketName"
						vid="detailItemRocketName"
						:label="$t('forms.content.rockets.name')"
						:readonly="true"
					/> -->
					<VtTextFieldWithValidation
						ref="detailItemRocketNameRef"
						v-model="detailItemRocketName"
						vid="detailItemRocketName"
						:validation="validation"
						:errorsReadonly="validation.detailItemRocketId.$silentErrors"
						:label="$t('forms.content.rockets.name')"
						:readonly="true"
					/>
					<v-btn
						class="ml-4 text-right"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="clickSearchRockets(item)"
					>
						{{ $t('buttons.select') }}
					</v-btn>
				</div>
			</v-col>
			<v-col cols="12" sm="6">
				<VtSelectWithValidation
					v-if="detailItemRocketId"
					ref="detailItemTypeRef"
					v-model="detailItemType"
					vid="detailItemType"
					:items="types"
					:validation="validation"
					:label="$t('forms.content.rockets.level')"
					:hint="$t('forms.content.rockets.level')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VtTextAreaWithValidation
					ref="detailItemNotesRef"
					v-model="detailItemNotes"
					vid="detailItemNotes"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.launches.notes')"
					:counter="1000"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
<div v-html="markupHint"></div>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre>
			<!-- <v-btn
				v-if="canAddSecondary"
				class="mr-2"
				color="primary"
				@click="handleAddSecondary"
			>
				{{ $t('buttons.add') }} {{ $t('forms.content.rockets.stage.name') }}
			</v-btn>
			<span
				v-if="canAddSecondary"
				class="mr-2"
			>|</span> -->
		</template>
		<template v-slot:buttons_post>
		</template>
		<template v-slot:after>	
			<v-expansion-panels
				v-if="!isNew"
				v-model="panels"
				class="mt-4"
				multiple
				@update:modelValue="panelsUpdated"
			>
				<v-expansion-panel
					v-for="item in stages" 
					:key="item.id"
					:value="item.id"
				>
					<v-expansion-panel-title
						color="secondary"
					>
						{{ $t(`forms.content.rockets.stage.name`) }} {{ item.index  + 1 }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketSetupStage
							:detail-item="item"
							:detail-item-setup="detailItemData"
							:is-editable="isEditable"
							:manufacturers="manufacturers"
							:update-stage="updateStage"
							:debug="debug"
						>
							<template
								v-if="isEditable"
								v-slot:actionsEdit
							>	
								<!-- <v-btn
									v-if="isEditable && !item.primary"
									:variant="buttonsForms.variant.delete"
									:color="buttonsForms.color.delete"
									class="mr-2"
									:disabled="isDeletingSecondary(item)"
									@click="dialogDeleteSecondaryOpen(item)"
								>
									{{ $t('buttons.delete') }}
								</v-btn> -->
								<v-btn
									v-if="isEditable"
									:variant="buttonsForms.variant.edit"
									:color="buttonsForms.color.edit"
									:disabled="isEditingSecondary(item)"
									@click="dialogEditSecondaryOpen(item)"
								>
									{{ $t('buttons.edit') }}
								</v-btn>
							</template>
						</RocketSetupStage>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</template>
	</VtFormControl>
	<VtConfirmationDialog
		ref="dialogDeleteSecondaryRef"
		:message="dialogDeleteSecondaryMessage"
		:messageRaw=true
		:signal="dialogDeleteSecondaryManager.signal"
		@cancel="dialogDeleteSecondaryCancel"
		@error="dialogDeleteSecondaryError"
		@ok="dialogDeleteSecondaryOk"
	/>
	<RocketLookupDialog
		ref="dialogRocketLookupManagerRef"
		:signal="dialogRocketLookupManager.signal"
		:rocket-id="rocketId"
		@close="dialogRocketLookupManager.cancel()"
		@select="selectRocket"
	/>
	<RocketSetupStageEditDialog
		v-if="!readonly"
		ref="dialogEditSecondaryRef"
		:debug="debug"
		:manufacturers="manufacturers"
		:pre-complete-ok="dialogEditSecondaryPreCompleteOk"
		:value="dialogEditSecondaryParams"
		:signal="dialogEditSecondaryManager.signal"
		@close="dialogEditSecondaryCancel"
		@ok="dialogEditSecondaryOk"
		width="90%"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useRocketSetupEditValidation } from '@/components/content/rockets/setups/setup/rocketSetupEditValidation';
import { useRocketSetupComponent } from '@/components/content/rockets/setups/setup/rocketSetupComponent';
import { useRocketSetupComponentProps } from '@/components/content/rockets/setups/setup/rocketSetupComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketLookupDialog from '@/components/content/rockets/dialogs/RocketLookupDialog';
import RocketSetupStage from '@/components/content/rockets/setups/setup/RocketSetupStage';
import RocketSetupStageEditDialog from '@/components/content/rockets/setups/dialogs/RocketSetupStageEditDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketSetupControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketLookupDialog,
		RocketSetupStage,
		RocketSetupStageEditDialog,
		VtConfirmationDialog,
		VtFormControl,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useRocketSetupComponentProps
	},
	setup (props, context, options) {
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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isDeleting,
			isEditable,
			isNew,
			isOwner,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			dialogDeleteSecondaryManager,
			dialogDeleteSecondaryMessage,
			dialogDeleteSecondaryParams,
			dialogEditSecondaryManager,
			dialogEditSecondaryParams,
			canAddSecondary,
			canDeleteSecondary,
			canEditSecondary,
			isDeletingSecondary,
			isEditingSecondary,
			dialogDeleteSecondaryCancel,
			dialogDeleteSecondaryError,
			dialogDeleteSecondaryOk,
			dialogDeleteSecondaryOpen,
			dialogEditSecondaryCancel,
			dialogEditSecondaryError,
			dialogEditSecondaryOk,
			dialogEditSecondaryOpen,
			dialogEditSecondaryPreCompleteOk,
			handleAddSecondary,
			rocketTypes,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			markupHint,
			dialogRocketLookupManager,
			detailItemDescription,
			detailItemName,
			detailItemNotes,
			detailItemRocketId,
			detailItemRocketName,
			detailItemType,
			manufacturers,
			panels,
			panelsId,
			stagesPanels,
			types,
			hasAdmin,
			rocketId,
			stages,
			clickSearchRockets,
			panelsUpdated,
			stagesPanelsUpdated,
			selectRocket,
			updateStage,
			scope,
			validation
		} = useRocketSetupComponent(props, context, options);

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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isDeleting,
			isEditable,
			isNew,
			isOwner,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			dialogDeleteSecondaryManager,
			dialogDeleteSecondaryMessage,
			dialogDeleteSecondaryParams,
			dialogEditSecondaryManager,
			dialogEditSecondaryParams,
			canAddSecondary,
			canDeleteSecondary,
			canEditSecondary,
			isDeletingSecondary,
			isEditingSecondary,
			dialogDeleteSecondaryCancel,
			dialogDeleteSecondaryError,
			dialogDeleteSecondaryOk,
			dialogDeleteSecondaryOpen,
			dialogEditSecondaryCancel,
			dialogEditSecondaryError,
			dialogEditSecondaryOk,
			dialogEditSecondaryOpen,
			dialogEditSecondaryPreCompleteOk,
			handleAddSecondary,
			rocketTypes,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			markupHint,
			dialogRocketLookupManager,
			detailItemDescription,
			detailItemName,
			detailItemNotes,
			detailItemRocketId,
			detailItemRocketName,
			detailItemType,
			manufacturers,
			panels,
			panelsId,
			stagesPanels,
			types,
			hasAdmin,
			rocketId,
			stages,
			clickSearchRockets,
			panelsUpdated,
			stagesPanelsUpdated,
			selectRocket,
			updateStage,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketSetupEditValidation(false)), LibraryCommonUtility.cloneDeep({}));
	}
};
</script>

<style>
</style>