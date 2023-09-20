<script>
import { computed, onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppSharedConstants from '@/utility/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useParachuteSizingBaseComponent(props, context) {
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
		setNotify
	} = useToolsBaseComponent(props, context, {
		id: 'parachuteSizing',
		resetAdditional: (correlationId) => {
			airDensity.value = 0.076;
			calculationType.value = 'diameter';
			coeffDrag.value =  0.75;
			desiredVelocity.value = 20;
			mass.value = null;
			parachuteShape.value = 'octagon';
			spillHoleDiameter.value = null;
			spillHoleShape.value = 'octagon';
			spillHolePct.value = null;
		},
		title: LibraryClientUtility.$trans.t('titles.content.tools.parachuteSizing')
	});

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType
	} = useToolsMeasurementBaseComponent(props, context);

	const serviceToolsParachuteSizing = LibraryClientUtility.$injector.getService(AppSharedConstants.InjectorKeys.SERVICE_TOOLS_PARACHUTE_SIZING);

	const calculationData = ref(null);
	const calculationResults = initCalculationResults(correlationId(), ref({}));
	const airDensity = ref(null);
	const airDensityMeasurementUnitId = ref(null);
	const airDensityMeasurementUnitsId = ref(null);
	const calculationType = ref('diameter');
	const calculationTypes = ref([
		{ id: 'diameter', name: LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.calculationType.diameter') },
		{ id: 'velocity', name: LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.calculationType.velocity') }
	]);
	const coeffDrag = ref(null);
	const desiredVelocity = ref(null);
	const desiredVelocityMeasurementUnitId = ref(null);
	const desiredVelocityMeasurementUnitsId = ref(null);
	const diameterLengthMeasurementUnitId = ref(null);
	const diameterLengthMeasurementUnitsId = ref(null);
	const mass = ref(null);
	const massWeightMeasurementUnitId = ref(null);
	const massWeightMeasurementUnitsId = ref(null);
	const parachuteShape = ref('octagon');
	const parachuteShapes = ref([ { id: 'circle', name: 'Circle' }, { id: 'hexagon', name: 'Hexagon' }, { id: 'octagon', name: 'Octagon' }]);
	const parachuteSizingFormRef = ref(null);
	const spillHoleDiameter = ref(null);
	const spillHoleShape = ref('octagon');
	const spillHolePct = ref(null);
	const spillHoleShapes = ref([ { id: 'circle', name: 'Circle' }, { id: 'hexagon', name: 'Hexagon' }, { id: 'octagon', name: 'Octagon' }]);
	const contentMarkup = ref(LibraryClientUtility.$trans.t('strings.content.tools.parachuteSizing.info', { url: 'http://www.rocketmime.com/rockets/descent.html', title: 'Parachute Descent Calculations' }));

	const resultsTitleParachute = computed(() => {
		let output = shapeTitle(parachuteShape.value) + ' ';
		output += LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.diameter');
		output = output.trim();
		return output;
	});
	const resultsTitleSpillHole = computed(() => {
		let output = shapeTitle(spillHoleShape.value) + ' ';
		output += LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.spillHole.diameter');
		output = output.trim();
		return output;
	});
	
	const calculationOk = async () => {
		calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
			initCalculationData(correlationIdI);
			const responseCalc = await serviceToolsParachuteSizing.initializeCalculation(correlationIdI, calculationData.value, measurementUnitsIdOutput.value, settings);
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
		calculationData.value.airDensity = airDensity.value;
		calculationData.value.airDensityMeasurementUnitId = airDensityMeasurementUnitId.value;
		calculationData.value.airDensityMeasurementUnitsId = airDensityMeasurementUnitsId.value;
		calculationData.value.calculationType = calculationType.value;
		calculationData.value.coeffDrag = coeffDrag.value;
		calculationData.value.desiredVelocity = desiredVelocity.value;
		calculationData.value.desiredVelocityMeasurementUnitId = desiredVelocityMeasurementUnitId.value;
		calculationData.value.desiredVelocityMeasurementUnitsId = desiredVelocityMeasurementUnitsId.value;
		calculationData.value.diameterLengthMeasurementUnitId = diameterLengthMeasurementUnitId.value;
		calculationData.value.diameterLengthMeasurementUnitsId = diameterLengthMeasurementUnitsId.value;
		calculationData.value.mass = mass.value;
		calculationData.value.massWeightMeasurementUnitId = massWeightMeasurementUnitId.value;
		calculationData.value.massWeightMeasurementUnitsId = massWeightMeasurementUnitsId.value;
		calculationData.value.parachuteShape = parachuteShape.value;
		calculationData.value.spillHoleDiameter = spillHoleDiameter.value;
		calculationData.value.spillHolePct = spillHolePct.value;
		calculationData.value.spillHoleShape = spillHoleShape.value;
	};
	const reset = async (correlationId) => {
		await parachuteSizingFormRef.value.reset(correlationId, false);
	};
	const shapeTitle = (shape) => {
		if (parachuteShape.value === 'circle')
			return LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.shape.circle');
		if (parachuteShape.value === 'hexagon')
			return LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.shape.hexagon');
		if (parachuteShape.value === 'octagon')
			return LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.shape.octagon');
		return '';
	};

	onMounted(async () => {
		reset(false);

		calculationData.value = serviceToolsParachuteSizing.initialize(correlationId());
		airDensityMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		desiredVelocityMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		diameterLengthMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		massWeightMeasurementUnitsId.value = measurementUnitsIdSettings.value;

		airDensityMeasurementUnitId.value = measurementUnitsDensityDefaultId.value;
		desiredVelocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
		diameterLengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		massWeightMeasurementUnitId.value = measurementUnitsWeightDefaultId.value;
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
		parachuteShape,
		parachuteShapes,
		spillHoleDiameter,
		spillHolePct,
		spillHoleShape,
		spillHoleShapes,
		contentMarkup,
		resultsTitleParachute,
		resultsTitleSpillHole,
		calculationOk,
		initCalculationData,
		scope: 'Foam',
		validation: useVuelidate({ $scope: 'Foam' })
	};
};
</script>
