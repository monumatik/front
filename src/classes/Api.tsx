class Api {
    public static getProjectData = async (): Promise<JSON> => {
        let json = async (): Promise<JSON> => { 
            let response = await fetch(`https://mocki.io/v1/0ca7246a-210c-4d24-8dbd-717b5477603d`);
            let json = await response.json();
            return json;
        }
        return await json();
    }
}

export default Api;