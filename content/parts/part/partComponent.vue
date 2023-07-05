<script>
import { computed, onMounted, ref, watch } from 'vue';

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
		resetForm
	} = useDetailComponent(props, context, options);

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
		measurementUnitslengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType
	} = useToolsMeasurementBaseComponent(props, context);

	const detailItemDescription = ref(null);
	const detailItemIsPublic = ref(null);
	const detailItemName = ref(null);
	const manufacturer = ref(null);
	const manufacturers = ref(null);

	const canAdd = computed(() => {
		return !isNew.value && !dirty.value;
	});
	const isPublic = computed(() => {
		return detailItemData.value ? detailItemData.value.public ?? false : false;
	});

	const handleAdd = () => {
	};
	const preCompleteOk = async (correlationId) => {
		detailItem.value.data.description = String.trim(detailItemDescription.value);
		detailItem.value.data.name = String.trim(detailItemName.value);
		delete detailItem.value.data.public;
		const response = await serviceStore.dispatcher.savePart(correlationId, detailItemData.value);
		logger.debug('partComponent', 'preCompleteOk', 'response', response, correlationId);
		return response;
	};
	const requestManufacturers = async (correlationId) => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => j === options.manufacturerType));
		temp2 = temp2.map((item) => { return { id: item.abbrTc, name: item.name }; });
		manufacturers.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
	}

	watch(() => props.modelValue,
		async (value) => {
			if (formControlRef && formControlRef.value)
				await formControlRef.value.reset(correlationId, false);
		}
	);
	
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
		resetForm,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitslengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		detailItemDescription,
		detailItemIsPublic,
		detailItemName,
		manufacturer,
		manufacturers,
		canAdd,
		isPublic,
		handleAdd,
		preCompleteOk,
		requestManufacturers
	};
};
</script>
