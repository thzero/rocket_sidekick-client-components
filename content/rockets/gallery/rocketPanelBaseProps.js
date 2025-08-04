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
