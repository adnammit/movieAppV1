import axios from 'axios';
import User from '@/models/user';
import UserMovie from '@/models/dto/userMovie';
import IMediaService from '@/services/IMediaService';

const requestMgr = axios.create({
	baseURL: process.env.VUE_APP_MEDIA_SERVICE_URL,
});

class MediaService implements IMediaService {
	// we don't actually need this right now cos we just use the okta user
	public async getUsers(): Promise<User[]> {
		return requestMgr.get('user/').then(res => {
			return res?.data ? res.data : [];
		});
	}

	public async getUserMovies(userid: number): Promise<UserMovie[]> {
		return requestMgr.get('user/' + userid + '/movies').then(res => {
			return res.data as UserMovie[];
		});
	}
}

export default new MediaService();
