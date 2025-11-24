//import { Octokit } from "https://esm.sh/octokit";

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
        const response = await fetch('/.netlify/functions/github')
        const data = await response.json()
        const recentsProjects = data.slice(-3)

        for (let i = 0; i < recentsProjects.length; i++) {
            const languagesUrl = recentsProjects[i].languages_url;
            const resLang = await fetch(languagesUrl).then(r => r.json())
            recentsProjects[i].languages = resLang
        }

        this.updateAllProjects(recentsProjects)
    }

    /*
    async getRepo() {
        const octokit = new Octokit()
        const response = await octokit
            .request("GET /users/jeanne-bdh/repos")
            .catch((error) => {
                console.error("Erreur lors de l'appel API", error)
            })

        const recentsProjects = response.data.slice(-3)

        for (let i = 0; i < recentsProjects.length; i++) {
            const languagesUrl = recentsProjects[i].languages_url
            const responseLanguages = await octokit
                .request(`GET ${languagesUrl}`)
                .catch((error) => {
                    console.error("Erreur lors de l'appel API", error)
                })

            const projectLanguages = responseLanguages.data
            recentsProjects[i].languages = projectLanguages

        }
        this.updateAllProjects(recentsProjects)
    }
        */

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
            this.createLanguageTag(this.reposTags[i], repo.languages);
            htmlIndex++
        }
    }

    createLanguageTag(div, languages) {
        const arrayLanguages = Object.keys(languages);
        for (let i = 0; i < arrayLanguages.length; i++) {
            const span = document.createElement('span');
            span.textContent = arrayLanguages[i];
            div.appendChild(span);
        }
        console.log(arrayLanguages)
    }
}

export { Home }