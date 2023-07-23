<template>
	<div>
		<ContentHeader
			:value="contentTitle"
		/>
		<ContentDescription id="strings.content.tools.parachuteSizing" />
		<v-row dense>
			<v-col cols="12">
				<VFormControl
					ref="parachuteSizingFormRef"
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
											<VNumberFieldWithValidation
												ref="airDensityRef"
												v-model="airDensity"
												vid="airDensity"
												:validation="validation"
												:label="$t('forms.content.tools.parachuteSizing.airDensity')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="airDensityMeasurementUnitsIdRef"
												v-model="airDensityMeasurementUnitsId"
												vid="airDensityMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="airDensityMeasurementUnitIdRef"
												v-model="airDensityMeasurementUnitId"
												vid="airDensityMeasurementUnitId"
												:measurementUnitsId="airDensityMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsDensityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.density')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tr>
										<td>
											<VNumberFieldWithValidation
												ref="massRef"
												v-model="mass"
												vid="mass"
												:validation="validation"
												:label="$t('forms.content.tools.parachuteSizing.mass')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="massWeightMeasurementUnitsIdRef"
												v-model="massWeightMeasurementUnitsId"
												vid="massWeightMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="massWeightMeasurementUnitIdRef"
												v-model="massWeightMeasurementUnitId"
												vid="massWeightMeasurementUnitId"
												:measurementUnitsId="massWeightMeasurementUnitsId"
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
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="coeffDragRef"
									v-model="coeffDrag"
									vid="coeffDrag"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.coeffDrag')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tr>
										<td>
											<VNumberFieldWithValidation
												ref="desiredVelocityRef"
												v-model="desiredVelocity"
												vid="desiredVelocity"
												:validation="validation"
												:label="$t('forms.content.tools.parachuteSizing.desiredVelocity')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="desiredVelocityMeasurementUnitsIdRef"
												v-model="desiredVelocityMeasurementUnitsId"
												vid="desiredVelocityMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="desiredVelocityMeasurementUnitIdRef"
												v-model="desiredVelocityMeasurementUnitId"
												vid="desiredVelocityMeasurementUnitId"
												:measurementUnitsId="desiredVelocityMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsVelocityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.velocity')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12" lg="6">
								<table>
									<tr>
										<td>
											<span class="text-h7 text-bold">{{ $t('forms.content.tools.parachuteSizing.diameterMeasurementUnits') }}</span>&nbsp;&nbsp;
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="diameterLengthMeasurementUnitsIdRef"
												v-model="diameterLengthMeasurementUnitsId"
												vid="diameterLengthMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="diameterLengthMeasurementUnitIdRef"
												v-model="diameterLengthMeasurementUnitId"
												vid="diameterLengthMeasurementUnitId"
												:measurementUnitsId="diameterLengthMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsLengthType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.length')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
						</v-row>
					</template>
				</VFormControl>
			</v-col>
		</v-row>
		<v-row class="pt-4" dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense class="pb-2">
							<v-col class="text-center text-h5">
								{{ $t('strings.content.tools.parachuteSizing.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2">
							<v-col cols="12">
								<VMarkdown v-model="contentMarkup" :use-github=false />
							</v-col>
						</v-row>
						<v-row dense v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-h6 text-bold">{{ $t('forms.content.tools.parachuteSizing.diameter') }}</span>&nbsp;&nbsp;
										<span class="text-h6 text-bold" v-if="calculationResults.diameter">{{ calculationResults.diameter }}</span>
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
import { between, decimal, required } from '@vuelidate/validators';

import { useParachuteSizingBaseComponent } from '@/components/content/tools/parahcuteSizingBase';

import ContentAttribution from '@/components/content/Attribution';
import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import ContentDescription from '@/components/content/Description';
import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';

export default {
	name: 'ParachuteSizing',
	components: {
		ContentAttribution,
		CalculatedOuput,
		ContentDescription,
		ContentDescription,
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VFormControl,
		VMarkdown,
		VNumberFieldWithValidation,
		VSelectWithValidation
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
			contentLoadSignal,
			serviceStore,
			contentLoadStart,
			contentLoadStop,
			sortByOrder,
			target,
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
			measurementUnitsDensityType,
			measurementUnitsLengthType,
			measurementUnitsVelocityType,
			measurementUnitsWeightType,
			serviceToolsParachuteSizing,
			calculationData,
			calculationResults,
			airDensity,
			airDensityMeasurementUnitId,
			airDensityMeasurementUnitsId,
			coeffDrag,
			desiredVelocity,
			desiredVelocityMeasurementUnitId,
			desiredVelocityMeasurementUnitsId,
			diameterLengthMeasurementUnitId,
			diameterLengthMeasurementUnitsId,
			mass,
			massWeightMeasurementUnitId,
			massWeightMeasurementUnitsId,
			parachuteSizingFormRef,
			contentMarkup,
			calculationOk,
			initCalculationData,
			scope,
			validation,
		} = useParachuteSizingBaseComponent(props, context);

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
			contentLoadStart,
			contentLoadStop,
			sortByOrder,
			target,
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
			measurementUnitsDensityType,
			measurementUnitsLengthType,
			measurementUnitsVelocityType,
			measurementUnitsWeightType,
			serviceToolsParachuteSizing,
			calculationData,
			calculationResults,
			airDensity,
			airDensityMeasurementUnitId,
			airDensityMeasurementUnitsId,
			coeffDrag,
			desiredVelocity,
			desiredVelocityMeasurementUnitId,
			desiredVelocityMeasurementUnitsId,
			diameterLengthMeasurementUnitId,
			diameterLengthMeasurementUnitsId,
			mass,
			massWeightMeasurementUnitId,
			massWeightMeasurementUnitsId,
			parachuteSizingFormRef,
			contentMarkup,
			calculationOk,
			initCalculationData,
			scope,
			validation
		};
	},
	validations () {
		return {
			airDensity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			airDensityMeasurementUnitId: { required, $autoDirty: true },
			airDensityMeasurementUnitsId: { required, $autoDirty: true },
			coeffDrag: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			desiredVelocity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			desiredVelocityMeasurementUnitId: { required, $autoDirty: true },
			desiredVelocityMeasurementUnitsId: { required, $autoDirty: true },
			diameterLengthMeasurementUnitId: { required, $autoDirty: true },
			diameterLengthMeasurementUnitsId: { required, $autoDirty: true },
			mass: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			massWeightMeasurementUnitId: { required, $autoDirty: true },
			massWeightMeasurementUnitsId: { required, $autoDirty: true }
		};
	}
};
</script>
