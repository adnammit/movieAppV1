import axios from 'axios';
import User from '@/models/user';
import UserMovie from '@/models/dto/userMovie';
import IMediaService from '@/services/IMediaService';
import Movie from '@/models/movie';

const requestMgr = axios.create({
	baseURL: `${process.env.VUE_APP_MEDIA_SERVICE_URL}api/v1/`,
});

class MediaService implements IMediaService {
	// we don't actually need this right now cos we just use the okta user
	public async getUsers(): Promise<User[]> {
		return requestMgr.get('user/').then(res => {
			return res?.data ? res.data : [];
		});
	}

	public async getUserMovies(userid: number): Promise<UserMovie[]> {
		return requestMgr
			.get('user/' + userid + '/movies')
			.then(res => {
				return res.data as UserMovie[];
			})
			.catch(error => {
				this.logError(error);
				throw error;
			});
	}

	public async updateUserMovie(userid: number, movie: Movie): Promise<boolean> {
		const request: any = {
			id: movie.id,
			rating: movie.rating,
			watched: movie.watched,
			favorite: movie.favorite,
		};
		return requestMgr
			.put('user/' + userid + '/movies', request)
			.then(res => {
				return res.status === 200;
			})
			.catch(error => {
				this.logError(error);
				throw error;
			});
	}

	public async addUserMovie(userid: number, movie: Movie): Promise<boolean> {
		const request: any = {
			movieDbId: movie.movieDbId,
			imdbId: movie.imdbId,
			rating: movie.rating,
			watched: movie.watched,
			favorite: movie.favorite,
		};
		return requestMgr
			.post('user/' + userid + '/movies', request)
			.then(res => {
				return res.status === 200;
			})
			.catch(error => {
				this.logError(error);
				throw error;
			});
	}

	public async deleteUserMovie(userid: number, movie: Movie): Promise<boolean> {
		return requestMgr
			.delete('user/' + userid + '/movies/' + movie.id)
			.then(res => {
				return res.status === 200;
			})
			.catch(error => {
				this.logError(error);
				throw error;
			});
	}

	private logError(error: any) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.config);
	}
}

export default new MediaService();
