import AppCommonConstants from 'rocket_sidekick_common/constants';

export const useLaunchInfoBaseProps = {
	backType: {
		type: String,
		default: 'none'
	},
	clickType: {
		type: String,
		default: 'hyperlink'
	},
	displayExtras: {
		type: Boolean,
		default: false
	},
	id: {
		type: String
	},
	showUserName: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: AppCommonConstants.Rocketry.DisplayTypes.Site
	}
};