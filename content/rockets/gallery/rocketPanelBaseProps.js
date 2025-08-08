import ManufacturersService from '@/service/manufacturers';
import AppCommonConstants from 'rocket_sidekick_common/constants';

export const useRocketPanelBaseProps = {
	clickType: {
		type: String,
		default: 'hyperlink'
	},
	displayExtras: {
		type: Boolean,
		default: false
	},
	manufacturers: {
		type: Array
	},
	requestedTag: {
		type: String
	},
	item: {
		type: Object,
		default: {}
	},
	type: {
		type: String,
		default: AppCommonConstants.Rocketry.DisplayTypes.Site
	}
};
