import axios from 'axios';

class IdeasAPI {
    constructor(){
        this.apiURL = 'http://localhost:5000/api/ideas';
    }

    getIdeas = () =>{
        return axios.get(this.apiURL);
    }

    createIdea = (data) =>{
        return axios.post(this.apiURL, data);
    }

    updateIdea = (id, data) =>{
        return axios.put(`${this.apiURL}/${id}`, data);
    }

    deleteIdea = (id) =>{
        const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
        return axios.delete(`${this.apiURL}/${id}`,{data: {username: username}});
    }
}

export default new IdeasAPI();