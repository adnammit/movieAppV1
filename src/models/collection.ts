import Media from '@/models/media';

export default class Collection {
	public userid = 0; // replace with User?
	// public email = '';
	public items: Media[] = [];

	constructor(userid?: number, items?: Media[]) {
		this.userid = userid ? userid : 0;
		this.items = items ? items : [];
	}
}
