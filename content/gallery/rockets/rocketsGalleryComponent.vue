<script>
import { onMounted, ref, watch } from 'vue';

import AppUtility from '@/utility/app';

import { useUserGalleryComponent } from '@/components/content/gallery/galleryComponent';
import { useRocketsGalleryBaseComponent } from '@/components/content/rockets/gallery/rocketsGalleryBase';

export function useRocketsUserGalleryComponent(props, context) {
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
		requestedTag,
		// title,
		user
	} = useUserGalleryComponent(props, context, { 
		user: false 
	});
	const {
		serviceStore,
		sortByOrder,
		target,
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
		rocketManufacturerName,
		rocketManufacturerRocketName,
		rocketManufacturerStockId,
		rocketManufacturerUrl,
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
		rocketWeightHighest,
		buttonsDialog,
		buttonsForms,
		displayDrawer,
		filterItemRocketName,
		filterItemRocketTypes,
		invalid,
		isSearching,
		manufacturers,
		params,
		rockets,
		title,
		type,
		validation,
		buttonOkDisabled,
		clickSearchClear,
		clickSearch,
		fetch,
		reset,
		rocketUrl,
		submit,
		toggleDrawer
	} = useRocketsGalleryBaseComponent(props, context, {
		parent: 'useRocketsUserGalleryComponent',
		filter: async (params) => { await filterI(params); },
		reset: async (params) => { await resetI(params); }
	});

	const rocketId = ref(null);
	const rocketInfo = ref(null);

	const filterI = async (params) => {
		return params;
	};
	const handleRocket = (id) => {
		rocketId.value = id;
	};
	const handleRocketClose = () => {
		rocketId.value = null;
	};
	const resetI = () => {
	};

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), 'gallery.launches');
	});

	watch(() => validation.value,
		async (value) => {
			invalid.value = value.$invalid;
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
		requestedTag,
		user,
		serviceStore,
		sortByOrder,
		target,
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rockets,
		title,
		type,
		manufacturers,
		rocketUrl,
		buttonsDialog,
		buttonsForms,
		displayDrawer,
		filterItemRocketName,
		filterItemRocketTypes,
		rocketId,
		rocketInfo,
		invalid,
		buttonOkDisabled,
		clickSearchClear,
		clickSearch,
		handleRocket,
		handleRocketClose,
		toggleDrawer,
		scope: 'RocketsUserGalleryComponent',
		validation: validation
	};
}
</script>