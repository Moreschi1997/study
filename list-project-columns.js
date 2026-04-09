const authToken = process.env['AUTH_TOKEN'];

if (!authToken) {
    throw new Error("Must set AUTH_TOKEN environment variable");
}

const headers = {
    "Authorization": `Bearer ${authToken}`,
    "User-Agent": "Modern-Lister-v2026",
    "Accept": "application/vnd.github.v3+json"
};

async function listColumns() {
    try {
        
        const response = await fetch('https://api.github.com/repos/DefinitelyTyped/DefinitelyTyped/projects', { headers });
        
        if (!response.ok) {
            throw new Error(`Erro API: ${response.status} - Verifique se o seu Token tem permissão de 'Projects'`);
        }

        const projectsData = await response.json();

        for (const project of projectsData) {
            console.log(`\n== Project: ${project.name} (ID: ${project.id}) ==`);
            
            const colResponse = await fetch(`https://api.github.com/projects/${project.id}/columns`, { headers });
            const columns = await colResponse.json();

            if (Array.isArray(columns)) {
                console.log("{");
                columns.forEach(c => {
                    console.log(`  "${c.name}": ${c.id},`);
                });
                console.log("}");
            }
        }
    } catch (error) {
        console.error("Erro na requisição:", error.message);
    }
}

listColumns();