<template>
	<VFormDialog
		:label="$t('titles.edit') + ' ' + displayName"
		:signal="signal"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:set-additional="setAdditional"
		:validation="validation"
		button-clear-name="buttons.reset"
		:debug="debug"
		width="80vh"
		max-width="90vh"
		@close="dialogClose"
		@error="dialogError"
		@ok="dialogOk"
	>
		<div
			v-if="debug"
			class="text-center"
		>
			<!-- isEditable: {{ isEditable }} readonly: {{ readonly }} <br>
			detailItem {{ detailItem }}  -->
		</div>
		<!-- <v-row dense>
			<v-col cols="3">
				<VTextField
					v-model="stageNumber"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.stage.name')"
				/>
			</v-col>
		</v-row> -->
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
						<td class="measurementUnitsMedium">
							<MeasurementUnitsSelect
								ref="detailItemWeightMeasurementUnitsIdRef"
								v-model="detailItemWeightMeasurementUnitsId"
								vid="detailItemWeightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect
								ref="detailItemWeightMeasurementUnitIdRef"
								v-model="detailItemWeightMeasurementUnitId"
								vid="detailItemWeightMeasurementUnitId"
								:measurementUnitsId="detailItemWeightMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsWeightType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.weight')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
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
						<td class="measurementUnitsMedium">
							<MeasurementUnitsSelect
								ref="detailItemCgMeasurementUnitsIdRef"
								v-model="detailItemCgMeasurementUnitsId"
								vid="detailItemCgMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnitMedium">
							<MeasurementUnitSelect
								ref="detailItemCgMeasurementUnitIdRef"
								v-model="detailItemCgMeasurementUnitId"
								vid="detailItemCgMeasurementUnitId"
								:measurementUnitsId="detailItemCgMeasurementUnitsId"
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
		<v-row 
			v-if="detailItemMotorInfo0"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-row dense>
					<v-col 
						cols="6" md="2"
					>
						<VTextFieldWithValidation
							v-model="detailItemMotorInfo0"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="6" md="4"
					>
						<VTextFieldWithValidation
							ref="detailItemMotor0Ref"
							v-model="detailItemMotor0"
							vid="detailItemMotor0"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="8" md="4"
					>
						<VTextFieldWithValidation
							ref="detailItemMotorCase0Ref"
							v-model="detailItemMotorCase0"
							vid="detailItemMotorCase0"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motorCase.name2')"
						/>
					</v-col>
					<v-col 
						cols="4" md="2"
					>
						<VTextFieldWithValidation
							ref="detailItemMotorDelay0Ref"
							v-model="detailItemMotorDelay0"
							vid="detailItemMotorDelay0"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.delay')"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col 
				cols="12"
				class="text-right"
			>
				<table class="float-right">
					<tr>
						<td>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorsSearch(0, detailItemMotorDiameter0)"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</td>
						<td>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorCasesSearch(0, detailItemMotorDiameter0)"
							>
								{{ $t('forms.content.parts.motorCase.name2') }}
							</v-btn>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row 
			v-if="detailItemMotorInfo1"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-row dense>
					<v-col 
						cols="6" md="2"
					>
						<VTextFieldWithValidation
							v-model="detailItemMotorInfo1"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="6" md="4"
					>
						<VTextFieldWithValidation
							ref="detailItemMotor1Ref"
							v-model="detailItemMotor1"
							vid="detailItemMotor1"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="8" md="4"
					>
						<VTextFieldWithValidation
							ref="detailItemMotorCase1Ref"
							v-model="detailItemMotorCase1"
							vid="detailItemMotorCase1"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motorCase.name2')"
						/>
					</v-col>
					<v-col 
						cols="4" md="2"
					>
						<VTextFieldWithValidation
							ref="detailItemMotorDelay1Ref"
							v-model="detailItemMotorDelay1"
							vid="detailItemMotorDelay1"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.delay')"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col 
				cols="12"
				class="text-right"
			>
				<table class="float-right">
					<tr>
						<td>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorsSearch(1, detailItemMotorDiameter1)"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</td>
						<td>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorCasesSearch(1, detailItemMotorDiameter1)"
							>
								{{ $t('forms.content.parts.motorCase.name2') }}
							</v-btn>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row 
			v-if="detailItemMotorInfo2"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-row dense>
					<v-col 
						cols="6" md="2"
					>
						<VTextFieldWithValidation
							v-model="detailItemMotorInfo2"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="6" md="4"
					>
						<VTextFieldWithValidation
							ref="detailItemMotor2Ref"
							v-model="detailItemMotor2"
							vid="detailItemMotor2"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="8" md="4"
					>
						<VTextFieldWithValidation
							ref="detailItemMotorCase2Ref"
							v-model="detailItemMotorCase2"
							vid="detailItemMotorCase2"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motorCase.name2')"
						/>
					</v-col>
					<v-col 
						cols="4" md="2"
					>
						<VTextFieldWithValidation
							ref="detailItemMotorDelay2Ref"
							v-model="detailItemMotorDelay2"
							vid="detailItemMotorDelay2"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.delay')"
						/>
					</v-col>
				</v-row>
			</v-col>
			<v-col 
				cols="12"
				class="text-right"
			>
				<table class="float-right">
					<tr>
						<td>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorsSearch(2, detailItemMotorDiameter2)"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</td>
						<td>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorCasesSearch(2, detailItemMotorDiameter2)"
							>
								{{ $t('forms.content.parts.motorCase.name2') }}
							</v-btn>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<RocketPartsLookupDialog
			ref="dialoSearchgMotorsRef"
			:signal="dialogPartsSearchMotorsManager.signal"
			:diameter="dialogPartsSearchMotorsDiameter"
			:part-types="manufacturerTypeMotor"
			@close="dialogPartsSearchMotorsManager.cancel()"
			@select="selectMotor"
		/>
		<RocketPartsLookupDialog
			ref="dialoSearchgMotorCasesRef"
			:signal="dialogPartsSearchMotorCasesManager.signal"
			:diameter="dialogPartsSearchMotorsDiameter"
			:part-types="manufacturerTypeMotorCase"
			@close="dialogPartsSearchMotorCasesManager.cancel()"
			@select="selectMotorCase"
		/>
	</VFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailFormDialogProps } from '@/components/content/detailFormDialogProps';
import { useRocketSetupStageEditDialogComponent } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogComponent';
import { useRocketSetupStageEditDialogValidation } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogValidation';
import { useRocketSetupStageEditDialogComponentProps } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogComponentProps';
import { useRocketSetupEditValidation } from '@/components/content/rockets/setups/setup/rocketSetupEditValidation';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketPartsLookupDialog from '@/components/content/rockets/dialogs/parts/RocketPartsLookupDialog';
import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketSetupStageEditDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketPartsLookupDialog,
		VFormDialog,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useDetailFormDialogProps,
		...useRocketSetupStageEditDialogComponentProps
	},
	emits: ['close', 'error', 'ok'],
	setup (props, context) {
		const {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			motorDiameters,
			isEditable,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemMotor0,
			detailItemMotor1,
			detailItemMotor2,
			detailItemMotorCase0,
			detailItemMotorCase1,
			detailItemMotorCase2,
			detailItemMotorCaseId0,
			detailItemMotorCaseId1,
			detailItemMotorCaseId2,
			detailItemMotorDelay0,
			detailItemMotorDelay1,
			detailItemMotorDelay2,
			detailItemMotorDiameter0,
			detailItemMotorDiameter1,
			detailItemMotorDiameter2,
			detailItemMotorInfo0,
			detailItemMotorInfo1,
			detailItemMotorInfo2,
			detailItemMotorId0,
			detailItemMotorId1,
			detailItemMotorId2,
			detailItemNotes,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			dialogPartsSearchMotorsDiameter,
			dialogPartsSearchMotorsManager,
			dialogPartsSearchMotorCasesManager,
			manufacturerTypeMotor,
			manufacturerTypeMotorCase,
			displayName,
			stageNumber,
			clickMotorsSearch,
			clickMotorCasesSearch,
			preCompleteOk,
			resetAdditional,
			selectMotor,
			selectMotorCase,
			setAdditional,
			resetEditData,
			setEditData,
			scope,
			validation
		} = useRocketSetupStageEditDialogComponent(props, context);

		return {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			motorDiameters,
			isEditable,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemMotor0,
			detailItemMotor1,
			detailItemMotor2,
			detailItemMotorCase0,
			detailItemMotorCase1,
			detailItemMotorCase2,
			detailItemMotorCaseId0,
			detailItemMotorCaseId1,
			detailItemMotorCaseId2,
			detailItemMotorDelay0,
			detailItemMotorDelay1,
			detailItemMotorDelay2,
			detailItemMotorDiameter0,
			detailItemMotorDiameter1,
			detailItemMotorDiameter2,
			detailItemMotorInfo0,
			detailItemMotorInfo1,
			detailItemMotorInfo2,
			detailItemMotorId0,
			detailItemMotorId1,
			detailItemMotorId2,
			detailItemNotes,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			dialogPartsSearchMotorsDiameter,
			dialogPartsSearchMotorsManager,
			dialogPartsSearchMotorCasesManager,
			manufacturerTypeMotor,
			manufacturerTypeMotorCase,
			displayName,
			stageNumber,
			clickMotorsSearch,
			clickMotorCasesSearch,
			preCompleteOk,
			resetAdditional,
			selectMotor,
			selectMotorCase,
			setAdditional,
			resetEditData,
			setEditData,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketSetupStageEditDialogValidation), {});
	}
};
</script>

<style scoped>
</style>
