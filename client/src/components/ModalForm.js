import IdeasApi from '../services/IdeasApi';
import IdeaList from './IdeaList';

class ModalForm {
    constructor(){
        this.formModal = document.querySelector('#form-modal');
        this.ideaList = new IdeaList();
    }

    eventListeners = () =>{
        this.form.addEventListener('submit', this.handleSubmission.bind(this));
    }

    handleSubmission = async (e) =>{
        e.preventDefault();

        //Set username to local storage
        localStorage.setItem('username', this.form.elements.username.value);
        
        const newIdea = {
            username: this.form.elements.username.value,
            text: this.form.elements.text.value,
            tag: this.form.elements.tag.value
        }

        let returnResponse;
        try {
           const res = await IdeasApi.createIdea(newIdea);
           returnResponse = res.data.data;
        } catch (error) {
            console.log(error);
        }

        //Update the front-end
        this.ideaList.addIdeaToFrontend(returnResponse);

        //Clear the fields
        this.form.elements.username.value = '';
        this.form.elements.text.value = '';
        this.form.elements.tag.value = '';

        this.displayForm();
        document.dispatchEvent(new Event('closeModal'));
    }

    displayForm = () =>{
        this.formModal.innerHTML = 
        `<form id="idea-form">
            <div class="form-control">
                <label for="idea-text">Enter a Username</label>
                <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" required/>
            </div>
            <div class="form-control">
                <label for="idea-text">What's Your Idea?</label>
                <textarea name="text" id="idea-text" required></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <select name="tag" id="tag" required>
                    <option value="technology">Technology</option>
                    <option value="software">Software</option>
                    <option value="business">Business</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="inventions">Inventions</option>
                </select>
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
        </form>`
        this.form = document.querySelector('#idea-form');
        this.eventListeners();
    }
}

export default ModalForm;