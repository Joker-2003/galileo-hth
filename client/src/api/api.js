import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const userLogin = async (email, user_id, image, name) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/login`, {
			email,
			user_id,
			image,
			name,
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getAllWorkspaces = async (userid) => {
	try {
		const response = await axios.get(`${BASE_URL}/workspace/user/${userid}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const createWorkspace = async (user_id, title) => {
	try {
		const response = await axios.post(`${BASE_URL}/workspace`, {
			user_id,
			title,
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
	
}


export const sendSyllabus = async (workspace_id, file) => {
	try {
		const response = await axios.post(`${BASE_URL}/workspace/${workspace_id}`, file);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

//returns all the topics array etc
export const fetchWorkspace = async (workspace_id) => {
	try {
		const response = await axios.get(`${BASE_URL}/workspace/${workspace_id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}


export const fetchMinmap = async (workspace_id) => {
	try{
		
	}
}