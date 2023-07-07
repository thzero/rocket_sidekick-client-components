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
	} = useDetailComponent(props, context, {
		init: (correlationId, value) => {
			detailItemDescription.value = value ? value.description : null;
			detailItemIsPublic.value = value ? value.public : null;
			detailItemManufacturer.value = value ? value.manufacturerId : null;
			detailItemName.value = value ? value.name : null;

			options.init(value);

			requestManufacturers(correlationId);
		},
		manufacturerType: options.manufacturerType,
		partsType: options.partsType,
		resetForm: (correlationId, orig) => {
			if (orig) {
				detailItemDescription.value = orig.description;
				detailItemName.value = orig.name;
				detailItemManufacturer.value = orig.manufacturerId;
				detailItemIsPublic.value = orig.public;

				options.resetForm(correlationId, orig);
			}
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
	const detailItemManufacturer = ref(null);
	const detailItemName = ref(null);
	const manufacturersI = ref(null);
	
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
	const preCompleteOk = async (correlationId) => {
		detailItem.value.data.description = String.trim(detailItemDescription.value);
		detailItem.value.data.name = String.trim(detailItemName.value);
		delete detailItem.value.data.public;
		detailItem.value.data.typeId = options.partsType;
		detailItem.value.data.manufacturerId = detailItemManufacturer.value;
		if (options.completeOk)
			detailItem.value.data = options.completeOk(correlationId, detailItem.value.data);
		const response = await serviceStore.dispatcher.savePart(correlationId, detailItemData.value);
		logger.debug('partComponent', 'preCompleteOk', 'response', response, correlationId);
		return response;
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
		detailItemManufacturer,
		detailItemName,
		manufacturers,
		canAdd,
		hasAdmin,
		isPublic,
		handleAdd,
		preCompleteOk,
		requestManufacturers
	};
};
</script>
