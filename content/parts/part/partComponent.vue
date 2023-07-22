<script>
import { computed, ref, watch } from 'vue';

import { useDetailComponent } from '@/components/content/detailComponent';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function usePartComponent(props, context, options) {
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
		init: (correlationId, value) => {
			resetData(correlationId, value);

			if (options.init)
				options.init(correlationId, value);

			requestManufacturers(correlationId);
		},
		manufacturerType: options.manufacturerType,
		partsType: options.partsType,
		preCompleteOk : async (correlationId) => {
			detailItem.value.data.description = String.trim(detailItemDescription.value);
			detailItem.value.data.name = String.trim(detailItemName.value);

			detailItem.value.data.typeId = options.partsType;
			detailItem.value.data.manufacturerId = detailItemManufacturer.value;
			detailItem.value.data.manufacturerStockId = detailItemManufacturerStockId.value;

			detailItem.value.data.public = detailItemIsPublic.value ?? false;
			
			detailItem.value.data.weight = Number(detailItemWeight.value);
			detailItem.value.data.weightMeasurementUnitId = weightMeasurementUnitId.value;
			detailItem.value.data.weightMeasurementUnitsId = weightMeasurementUnitsId.value;

			if (options.preCompleteOkPart)
				detailItem.value.data = options.preCompleteOkPart(correlationId, detailItem.value.data);

			const response = await serviceStore.dispatcher.savePart(correlationId, detailItemData.value);
			logger.debug('partComponent', 'preCompleteOk', 'response', response, correlationId);
			return response;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);

			if (options.resetAdditional)
				options.resetAdditional(correlationId, orig);
		}
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

	const detailItemDescription = ref(null);
	const detailItemIsPublic = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const detailItemWeight = ref(null);
	const manufacturersI = ref(null);
	const weightMeasurementUnitId = ref(null);
	const weightMeasurementUnitsId = ref(null);
	
	const manufacturers = computed(() => {
		return manufacturersI.value ? manufacturersI.value.map((item) => { return { id: item.id, name: item.name }; }) : [];
	});
	const canAdd = computed(() => {
		return !isNew.value && !dirty.value;
	});
	const hasAdmin = computed(() => {
		return true;
	});
	const isPublic = computed(() => {
		return detailItemData.value ? detailItemData.value.public ?? false : false;
	});

	const handleAdd = () => {
	};
	const requestManufacturers = async (correlationId) => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => j === options.manufacturerType));
		temp2 = temp2.map((item) => { return { id: item.id, name: item.name }; });
		manufacturersI.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
	}
	const resetData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		detailItemIsPublic.value = value ? value.public : null;
		detailItemManufacturer.value = value ? value.manufacturerId : null;
		detailItemManufacturerStockId.value = value? value.manufacturerStockId : null;
		detailItemName.value = value ? value.name : null;
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
		detailItemDescription,
		detailItemIsPublic,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemWeight,
		manufacturers,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		canAdd,
		hasAdmin,
		isPublic,
		handleAdd,
		requestManufacturers
	};
};
</script>
