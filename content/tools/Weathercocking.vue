<template>
	<div>
		<ContentHeader
			:value="contentTitle"
		/>
		<ContentDescription id="strings.content.tools.weathercocking" />
		<v-row dense>
			<v-col cols="12">
				<VtFormControl
					ref="weathercockingFormRef"
					:validation="validation"
					:reset-additional="resetAdditional"
					button-clear-name="buttons.reset"
					button-ok-name="buttons.calculate"
					notify-message-saved="messages.calculated"
					@ok="calculationOk"
				>
					<template v-slot:default>
						<v-row dense>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tr>
										<td>
											<VtNumberFieldWithValidation
												ref="windVelocityRef"
												v-model="windVelocity"
												vid="windVelocity"
												:validation="validation"
												:label="$t('forms.content.tools.weathercocking.windVelocity')"
											/>
										</td>
										<!-- <td class="measurementUnitsMedium">
											<MeasurementUnitsSelect
												ref="windVelocityMeasurementUnitsIdRef"
												v-model="windVelocityMeasurementUnitsId"
												vid="windVelocityMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td> -->
										<td class="measurementUnitLong">
											<!-- <MeasurementUnitSelect
												ref="windVelocityMeasurementUnitIdRef"
												v-model="windVelocityMeasurementUnitId"
												vid="windVelocityMeasurementUnitId"
												:measurementUnitsId="windVelocityMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsVelocityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.velocity')"
											/> -->
											<MeasurementUnitSelect2
												ref="windVelocityMeasurementUnitIdRef"
												v-model="windVelocityMeasurementUnitId"
												vid="windVelocityMeasurementUnitId"
												:measurementUnitsType="measurementUnitsVelocityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.velocity')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tr>
										<td>
											<VtNumberFieldWithValidation
												ref="exitVelocityRef"
												v-model="exitVelocity"
												vid="exitVelocity"
												:validation="validation"
												:label="$t('forms.content.tools.weathercocking.exitVelocity')"
											/>
										</td>
										<!-- <td class="measurementUnitsMedium">
											<MeasurementUnitsSelect
												ref="exitVelocityMeasurementUnitsIdRef"
												v-model="exitVelocityMeasurementUnitsId"
												vid="exitVelocityMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td> -->
										<td class="measurementUnitLong">
											<!-- <MeasurementUnitSelect
												ref="exitVelocityMeasurementUnitIdRef"
												v-model="exitVelocityMeasurementUnitId"
												vid="exitVelocityMeasurementUnitId"
												:measurementUnitsId="exitVelocityMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsVelocityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.velocity')"
											/> -->
											<MeasurementUnitSelect2
												ref="exitVelocityMeasurementUnitIdRef"
												v-model="exitVelocityMeasurementUnitId"
												vid="exitVelocityMeasurementUnitId"
												:measurementUnitsType="measurementUnitsVelocityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.velocity')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
						</v-row>
					</template>
				</VtFormControl>
			</v-col>
		</v-row>
		<v-row class="pt-4" dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense class="pb-2">
							<v-col class="text-center text-h5">
								{{ $t('strings.content.tools.weathercocking.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2" v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-h6 text-bold">{{ $t('strings.content.tools.weathercocking.degrees') }}</span>&nbsp;&nbsp;
									</v-col>
									<v-col cols="4">
										<span class="text-h6 text-bold">{{ $t('strings.content.tools.weathercocking.weathercocked') }}</span>&nbsp;&nbsp;
									</v-col>
								</v-row>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-bold">{{ calculationResults.angleDegrees }}</span>
									</v-col>
									<v-col cols="4">
										<span
										class="text-bold"
										:style="'color: ' + (calculationResults.weathercocked ? 'red' : 'green')"
									>{{ calculationResults.weathercocked ? $t('strings.yes') : $t('strings.no') }}</span>
									</v-col>
								</v-row>
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
	</div>
</template>

<script>
// import { between, decimal, required } from '@vuelidate/validators';

import { useWeathercockingBaseComponent } from '@/components/content/tools/weathercockingBase';
import { useWeatherCockingValidation } from '@/components/content/tools/weathercockingValidation';

import ContentAttribution from '@/components/content/Attribution';
import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import ContentDescription from '@/components/content/Description';
import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';

export default {
	name: 'Weathercocking',
	components: {
		ContentAttribution,
		CalculatedOuput,
		ContentDescription,
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		VtFormControl,
		VtNumberFieldWithValidation,
		VtSelectWithValidation
	},
	setup (props, context) {
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
			errorTimer,
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
			setErrorTimer,
			setNotify,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsVelocityType,
			serviceToolsWeathercocking,
			calculationData,
			calculationResults,
			exitVelocity,
			exitVelocityMeasurementUnitsId,
			exitVelocityMeasurementUnitId,
			weathercockingFormRef,
			windVelocity,
			windVelocityMeasurementUnitsId,
			windVelocityMeasurementUnitId,
			calculationOk,
			initCalculationData,
			scope,
			validation,
		} = useWeathercockingBaseComponent(props, context);

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
			errorTimer,
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
			setErrorTimer,
			setNotify,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsVelocityType,
			serviceToolsWeathercocking,
			calculationData,
			calculationResults,
			exitVelocity,
			exitVelocityMeasurementUnitsId,
			exitVelocityMeasurementUnitId,
			weathercockingFormRef,
			windVelocity,
			windVelocityMeasurementUnitsId,
			windVelocityMeasurementUnitId,
			calculationOk,
			initCalculationData,
			scope,
			validation
		};
	},
	validations () {
		return useWeatherCockingValidation;
	}
};
</script>
