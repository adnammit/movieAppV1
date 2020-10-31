// directly maps with results from MovieDb search
export default interface SearchDto {
	title: string;
	release_date: Date;
	id: number;
	media_type: string;
	genre_ids: number[];
	vote_average: number;
	poster_path: string;
	overview: string;
}
