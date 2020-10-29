import UserMovie from '@/models/dto/userMovie';
import Genre from '@/models/genre';

export default class Movie {
	public title = '';
	public releaseDate: Date = new Date();
	public id = 0; // pk in our db
	public movieDbId = 0; // id from movieDbApi
	public imdbId = ''; // imdb_id from movieDbApi
	public genres: Genre[] = [];
	public rating: number | null = null;
	public poster = '';
	public summary?: string = '';
	public userRating?: number;
	public watched = false;
	public favorite = false;

	constructor(dto: any, genres: Genre[]) {
		this.title = dto.title;
		this.releaseDate = dto.release_date;
		// this.id = dto.id;
		this.movieDbId = dto.id;
		this.imdbId = dto.imdb_id;
		this.genres = genres;
		this.rating = dto.vote_average;
		this.poster = dto.poster_path;
		this.summary = dto.overview;
		this.userRating = 5;
		this.watched = false;
		this.favorite = false;
	}

	public populateWithUser(dto: UserMovie) {
		this.id = dto.id;
		this.watched = dto.watched;
		this.favorite = dto.favorite;
	}
}
