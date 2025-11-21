// netlify/functions/github.js
import { Octokit } from "octokit";

export async function handler(event, context) {
    try {
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN, // Ton token est ici, côté serveur
        });

        // Appel API GitHub
        const repos = await octokit.request("GET /users/jeanne-bdh/repos", {
            per_page: 100,
            sort: "updated",
        });

        // Retourne les données au front
        return {
            statusCode: 200,
            body: JSON.stringify(repos.data),
        };

    } catch (error) {
        console.error("Erreur API GitHub", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Erreur interne" }),
        };
    }
}
