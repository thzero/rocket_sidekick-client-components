import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export const useMeasurementUnitSelectBaseProps = {
	...useBaseControlEditProps,
	measurementUnitsId: {
		type: String,
		default: AppCommonConstants.MeasurementUnits.english.id
	},
	measurementUnitsType: {
		type: String,
		default: null
	}
};
