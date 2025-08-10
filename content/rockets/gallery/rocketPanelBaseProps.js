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
	item: {
		type: Object,
		default: {}
	},
	manufacturers: {
		type: Array
	},
	requestedTag: {
		type: String
	},
	type: {
		type: String,
		default: AppCommonConstants.Rocketry.DisplayTypes.Site
	}
};
