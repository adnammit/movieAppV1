import moment from 'moment';

declare global {
	interface Date {
		isValidDate(): boolean;
		getYear(): string;
		getToday(): Date;
	}
	interface String {
		getIsoFormat(): string;
		getDisplayFormat(): string;
		parseDate(): Date;
	}
}

String.prototype.getIsoFormat = function(): string {
	const date = new Date(this.toString());
	return date.toISOString().substring(0, 10);
};

String.prototype.getDisplayFormat = function(): string {
	const date = moment(this.toString());
	if (date.isValid()) return date.format('MM/DD/YYYY');
	return '';
};

String.prototype.parseDate = function(): Date {
	return new Date(moment(this.toString()).format());
};

Date.prototype.isValidDate = function(): boolean {
	return this instanceof Date && !isNaN(this.getTime());
};

Date.prototype.getYear = function(): string {
	const date = moment(String(this));
	if (date.isValid()) {
		return date.year().toString();
	}
	return '';
};

Date.prototype.getToday = function(): Date {
	return moment().toDate();
};

export {};
