<script>
import { computed, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import RocketStageData from 'rocket_sidekick_common/data/rockets/stage';

import { useDetailComponent } from '@/components/content/detailComponent';
import { useRocketsComponent } from '@/components/content/rockets/rocketsComponent';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketComponent(props, context, options) {
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional
	} = useDetailComponent(props, context, {
		init: async (correlationId, value) => {
			await requestManufacturers(correlationId);
			const temp = manufacturersI.value ? manufacturersI.value.find(l => l.isDefault) : null;
			manufacturerDefault.value = temp ? temp.id : null;
			resetData(correlationId, value);
		},
		preCompleteOk : async (correlationId) => {
			detailItem.value.data.description = String.trim(detailItemDescription.value);
			detailItem.value.data.name = String.trim(detailItemName.value);
			detailItem.value.data.typeId = detailItemRocketType.value;
			
			detailItem.value.data.manufacturerId = detailItemManufacturer.value;
			detailItem.value.data.manufacturerStockId = detailItemManufacturerStockId.value;

			detailItem.value.data.cg = Number(detailItemCg.value);
			detailItem.value.data.cgFrom = detailItemCgFrom.value;
			detailItem.value.data.cgMeasurementUnitId = cgMeasurementUnitId.value;
			detailItem.value.data.cgMeasurementUnitsId = cgMeasurementUnitsId.value;

			detailItem.value.data.cp = Number(detailItemCp.value);
			detailItem.value.data.cpFrom = detailItemCpFrom.value;
			detailItem.value.data.cpMeasurementUnitId = cpMeasurementUnitId.value;
			detailItem.value.data.cpMeasurementUnitsId = cpMeasurementUnitsId.value;

			detailItem.value.data.diameterMajor = Number(detailItemDiameterMajor.value);
			detailItem.value.data.diameterMajorMeasurementUnitId = diameterMajorMeasurementUnitId.value;
			detailItem.value.data.diameterMajorMeasurementUnitsId = diameterMajorMeasurementUnitsId.value;
			
			detailItem.value.data.diameterMinor = Number(detailItemDiameterMinor.value);
			detailItem.value.data.diameterMinorMeasurementUnitId = diameterMinorMeasurementUnitId.value;
			detailItem.value.data.diameterMinorMeasurementUnitsId = diameterMinorMeasurementUnitsId.value;

			detailItem.value.data.length = Number(detailItemLength.value);
			detailItem.value.data.lengthMeasurementUnitId = lengthMeasurementUnitId.value;
			detailItem.value.data.lengthMeasurementUnitsId = lengthMeasurementUnitsId.value;
			
			detailItem.value.data.weight = Number(detailItemWeight.value);
			detailItem.value.data.weightMeasurementUnitId = weightMeasurementUnitId.value;
			detailItem.value.data.weightMeasurementUnitsId = weightMeasurementUnitsId.value;

			const response = await serviceStore.dispatcher.saveRocket(correlationId, detailItemData.value);
			logger.debug('rocketComponent', 'preCompleteOk', 'response', response, correlationId);
			return response;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);
		}
	});

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);
	
	const {
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsComponent(props, context, options);

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
	const detailItemDescription = ref(null);
	const detailItemCg = ref(null);
	const detailItemCgFrom = ref(null);
	const detailItemCp = ref(null);
	const detailItemCpFrom = ref(null);
	const detailItemDiameterMajor = ref(null);
	const detailItemDiameterMinor = ref(null);
	const detailItemLength = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const detailItemRocketType = ref(null);
	const detailItemWeight = ref(null);
	const diameterMajorMeasurementUnitId = ref(null);
	const diameterMajorMeasurementUnitsId = ref(null);
	const diameterMinorMeasurementUnitId = ref(null);
	const diameterMinorMeasurementUnitsId = ref(null);
	const lengthMeasurementUnitId = ref(null);
	const lengthMeasurementUnitsId = ref(null);
	const manufacturersI = ref(null);
	const weightMeasurementUnitId = ref(null);
	const weightMeasurementUnitsId = ref(null);
	const manufacturerDefault = ref(null);
	const manufacturerType = ref(AppCommonConstants.Rocketry.ManufacturerTypes.rocket);
	
	const manufacturers = computed(() => {
		return manufacturersI.value ? manufacturersI.value.map((item) => { return { id: item.id, name: item.name }; }) : [];
	});
	const canAdd = computed(() => {
		return !isNew.value && !dirty.value;
	});
	const hasAdmin = computed(() => {
		return true;
	});
	const stages = computed(() => {
		return detailItemData.value ? detailItemData.value.stages : [{}];
	});

	const handleAdd = () => {
	};
	const requestManufacturers = async (correlationId) => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => j === manufacturerType.value));
		temp2 = temp2.map((item) => { return { id: item.id, name: item.name, isDefault: item.isDefault }; });
		manufacturersI.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
	}
	const resetData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		detailItemRocketType.value = value? value.typeId : AppCommonConstants.Rocketry.RocketTypes.highone;	
		detailItemName.value = value ? value.name : null;
		
		detailItemManufacturer.value = value && value.manufacturerId ? value.manufacturerId : manufacturerDefault.value; // 'd37HEk5Wjm3mmV4InK90U';
		detailItemManufacturerStockId.value = value? value.manufacturerStockId : null;

		detailItemCg.value = value ? value.cg : null;
		detailItemCgFrom.value = value ? value.cgFrom : AppCommonConstants.Rocketry.Direction.Tip;
		cgMeasurementUnitId.value = value ? value.cgMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		cgMeasurementUnitsId.value = value ? value.cgMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemCp.value = value ? value.cp : null;
		detailItemCpFrom.value = value ? value.cpFrom : AppCommonConstants.Rocketry.Direction.Tip;
		cpMeasurementUnitId.value = value ? value.cpMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		cpMeasurementUnitsId.value = value ? value.cpMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemDiameterMajor.value = value ? value.diameterMajor : null;
		diameterMajorMeasurementUnitId.value = value ? value.diameterMajorMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		diameterMajorMeasurementUnitsId.value = value ? value.diameterMajorMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemDiameterMinor.value = value ? value.diameterMinor : null;
		diameterMinorMeasurementUnitId.value = value ? value.diameterMinorMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		diameterMinorMeasurementUnitsId.value = value ? value.diameterMinorMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemLength.value = value ? value.length : null;
		lengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		lengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemWeight.value = value ? value.weight : null;
		weightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		weightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		rocketTypes,
		cgMeasurementUnitId,
		cgMeasurementUnitsId,
		cpMeasurementUnitId,
		cpMeasurementUnitsId,
		detailItemCg,
		detailItemCgFrom,
		detailItemCp,
		detailItemCpFrom,
		detailItemDescription,
		detailItemDiameterMajor,
		detailItemDiameterMinor,
		detailItemLength,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemRocketType,
		detailItemWeight,
		diameterMajorMeasurementUnitId,
		diameterMajorMeasurementUnitsId,
		diameterMinorMeasurementUnitId,
		diameterMinorMeasurementUnitsId,
		lengthMeasurementUnitId,
		lengthMeasurementUnitsId,
		manufacturers,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		canAdd,
		hasAdmin,
		stages,
		handleAdd,
		requestManufacturers,
		scope: 'RocketControl',
		validation: useVuelidate({ $scope: 'RocketControl' })
	};
};
</script>
