<script>
import { computed, onMounted, ref } from 'vue';
// import { firstBy, thenBy } from 'thenby';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
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
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		motorImpulseClasses,
		motorImpulseClassesNonBlank,
		motorMountDiameters,
		motorMountDiametersNonBlank,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
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
	const selected = ref([]);

	const manufacturers = computed(() => {
// alert(props.partTypes);
		// return manufacturersI.value ? manufacturersI.value : [];
		let temp2 = manufacturersI.value.filter(l => (props.partTypes.filter(x => l.types.includes(x))).length == 1);
		return temp2 ? temp2 : [];
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
	const clickRocketPartsSearchClearSelection = async () => {
		selected.value = [];
	};
	const clickRocketPartsSearchSelect = async () => {
		context.emit('select', selected.value);
		selected.value = [];
	};
	const clickRocketPartSelect = async (item) => {
		if (props.multiple) {
			const temp = selected.value.find(l => l.id === item.id);
			if (!temp) {
				selected.value.push(item);
				return;
			}

			LibraryCommonUtility.deleteArrayById(selected.value, item.id);
			return;
		}

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
			diameterMeasurementUnitsId: measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, filterItemDiameterMeasurementUnitId.value),
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

		// const temp = await serviceStore.dispatcher.requestPartsRocketSearch(correlationId, request);
		// // results.value = temp.sort(
		// // 	firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
		// // 	.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
		// // 	.thenBy((v1, v2) => { return (v1.manufacturer && v2.manufacturer) && v1.manufacturer.localeCompare(v2.manufacturer); })
		// // );
		// results.value = temp.sort(
		// 	firstBy((v1, v2) => { return (v1.manufacturer && v2.manufacturer) && v1.manufacturer.localeCompare(v2.manufacturer); })
		// );
		results.value = await serviceStore.dispatcher.requestPartsRocketSearch(correlationId, request);
		return success(correlationId);
	};
	const resetAdditional = async (correlationId, previous, loaded) => {
		const data = await serviceStore.dispatcher.setPartsRocketSearchCriteria();

		filterItemDiameterMax.value = data ? data.diameterMax : null;
		filterItemDiameterMin.value = data ? data.diameterMin : null;
		filterItemDiameterMeasurementUnitsId.value = data ? data.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		filterItemDiameterMeasurementUnitId.value = data ? data.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		filterItemLengthMax.value = data ? data.lengthMax : null;
		filterItemLengthMin.value = data ? data.lengthMin : null;
		filterItemLengthMeasurementUnitId.value = data ? data.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		filterItemLengthMeasurementUnitsId.value = data ? data.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

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
		manufacturersI.value = temp2.map((item) => { return { id: item.id, name: item.name, types: item.types }; });
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
		motorImpulseClassesNonBlank,
		motorMountDiametersNonBlank,
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
		selected,
		manufacturers,
		partTypeName,
		buttonOkDisabledOverride,
		clickRocketPartsSearch,
		clickRocketPartsSearchClear,
		clickRocketPartsSearchClearSelection,
		clickRocketPartsSearchSelect,
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
