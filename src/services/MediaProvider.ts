// talks to the movieApi and gets info from our third party api
// gets our app data from the mediaService depending on whether we're testing/mocking or not
import Collection from '@/models/collection';
import Movie from '@/models/movie';
import MovieApi from '@/services/MovieApi';
import IMediaService from '@/services/IMediaService';
import MediaService from '@/services/MediaService';
import MockMediaService from '@/services/MockMediaService';

class MediaProvider {
	private service: IMediaService;

	constructor() {
		this.service = process.env.NODE_ENV === 'testing' ? MockMediaService : MediaService;
	}

	public async getUserCollection(userid: number): Promise<Collection> {
		const movies = await this.getUserMovies(userid);
		return new Collection(userid, movies);
	}

	private async getUserMovies(userid: number): Promise<Movie[]> {
		const userMovieData = await this.service.getUserMovies(userid);
		const movies = [];

		for (const item of userMovieData) {
			const id: number = +item.imdbid;
			const movie: Movie = await MovieApi.getMovie(id);
			movie.populateWithUser(item);
			movies.push(movie);
		}

		// console.log('>> movies ' + JSON.stringify(movies));
		return movies;
	}
}

export default new MediaProvider();
