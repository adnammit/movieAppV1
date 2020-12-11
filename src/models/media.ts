import MovieDto from '@/models/dto/movieDto';
import TvDto from '@/models/dto/tvDto';
import UserMedia from '@/models/dto/userMedia';
import Genre from '@/models/genre';

export default abstract class Media {
	public title = '';
	public id = 0; // pk in our db
	public movieDbId = 0; // id from movieDbApi
	public imdbId = ''; // imdb_id from movieDbApi
	public genres: Genre[] = [];
	public popularRating?: number;
	public poster = '';
	public homepage = '';
	public tagline = '';
	public summary = '';
	public originalLanguage = '';
	public rating = 0;
	public watched = false;
	public favorite = false;
	public queued = false;
	public abstract released: Date;

	constructor(dto?: MovieDto | TvDto) {
		this.movieDbId = dto ? dto.id : NaN;
		this.imdbId = dto ? dto.imdb_id : '';
		this.genres = dto ? dto.genres : [];
		this.popularRating = dto?.vote_average;
		this.poster = dto ? dto.poster_path : '';
		this.homepage = dto ? dto.homepage : '';
		this.tagline = dto ? dto.tagline : '';
		this.summary = dto ? dto.overview : '';
		this.originalLanguage = dto ? dto.original_language : '';
	}

	public populateWithUser(dto: UserMedia) {
		this.id = dto.id;
		this.rating = dto.rating;
		this.watched = dto.watched;
		this.favorite = dto.favorite;
		this.queued = dto.queued;
	}
}
