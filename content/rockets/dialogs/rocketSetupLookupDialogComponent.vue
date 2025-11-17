<script>
import { ref } from 'vue';
import { firstBy, thenBy } from 'thenby';

import useVuelidate from '@vuelidate/core';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketSetupLookupDialogComponent(props, context, options) {
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
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCgHighest,
		rocketCp,
		rocketCpHighest,
		rocketDiameter,
		rocketDiameterHighest,
		rocketLength,
		rocketLengthHighest,
		rocketLengthOverall,
		rocketManufacturer,
		rocketMotorMountName,
		rocketMotorMountNames,
		rocketSetupMotorNames,
		rocketSetupMotorNamesByStage,
		rocketSetupMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketTypeName,
		rocketTypeNames,
		rocketWeight,
		rocketWeightHighest
	} = useRocketsUtilityComponent(props, context, options);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	
	const dialogSelectManager = ref(new DialogSupport());
	const dialogSelectMessage = ref(LibraryClientUtility.$trans.t(props.messageReplace ? props.messageReplace : 'none'));
	const dialogSelectParams = ref(null);
	const filterItemName = ref(null);
	const dialogResetManager = ref(new DialogSupport());
	const dialogResetMessage = ref(null);
	const dialogRocketSetupLookup = ref(null);
	const results = ref([]);

	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const clickSearch = async () => {
		await dialogRocketSetupLookup.value.submit(correlationId());
	};
	const clickSearchClear = async () => {
		await dialogRocketSetupLookup.value.reset(correlationId(), null, true);
		await dialogRocketSetupLookup.value.submit(correlationId());
	};
	const clickSelect = async (item) => {
		if (props.rocketId && props.rocketSetupId) {
			dialogSelectParams.value = item;
			dialogSelectManager.value.open();
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
	const dialogSelectCancel = async () => {
		try {
			dialogSelectManager.value.cancel();
		}
		finally {
			dialogSelectParams.value = null;
		}
	};
	const dialogSelectError = async () => {
		try {
			dialogSelectManager.value.cancel();
		}
		finally {
			dialogSelectParams.value = null;
		}
	};
	const dialogSelectOk = async () => {
		try {
			context.emit('select', dialogSelectParams.value);
			dialogSelectManager.value.ok();
			return success(correlationId());
		}
		finally {
			dialogSelectParams.value = null;
		}
	};
	const preCompleteOk = async (correlationId) => {
		results.value = null;

		const request = {
			name: filterItemName.value,
			rocketId: props.rocketId
		};

		const response = await serviceStore.dispatcher.requestRocketSetups(correlationId, request);
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

		if (loaded)
			return await preCompleteOk(correlationId);

		results.value = [];
	};

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
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		rocketTypes,
		rocketSetupMotorNames,
		rocketSetupMotorNamesByStage,
		dialogSelectManager,
		dialogSelectMessage,
		dialogSelectParams,
		filterItemName,
		dialogResetManager,
		dialogResetMessage,
		dialogRocketSetupLookup,
		results,
		buttonOkDisabledOverride,
		clickSearch,
		clickSearchClear,
		clickSelect,
		close,
		dialogResetOk,
		dialogSelectCancel,
		dialogSelectError,
		dialogSelectOk,
		preCompleteOk,
		resetAdditional,
		scope: 'RocketSetupLookupDialog',
		validation: useVuelidate({ $scope: 'RocketLookupDialog' })
	};
};
</script>
