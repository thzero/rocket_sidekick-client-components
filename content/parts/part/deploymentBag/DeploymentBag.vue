<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ isEditable {{ isEditable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ isPublic {{ isPublic }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VFormControl
		ref="formControlRef"
		:validation="validation"
		:button-cancel="true"
		button-cancel-name="buttons.close"
		:button-clear="isEditable"
		button-clear-name="buttons.reset"
		:button-delete="false"
		:button-ok="isEditable"
		:dirty-callback="dirtyCallback"
		:invalid-callback="invalidCallback"
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
		:debug="debug"
	>
		<!-- :readonly="!isEditable" -->
		<v-row dense>
			<v-col cols="10">
				<VTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:label="$t('forms.name')"
					:counter="30"
					:validation="validation"
					:readonly="!isEditable"
				/>
			</v-col>
			<v-col cols="2">
				<VSwitchWithValidation
					v-if="!isEditable || hasAdmin"
					ref="isPublicRef"
					v-model="detailItemIsPublic"
					vid="detailItemIsPublic"
					:label="$t('forms.content.parts.public')"
					:readonly="!hasAdmin"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:label="$t('forms.description')"
					:counter="30"
					:validation="validation"
					:readonly="!isEditable"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemDiameterRef"
					vid="detailItemDiameter"
					v-model="detailItemDiameter"
					:validation="validation"
					:label="$t('forms.content.parts.diameter')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="diameterMeasurementUnitsIdRef"
								vid="diameterMeasurementUnitsId"
								v-model="diameterMeasurementUnitsId"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="diameterMeasurementUnitIdRef"
								vid="diameterMeasurementUnitId"
								v-model="diameterMeasurementUnitId"
								:measurementUnitsId="diameterMeasurementUnitsId"
								:measurementUnitsType="measurementUnitslengthType"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemLengthRef"
					vid="detailItemLength"
					v-model="detailItemLength"
					:validation="validation"
					:label="$t('forms.content.parts.length')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="lengthMeasurementUnitsIdRef"
								vid="lengthMeasurementUnitsId"
								v-model="lengthMeasurementUnitsId"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="lengthMeasurementUnitIdRef"
								vid="lengthMeasurementUnitId"
								v-model="lengthMeasurementUnitId"
								:measurementUnitsId="lengthMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
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
					vid="detailItemWeight"
					v-model="detailItemWeight"
					:validation="validation"
					:label="$t('forms.content.parts.weight')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="weightMeasurementUnitsIdRef"
								vid="weightMeasurementUnitsId"
								v-model="weightMeasurementUnitsId"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="weightMeasurementUnitIdRef"
								vid="weightMeasurementUnitId"
								v-model="weightMeasurementUnitId"
								:measurementUnitsId="weightMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsWeightType"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.weight')"
							/>
						</td>
					</tr>
				</table>
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
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="4">
				<VTextFieldWithValidation
					ref="detailItemManufacturerStockIdRef"
					v-model="detailItemManufacturerStockId"
					vid="detailItemManufacturerStockId"
					:label="$t('forms.content.parts.manufacturerId')"
					:counter="30"
					:validation="validation"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="6">
				<VSwitchWithValidation
					class="ml-2 mr-2"
					ref="detailItemPilotChuteRef"
					v-model="detailItemPilotChute"
					vid="detailItemPilotChute"
					:validation="validation"
					:label="$t('forms.content.parts.deploymentBag.pilotChute')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemPilotChuteDiameterRef"
					vid="detailItemPilotChuteDiameter"
					v-model="detailItemPilotChuteDiameter"
					:validation="validation"
					:label="`${$t('forms.content.parts.deploymentBag.pilotChute')} ${$t('forms.content.parts.diameter')}`"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="pilotChuteDiameterMeasurementUnitsIdRef"
								vid="pilotChuteDiameterMeasurementUnitsId"
								v-model="pilotChuteDiameterMeasurementUnitsId"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="pilotChuteDiameterMeasurementUnitIdRef"
								vid="pilotChuteDiameterMeasurementUnitId"
								v-model="pilotChuteDiameterMeasurementUnitId"
								:measurementUnitsId="pilotChuteDiameterMeasurementUnitsId"
								:measurementUnitsType="measurementUnitslengthType"
								:validation="validation"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="6">
				<VNumberFieldWithValidation
					ref="detailItemPilotChuteCdRef"
					vid="detailItemPilotChuteCd"
					v-model="detailItemPilotChuteCd"
					:validation="validation"
					:label="`${$t('forms.content.parts.deploymentBag.pilotChute')} ${$t('forms.content.parts.cd')}`"
				/>
			</v-col>
		</v-row>
	</VFormControl>
</template>

<script>
import { between, decimal, required } from '@vuelidate/validators';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useDeploymentBagPartComponent } from '@/components/content/parts/part/deploymentBag/deploymentBagPartComponent';
import { usePartComponentProps } from '@/components/content/parts/part/partComponentProps';
import { usePartValidation } from '@/components/content/parts/part/partValidation';

import MeasurementUnitSelect from '@/components/content/tools/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/tools/MeasurementUnitsSelect';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'DeploymentBagPartControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VFormControl,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...usePartComponentProps
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
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isEditable,
			isNew,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitslengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemDescription,
			detailItemIsPublic,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemWeight,
			manufacturers,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			canAdd,
			hasAdmin,
			isPublic,
			handleAdd,
			requestManufacturers,
			detailItemDiameter,
			detailItemLength,
			detailItemPilotChute,
			detailItemPilotChuteCd,
			detailItemPilotChuteDiameter,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			pilotChuteDiameterMeasurementUnitId,
			pilotChuteDiameterMeasurementUnitsId,
			scope,
			validation
		} = useDeploymentBagPartComponent(props, context, options);

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
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isEditable,
			isNew,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitslengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemDescription,
			detailItemIsPublic,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemWeight,
			manufacturers,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			canAdd,
			hasAdmin,
			isPublic,
			handleAdd,
			requestManufacturers,
			detailItemDiameter,
			detailItemLength,
			detailItemPilotChute,
			detailItemPilotChuteCd,
			detailItemPilotChuteDiameter,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			pilotChuteDiameterMeasurementUnitId,
			pilotChuteDiameterMeasurementUnitsId,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartValidation), {
			detailItemDiameter: { required, decimal, between: between(0, 2004), $autoDirty: true },
			detailItemLength: { required, decimal, between: between(0, 120), $autoDirty: true },
			detailItemPilotChute: { $autoDirty: true },
			detailItemPilotChuteCd: { decimal, between: between(0, 9), $autoDirty: true },
			detailItemPilotChuteDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
			diameterMeasurementUnitId: { $autoDirty: true },
			diameterMeasurementUnitsId: { $autoDirty: true },
			lengthMeasurementUnitId: { $autoDirty: true },
			lengthMeasurementUnitsId: { $autoDirty: true },
			pilotChuteDiameterMeasurementUnitId: { $autoDirty: true },
			pilotChuteDiameterMeasurementUnitsId: { $autoDirty: true }
		});
	}
};
</script>

<style scoped>
</style>
