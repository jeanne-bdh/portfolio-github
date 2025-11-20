import { Octokit } from "https://esm.sh/octokit";

class Home {
    constructor() {
        this.profilGithub = document.querySelector('.js-home-github-url')
        this.descriptionGithub = document.querySelector('.js-home-description')

        this.reposTitle = document.querySelectorAll('.js-home-repo-title')
        this.reposDescription = document.querySelectorAll('.js-home-repo-description')
        this.reposTags = document.querySelectorAll('.js-home-repo-tag')
        this.init()
    }

    init() {
        this.getGithubProfil()
        this.getRepo()
    }

    getGithubProfil() {
        fetch('https://api.github.com/users/jeanne-bdh')
            .then((response) => response.json())
            .then((data) => {
                this.updateGithubProfil(data)
            })
            .catch((error) => {
                console.error("Erreur lors de l'appel API", error)
            })
    }

    async getRepo() {
        const octokit = new Octokit()
        const response = await octokit
            .request("GET /users/jeanne-bdh/repos")
            .catch((error) => {
                console.error("Erreur lors de l'appel API", error)
            })

        this.updateAllProjects(response.data)
    }

    updateGithubProfil(APIdata) {
        this.profilGithub.setAttribute("href", APIdata.html_url)
        this.descriptionGithub.textContent = APIdata.bio
    }

    updateAllProjects(ProjetsData) {
        let htmlIndex = 0

        for (let i = 0; i < 3; i++) {
            const repo = ProjetsData[i];

            this.reposTitle[htmlIndex].textContent = repo.name;
            this.reposDescription[htmlIndex].textContent = repo.description;

            const titleProject = repo.name;
            const descriptionProject = repo.description;
            const languages = repo.topics;
            
            htmlIndex++
        }
    }
}

export { Home }