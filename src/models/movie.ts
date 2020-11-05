import MovieDto from '@/models/dto/movieDto';
import UserMovie from '@/models/dto/userMovie';
import Genre from '@/models/genre';

export default class Movie {
	public title = '';
	public releaseDate: Date = new Date();
	public id = 0; // pk in our db
	public movieDbId = 0; // id from movieDbApi
	public imdbId = ''; // imdb_id from movieDbApi
	public genres: Genre[] = [];
	public popularRating?: number;
	public poster = '';
	public summary = '';
	public rating?: number;
	public watched = false;
	public favorite = false;

	constructor(dto?: MovieDto) {
		this.title = dto ? dto.title : '';
		this.releaseDate = dto ? dto.release_date : new Date();
		this.movieDbId = dto ? dto.id : NaN;
		this.imdbId = dto ? dto.imdb_id : '';
		this.genres = dto ? dto.genres : [];
		this.popularRating = dto?.vote_average;
		this.poster = dto ? dto.poster_path : '';
		this.summary = dto ? dto?.overview : '';
		this.watched = false;
		this.favorite = false;
	}

	public populateWithUser(dto: UserMovie) {
		this.id = dto.movieid;
		this.rating = dto.rating;
		this.watched = dto.watched;
		this.favorite = dto.favorite;
	}
}
