<script>
// import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useUserGalleryComponent } from '@/components/content/gallery/galleryComponent';
import { useRocketsBaseComponent } from '@/components/content/rockets/gallery/rocketsBase';

export function useRocketsUserGalleryComponent(props, context, options) {
	// const {
	// 	correlationId,
	// 	error,
	// 	hasFailed,
	// 	hasSucceeded,
	// 	initialize,
	// 	logger,
	// 	noBreakingSpaces,
	// 	notImplementedError,
	// 	success
	// } = useBaseComponent(props, context, options);
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
		typeGamerTag,
		typeUser,
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
		gamerTag: requestedTag
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
		rocketUrl
	};
}
</script>