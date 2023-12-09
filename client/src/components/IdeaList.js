import IdeasAPI from '../services/IdeasApi';

class IdeaList {
    constructor(){
        this.ideaListElement = document.querySelector('#idea-list');
        this.fetchIdeas();
        this.ideas = [];
        this.tagsSet = new Set();
        this.tagsSet.add('technology');
        this.tagsSet.add('software');
        this.tagsSet.add('business');
        this.tagsSet.add('education');
        this.tagsSet.add('health');
        this.tagsSet.add('inventions');
    }

    addEventListeners = () =>{
        this.ideaListElement.addEventListener('click', this.deleteEvent)
    }

    deleteEvent = async (e) =>{
        if(e.target.classList.contains('fa-times')){
            e.stopImmediatePropagation();
            const ideaID = e.target.parentElement.parentElement.dataset.id;
            
            try {
                //delete from server
                console.log("Front end", localStorage.getItem('username'));
                const delIdea = await IdeasAPI.deleteIdea(ideaID);

                //delete the idea from the DOM
                this.ideas.filter(idea => idea._id != ideaID);
                this.fetchIdeas();
            } catch (error) {
                console.log(error);
                alert('You cannot delete this idea, because it was not created by you');
            }

        }
    }

    fetchIdeas = async () =>{
        try {
           const res = await IdeasAPI.getIdeas();
           this.ideas = res.data.data;
        } catch (error) {
            console.log(error);
        }

        this.render();
    }

    addIdeaToFrontend = (idea) =>{
        this.ideas.push(idea);
        this.render();
    }

    getTagClass = (tag) =>{
        let tagClass = '';

        if(this.tagsSet.has(tag)){
            return `tag-${tag}`;
        }
        else{
            return ''
        }
    }

    render = () =>{
        this.ideaListElement.innerHTML = this.ideas.map(item =>{
            const delBtn = item.username == localStorage.getItem('username') ? 
            `<button class="delete"><i class="fas fa-times"></i></button>` :
            '';

            return ` 
            <div class="card" data-id="${item._id}">
                ${delBtn}
                <h3>${item.text}</h3>
                <p class="tag ${this.getTagClass(item.tag)}">${item.tag.toUpperCase()}</p>
                <p>
                    Posted on <span class="date">${item.date.split('T')[0]}</span> by
                    <span class="author">${item.username}</span>
                </p>
            </div>`
        }).join('');

        this.addEventListeners();
    }
}

export default IdeaList;