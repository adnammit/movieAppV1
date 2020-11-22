declare global {
	interface String {
		isNullOrWhitespace(): boolean;
	}
}

String.prototype.isNullOrWhitespace = function(): boolean {
	if (typeof this === 'undefined' || this == null) return true;
	return this.replace(/\s/g, '').length < 1;
};

export {};
