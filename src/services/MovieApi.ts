import axios from 'axios';
import Movie from '@/models/movie';
import Genre from '@/models/genre';
import config from '@/config.json';

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
	public async search(search: string) {
		return requestMgr.get('search/multi?query=' + search).then(res => {
			const data = res.data.results;
			const movies: Movie[] = [];
			data.forEach((d: any) => {
				if (d.media_type == 'movie' || d.media_type == 'tv') movies.push(d as Movie);
				else console.log('>> non-movie search result: ' + JSON.stringify(d));
			});
			return movies;
		});
	}

	public async getMovie(id: number): Promise<Movie> {
		return requestMgr.get('movie/' + id).then(res => {
			return this.parseMovie(res.data);
		});
	}

	private parseMovie(res: any): Movie {
		let genres: Genre[] = [];
		if (res.genres) {
			genres = res.genres.map((g: any) => {
				return new Genre(g);
			});
		}

		// let known = [];
		// let unaccounted = genres.map((g) => {
		//     g.Name
		// });
		// if(unaccounted.length > 0) {
		//     console.log('>>> genres unaccounted for')
		//     console.log();
		// }

		return new Movie(res, genres);
	}
}

export default new MovieApi();
