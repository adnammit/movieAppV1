import axios from 'axios';
import Movie from '@/models/movie';
import MovieDto from '@/models/dto/movieDto';
import Genre from '@/models/genre';
import config from '@/config.json';
import SearchDto from '@/models/dto/searchDto';
import SearchResult from '@/models/searchResult';

const url: string = config.movieDbUrl;
const token: string = config.movieDbToken;

const requestMgr = axios.create({
	baseURL: url,
	headers: {
		common: {
			Authorization: 'Bearer ' + token,
		},
	},
});

class MovieApi {
	private genres: Genre[] = [];

	constructor() {
		this.getGenres();
	}

	private async getGenres() {
		requestMgr.get('genre/movie/list').then(res => {
			this.genres = res.data.genres.map((g: any) => new Genre(g));
		});
	}

	public async search(search: string): Promise<SearchResult[]> {
		return requestMgr.get('search/multi?query=' + search).then(res => {
			const data = res.data.results;
			let results: SearchResult[] = []; // return SearchResult

			data.forEach((d: SearchDto) => {
				if (d.media_type == 'movie') {
					const parsed = this.parseSearchResult(d);
					results.push(parsed);
				}
			});

			results = results.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});

			return results;
		});
	}

	public async getMovie(id: number): Promise<Movie> {
		return requestMgr.get('movie/' + id).then(res => {
			return this.parseMovieResult(res.data as MovieDto);
		});
	}

	private parseMovieResult(res: MovieDto): Movie {
		let genres: Genre[] = [];
		if (res.genre_ids) {
			genres = this.genres.filter(g => res.genre_ids.includes(g.id));
		}

		// to-do: log unaccounted for genres

		return new Movie(res, genres);
	}

	private parseSearchResult(res: SearchDto): SearchResult {
		let genres: Genre[] = [];
		if (res.genre_ids) {
			genres = this.genres.filter(g => res.genre_ids.includes(g.id));
		}

		// to-do: log unaccounted for genres

		return new SearchResult(res, genres);
	}
}

export default new MovieApi();
