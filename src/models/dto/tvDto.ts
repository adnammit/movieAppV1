import Genre from '@/models/genre';

// directly maps with results from MovieDb get tv/id
export default interface TvDto {
	name: string;
	first_air_date: Date;
	id: number;
	imdb_id: string; // idk why tv serach doesn't directly return imdbid
	genres: Genre[];
	homepage: string;
	vote_average: number;
	original_language: string;
	poster_path: string;
	overview: string;
	episode_run_time: number;
	number_of_seasons: number;
	tagline: string;
}
