import Movie from '@/models/movie';

export default class Collection {
	public userid = 0; // replace with User?
	public email = '';
	public movies: Movie[] = [];

	constructor(userid?: number, movies?: Movie[]) {
		this.userid = userid ? userid : 0;
		this.movies = movies ? movies : [];
	}
}
