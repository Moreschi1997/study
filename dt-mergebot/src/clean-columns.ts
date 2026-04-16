import { readFile } from 'fs/promises';


interface GraphQLResponse {
    data?: {
        repository: {
            project: {
                columns: {
                    edges: Array<{
                        node: {
                            cards: {
                                edges: Array<{
                                    node: {
                                        databaseId: number;
                                        content: { state: string };
                                    };
                                }>;
                            };
                        };
                    }>;
                };
            };
        };
    };
}

const authToken = process.env['AUTH_TOKEN'];
const API_URL = 'https://api.github.com/graphql';
const REST_URL = 'https://api.github.com/projects/columns/cards';

const headers = {
    "User-Agent": "Modern-ColumnCleaner-v2026",
    "Authorization": `Bearer ${authToken}`,
    "Accept": "application/vnd.github.inertia-preview+json",
    "Content-Type": "application/json"
};

async function efficientCleaner() {

    const query = await readFile('./query.graphql', 'utf-8');

    const response = await fetch(API_URL, { method: 'POST', headers, body: JSON.stringify({ query }) });
    
    const {data}: GraphQLResponse = await response.json();

    const allCards = data?.repository.project.columns.edges.flatMap(col => col.node.cards.edges) || [];

    const targets = allCards
        .map(edge => edge.node)
        .filter(card => card.content.state !== 'OPEN');
    if (targets.length === 0){
        return console.log("nothing to clean");
    }

    await Promise.all(targets.map(card => 
        fetch(`${REST_URL}/${card.databaseId}`, { method: 'DELETE', headers })
            .then(res => res.ok ? console.log(`Card ${card.databaseId} removed`) : null)
    ));

    console.log(`🚀 cleaning completed: ${targets.length} targets processed.`);
}

efficientCleaner();