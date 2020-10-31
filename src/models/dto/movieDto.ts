// directly maps with results from MovieDb get movie/id
export default interface MovieDto {
	title: string;
	release_date: Date;
	id: number;
	imdb_id: string; // not returned by search, only get
	genre_ids: number[];
	vote_average: number;
	poster_path: string;
	overview: string;
}
