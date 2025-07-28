import AppCommonConstants from 'rocket_sidekick_common/constants';

export const useRocketInfoBaseProps = {
		backType: {
			type: String,
			default: 'back'
		},
		id: {
			type: String
		},
		requestedTag: {
			type: String
		},
		showUserName: {
			type: Boolean
		},
		type: {
			type: String,
			default: AppCommonConstants.Rocketry.RocketTypes.Site
		}
};
