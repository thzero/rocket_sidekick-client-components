<template>
	<VtFormDialog
		:label="$t('titles.edit') + ' ' + displayName"
		:signal="signal"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:set-additional="setAdditional"
		:validation="validation"
		button-clear-name="buttons.reset"
		:debug="debug"
		width="70vh"
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
				<VtTextField
					v-model="stageNumber"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.stage.name')"
				/>
			</v-col>
		</v-row> -->
		<v-row dense>
			<!-- <v-col cols="5" md="2">
				<VtNumberFieldWithValidation
					ref="detailItemWeightRef"
					v-model="detailItemWeight"
					vid="detailItemWeight"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.weight')"
				/>
			</v-col>
			<v-col cols="7" md="4"> -->
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemWeightRef"
									v-model="detailItemWeight"
									vid="detailItemWeight"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.rockets.weight.name')"
								/>
							</td>
							<!-- <td class="measurementUnitsMedium">
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
							</td> -->
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemWeightMeasurementUnitIdRef"
									v-model="detailItemWeightMeasurementUnitId"
									vid="detailItemWeightMeasurementUnitId"
									:measurementUnitsType="measurementUnitsWeightType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.weight')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
			<!-- <v-col cols="5" md="2">
				<VtNumberFieldWithValidation
					ref="detailItemCgRef"
					v-model="detailItemCg"
					vid="detailItemCg"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.cg')"
				/>
			</v-col>
			<v-col cols="7" md="4"> -->
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>	
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemCgRef"
									v-model="detailItemCg"
									vid="detailItemCg"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.rockets.cg')"
								/>
							</td>
							<!-- <td class="measurementUnitsMedium">
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
							</td> -->
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect
									ref="detailItemCgMeasurementUnitIdRef"
									v-model="detailItemCgMeasurementUnitId"
									vid="detailItemCgMeasurementUnitId"
									:measurementUnitsType="measurementUnitsLengthType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.length')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemBallastRef"
									v-model="detailItemBallast"
									vid="detailItemBallast"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.rockets.ballast')"
								/>
							</td>
							<!-- <td class="measurementUnitsMedium">
								<MeasurementUnitsSelect
									ref="detailItemBallastMeasurementUnitsIdRef"
									v-model="detailItemBallastMeasurementUnitsId"
									vid="detailItemBallastMeasurementUnitsId"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.title')"
								/>
							</td>
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect
									ref="detailItemBallastMeasurementUnitIdRef"
									v-model="detailItemBallastMeasurementUnitId"
									vid="detailItemBallastMeasurementUnitId"
									:measurementUnitsId="detailItemBallastMeasurementUnitsId"
									:measurementUnitsType="measurementUnitsWeightType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.weight')"
								/>
							</td> -->
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemBallastMeasurementUnitIdRef"
									v-model="detailItemBallastMeasurementUnitId"
									vid="detailItemBallastMeasurementUnitId"
									:measurementUnitsType="measurementUnitsWeightType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.weight')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
		</v-row>
		<v-row dense class="mt-4">
			<v-col cols="12">
				<h3>{{ $t('strings.content.rockets.ejection')}}</h3>
				<v-divider class="border-opacity-100"></v-divider>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemEjectionDrogueRef"
									v-model="detailItemEjectionDrogue"
									vid="detailItemEjectionDrogue"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.rockets.ejection.drogue')"
								/>
							</td>
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemEjectionDrogueMeasurementUnitIdRef"
									v-model="detailItemEjectionDrogueMeasurementUnitId"
									vid="detailItemEjectionDrogueMeasurementUnitId"
									:measurementUnitsType="measurementUnitsWeightType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.weight')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemEjectionDrogueBackupRef"
									v-model="detailItemEjectionDrogueBackup"
									vid="detailItemEjectionDrogueBackup"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.rockets.ejection.drogue') + ' ' + $t('forms.content.rockets.ejection.backup')"
								/>
							</td>
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemEjectionnDrogueBackupMeasurementUnitIdRef"
									v-model="detailItemEjectionDrogueBackupMeasurementUnitId"
									vid="detailItemEjectionDrogueBackupMeasurementUnitId"
									:measurementUnitsType="measurementUnitsWeightType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.weight')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemEjectionMainRef"
									v-model="detailItemEjectionMain"
									vid="detailItemEjectionMain"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.rockets.ejection.main')"
								/>
							</td>
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemEjectionMainMeasurementUnitIdRef"
									v-model="detailItemEjectionMainMeasurementUnitId"
									vid="detailItemEjectionMainMeasurementUnitId"
									:measurementUnitsType="measurementUnitsWeightType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.weight')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
			<v-col cols="12" sm="6">
				<table style="width: 100%;">
					<tbody>
						<tr>
							<td>
								<VtNumberFieldWithValidation
									ref="detailItemEjectionMainBackupRef"
									v-model="detailItemEjectionMainBackup"
									vid="detailItemEjectionMainBackup"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.content.rockets.ejection.main') + ' ' + $t('forms.content.rockets.ejection.backup')"
								/>
							</td>
							<td class="measurementUnitMedium">
								<MeasurementUnitSelect2
									ref="detailItemEjectionnMainBackupMeasurementUnitIdRef"
									v-model="detailItemEjectionMainBackupMeasurementUnitId"
									vid="detailItemEjectionMainBackupMeasurementUnitId"
									:measurementUnitsType="measurementUnitsWeightType"
									:validation="validation"
									:readonly="!isEditable"
									:label="$t('forms.settings.measurementUnits.weight')"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</v-col>
		</v-row>
		<v-row dense class="mt-4">
			<v-col cols="12">
				<h3>{{ $t('strings.content.rockets.motors')}}</h3>
				<v-divider class="border-opacity-100"></v-divider>
			</v-col>
		</v-row>
		<v-row 
			v-if="hasMotor(0)"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-row dense>
					<v-col 
						cols="6" md="2"
					>
						<VtTextFieldWithValidation
							v-model="detailItemMotorInfo0"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
							:clearable="false"
						/>
					</v-col>
					<v-col
						v-if="$vuetify.display.smAndDown"
						cols="6"
					>
						<VtTextFieldWithValidation
							ref="detailItemMotorDelay0Ref"
							v-model="detailItemMotorDelay0"
							vid="detailItemMotorDelay0"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.delay')"
						/>
					</v-col>
					<v-col 
						cols="12" md="6"
					>
						<table style="width: 100%;">
							<tbody>
								<tr>
									<td style="width: 100%;">
										<VtTextFieldWithValidation
											ref="detailItemMotor0Ref"
											v-model="detailItemMotor0"
											vid="detailItemMotor0"
											:validation="validation"
											:readonly="!isEditable"
											:label="$t('forms.content.parts.motor.name')"
											:clearable="false"
										/>
									</td>
									<td class="pr-2">
										<v-btn style="width: 100%;"
											color="green ml-2"
											@click="clickMotorsSearch(0, detailItemMotorDiameter0)"
										>
											{{ $t('forms.content.parts.motor.name') }}
										</v-btn>
									</td>
								</tr>
								<tr>
									<td style="width: 100%;">
										<VtTextFieldWithValidation
											ref="detailItemMotorCase0Ref"
											v-model="detailItemMotorCase0"
											vid="detailItemMotorCase0"
											:validation="validation"
											:readonly="!isEditable"
											:label="$t('forms.content.parts.motorCase.name2')"
											:clearable="false"
										/>
									</td>
									<td class="pr-2">
										<v-btn style="width: 100%;"
											variant="flat"
											color="green ml-2"
											@click="clickMotorCasesSearch(0, detailItemMotorDiameter0)"
										>
											{{ $t('forms.content.parts.motorCase.name2') }}
										</v-btn>
									</td>
								</tr>
							</tbody>
						</table>
					</v-col>
					<v-col 
						v-if="$vuetify.display.mdAndUp"
						cols="6" md="4"
					>
						<VtTextFieldWithValidation
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
		</v-row>
		<v-row 
			v-if="hasMotor(1)"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-row dense>
					<v-col 
						cols="6" md="2"
					>
						<VtTextFieldWithValidation
							v-model="detailItemMotorInfo1"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
							:clearable="false"
						/>
					</v-col>
					<v-col
						v-if="$vuetify.display.smAndDown"
						cols="6"
					>
						<VtTextFieldWithValidation
							ref="detailItemMotorDelay1Ref"
							v-model="detailItemMotorDelay1"
							vid="detailItemMotorDelay1"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.delay')"
						/>
					</v-col>
					<v-col 
						cols="12" md="6"
					>
						<table style="width: 100%;">
							<tbody>
								<tr>
									<td style="width: 100%;">
										<VtTextFieldWithValidation
											ref="detailItemMotor1Ref"
											v-model="detailItemMotor1"
											vid="detailItemMotor1"
											:validation="validation"
											:readonly="!isEditable"
											:label="$t('forms.content.parts.motor.name')"
											:clearable="false"
										/>
									</td>
									<td class="pr-2">
										<v-btn style="width: 100%;"
											color="green ml-2"
											@click="clickMotorsSearch(1, detailItemMotorDiameter1)"
										>
											{{ $t('forms.content.parts.motor.name') }}
										</v-btn>
									</td>
								</tr>
								<tr>
									<td style="width: 100%;">
										<VtTextFieldWithValidation
											ref="detailItemMotorCase1Ref"
											v-model="detailItemMotorCase1"
											vid="detailItemMotorCase1"
											:validation="validation"
											:readonly="!isEditable"
											:label="$t('forms.content.parts.motorCase.name2')"
											:clearable="false"
										/>
									</td>
									<td class="pr-2">
										<v-btn style="width: 100%;"
											variant="flat"
											color="green ml-2"
											@click="clickMotorCasesSearch(1, detailItemMotorDiameter1)"
										>
											{{ $t('forms.content.parts.motorCase.name2') }}
										</v-btn>
									</td>
								</tr>
							</tbody>
						</table>
					</v-col>
					<v-col 
						v-if="$vuetify.display.mdAndUp"
						cols="6" md="4"
					>
						<VtTextFieldWithValidation
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
		</v-row>
		<v-row 
			v-if="hasMotor(2)"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-row dense>
					<v-col 
						cols="6" md="2"
					>
						<VtTextFieldWithValidation
							v-model="detailItemMotorInfo2"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
							:clearable="false"
						/>
					</v-col>
					<v-col
						v-if="$vuetify.display.smAndDown"
						cols="6"
					>
						<VtTextFieldWithValidation
							ref="detailItemMotorDelay2Ref"
							v-model="detailItemMotorDelay2"
							vid="detailItemMotorDelay2"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.content.parts.motor.delay')"
						/>
					</v-col>
					<v-col 
						cols="12" md="6"
					>
						<table style="width: 100%;">
							<tbody>
								<tr>
									<td style="width: 100%;">
										<VtTextFieldWithValidation
											ref="detailItemMotor2Ref"
											v-model="detailItemMotor2"
											vid="detailItemMotor2"
											:validation="validation"
											:readonly="!isEditable"
											:label="$t('forms.content.parts.motor.name')"
											:clearable="false"
										/>
									</td>
									<td class="pr-2">
										<v-btn style="width: 100%;"
											color="green ml-2"
											@click="clickMotorsSearch(2, detailItemMotorDiameter2)"
										>
											{{ $t('forms.content.parts.motor.name') }}
										</v-btn>
									</td>
								</tr>
								<tr>
									<td style="width: 100%;">
										<VtTextFieldWithValidation
											ref="detailItemMotorCase2Ref"
											v-model="detailItemMotorCase2"
											vid="detailItemMotorCase2"
											:validation="validation"
											:readonly="!isEditable"
											:label="$t('forms.content.parts.motorCase.name2')"
											:clearable="false"
										/>
									</td>
									<td class="pr-2">
										<v-btn style="width: 100%;"
											variant="flat"
											color="green ml-2"
											@click="clickMotorCasesSearch(2, detailItemMotorDiameter2)"
										>
											{{ $t('forms.content.parts.motorCase.name2') }}
										</v-btn>
									</td>
								</tr>
							</tbody>
						</table>
					</v-col>
					<v-col 
						v-if="$vuetify.display.mdAndUp"
						cols="6" md="4"
					>
						<VtTextFieldWithValidation
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
			:detail="dialogPartsSearchMotorCasesDetail"
			:diameter="dialogPartsSearchMotorCasesDiameter"
			:part-types="manufacturerTypeMotorCase"
			@close="dialogPartsSearchMotorCasesManager.cancel()"
			@select="selectMotorCase"
		/>
	</VtFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailFormDialogProps } from '@/components/content/detailFormDialogProps';
import { useRocketSetupStageEditDialogComponent } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogComponent';
import { useRocketSetupStageEditDialogValidation } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogValidation';
import { useRocketSetupStageEditDialogComponentProps } from '@/components/content/rockets/setups/dialogs/rocketSetupStageEditDialogComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketPartsLookupDialog from '@/components/content/rockets/dialogs/parts/RocketPartsLookupDialog';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketSetupStageEditDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		RocketPartsLookupDialog,
		VtFormDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
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
			motorMountDiameters,
			isEditable,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemBallast,
			detailItemBallastMeasurementUnitId,
			detailItemBallastMeasurementUnitsId,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemEjectionDrogue,
			detailItemEjectionDrogueMeasurementUnitId,
			detailItemEjectionDrogueMeasurementUnitsId,
			detailItemEjectionDrogueBackup,
			detailItemEjectionDrogueBackupMeasurementUnitId,
			detailItemEjectionDrogueBackupMeasurementUnitsId,
			detailItemEjectionMain,
			detailItemEjectionMainMeasurementUnitId,
			detailItemEjectionMainMeasurementUnitsId,
			detailItemEjectionMainBackup,
			detailItemEjectionMainBackupMeasurementUnitId,
			detailItemEjectionMainBackupMeasurementUnitsId,
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
			dialogPartsSearchMotorCasesDetail,
			dialogPartsSearchMotorCasesDiameter,
			dialogPartsSearchMotorCasesManager,
			dialogPartsSearchMotorsDiameter,
			dialogPartsSearchMotorsManager,
			manufacturerTypeMotor,
			manufacturerTypeMotorCase,
			displayName,
			stageNumber,
			clickMotorsSearch,
			clickMotorCasesSearch,
			hasMotor,
			preCompleteOk,
			resetAdditional,
			selectMotor,
			selectMotorCase,
			setAdditional,
			scope,
			validation
		} = useRocketSetupStageEditDialogComponent(props, context);

		return {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			motorMountDiameters,
			isEditable,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			detailItemBallast,
			detailItemBallastMeasurementUnitId,
			detailItemBallastMeasurementUnitsId,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemEjectionDrogue,
			detailItemEjectionDrogueMeasurementUnitId,
			detailItemEjectionDrogueMeasurementUnitsId,
			detailItemEjectionDrogueBackup,
			detailItemEjectionDrogueBackupMeasurementUnitId,
			detailItemEjectionDrogueBackupMeasurementUnitsId,
			detailItemEjectionMain,
			detailItemEjectionMainMeasurementUnitId,
			detailItemEjectionMainMeasurementUnitsId,
			detailItemEjectionMainBackup,
			detailItemEjectionMainBackupMeasurementUnitId,
			detailItemEjectionMainBackupMeasurementUnitsId,
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
			dialogPartsSearchMotorCasesDetail,
			dialogPartsSearchMotorCasesDiameter,
			dialogPartsSearchMotorCasesManager,
			dialogPartsSearchMotorsDiameter,
			dialogPartsSearchMotorsManager,
			manufacturerTypeMotor,
			manufacturerTypeMotorCase,
			displayName,
			stageNumber,
			clickMotorsSearch,
			clickMotorCasesSearch,
			hasMotor,
			preCompleteOk,
			resetAdditional,
			selectMotor,
			selectMotorCase,
			setAdditional,
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
