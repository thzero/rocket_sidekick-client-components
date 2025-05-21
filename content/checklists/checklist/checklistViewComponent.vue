<script>
import { computed } from 'vue';

import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useChecklistViewComponent(props, context, options) {
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
		displayItemMeasurement,
		displayItemMeasurementLength,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);
	
	const {
		motorUrl
	} = useMotorUtilityComponent(props, context);

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
		rocketMotorNames,
		rocketMotorNamesByStage,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketTypeName,
		rocketTypeNames,
		rocketWeight,
		rocketWeightHighest
	} = useRocketsUtilityComponent(props, context, options);

	const displayItemDate = computed(() => {
		if (!props.detailItem)
			return null;
		return props.detailItem.date ? LibraryMomentUtility.getDateHuman(props.detailItem.date) : null;
	});
	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const displayItemRocketCoverUrl = computed(() => {
		return displayItem.value && displayItem.value.rocketSetup && displayItem.value.rocketSetup.rocket ? displayItem.value.rocketSetup.rocket.coverUrl : '';
	});
	const displayItemRocketMotorNames = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup)
			return null;
		return rocketMotorNames(displayItem.value.rocketSetup, '\n');
	});
	const displayItemRocketMotors = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup)
			return [];
		return rocketMotors(displayItem.value.rocketSetup) ?? [];
	});
	const displayItemRocketMame = computed(() => {
		return displayItem.value && displayItem.value.rocketSetup && displayItem.value.rocketSetup.rocket ? displayItem.value.rocketSetup.rocket.name : '';
	});
	const displayItemRocketCg = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup)
			return null;
		return rocketCgHighest(displayItem.value.rocketSetup.stages);
	});
	const displayItemRocketCp = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
			return null;
		return rocketCpHighest(displayItem.value.rocketSetup.rocket.stages);
	});
	const displayItemRocketDiameter = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
			return null;
		return rocketDiameterHighest(displayItem.value.rocketSetup.rocket.stages);
	});
	const displayItemRocketLength = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup || !displayItem.value.rocketSetup.rocket)
			return null;
		return rocketLengthOverall(displayItem.value.rocketSetup.rocket.stages);
	});
	const displayItemRocketWeight = computed(() => {
		if (!displayItem.value || !displayItem.value.rocketSetup)
			return null;
		return rocketWeightHighest(displayItem.value.rocketSetup.stages);
	});
	const hasRocketSpecs = computed(() => {
		return displayItemRocketCg.value || displayItemRocketCp.value || displayItemRocketDiameter.value || displayItemRocketLength.value || displayItemRocketWeight.value;
	});
	const name = computed(() => {
		if (!props.detailItem)
			return null;
		return props.detailItem.name;
	});
	
	// const clickViewLocation = async (item) => {
	// 	if (!item)
	// 		return;
	// 	LibraryClientUtility.$navRouter.push('/user/locations/' + item.locationId);
	// };

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
		buttonsForms,
		measurementUnitsIdOutput,
		displayItemMeasurement,
		displayItemMeasurementLength,
		measurementUnitsFromUnitId,
		motorUrl,
		displayItem,
		displayItemDate,
		displayItemRocketCg,
		displayItemRocketCoverUrl,
		displayItemRocketCp,
		displayItemRocketDiameter,
		displayItemRocketLength,
		displayItemRocketMotorNames,
		displayItemRocketMotors,
		displayItemRocketMame,
		displayItemRocketWeight,
		hasRocketSpecs,
		name,
		// clickViewLocation
	};
};
</script>
