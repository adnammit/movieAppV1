import MovieDto from '@/models/dto/movieDto';
import Media from '@/models/media';

export default class Movie extends Media {
	private releaseDate: Date = new Date();
	public get released(): Date {
		return this.releaseDate;
	}

	constructor(dto?: MovieDto) {
		super(dto);
		this.title = dto ? dto.title : '';
		this.releaseDate = dto ? dto.release_date : new Date();
	}
}
