export const useChecklistStepsComponentProps = {
	debug: {
		type: Boolean,
		default: false
	},
	item: {
		type: Object,
		default: { }
	},
	readonly: {
		type: Boolean,
		default: false
	},
	updateOrder: {
		type: Function,
		default: null
	}
};
