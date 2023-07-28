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
	<VFormControl
		ref="formControlRef"
		:validation="validation"
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
				<VTextFieldWithValidation
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
				<VSelectWithValidation
					ref="detailItemRocketTypeRef"
					v-model="detailItemRocketType"
					vid="detailItemRocketType"
					:items="rocketTypes"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.type')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.description')"
					:counter="30"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="8">
				<VSelectWithValidation
					ref="manufacturerRef"
					v-model="detailItemManufacturer"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="4">
				<VTextFieldWithValidation
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
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemDiameterMajorRef"
					v-model="detailItemDiameterMajor"
					vid="detailItemDiameterMajor"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.diameter.major')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="diameterMajorMeasurementUnitsIdRef"
								v-model="diameterMajorMeasurementUnitsId"
								vid="diameterMajorMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="diameterMajorMeasurementUnitIdRef"
								v-model="diameterMajorMeasurementUnitId"
								vid="diameterMajorMeasurementUnitId"
								:measurementUnitsId="diameterMajorMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemLengthRef"
					v-model="detailItemLength"
					vid="detailItemLength"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.length')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="lengthMeasurementUnitsIdRef"
								v-model="lengthMeasurementUnitsId"
								vid="lengthMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="lengthMeasurementUnitIdRef"
								v-model="lengthMeasurementUnitId"
								vid="lengthMeasurementUnitId"
								:measurementUnitsId="lengthMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemWeightRef"
					v-model="detailItemWeight"
					vid="detailItemWeight"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.weight')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="weightMeasurementUnitsIdRef"
								v-model="weightMeasurementUnitsId"
								vid="weightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="weightMeasurementUnitIdRef"
								v-model="weightMeasurementUnitId"
								vid="weightMeasurementUnitId"
								:measurementUnitsId="weightMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsWeightType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.weight')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemCgRef"
					v-model="detailItemCg"
					vid="detailItemCg"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.cg')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="cgMeasurementUnitsIdRef"
								v-model="cgMeasurementUnitsId"
								vid="cgMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="cgMeasurementUnitIdRef"
								v-model="cgMeasurementUnitId"
								vid="cgMeasurementUnitId"
								:measurementUnitsId="cgMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemCpRef"
					v-model="detailItemCp"
					vid="detailItemCp"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.cp')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="cpMeasurementUnitsIdRef"
								v-model="cpMeasurementUnitsId"
								vid="cpMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="cpMeasurementUnitIdRef"
								v-model="cpMeasurementUnitId"
								vid="cpMeasurementUnitId"
								:measurementUnitsId="cpMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre>
			<template
				v-if="$vuetify.display.mdAndUp"
			>
				<v-btn
					v-if="canAddSecondary"
					class="mr-2"
					color="primary"
					@click="handleAddSecondary"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.rockets.stage') }}
				</v-btn>
				<span
					v-if="canAddSecondary"
					class="mr-2"
				>|</span>
			</template>
		</template>
		<template v-slot:buttons_post>
			<div 
				v-if="$vuetify.display.smAndDown"
				class="mt-2"
			>
				<v-btn
					v-if="canAddSecondary"
					color="primary"
					@click="handleAddSecondary"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.rockets.stage') }}
				</v-btn>
			</div>
		</template>
		<template v-slot:after>	
			<v-row
				v-if="stages"
				dense 
				class="mt-4"
			>
				<v-col>
					<v-row
						v-for="item in stages"
						:key="item.id"
					>
						<RocketStage
							:item="item"
							:isEditable="isEditable"
							:debug="debug"
						>
							<template 
								v-if="isEditable"
								v-slot:actionsEdit
							>	
								<div class="pl-4 pr-4 pb-2 pt-2">
									<v-btn
										v-if="isEditable"
										class="mr-2"
										icon="mdi-pencil"
										size="small"
										:disabled="isEditingSecondary(item)"
										@click="dialogEditSecondaryOpen(item)"
									></v-btn>
									<v-btn
										v-if="isEditable"
										icon="mdi-delete"
										size="small"
										:disabled="isDeletingSecondary(item)"
										@click="dialogDeleteSecondaryOpen(item)"
									></v-btn>
								</div>
							</template>
						</RocketStage>
					</v-row>
				</v-col>
			</v-row>
		</template>
	</VFormControl>
	<VConfirmationDialog
		ref="dialogDeleteSecondaryRef"
		:message="dialogDeleteSecondaryMessage"
		:messageRaw=true
		:signal="dialogDeleteSecondaryManager.signal"
		@cancel="dialogDeleteSecondaryCancel"
		@error="dialogDeleteSecondaryError"
		@ok="dialogDeleteSecondaryOk"
	/>
	<RocketEditDialog
		v-if="!readonly"
		ref="dialogMotorSearchRef"
		:debug="debug"
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
import { useRocketValidation } from '@/components/content/rockets/user/rocket/rocketValidation';
import { useRocketEditValidation } from '@/components/content/rockets/user/rocket/rocketEditValidation';
import { useRocketComponent } from '@/components/content/rockets/user/rocket/rocketComponent';
import { useRocketComponentProps } from '@/components/content/rockets/user/rocket/rocketComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketEditDialog from '@/components/content/rockets/user/dialogs/RocketEditDialog';
import RocketStage from '@/components/content/rockets/user/rocket/RocketStage';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketEditDialog,
		RocketStage,
		VConfirmationDialog,
		VFormControl,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useRocketComponentProps
	},
	emits: ['cancel', 'close', 'error', 'ok'],
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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			cgMeasurementUnitId,
			cgMeasurementUnitsId,
			cpMeasurementUnitId,
			cpMeasurementUnitsId,
			detailItemCg,
			detailItemCgFrom,
			detailItemCp,
			detailItemCpFrom,
			detailItemDescription,
			detailItemLength,
			detailItemName,
			detailItemWeight,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			resetEditData,
			setEditData,
			detailItemDiameterMajor,
			detailItemDiameterMinor,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemRocketType,
			diameterMajorMeasurementUnitId,
			diameterMajorMeasurementUnitsId,
			diameterMinorMeasurementUnitId,
			diameterMinorMeasurementUnitsId,
			manufacturers,
			hasAdmin,
			stages,
			requestManufacturers,
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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			cgMeasurementUnitId,
			cgMeasurementUnitsId,
			cpMeasurementUnitId,
			cpMeasurementUnitsId,
			detailItemCg,
			detailItemCgFrom,
			detailItemCp,
			detailItemCpFrom,
			detailItemDescription,
			detailItemLength,
			detailItemName,
			detailItemWeight,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			resetEditData,
			setEditData,
			detailItemDiameterMajor,
			detailItemDiameterMinor,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemRocketType,
			diameterMajorMeasurementUnitId,
			diameterMajorMeasurementUnitsId,
			diameterMinorMeasurementUnitId,
			diameterMinorMeasurementUnitsId,
			manufacturers,
			hasAdmin,
			stages,
			requestManufacturers,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketValidation), LibraryCommonUtility.cloneDeep(useRocketEditValidation(true)));
	}
};
</script>

<style scoped>
</style>
