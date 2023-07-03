import AppCommonConstants from 'rocket_sidekick_common/constants';

export const useRocketPanelBaseProps = {
	item: {
		type: Object,
		default: {}
	},
	type: {
		type: String,
		default: AppCommonConstants.Rocketry.DisplayTypes.Site
	}
};
