<template>
	<ToolsLayout>
		<v-alert
			v-if="warningOffline"
			type="warning"
			:text="warningOffline"
		></v-alert>
		<ContentHeader
			:value="contentTitle"
		/>
		<ContentDescription id="strings.content.tools.thrust2Weight" />
		<v-row dense>
			<v-col cols="12">
				<VtFormControl
					ref="formThrust2WeightRef"
					:validation="validation"
					:reset-additional="resetAdditional"
					button-clear-name="buttons.reset"
					button-ok-name="buttons.calculate"
					notify-message-saved="messages.calculated"
					@ok="calculationOk"
				>
					<template v-slot:default>
						<v-row dense>
							<v-col cols="12" md="6">
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="massRef"
													v-model="mass"
													vid="mass"
													:validation="validation"
													:label="$t('forms.content.tools.thrust2Weight.mass')"
												/>
											</td>
											<!-- <td
												v-if="$vuetify.display.mdAndUp"
												class="measurementUnitsMedium"
											>
												<MeasurementUnitsSelect
													ref="massMeasurementUnitsIdRef"
													v-model="massMeasurementUnitsId"
													vid="massMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td
												v-if="$vuetify.display.mdAndUp"
												class="measurementUnitMedium"
											>
												<MeasurementUnitSelect
													ref="massMeasurementUnitRef"
													v-model="massMeasurementUnitId"
													vid="massMeasurementUnitId"
													:measurementUnitsId="massMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsWeightType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.weight')"
												/>
											</td> -->
											<td
												class="measurementUnits3"
											>
												<MeasurementUnitSelect2
													ref="massMeasurementUnitRef"
													v-model="massMeasurementUnitId"
													vid="massMeasurementUnitId"
													:measurementUnitsType="measurementUnitsWeightType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.weight')"
												/>
											</td>
										</tr>
										<!-- <tr
											v-if="$vuetify.display.smAndDown"
										>
											<td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="massMeasurementUnitsIdRef"
													v-model="massMeasurementUnitsId"
													vid="massMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect
													ref="massMeasurementUnitRef"
													v-model="massMeasurementUnitId"
													vid="massMeasurementUnitId"
													:measurementUnitsId="massMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsWeightType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.weight')"
												/>
											</td>
										</tr> -->
									</tbody>
								</table>
							</v-col>
							<v-col cols="12" md="6">
								<VtNumberFieldWithValidation
									ref="maxLaunchRodTimeRef"
									v-model="maxLaunchRodTime"
									vid="maxLaunchRodTime"
									:validation="validation"
									:label="$t('forms.content.tools.thrust2Weight.max_launch_rod_timespan')"
									:placeholder="$t('forms.content.tools.thrust2Weight.max_launch_rod_timespan_hint')"
								/>
							</v-col>
							<v-col cols="12" md="6">
								<v-row dense>
									<v-col cols="12">
										<VtCheckboxWithValidation
											ref="motorSelected1Ref"
											v-model="motorSelected1"
											vid="motorSelected1"
											:validation="validation"
											:readonly="true"
											:label="$t('forms.content.tools.thrust2Weight.specifications') + ' 1'"
										/>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustInitial1Ref"
											v-model="thrustInitial1"
											vid="thrustInitial1"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustPeak1Ref"
											v-model="thrustPeak1"
											vid="thrustPeak1"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustAverage1Ref"
											v-model="thrustAverage1"
											vid="thrustAverage1"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
										/>
									</v-col>
									<v-col cols="12" lg="6">
										<table>
											<tbody>
												<tr>
													<td style="width: 100%;">
														<VtTextField
															ref="motorLookup1Ref"
															v-model="motorLookup1"
															vid="motorLookup1"
															:readonly="true"
															:label="$t('forms.content.tools.thrust2Weight.motor')"
															:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
														/>
													</td>
													<td>
														<v-btn
															:variant="buttonsForms.variant.default"
															:color="buttonsForms.color.default"
															class="ml-2"
															@click="clickMotorSearch(1)"
														>
															{{ $t('buttons.search') }}
														</v-btn>
													</td>
												</tr>
											</tbody>
										</table>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="12" md="6">
								<v-row dense>
									<v-col cols="12">
										<VtCheckboxWithValidation
											ref="motorSelected2Ref"
											v-model="motorSelected2"
											vid="motorSelected2"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.specifications') + ' 2'"
										/>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustInitial2Ref"
											v-model="thrustInitial2"
											vid="thrustInitial2"
											:validation="validation"
											:readonly="!motorSelected2"
											:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustPeak2Ref"
											v-model="thrustPeak2"
											vid="thrustPeak2"
											:validation="validation"
											:readonly="!motorSelected2"
											:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustAverage2Ref"
											v-model="thrustAverage2"
											vid="thrustAverage2"
											:validation="validation"
											:readonly="!motorSelected2"
											:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
										/>
									</v-col>
									<v-col cols="12" lg="6">
										<table>
											<tbody>
												<tr>
													<td style="width: 100%;">
														<VtTextField
															ref="motorLookup2Ref"
															v-model="motorLookup2"
															vid="motorLookup2"
															:readonly="true"
															:label="$t('forms.content.tools.thrust2Weight.motor')"
															:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
														/>
													</td>
													<td>
														<v-btn
															:variant="buttonsForms.variant.default"
															:color="buttonsForms.color.default"
															class="ml-2"
															:disabled="!motorSelected2"
															@click="clickMotorSearch(2)"
														>
															{{ $t('buttons.search') }}
														</v-btn>
													</td>
												</tr>
											</tbody>
										</table>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="12" md="6">
								<v-row dense>
									<v-col cols="12">
										<VtCheckboxWithValidation
											ref="motorSelected3Ref"
											v-model="motorSelected3"
											vid="motorSelected3"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.specifications') + ' 3'"
										/>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustInitial3Ref"
											v-model="thrustInitial3"
											vid="thrustInitial3"
											:validation="validation"
											:readonly="!motorSelected3"
											:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustPeak3Ref"
											v-model="thrustPeak3"
											vid="thrustPeak3"
											:validation="validation"
											:readonly="!motorSelected3"
											:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustAverage3Ref"
											v-model="thrustAverage3"
											vid="thrustAverage3"
											:validation="validation"
											:readonly="!motorSelected3"
											:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
										/>
									</v-col>
									<v-col cols="12" lg="6">
										<table>
											<tbody>
												<tr>
													<td style="width: 100%;">
														<VtTextField
															ref="motorLookup3Ref"
															v-model="motorLookup3"
															vid="motorLookup3"
															:readonly="true"
															:label="$t('forms.content.tools.thrust2Weight.motor')"
															:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
														/>
													</td>
													<td>
														<v-btn
															:variant="buttonsForms.variant.default"
															:color="buttonsForms.color.default"
															class="ml-2"
															:disabled="!motorSelected3"
															@click="clickMotorSearch(3)"
														>
															{{ $t('buttons.search') }}
														</v-btn>
													</td>
												</tr>
											</tbody>
										</table>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="12" md="6">
								<v-row dense>
									<v-col cols="12">
										<VtCheckboxWithValidation
											ref="motorSelected4Ref"
											v-model="motorSelected4"
											vid="motorSelected4"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.specifications') + ' 4'"
										/>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustInitial4Ref"
											v-model="thrustInitial4"
											vid="thrustInitial4"
											:validation="validation"
											:readonly="!motorSelected4"
											:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustPeak4Ref"
											v-model="thrustPeak4"
											vid="thrustPeak4"
											:validation="validation"
											:readonly="!motorSelected4"
											:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VtNumberFieldWithValidation
											ref="thrustAverage4Ref"
											v-model="thrustAverage4"
											vid="thrustAverage4"
											:validation="validation"
											:readonly="!motorSelected4"
											:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
										/>
									</v-col>
									<v-col cols="12" lg="6">
										<table>
											<tbody>
												<tr>
													<td style="width: 100%;">
														<VtTextField
															ref="motorLookup4Ref"
															v-model="motorLookup4"
															vid="motorLookup4"
															:readonly="true"
															:label="$t('forms.content.tools.thrust2Weight.motor')"
															:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
														/>
													</td>
													<td>
														<v-btn
															:variant="buttonsForms.variant.default"
															:color="buttonsForms.color.default"
															class="ml-2"
															:disabled="!motorSelected4"
															@click="clickMotorSearch(4)"
														>
															{{ $t('buttons.search') }}
														</v-btn>
													</td>
												</tr>
											</tbody>
										</table>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</template>
					<!-- <template v-slot:buttons_pre>
						<v-btn
							class="mr-2"
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							@click="clickMotorSearch"
						>
							{{ $t('buttons.search') }}
						</v-btn>
					</template> -->
				</VtFormControl>
			</v-col>
		</v-row>
		<v-row class="pt-4" dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense class="pb-2">
							<v-col class="text-center text-h5">
								{{ $t('strings.content.tools.thrust2Weight.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2" v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="3">
										<span class="text-h6 text-bold">{{ $t('forms.content.tools.thrust2Weight.specifications') }}</span>
									</v-col>
									<v-col cols="3">
										<span class="text-h6 text-bold">{{ $t('forms.content.tools.thrust2Weight.thrust_initial') }}</span>
									</v-col>
									<v-col cols="3">
										<span class="text-h6 text-bold">{{ $t('forms.content.tools.thrust2Weight.thrust_peak') }}</span>
									</v-col>
									<v-col cols="3">
										<span class="text-h6 text-bold">{{ $t('forms.content.tools.thrust2Weight.thrust_average') }}</span>
									</v-col>
								</v-row>
								<v-row
									class="pb-2" dense
									v-for="(item, index) in calculationResults.data"
									:key="index"
								>
									<v-col cols="3">
										<span>{{ index+1 }}</span>
									</v-col>
									<v-col cols="3">
										<span>{{ (item.initial) + ' '  + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
									<v-col cols="3">
										<span v-if="item.peak">{{ item.peak + ' ' + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
									<v-col cols="3">
										<span v-if="item.average">{{ item.average + ' ' + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
						<v-row dense class="pb-4">
							<v-col>
								<div v-html="$t('strings.content.tools.thrust2Weight.guidance', { thrustCurve: linkThrustCurve})"></div>
								<div v-if="hasResults">
									<br>
									{{ $t('strings.content.tools.thrust2Weight.guidance2') }}
								</div>
							</v-col>
						</v-row>
						<CalculatedOuput
							v-model="calculationOutput"
						/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row dense
			v-show="hasAttribution"
		>
			<v-col cols="12" class="text-center text-h5 pb-2; float: right">
				<v-card>
					<v-card-text class="float: right">
<ContentAttribution :value="content" @has-attribution="handleAttribution" />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</ToolsLayout>
	<MotorLookupDialog
		ref="dialogMotorSearchRef"
		:signal="dialogMotorSearchManager.signal"
		@close="dialogMotorSearchManager.cancel()"
		@ok="selectMotor"
	/>
</template>

<script>
import { ref } from 'vue';
// import { between, decimal, helpers, required } from '@vuelidate/validators';

// import AppUtility from '@/utility/app';
// import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useThrust2WeightBaseComponent } from '@/components/content/tools/thrust2WeightBase';
import { useThrust2WeightValidation } from '@/components/content/tools/thrust2WeightValidation';

import ContentAttribution from '@/components/content/Attribution';
import CalculatedOuput from '@/components/content/tools/CalculatedOuput';
import ContentDescription from '@/components/content/Description';
import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import MotorLookupDialog from '@/components/external/MotorLookupDialog';
import ToolsLayout from '@/components/content/tools/Layout.vue';
import VtCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtCheckboxWithValidation';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'Thrust2Weight',
	components: {
		ContentAttribution,
		CalculatedOuput,
		ContentDescription,
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		MotorLookupDialog,
		ToolsLayout,
		VtCheckboxWithValidation,
		VtFormControl,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextField
	},
	setup (props, context) {
		const formThrust2WeightRef = ref(null);

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
			sortByOrder,
			target,
			contentLoadSignal,
			contentLoadStart,
			contentLoadStop,
			calculationOutput,
			content,
			contentTitle,
			errors,
			errorMessage,
			hasAttribution,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			calculateI,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetAdditional,
			setErrorMessage,
			setNotify,
			setSuccessMessage,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsWeightType,
			serviceToolsThrust2Weight,
			calculationResults,
			dialogMotorSearchRef,
			dialogMotorSearchManager,
			linkThrustCurve,
			mass,
			massMeasurementUnitId,
			massMeasurementUnitsId,
			maxLaunchRodTime,
			maxLaunchRodTimeDefault,
			motorLookup1,
			motorLookup2,
			motorLookup3,
			motorLookup4,
			motorLookupSelection,
			motorSelected1,
			motorSelected2,
			motorSelected3,
			motorSelected4,
			motorLookupUrl1,
			motorLookupUrl2,
			motorLookupUrl3,
			motorLookupUrl4,
			thrustAverage1,
			thrustAverage2,
			thrustAverage3,
			thrustAverage4,
			thrustInitial1,
			thrustInitial2,
			thrustInitial3,
			thrustInitial4,
			thrustPeak1,
			thrustPeak2,
			thrustPeak3,
			thrustPeak4,
			warningOffline,
			calculationOk,
			clickMotorSearch,
			hasResults,
			selectMotor,
			scope,
			validation
		} = useThrust2WeightBaseComponent(props, context, formThrust2WeightRef);

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
			sortByOrder,
			target,
			contentLoadSignal,
			contentLoadStart,
			contentLoadStop,
			calculationOutput,
			content,
			contentTitle,
			errors,
			errorMessage,
			hasAttribution,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			calculateI,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetAdditional,
			setErrorMessage,
			setNotify,
			setSuccessMessage,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsWeightType,
			serviceToolsThrust2Weight,
			calculationResults,
			dialogMotorSearchRef,
			dialogMotorSearchManager,
			linkThrustCurve,
			mass,
			massMeasurementUnitId,
			massMeasurementUnitsId,
			maxLaunchRodTime,
			maxLaunchRodTimeDefault,
			motorLookup1,
			motorLookup2,
			motorLookup3,
			motorLookup4,
			motorLookupSelection,
			motorSelected1,
			motorSelected2,
			motorSelected3,
			motorSelected4,
			motorLookupUrl1,
			motorLookupUrl2,
			motorLookupUrl3,
			motorLookupUrl4,
			thrustAverage1,
			thrustAverage2,
			thrustAverage3,
			thrustAverage4,
			thrustInitial1,
			thrustInitial2,
			thrustInitial3,
			thrustInitial4,
			thrustPeak1,
			thrustPeak2,
			thrustPeak3,
			thrustPeak4,
			warningOffline,
			calculationOk,
			clickMotorSearch,
			hasResults,
			selectMotor,
			scope,
			validation,
			formThrust2WeightRef
		};
	},
	validations () {
		return useThrust2WeightValidation;
		// return {
		// 	data2: { $autoDirty: true },
		// 	mass: { required, decimal, between: between(0, 9999), $autoDirty: true },
		// 	massMeasurementUnitId: { $autoDirty: true },
		// 	massMeasurementUnitsId: { required, $autoDirty: true },
		// 	maxLaunchRodTime: { required, decimal, between: between(0, 5), $autoDirty: true },
		// 	motorSelected1: { $autoDirty: true },
		// 	motorSelected2: { $autoDirty: true },
		// 	motorSelected3: { $autoDirty: true },
		// 	motorSelected4: { $autoDirty: true },
		// 	thrustAverage1: {
		// 		decimal, between: between(0, 40960),
		// 		thrustAverageInitial1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial1),
		// 		thrustAveragePeak1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak1),
		// 		$autoDirty: true, $lazy: true
		// 	},
		// 	thrustAverage2: {
		// 		decimal, between: between(0, 40960),
		// 		thrustAverageInitial2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial2),
		// 		thrustAveragePeak2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak2),
		// 		$autoDirty: true, $lazy: true
		// 	},
		// 	thrustAverage3: {
		// 		decimal, between: between(0, 40960),
		// 		thrustAverageInitial3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial3),
		// 		thrustAveragePeak3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak3),
		// 		$autoDirty: true, $lazy: true
		// 	},
		// 	thrustAverage4: {
		// 		decimal, between: between(0, 40960),
		// 		thrustAverageInitial4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial4),
		// 		thrustAveragePeak4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak4),
		// 		$autoDirty: true, $lazy: true
		// 	},
		// 	thrustInitial1: {
		// 		required, decimal, between: between(0, 40960),
		// 		thrustInitialAverage1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage1),
		// 		thrustInitialPeak1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak1),
		// 		$autoDirty: true
		// 	},
		// 	thrustInitial2: {
		// 		thrustInitialtRequired2, decimal, between: between(0, 40960),
		// 		thrustInitialAverage2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage2),
		// 		thrustInitialPeak2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak2),
		// 		$autoDirty: true
		// 	},
		// 	thrustInitial3: {
		// 		thrustInitialtRequired3, decimal, between: between(0, 40960),
		// 		thrustInitialAverage3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage3),
		// 		thrustInitialPeak3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak3),
		// 		$autoDirty: true
		// 	},
		// 	thrustInitial4: {
		// 		thrustInitialtRequired4, decimal, between: between(0, 40960),
		// 		thrustInitialAverage4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage4),
		// 		thrustInitialPeak4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak4),
		// 		$autoDirty: true
		// 	},
		// 	// thrustInitial3: { required, decimal, between: between(0, 40960), $autoDirty: true },
		// 	// thrustInitial4: { required, decimal, between: between(0, 40960), $autoDirty: true },
		// 	thrustPeak1: {
		// 		decimal, between: between(0, 40960),
		// 		thrustPeakAverage1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage1),
		// 		thrustPeakInitial1: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial1),
		// 		$autoDirty: true, $lazy: true
		// 	},
		// 	thrustPeak2: {
		// 		decimal, between: between(0, 40960),
		// 		thrustPeakAverage2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage2),
		// 		thrustPeakInitial2: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial2),
		// 		$autoDirty: true, $lazy: true
		// 	},
		// 	thrustPeak3: {
		// 		decimal, between: between(0, 40960),
		// 		thrustPeakAverage3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage3),
		// 		thrustPeakInitial3: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial3),
		// 		$autoDirty: true, $lazy: true
		// 	},
		// 	thrustPeak4: {
		// 		decimal, between: between(0, 40960),
		// 		thrustPeakAverage4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage4),
		// 		thrustPeakInitial4: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial4),
		// 		$autoDirty: true, $lazy: true
		// 	},
		// };
	}
};

// const thrustInitialtRequired2 = (value, siblings, vm) => {
// 	return siblings.motorSelected2 ? !String.isNullOrEmpty(value) && siblings.motorSelected2 && siblings.thrustInitial2 : true;
// }
// const thrustInitialtRequired3 = (value, siblings, vm) => {
// 	return siblings.motorSelected3 ? !String.isNullOrEmpty(value) && siblings.motorSelected3 && siblings.thrustInitial3 : true;
// }
// const thrustInitialtRequired4 = (value, siblings, vm) => {
// 	return siblings.motorSelected4 ? !String.isNullOrEmpty(value) && siblings.motorSelected4 && siblings.thrustInitial4: true;
// }

// const thrustAverageInitialI = (value, initial) => {
// 	if (!value)
// 		return true;
// 	if (String.isNullOrEmpty(initial))
// 		return true;
// 	// return (value > LibraryClientUtility.convertNumber(initial));
// 	return true;
// }
// const thrustAverageInitial1 = (value, siblings, vm) => {
// 	return thrustAverageInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial1);
// }
// const thrustAverageInitial2 = (value, siblings, vm) => {
// 	return thrustAverageInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial2);
// }
// const thrustAverageInitial3 = (value, siblings, vm) => {
// 	return thrustAverageInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial3);
// }
// const thrustAverageInitial4 = (value, siblings, vm) => {
// 	return thrustAverageInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial4);
// }

// const thrustInitialAverageI = (value, average) => {
// 	if (!value)
// 		return true;
// 	if (String.isNullOrEmpty(average))
// 		return true;
// 	// return (value <= LibraryClientUtility.convertNumber(average));
// 	return true;
// }
// const thrustInitialAverage1 = (value, siblings, vm) => {
// 	return thrustInitialAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage1);
// }
// const thrustInitialAverage2 = (value, siblings, vm) => {
// 	return thrustInitialAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage2);
// }
// const thrustInitialAverage3 = (value, siblings, vm) => {
// 	return thrustInitialAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage3);
// }
// const thrustInitialAverage4 = (value, siblings, vm) => {
// 	return thrustInitialAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage4);
// }

// const thrustInitialPeakI = (value, peak) => {
// 	if (!value)
// 		return true;
// 	if (String.isNullOrEmpty(peak))
// 		return true;
// 	return (value <= LibraryClientUtility.convertNumber(peak));
// }
// const thrustInitialPeak1 = (value, siblings, vm) => {
// 	return thrustInitialPeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak1);
// }
// const thrustInitialPeak2 = (value, siblings, vm) => {
// 	return thrustInitialPeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak2);
// }
// const thrustInitialPeak3 = (value, siblings, vm) => {
// 	return thrustInitialPeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak3);
// }
// const thrustInitialPeak4 = (value, siblings, vm) => {
// 	return thrustInitialPeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak4);
// }

// const thrustAveragePeakI = (value, peak, vm) => {
// 	if (!value)
// 		return true;
// 	if (String.isNullOrEmpty(peak))
// 		return true;
// 	return (value < LibraryClientUtility.convertNumber(peak));
// }
// const thrustAveragePeak1 = (value, siblings, vm) => {
// 	return thrustAveragePeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak1);
// }
// const thrustAveragePeak2 = (value, siblings, vm) => {
// 	return thrustAveragePeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak2);
// }
// const thrustAveragePeak3 = (value, siblings, vm) => {
// 	return thrustAveragePeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak3);
// }
// const thrustAveragePeak4 = (value, siblings, vm) => {
// 	return thrustAveragePeakI(LibraryClientUtility.convertNumber(value), siblings.thrustPeak4);
// }

// const thrustPeakAverageI = (value, average) => {
// 	if (!value)
// 		return true;
// 	if (String.isNullOrEmpty(average))
// 		return true;
// 	return (value > LibraryClientUtility.convertNumber(average));
// }
// const thrustPeakAverage1 = (value, siblings, vm) => {
// 	return thrustPeakAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage1);
// }
// const thrustPeakAverage2 = (value, siblings, vm) => {
// 	return thrustPeakAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage2);
// }
// const thrustPeakAverage3 = (value, siblings, vm) => {
// 	return thrustPeakAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage3);
// }
// const thrustPeakAverage4 = (value, siblings, vm) => {
// 	return thrustPeakAverageI(LibraryClientUtility.convertNumber(value), siblings.thrustAverage4);
// }

// const thrustPeakInitialI = (value, initial) => {
// 	if (!value)
// 		return true;
// 	if (String.isNullOrEmpty(initial))
// 		return true;
// 	return (value >= LibraryClientUtility.convertNumber(initial));
// }
// const thrustPeakInitial1 = (value, siblings, vm) => {
// 	return thrustPeakInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial1);
// }
// const thrustPeakInitial2 = (value, siblings, vm) => {
// 	return thrustPeakInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial2);
// }
// const thrustPeakInitial3 = (value, siblings, vm) => {
// 	return thrustPeakInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial3);
// }
// const thrustPeakInitial4 = (value, siblings, vm) => {
// 	return thrustPeakInitialI(LibraryClientUtility.convertNumber(value), siblings.thrustInitial4);
// }
</script>
