<script>
import { computed, onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import AppSharedConstants from '@/utility/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
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
		setNotify
	} = useToolsBaseComponent(props, context, {
		id: 'parachuteSizing',
		resetAdditional: (correlationId) => {
			airDensity.value = 0.076;
			calculationType.value = 'diameter';
			coeffDrag.value =  0.75;
			desiredVelocity.value = 20;
			mass.value = null;
			parachuteShape.value = AppSharedConstants.Tools.ParachuteSizing.shapes.octagon;
			spillHoleDiameter.value = null;
			spillHoleShape.value = AppSharedConstants.Tools.ParachuteSizing.shapes.circle;
			spillHolePct.value = null;
		},
		title: LibraryClientUtility.$trans.t('titles.content.tools.parachuteSizing')
	});

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const serviceToolsParachuteSizing = LibraryClientUtility.$injector.getService(AppSharedConstants.InjectorKeys.SERVICE_TOOLS_PARACHUTE_SIZING);

	const shapes = [ 
		{ id: AppSharedConstants.Tools.ParachuteSizing.shapes.circle, name: LibraryClientUtility.$trans.t(`forms.content.tools.parachuteSizing.shape.${AppSharedConstants.Tools.ParachuteSizing.shapes.circle}`) }, 
		{ id: AppSharedConstants.Tools.ParachuteSizing.shapes.hexagon, name: LibraryClientUtility.$trans.t(`forms.content.tools.parachuteSizing.shape.${AppSharedConstants.Tools.ParachuteSizing.shapes.hexagon}`) }, 
		{ id: AppSharedConstants.Tools.ParachuteSizing.shapes.octagon, name: LibraryClientUtility.$trans.t(`forms.content.tools.parachuteSizing.shape.${AppSharedConstants.Tools.ParachuteSizing.shapes.octagon}`) }
	];

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
	const parachuteDiameter = ref(null);
	const parachuteShape = ref(AppSharedConstants.Tools.ParachuteSizing.shapes.octagon);
	const parachuteShapes = ref(shapes);
	const parachuteSizingFormRef = ref(null);
	const spillHoleDiameter = ref(null);
	const spillHoleDiameterLengthMeasurementUnitId = ref(null);
	const spillHoleDiameterLengthMeasurementUnitsId = ref(null);
	const spillHoleShape = ref(AppSharedConstants.Tools.ParachuteSizing.shapes.circle);
	const spillHolePct = ref(null);
	const spillHoleShapes = ref(shapes);
	const velocityMeasurementUnitId = ref(null);
	const velocityMeasurementUnitsId = ref(null);
	const contentMarkup = ref(LibraryClientUtility.$trans.t('strings.content.tools.parachuteSizing.info', { link: '<a href="http://www.rocketmime.com/rockets/descent.html" target="_blank">Parachute Descent Calculations</a>' }));

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
	const resultsTitleVelocity = computed(() => {
		return LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.velocity');
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
		// calculationData.value.airDensityMeasurementUnitsId = airDensityMeasurementUnitsId.value;
		calculationData.value.airDensityMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.density.id, airDensityMeasurementUnitId.value);
		calculationData.value.calculationType = calculationType.value;
		calculationData.value.coeffDrag = coeffDrag.value;
		calculationData.value.desiredVelocity = desiredVelocity.value;
		calculationData.value.desiredVelocityMeasurementUnitId = desiredVelocityMeasurementUnitId.value;
		// calculationData.value.desiredVelocityMeasurementUnitsId = desiredVelocityMeasurementUnitsId.value;
		calculationData.value.desiredVelocityMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.velocity.id, desiredVelocityMeasurementUnitId.value);
		calculationData.value.diameterLengthMeasurementUnitId = diameterLengthMeasurementUnitId.value;
		// calculationData.value.diameterLengthMeasurementUnitsId = diameterLengthMeasurementUnitsId.value;
		calculationData.value.diameterLengthMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, diameterLengthMeasurementUnitId.value);
		calculationData.value.mass = mass.value;
		calculationData.value.massWeightMeasurementUnitId = massWeightMeasurementUnitId.value;
		// calculationData.value.massWeightMeasurementUnitsId = massWeightMeasurementUnitsId.value;
		calculationData.value.massWeightMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, massWeightMeasurementUnitId.value);
		calculationData.value.parachuteDiameter = parachuteDiameter.value;
		calculationData.value.parachuteShape = parachuteShape.value;
		calculationData.value.spillHoleDiameter = spillHoleDiameter.value;
		calculationData.value.spillHoleDiameterLengthMeasurementUnitId = spillHoleDiameterLengthMeasurementUnitId.value;
		// calculationData.value.spillHoleDiameterLengthMeasurementUnitsId = spillHoleDiameterLengthMeasurementUnitsId.value;
		calculationData.value.spillHoleDiameterLengthMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, spillHoleDiameterLengthMeasurementUnitId.value);
		calculationData.value.spillHolePct = spillHolePct.value;
		calculationData.value.spillHoleShape = spillHoleShape.value;
		calculationData.value.velocityMeasurementUnitId = velocityMeasurementUnitId.value;
		// calculationData.value.velocityMeasurementUnitsId = velocityMeasurementUnitsId.value;
		calculationData.value.velocityMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.velocity.id, velocityMeasurementUnitId.value);
	};
	const reset = async (correlationId) => {
		await parachuteSizingFormRef.value.reset(correlationId, false);
	};
	const shapeTitle = (shape) => {
		if (parachuteShape.value === AppSharedConstants.Tools.ParachuteSizing.shapes.circle)
			return LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.shape.circle');
		if (parachuteShape.value === AppSharedConstants.Tools.ParachuteSizing.shapes.hexagon)
			return LibraryClientUtility.$trans.t('forms.content.tools.parachuteSizing.shape.hexagon');
		if (parachuteShape.value === AppSharedConstants.Tools.ParachuteSizing.shapes.octagon)
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
		spillHoleDiameterLengthMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		velocityMeasurementUnitsId.value = measurementUnitsIdSettings.value;

		airDensityMeasurementUnitId.value = measurementUnitsDensityDefaultId.value;
		desiredVelocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
		diameterLengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		massWeightMeasurementUnitId.value = measurementUnitsWeightDefaultId.value;
		spillHoleDiameterLengthMeasurementUnitId.value = measurementUnitsWeightDefaultId.value;
		velocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
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
		scope: 'Foam',
		validation: useVuelidate({ $scope: 'Foam' })
	};
};
</script>
