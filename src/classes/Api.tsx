class Api {
    public static getProjectData = async (): Promise<JSON> => {
        let json = async (): Promise<JSON> => { 
            let response = await fetch(`https://mocki.io/v1/bb05a01c-4842-4047-8865-39b8ec3a271a`);
            let json = await response.json();
            return json;
        }
        return await json();
    }
}

export default Api;