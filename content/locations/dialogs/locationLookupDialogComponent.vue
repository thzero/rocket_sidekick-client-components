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
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useLocationLookupDialogComponent(props, context, options) {
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
		// measurementUnitsIdSettings,
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
		measurementUnitsWeightType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId
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
		organizations,
		organizationName,
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCp,
		rocketDiameter,
		rocketLength,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketWeight
	} = useRocketsUtilityComponent(props, context, options);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	
	const dialogSelectLocationConfirmManager = ref(new DialogSupport());
	const dialogSelectLocationConfirmMessage = ref(LibraryClientUtility.$trans.t(`messages.locations.replace_confirm`));
	const dialogSelectLocationConfirmParams = ref(null);
	const filterItemCity = ref(null);
	const filterItemName = ref(null);
	const filterItemOrganizations = ref(null);
	const filterItemPostalCode = ref(null);
	const filterItemRocketTypes = ref(false);
	const dialogLocationLookup = ref(null);
	const dialogResetManager = ref(new DialogSupport());
	const dialogResetMessage = ref(null);
	const results = ref([]);
	
	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const clickLocationSearch = async () => {
		await dialogLocationLookup.value.submit(correlationId());
	};
	const clickLocationSearchClear = async () => {
		await dialogLocationLookup.value.reset(correlationId(), null, true);
		await dialogLocationLookup.value.submit(correlationId());
	};
	const clickLocationSelect = async (item) => {
		if (props.locationId) {
			dialogSelectLocationConfirmParams.value = item;
			dialogSelectLocationConfirmManager.value.open();
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
		await serviceStore.dispatcher.requestPartsLocationSearchReset(correlationIdI);
		await preCompleteOk(correlationIdI);
	};
	const dialogSelectLocationConfirmCancel = async () => {
		try {
			dialogSelectLocationConfirmManager.value.cancel();
		}
		finally {
			dialogSelectLocationConfirmParams.value = null;
		}
	};
	const dialogSelectLocationConfirmError = async () => {
		try {
			dialogSelectLocationConfirmManager.value.cancel();
		}
		finally {
			dialogSelectLocationConfirmParams.value = null;
		}
	};
	const dialogSelectLocationConfirmOk = async () => {
		try {
			context.emit('select', dialogSelectLocationConfirmParams.value);
			dialogSelectLocationConfirmManager.value.ok();
			return success(correlationId());
		}
		finally {
			dialogSelectLocationConfirmParams.value = null;
		}
	};
	const preCompleteOk = async (correlationId) => {
		results.value = null;

		const request = {
			city: filterItemCity.value,
			name: filterItemName.value,
			organizations: filterItemOrganizations.value,
			postalCode: filterItemPostalCode.value,
			rocketTypes: filterItemRocketTypes.value
		};

		const response = await serviceStore.dispatcher.requestLocations(correlationId, request);
		if (hasFailed(response))
			return response;

		results.value = response.results.sort(
			firstBy((v1, v2) => { return (v1.sortName && v2.sortName) && v1.sortName.localeCompare(v2.sortName); })
			.thenBy((v1, v2) => { return v1.name.localeCompare(v2.name); })
		);
		return success(correlationId);
	};
	const resetAdditional = async (correlationId, previous, loaded) => {
		filterItemName.value = null;

		filterItemOrganizations.value = null;
		filterItemRocketTypes.value = null;

		if (loaded)
			return await preCompleteOk(correlationId);

		results.value = [];
	};

	onMounted(async () => {
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
		measurementUnitsFromUnitId,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		organizations,
		rocketTypes,
		serviceStore,
		dialogSelectLocationConfirmManager,
		dialogSelectLocationConfirmMessage,
		dialogSelectLocationConfirmParams,
		filterItemCity,
		filterItemName,
		filterItemOrganizations,
		filterItemPostalCode,
		filterItemRocketTypes,
		dialogLocationLookup,
		dialogResetManager,
		dialogResetMessage,
		results,
		buttonOkDisabledOverride,
		clickLocationSearch,
		clickLocationSearchClear,
		clickLocationSelect,
		close,
		dialogResetOk,
		dialogSelectLocationConfirmCancel,
		dialogSelectLocationConfirmError,
		dialogSelectLocationConfirmOk,
		preCompleteOk,
		resetAdditional,
		scope: 'LocationLookupDialog',
		validation: useVuelidate({ $scope: 'LocationLookupDialog' })
	};
};
</script>
