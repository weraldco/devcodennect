const API_ROOT = '/api';

export const API_PATHS = {
	AUTH: {
		SIGNIN: `${API_ROOT}/auth/signin`,
		SIGNUP: `${API_ROOT}/auth/signup`,
		SIGNOUT: `${API_ROOT}/auth/signout`,
		GETUSERINFO: `${API_ROOT}/auth/getUser`,
		ADDNEWSKILL: `${API_ROOT}/auth/addSkill`,
		GETSKILLS: `${API_ROOT}/auth/getSkills`,
		UPLOAD_IMAGE: `${API_ROOT}/auth/upload-image`,
	},
	USER: {
		GETUSER: (userId: number) => `${API_ROOT}/user/getUser/${userId}`,
	},
};
