import SearchDto from '@/models/dto/searchDto';
import Genre from '@/models/genre';

export class SearchResult {
	public title = '';
	public releaseDate: Date = new Date();
	public movieDbId = 0;
	public mediaType = ''; // enum
	public genres: Genre[] = [];
	public popularRating: number | null = null;
	public poster = '';
	public summary?: string = '';

	constructor(dto: SearchDto, genres: Genre[]) {
		this.title = dto.title;
		this.releaseDate = dto.release_date;
		this.movieDbId = dto.id;
		this.mediaType = dto.media_type == 'movie' ? 'movie' : 'unknown';
		this.genres = genres;
		this.popularRating = dto.vote_average;
		this.poster = dto.poster_path;
		this.summary = dto.overview;
	}
}
