<template>
	<ToolsLayout>
		<ContentHeader
			:value="contentTitle"
		/>
		<ContentDescription id="strings.content.tools.parachuteSizing" />
		<v-row dense>
			<v-col cols="12">
				<VtFormControl
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
							<v-col cols="12" sm="6">
								<VtSelectWithValidation
									ref="calculationTypeRef"
									v-model="calculationType"
									vid="calculationType"
									:items="calculationTypes"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.calculationType.title')"
								/>
							</v-col>
							<v-col cols="12" sm="6">
								<table style="width: 100%;">
									<tbody>
										<tr
											v-if="calculationType==='diameter'"
										>
											<td>
												<span class="text-h7 text-bold">{{ $t('forms.content.tools.parachuteSizing.output') + ' ' + $t('forms.content.tools.parachuteSizing.diameterMeasurementUnits') }}</span>&nbsp;&nbsp;
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="diameterLengthMeasurementUnitsIdRef"
													v-model="diameterLengthMeasurementUnitsId"
													vid="diameterLengthMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect
													ref="diameterLengthMeasurementUnitIdRef"
													v-model="diameterLengthMeasurementUnitId"
													vid="diameterLengthMeasurementUnitId"
													:measurementUnitsId="diameterLengthMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td> -->
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="diameterLengthMeasurementUnitIdRef"
													v-model="diameterLengthMeasurementUnitId"
													vid="diameterLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.diameter')"
												/>
											</td>
										</tr>
										<tr
											v-if="calculationType==='velocity'"
										>
											<td>
												<span class="text-h7 text-bold">{{ $t('forms.content.tools.parachuteSizing.output') + ' ' + $t('forms.content.tools.parachuteSizing.velocityMeasurementUnits') }}</span>&nbsp;&nbsp;
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="velocityMeasurementUnitsIdRef"
													v-model="velocityMeasurementUnitsId"
													vid="velocityMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitLong">
												<MeasurementUnitSelect
													ref="velocityMeasurementUnitIdRef"
													v-model="velocityMeasurementUnitId"
													vid="velocityMeasurementUnitId"
													:measurementUnitsId="velocityMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsVelocityType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.velocity')"
												/>
											</td> -->
											<td class="measurementUnitLong">
												<MeasurementUnitSelect2
													ref="velocityMeasurementUnitIdRef"
													v-model="velocityMeasurementUnitId"
													vid="velocityMeasurementUnitId"
													:measurementUnitsType="measurementUnitsVelocityType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.velocity')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="massRef"
													v-model="mass"
													vid="mass"
													:validation="validation"
													:label="$t('forms.content.rockets.name') + ' ' + $t('forms.content.tools.parachuteSizing.mass')"
												/>
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="massWeightMeasurementUnitsIdRef"
													v-model="massWeightMeasurementUnitsId"
													vid="massWeightMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect
													ref="massWeightMeasurementUnitIdRef"
													v-model="massWeightMeasurementUnitId"
													vid="massWeightMeasurementUnitId"
													:measurementUnitsId="massWeightMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsWeightType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.weight')"
												/>
											</td> -->
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="massWeightMeasurementUnitIdRef"
													v-model="massWeightMeasurementUnitId"
													vid="massWeightMeasurementUnitId"
													:measurementUnitsType="measurementUnitsWeightType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.weight')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="airDensityRef"
													v-model="airDensity"
													vid="airDensity"
													:validation="validation"
													:label="$t('forms.content.tools.parachuteSizing.airDensity')"
													:hint="$t('forms.content.tools.parachuteSizing.airDensity_hint')"
												/>
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="airDensityMeasurementUnitsIdRef"
													v-model="airDensityMeasurementUnitsId"
													vid="airDensityMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitExtraLong">
												<MeasurementUnitSelect
													ref="airDensityMeasurementUnitIdRef"
													v-model="airDensityMeasurementUnitId"
													vid="airDensityMeasurementUnitId"
													:measurementUnitsId="airDensityMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsDensityType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.density')"
												/>
											</td> -->
											<td class="measurementUnitExtraLong">
												<MeasurementUnitSelect2
													ref="airDensityMeasurementUnitIdRef"
													v-model="airDensityMeasurementUnitId"
													vid="airDensityMeasurementUnitId"
													:measurementUnitsType="measurementUnitsDensityType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.density')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12" sm="6" >
								<VtNumberFieldWithValidation
									ref="coeffDragRef"
									v-model="coeffDrag"
									vid="coeffDrag"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.coeffDrag')"
									:hint="$t('forms.content.tools.parachuteSizing.coeffDrag_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6">
								<table style="width: 100%;">
									<tbody>
										<tr
											v-if="calculationType==='diameter'"
										>
											<td
											>
												<VtNumberFieldWithValidation
													ref="desiredVelocityRef"
													v-model="desiredVelocity"
													vid="desiredVelocity"
													:validation="validation"
													:label="$t('forms.content.tools.parachuteSizing.desiredVelocity')"
													:hint="$t('forms.content.tools.parachuteSizing.desiredVelocity_hint')"
												/>
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="desiredVelocityMeasurementUnitsIdRef"
													v-model="desiredVelocityMeasurementUnitsId"
													vid="desiredVelocityMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitLong">
												<MeasurementUnitSelect
													ref="desiredVelocityMeasurementUnitIdRef"
													v-model="desiredVelocityMeasurementUnitId"
													vid="desiredVelocityMeasurementUnitId"
													:measurementUnitsId="desiredVelocityMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsVelocityType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.velocity')"
												/>
											</td> -->
											<td class="measurementUnitLong">
												<MeasurementUnitSelect2
													ref="desiredVelocityMeasurementUnitIdRef"
													v-model="desiredVelocityMeasurementUnitId"
													vid="desiredVelocityMeasurementUnitId"
													:measurementUnitsType="measurementUnitsVelocityType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.velocity')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
						</v-row>
						<!-- <v-row dense>
							<v-col cols="12" sm="6" >
								<table style="width: 100%;">
									<tbody>
										<tr
											v-if="calculationType==='velocity'"
										>
											<td
											>
												<VtNumberFieldWithValidation
													ref="parachuteDiameterRef"
													v-model="parachuteDiameter"
													vid="parachuteDiameter"
													:validation="validation"
													:label="$t('forms.content.tools.parachuteSizing.diameter')"
													:hint="$t('forms.content.tools.parachuteSizing.diameter_hint')"
												/>
											</td>
											<td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="diameterLengthMeasurementUnitsIdRef"
													v-model="diameterLengthMeasurementUnitsId"
													vid="diameterLengthMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
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
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="diameterLengthMeasurementUnitIdRef"
													v-model="diameterLengthMeasurementUnitId"
													vid="diameterLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
						</v-row> -->
						<v-row dense>
							<v-col cols="12" sm="6">
								<VtSelectWithValidation
									ref="parachuteShapeRef"
									v-model="parachuteShape"
									vid="parachuteShape"
									:items="parachuteShapes"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.parachuteShape')"
									:hint="$t('forms.content.tools.parachuteSizing.parachuteShape_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6">
								<VtSelectWithValidation
									ref="spillHoleShapeRef"
									v-model="spillHoleShape"
									vid="spillHoleShape"
									:items="spillHoleShapes"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.spillHole.shape')"
									:hint="$t('forms.content.tools.parachuteSizing.spillHole.shape_hint')"
								/>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12" sm="6" >
								<table style="width: 100%;">
									<tbody>
										<tr
											v-if="calculationType==='velocity'"
										>
											<td
											>
												<VtNumberFieldWithValidation
													ref="parachuteDiameterRef"
													v-model="parachuteDiameter"
													vid="parachuteDiameter"
													:validation="validation"
													:label="$t('forms.content.tools.parachuteSizing.diameter')"
													:hint="$t('forms.content.tools.parachuteSizing.diameter_hint')"
												/>
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="diameterLengthMeasurementUnitsIdRef"
													v-model="diameterLengthMeasurementUnitsId"
													vid="diameterLengthMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect
													ref="diameterLengthMeasurementUnitIdRef"
													v-model="diameterLengthMeasurementUnitId"
													vid="diameterLengthMeasurementUnitId"
													:measurementUnitsId="diameterLengthMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td> -->
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="diameterLengthMeasurementUnitIdRef"
													v-model="diameterLengthMeasurementUnitId"
													vid="diameterLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<v-col cols="12" sm="6">
								<!-- <VtNumberFieldWithValidation
									ref="spillHoleDiameterRef"
									v-model="spillHoleDiameter"
									vid="spillHoleDiameter"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.spillHole.diameter')"
									:hint="$t('forms.content.tools.parachuteSizing.spillHole.diameter_hint')"
								/> -->
								<table style="width: 100%;">
									<tbody>
										<tr
											v-if="calculationType==='diameter'"
										>
											<td
											>
												<VtNumberFieldWithValidation
													ref="spillHoleDiameterRef"
													v-model="spillHoleDiameter"
													vid="spillHoleDiameter"
													:validation="validation"
													:label="$t('forms.content.tools.parachuteSizing.spillHole.diameter')"
													:hint="$t('forms.content.tools.parachuteSizing.spillHole.diameter_hint')"
												/>
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="desiredVelocityMeasurementUnitsIdRef"
													v-model="desiredVelocityMeasurementUnitsId"
													vid="desiredVelocityMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitLong">
												<MeasurementUnitSelect
													ref="spillHoleDiameterLengthMeasurementUnitIdRef"
													v-model="spillHoleDiameterLengthMeasurementUnitId"
													vid="spillHoleDiameterLengthMeasurementUnitId"
													:measurementUnitsId="desiredVelocityMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.diameter')"
												/>
											</td> -->
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="spillHoleDiameterLengthMeasurementUnitIdRef"
													v-model="spillHoleDiameterLengthMeasurementUnitId"
													vid="spillHoleDiameterLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.diameter')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<!-- <v-col cols="4" sn="4">
								<VtNumberFieldWithValidation
									ref="spillHolePctRef"
									v-model="spillHolePct"
									vid="spillHolePct"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.spillHole.pct')"
									:hint="$t('forms.content.tools.parachuteSizing.spillHole.pCt_hint')"
								/>
							</v-col> -->
							<!-- <v-col cols="6" sn="6">
								<VtSelectWithValidation
									ref="spillHoleShapeRef"
									v-model="spillHoleShape"
									vid="spillHoleShape"
									:items="spillHoleShapes"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.spillHole.shape')"
									:hint="$t('forms.content.tools.parachuteSizing.spillHole.shape_hint')"
								/>
							</v-col> -->
						</v-row>
						<!-- <v-row dense>
							<v-col cols="12" sm="6">
							</v-col>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									</tbody>
									</tbody>
								</table>
							</v-col>
							<v-col
								v-if="$vuetify.display.smAndUp"
								cols="12" sm="6"
							>
								<VtSelectWithValidation
									ref="parachuteShapeRef"
									v-model="parachuteShape"
									vid="parachuteShape"
									:items="parachuteShapes"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.parachuteShape')"
									:hint="$t('forms.content.tools.parachuteSizing.parachuteShape_hint')"
								/>
							</v-col>
						</v-row> -->
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
								{{ $t('strings.content.tools.parachuteSizing.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2">
							<v-col cols="12">
								<VtMarkdown v-model="contentMarkup" :use-github=false />
							</v-col>
						</v-row>
						<v-row dense v-if="calculationResults.calculated">
							<v-col
								v-if="calculationType==='diameter'"
							>
								<v-row class="pb-2" dense>
									<v-col cols="6">
										<span class="text-h6 text-bold">{{ resultsTitleParachute }}</span>&nbsp;&nbsp;
										<span class="text-h6 text-bold" v-if="calculationResults.diameter">{{ calculationResults.diameter }}</span>
									</v-col>
									<v-col
										v-if="calculationResults.diameterSpillHole!='0.00 in'"
										cols="6"
									>
										<span class="text-h6 text-bold">{{ resultsTitleSpillHole }}</span>&nbsp;&nbsp;
										<span class="text-h6 text-bold" v-if="calculationResults.diameter">{{ calculationResults.diameterSpillHole }}</span>
									</v-col>
								</v-row>
							</v-col>
							<v-col
								v-if="calculationType==='velocity'"
							>
								<v-row class="pb-2" dense>
									<v-col cols="6">
										<span class="text-h6 text-bold">{{ resultsTitleVelocity }}</span>&nbsp;&nbsp;
										<span class="text-h6 text-bold" v-if="calculationResults.velocity">{{ calculationResults.velocity }}</span>
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
	</ToolsLayout>
</template>

<script>
// import { between, decimal, required } from '@vuelidate/validators';

import { useParachuteSizingBaseComponent } from '@/components/content/tools/parahcuteSizingBase';
import { useParachuteSizingValidation } from '@/components/content/tools/parahcuteSizingValidation';

import ContentAttribution from '@/components/content/Attribution';
import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import ContentDescription from '@/components/content/Description';
import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import ToolsLayout from '@/components/content/tools/Layout.vue';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';

export default {
	name: 'ParachuteSizing',
	components: {
		ContentAttribution,
		CalculatedOuput,
		ContentDescription,
		ContentDescription,
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		ToolsLayout,
		VtFormControl,
		VtMarkdown,
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
			calculationType,
			calculationTypes,
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
			parachuteDiameter,
			parachuteShape,
			parachuteShapes,
			spillHoleDiameter,
			spillHoleDiameterLengthMeasurementUnitId,
			spillHoleDiameterLengthMeasurementUnitsId,
			spillHolePct,
			spillHoleShape,
			spillHoleShapes,
			velocityMeasurementUnitId,
			velocityMeasurementUnitsId,
			contentMarkup,
			resultsTitleParachute,
			resultsTitleSpillHole,
			resultsTitleVelocity,
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
			calculationType,
			calculationTypes,
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
			parachuteDiameter,
			parachuteShape,
			parachuteShapes,
			spillHoleDiameter,
			spillHoleDiameterLengthMeasurementUnitId,
			spillHoleDiameterLengthMeasurementUnitsId,
			spillHolePct,
			spillHoleShape,
			spillHoleShapes,
			velocityMeasurementUnitId,
			velocityMeasurementUnitsId,
			contentMarkup,
			resultsTitleParachute,
			resultsTitleSpillHole,
			resultsTitleVelocity,
			calculationOk,
			initCalculationData,
			scope,
			validation
		};
	},
	validations () {
		return useParachuteSizingValidation(this);
	}
};
</script>
