export const useRocketPartDialogComponentProps = {
	editable: {
		type: Boolean,
		default: false
	},
	preCompleteOk: {
		type: Function,
		default: { }
	},
	signal: {
		type: Boolean,
		default: false
	},
	value: {
		type: Object,
		default: { }
	}
};
