import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export const useMeasurementUnitSelectBaseProps = {
	...useBaseControlEditProps,
	measurementUnitsType: {
		type: String,
		default: null
	}
};
