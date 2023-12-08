<script>
import { computed, onMounted, ref } from 'vue';
import { firstBy, thenBy } from 'thenby';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketPartsLookupDialogComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);
	
	const {
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsAltitudeDefaultId,
		measurementUnitsAltitudeType,
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

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		motorDiameters,
		motorImpulseClasses,
		motorCaseInfo,
		motorUrl
	} = useMotorUtilityComponent(props, context);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const filterItemDiameterMax = ref(null);
	const filterItemDiameterMin = ref(null);
	const filterItemDiameterMeasurementUnitId = ref(null);
	const filterItemDiameterMeasurementUnitsId = ref(null);
	const filterItemLengthMax = ref(null);
	const filterItemLengthMin = ref(null);
	const filterItemLengthMeasurementUnitId = ref(null);
	const filterItemLengthMeasurementUnitsId = ref(null);
	const filterItemManufacturers = ref(null);
	const filterItemManufacturerStockId = ref(null);
	const filterItemMotorDiameter = ref(null);
	const filterItemMotorImpulseClass = ref(null);
	const filterItemName = ref(null);
	const filterItemRocketTypes = ref(null);
	const dialogRocketPartsLookup = ref(null);
	const dialogResetManager = ref(new DialogSupport());
	const dialogResetMessage = ref(null);
	const manufacturersI = ref(null);
	const results = ref([]);

	const manufacturers = computed(() => {
		return manufacturersI.value ? manufacturersI.value : [];
	});
	const partTypeName = computed(() => {
		let partTypeId = null;
		if ((props.partTypes ?? []).length === 1)
			partTypeId = props.partTypes[0];

		if (partTypeId)
			return LibraryClientUtility.$trans.t(`forms.content.parts['${partTypeId}'].name`) + ' ' + LibraryClientUtility.$trans.t('titles.search');

		return LibraryClientUtility.$trans.t(`forms.content.parts.recovery.search`);
	});
	
	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const clickRocketPartsSearch = async () => {
		await dialogRocketPartsLookup.value.submit(correlationId());
	};
	const clickRocketPartsSearchClear = async () => {
		await dialogRocketPartsLookup.value.reset(correlationId(), null, true);
		await dialogRocketPartsLookup.value.submit(correlationId());
	};
	const clickRocketPartSelect = async (item) => {
		context.emit('select', item);
	};
	const close = () => {
		context.emit('close');
	};
	const dialogResetOk = async () => {
		dialogResetManager.value.ok();
		const correlationIdI = correlationId();
		await serviceStore.dispatcher.requestPartsRocketSearchReset(correlationIdI);
		await preCompleteOk(correlationIdI);
	};
	const isAltimeters = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.altimeter);
	};
	const isChuteProtectors = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.chuteProtector);
	};
	const isChuteReleases = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.chuteRelease);
	};
	const isDeploymentBags = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.deploymentBag);
	};
	const isMotors = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.motor);
	};
	const isMotorCases = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.motorCase);
	};
	const isParachutes = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.parachute);
	};
	const isPartByType = (id) => {
		return (props.partTypes ?? []).indexOf(id) > -1;
	};
	const isStreamers = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.streamer);
	};
	const isTrackers = () => {
		return isPartByType(AppCommonConstants.Rocketry.PartTypes.tracker);
	};
	const manufacturer = (item) => {
		const id = item ? item.manufacturerId ?? null : null;
		if (!id)
			return null;

		if (!manufacturers.value)
			return null;

		const temp = manufacturers.value.find(l => l.id === id);
		return temp ? temp.name : null;
	};
	const preCompleteOk = async (correlationId) => {
		results.value = null;

		const request = {
			diameterMax: filterItemDiameterMax.value,
			diameterMin: filterItemDiameterMin.value,
			diameterMeasurementUnitId: filterItemDiameterMeasurementUnitId.value,
			diameterMeasurementUnitsId: filterItemDiameterMeasurementUnitsId.value,
			lengthMax: filterItemLengthMax.value,
			lengthMin: filterItemLengthMin.value,
			lengthMeasurementUnitId: filterItemLengthMeasurementUnitId.value,
			lengthMeasurementUnitsId: filterItemLengthMeasurementUnitsId.value,
			manufacturers: filterItemManufacturers.value,
			manufacturerStockId: filterItemManufacturerStockId.value,
			motorDiameter: filterItemMotorDiameter.value,
			motorImpulseClass: filterItemMotorImpulseClass.value,
			name: filterItemName.value,
			partTypes: props.partTypes, 
			rocketTypes: filterItemRocketTypes.value
		};
		
		serviceStore.dispatcher.setPartsRocketSearchCriteria(correlationId, request);

		if (isMotors()) {
			let data = await serviceStore.getters.getMotorSearchCriteria();
			data = data ?? {};
			data.diameter = filterItemMotorDiameter.value;
			data.impulseClass = filterItemMotorImpulseClass.value;
			data.manufacturers = filterItemManufacturers.value,
			data.manufacturerStockId = filterItemManufacturerStockId.value,
			serviceStore.dispatcher.setMotorSearchCriteria(correlationId, request);
		}

		const temp = await serviceStore.dispatcher.requestPartsRocketSearch(correlationId, request);
		results.value = temp.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
		);
		return success(correlationId);
	};
	const resetAdditional = async (correlationId, previous, loaded) => {
		const data = await serviceStore.dispatcher.setPartsRocketSearchCriteria();

		filterItemDiameterMax.value = data ? data.diameterMax : null;
		filterItemDiameterMin.value = data ? data.diameterMin : null;
		filterItemDiameterMeasurementUnitId.value = data ? data.diameterMeasurementUnitId : measurementUnitsLengthDefaultId.value;
		filterItemDiameterMeasurementUnitsId.value = data ? data.diameterMeasurementUnitsId : measurementUnitsIdSettings.value;

		filterItemLengthMax.value = data ? data.lengthMax : null;
		filterItemLengthMin.value = data ? data.lengthMin : null;
		filterItemLengthMeasurementUnitId.value = data ? data.lengthMeasurementUnitId : measurementUnitsLengthDefaultId.value;
		filterItemLengthMeasurementUnitsId.value = data ? data.lengthMeasurementUnitsId : measurementUnitsIdSettings.value;

		filterItemManufacturers.value = data ? data.manufacturers : null;
		filterItemManufacturerStockId.value = data ? data.manufacturerStockId : null;

		filterItemMotorDiameter.value = props.diameter ? props.diameter : data ? data.motorDiameter : null;
		filterItemMotorImpulseClass.value = data ? data.motorImpulseClass : null;

		filterItemName.value = data ? data.name : props.detail;

		filterItemRocketTypes.value = data ? data.rocketTypes : null;

		if (isMotors()) {
			const data = await serviceStore.getters.getMotorSearchCriteria();
			filterItemMotorImpulseClass.value = data ? data.impulseClass : filterItemMotorImpulseClass.value;
		}

		if (loaded)
			return await preCompleteOk(correlationId);

		results.value = [];
	};

	const validationIsMotors = ref(isMotors());
	const validationIsMotorCases = ref(isMotorCases());

	onMounted(async () => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId());
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => 
			(j === AppCommonConstants.Rocketry.PartTypes.altimeter) ||
			(j === AppCommonConstants.Rocketry.PartTypes.chuteProtector) ||
			(j === AppCommonConstants.Rocketry.PartTypes.chuteRelease) ||
			(j === AppCommonConstants.Rocketry.PartTypes.deploymentBag) ||
			(j === AppCommonConstants.Rocketry.PartTypes.motor) ||
			(j === AppCommonConstants.Rocketry.PartTypes.motorCase) ||
			(j === AppCommonConstants.Rocketry.PartTypes.parachute) ||
			(j === AppCommonConstants.Rocketry.PartTypes.streamer)
		));
		temp2 = temp2.sort((a, b) => a.name.localeCompare(b.name));
		manufacturersI.value = temp2.map((item) => { return { id: item.id, name: item.name }; });
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
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		motorDiameters,
		motorImpulseClasses,
		motorCaseInfo,
		motorUrl,
		serviceStore,
		filterItemDiameterMax,
		filterItemDiameterMin,
		filterItemDiameterMeasurementUnitId,
		filterItemDiameterMeasurementUnitsId,
		filterItemLengthMax,
		filterItemLengthMin,
		filterItemLengthMeasurementUnitId,
		filterItemLengthMeasurementUnitsId,
		filterItemManufacturers,
		filterItemManufacturerStockId,
		filterItemMotorDiameter,
		filterItemMotorImpulseClass,
		filterItemName,
		filterItemRocketTypes,
		dialogRocketPartsLookup,
		dialogResetManager,
		dialogResetMessage,
		results,
		manufacturers,
		partTypeName,
		buttonOkDisabledOverride,
		clickRocketPartsSearch,
		clickRocketPartsSearchClear,
		clickRocketPartSelect,
		close,
		dialogResetOk,
		isAltimeters,
		isChuteProtectors,
		isChuteReleases,
		isDeploymentBags,
		isMotors,
		isMotorCases,
		isParachutes,
		isStreamers,
		isTrackers,
		manufacturer,
		preCompleteOk,
		resetAdditional,
		validationIsMotors,
		validationIsMotorCases,
		scope: 'RocketPartsLookupDialog',
		validation: useVuelidate({ $scope: 'RocketPartsLookupDialog' })
	};
};
</script>
