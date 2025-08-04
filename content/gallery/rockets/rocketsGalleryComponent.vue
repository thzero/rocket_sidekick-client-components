<script>
import { onMounted, ref } from 'vue';

import AppUtility from '@/utility/app';

import { useUserGalleryComponent } from '@/components/content/gallery/galleryComponent';
import { useRocketsBaseComponent } from '@/components/content/rockets/gallery/rocketsBase';

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
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rockets,
		title,
		type,
		rocketUrl
	} = useRocketsBaseComponent(props, context, {
		type: props.type ? props.type : null,
		requestedTag: requestedTag
	});

	const rocketId = ref(null);
	const rocketInfo = ref(null);

	const handleRocket = (id) => {
		rocketId.value = id;
	};

	const handleRocketClose = () => {
		rocketId.value = null;
	};

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), 'gallery.launches');
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
		requestedTag,
		user,
		serviceStore,
		sortByOrder,
		target,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rockets,
		title,
		type,
		rocketUrl,
		rocketId,
		rocketInfo,
		handleRocket,
		handleRocketClose
	};
}
</script>