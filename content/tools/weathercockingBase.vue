<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import AppSharedConstants from '@/utility/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useWeathercockingBaseComponent(props, context) {
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
		setSuccessMessage
	} = useToolsBaseComponent(props, context, {
		id: 'weathercocking',
		resetAdditional: (correlationId) => {
			calculationResults.value.foams = [];

			windVelocity.value = null;
			exitVelocity.value = null;
		},
		title: LibraryClientUtility.$trans.t('titles.content.tools.weathercocking')
	 });

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const serviceToolsWeathercocking = LibraryClientUtility.$injector.getService(AppSharedConstants.InjectorKeys.SERVICE_TOOLS_WEATHERCOCKING);

	const calculationData = ref(null);
	const calculationResults = initCalculationResults(correlationId(), ref({}));
	const exitVelocity = ref(null);
	const exitVelocityMeasurementUnitId = ref(null);
	const exitVelocityMeasurementUnitsId = ref(null);
	const weathercockingFormRef = ref(null);
	const windVelocity = ref(null);
	const windVelocityMeasurementUnitId = ref(null);
	const windVelocityMeasurementUnitsId = ref(null);

	const calculationOk = async () => {
		calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
			initCalculationData(correlationIdI);
			const responseCalc = await serviceToolsWeathercocking.initializeCalculation(correlationIdI, calculationData.value, measurementUnitsIdOutput.value, settings);
			if (!responseCalc || !responseCalc.success) {
				return false; // TODO
			}

			responseCalc.results.instance.addListener(correlationIdI, handleListener);
			const responseCalcInstance = responseCalc.results.instance.calculate(correlationIdI, responseCalc.results.steps, 'volume');
			if (!responseCalcInstance || !responseCalcInstance.success) {
				return false; // TODO
			}
			calculationResultsI.value = responseCalcInstance.results;
			calculationResultsI.value.calculated = false;

			return true;
		});
	};
	const initCalculationData = (correlationId) => {
		calculationData.value.exitVelocity = exitVelocity.value;
		calculationData.value.exitVelocityMeasurementUnitId = exitVelocityMeasurementUnitId.value;
		calculationData.value.exitVelocityMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.velocity.id, exitVelocityMeasurementUnitId.value);
		// calculationData.value.exitVelocityMeasurementUnitsId = exitVelocityMeasurementUnitsId.value;
		calculationData.value.windVelocity = windVelocity.value;
		calculationData.value.windVelocityMeasurementUnitId = windVelocityMeasurementUnitId.value;
		calculationData.value.windVelocityMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.velocity.id, windVelocityMeasurementUnitId.value);
		// calculationData.value.windVelocityMeasurementUnitsId = windVelocityMeasurementUnitsId.value;
	};
	const reset = async (correlationId) => {
		await weathercockingFormRef.value.reset(correlationId, false);
	};

	onMounted(async () => {
		reset(false);

		calculationData.value = serviceToolsWeathercocking.initialize(correlationId());
		exitVelocityMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		exitVelocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
		windVelocityMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		windVelocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
	});

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
		scope: 'Foam',
		validation: useVuelidate({ $scope: 'Foam' })
	};
};
</script>
