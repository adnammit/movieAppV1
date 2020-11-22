import TvDto from '@/models/dto/tvDto';
import Media from '@/models/media';

export default class Tv extends Media {
	private firstAirDate: Date = new Date();
	public get released(): Date {
		return this.firstAirDate;
	}

	constructor(dto?: TvDto) {
		super(dto);
		this.title = dto ? dto.name : '';
		this.firstAirDate = dto ? dto.first_air_date : new Date();
	}
}
