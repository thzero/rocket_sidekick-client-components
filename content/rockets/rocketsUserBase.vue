<script>
import { onMounted, ref} from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useDetailComponent } from '@/components/content/detailComponent';
import { useRocketsBaseComponent } from '@/components/content/rockets/rocketsBase';

export function useRocketsUserBaseComponent(props, context, options) {
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
		serviceStore,
		sort,
		target,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rockets,
		title,
		type,
		rocketUrl
	} = useRocketsBaseComponent(props, context, options, {
		type: AppCommonConstants.Rocketry.DisplayTypes.User
	});
	
	const {
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
		// init: (value) => {
		// 	detailItemDescription.value = value ? value.description : null;
		// 	detailItemIsDefault.value = value ? value.isDefault : null;
		// 	detailItemName.value = value ? value.name : null;
		// },
		// resetForm: (correlationId, orig) => {
		// 	if (orig) {
		// 		detailItemDescription.value = orig.description;
		// 		detailItemName.value = orig.name;
		// 	}
		// }
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
		serviceStore,
		sort,
		target,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rockets,
		title,
		type,
		rocketUrl,
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
	};
};
</script>
