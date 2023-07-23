<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketEditComponent(props, context, options) {
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

	const cgMeasurementUnitId = ref(null);
	const cgMeasurementUnitsId = ref(null);
	const cpMeasurementUnitId = ref(null);
	const cpMeasurementUnitsId = ref(null);
	const detailItemCg = ref(null);
	const detailItemCgFrom = ref(null);
	const detailItemCp = ref(null);
	const detailItemCpFrom = ref(null);
	const detailItemDescription = ref(null);
	const detailItemLength = ref(null);
	const detailItemName = ref(null);
	const detailItemWeight = ref(null);
	const lengthMeasurementUnitId = ref(null);
	const lengthMeasurementUnitsId = ref(null);
	const weightMeasurementUnitId = ref(null);
	const weightMeasurementUnitsId = ref(null);

	const resetEditData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		detailItemName.value = value ? value.name : null;
		
		detailItemCg.value = value ? value.cg : null;
		detailItemCgFrom.value = value ? value.cgFrom : AppCommonConstants.Rocketry.Direction.Tip;
		cgMeasurementUnitId.value = value ? value.cgMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		cgMeasurementUnitsId.value = value ? value.cgMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemCp.value = value ? value.cp : null;
		detailItemCpFrom.value = value ? value.cpFrom : AppCommonConstants.Rocketry.Direction.Tip;
		cpMeasurementUnitId.value = value ? value.cpMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		cpMeasurementUnitsId.value = value ? value.cpMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemLength.value = value ? value.length : null;
		lengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		lengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemWeight.value = value ? value.weight : null;
		weightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		weightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	
	const setEditData = (correlationId) => {
		detailItemData.value.description = String.trim(detailItemDescription.value);
		detailItemData.value.name = String.trim(detailItemName.value);
		
		detailItemData.value.cg = Number(detailItemCg.value);
		detailItemData.value.cgFrom = detailItemCgFrom.value;
		detailItemData.value.cgMeasurementUnitId = cgMeasurementUnitId.value;
		detailItemData.value.cgMeasurementUnitsId = cgMeasurementUnitsId.value;

		detailItemData.value.cp = Number(detailItemCp.value);
		detailItemData.value.cpFrom = detailItemCpFrom.value;
		detailItemData.value.cpMeasurementUnitId = cpMeasurementUnitId.value;
		detailItemData.value.cpMeasurementUnitsId = cpMeasurementUnitsId.value;

		detailItemData.value.length = Number(detailItemLength.value);
		detailItemData.value.lengthMeasurementUnitId = lengthMeasurementUnitId.value;
		detailItemData.value.lengthMeasurementUnitsId = lengthMeasurementUnitsId.value;
		
		detailItemData.value.weight = Number(detailItemWeight.value);
		detailItemData.value.weightMeasurementUnitId = weightMeasurementUnitId.value;
		detailItemData.value.weightMeasurementUnitsId = weightMeasurementUnitsId.value;
	};
	
	return {
		cgMeasurementUnitId,
		cgMeasurementUnitsId,
		cpMeasurementUnitId,
		cpMeasurementUnitsId,
		detailItemCg,
		detailItemCgFrom,
		detailItemCp,
		detailItemCpFrom,
		detailItemDescription,
		detailItemLength,
		detailItemName,
		detailItemWeight,
		lengthMeasurementUnitId,
		lengthMeasurementUnitsId,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		resetEditData,
		setEditData
	};
};
</script>
