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
			<v-col cols="12" md="4">
				<VtSelectWithValidation
					ref="detailItemRocketTypeRef"
					v-model="detailItemRocketType"
					vid="detailItemRocketType"
					:items="rocketTypes"
					:validation="validation"
					:readonly="!isEditable"
					multiple
					:max-values="2"
					:label="$t('forms.content.rockets.type')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<v-row dense>
					<v-col :cols="isEditable ? 12 : $vuetify.display.smAndDown ? 12 : 6">
						<VtTextAreaWithValidation
							ref="descriptionRef"
							v-model="detailItemDescription"
							vid="detailItemDescription"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.description')"
							:counter="500"
							:clearable="isEditable"
							:rows="detailItemTextRows"
						/>
<div
	v-if="isEditable"
	v-html="markupHint"
></div>
					</v-col>
					<v-col
						v-if="!isEditable"
						:cols="isEditable ? 12 : $vuetify.display.smAndDown ? 12 : 6"
					>
					<v-img
						:src="coverUrl"
						cover
					></v-img>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="6">
				<VtSelectWithValidation
					ref="manufacturerRef"
					v-model="detailItemManufacturer"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="6">
				<VtTextFieldWithValidation
					ref="detailItemManufacturerStockIdRef"
					v-model="detailItemManufacturerStockId"
					vid="detailItemManufacturerStockId"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.manufacturerId')"
					:counter="30"
				/>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre
			v-if="$vuetify.display.smAndUp"
		>
			<v-btn
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
			>|</span>
		</template>
		<template v-slot:buttons_post
			v-if="$vuetify.display.xs"
		>
			<br>
			<v-btn
				v-if="canAddSecondary"
				class="mt-2"
				color="primary"
				@click="handleAddSecondary"
			>
				{{ $t('buttons.add') }} {{ $t('forms.content.rockets.stage.name') }}
			</v-btn>
		</template>
		<template v-slot:after>	
		[[ {{ panels }} ]] 
		[[ {{ isNew }} ]] 
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
						color="primary"
					>
						<span class="v-card-title pb-0 pl-0 pr-0 pt-0">{{ $t(`forms.content.rockets.stage.name`) }} {{ item.index  + 1 }}</span>
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketStage
							:detail-item="item"
							:is-editable="isEditable"
							:manufacturers="manufacturers"
							:pre-complete-ok-rocket-part="dialogEditPreCompleteOkRocketParts"
							:update-stage="updateStage"
							:debug="debug"
						>
							<template
								v-if="isEditable"
								v-slot:actionsEdit
							>	
								<v-btn
									v-if="isEditable && !item.primary"
									:variant="buttonsForms.variant.delete"
									:color="buttonsForms.color.delete"
									class="mr-2"
									:disabled="isDeletingSecondary(item)"
									@click="dialogDeleteSecondaryOpen(item)"
								>
									{{ $t('buttons.delete') }}
								</v-btn>
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
						</RocketStage>
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
	<RocketStageEditDialog
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
import { useRocketValidation } from '@/components/content/rockets/library/rocket/rocketValidation';
import { useRocketEditValidation } from '@/components/content/rockets/library/rocket/rocketEditValidation';
import { useRocketComponent } from '@/components/content/rockets/library/rocket/rocketComponent';
import { useRocketComponentProps } from '@/components/content/rockets/library/rocket/rocketComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketStage from '@/components/content/rockets/library/rocket/RocketStage';
import RocketStageEditDialog from '@/components/content/rockets/library/dialogs/RocketStageEditDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketStage,
		RocketStageEditDialog,
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
		...useRocketComponentProps
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
			detailItemDescription,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemRocketType,
			coverUrl,
			manufacturers,
			panels,
			panelsId,
			stagesPanels,
			hasAdmin,
			rocketId,
			stages,
			dialogEditPreCompleteOkRocketParts,
			panelsUpdated,
			stagesPanelsUpdated,
			updateStage,
			scope,
			validation
		} = useRocketComponent(props, context, options);

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
			detailItemDescription,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemRocketType,
			coverUrl,
			manufacturers,
			panels,
			panelsId,
			stagesPanels,
			hasAdmin,
			rocketId,
			stages,
			dialogEditPreCompleteOkRocketParts,
			panelsUpdated,
			stagesPanelsUpdated,
			updateStage,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketValidation), LibraryCommonUtility.cloneDeep(useRocketEditValidation(true)));
	}
};
</script>

<style>
</style>