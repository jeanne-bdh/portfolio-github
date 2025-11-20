class Home {
    constructor() {
        this.profilHTML = document.querySelector('.js-home-github-url')
        this.descriptionHTML = document.querySelector('.js-home-description')
        this.init()
    }

    init() {
        this.getGithubProfil()
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

    updateGithubProfil(APIdata) {
        this.profilHTML.setAttribute("href", APIdata.html_url)
        this.descriptionHTML.textContent = APIdata.bio
    }
}

export { Home }