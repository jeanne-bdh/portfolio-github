import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit()

octokit.rest.repos
    .get({
        owner: "jeanne-bdh",
        repo: "ecoride"
    })
    .then(({ data }) => {
        console.log("Repositories", data)
    });