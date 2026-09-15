import Search from "./page";
export interface SearchEntityDto {
    id: number, 
    keyword: string, 
    postal_code: string,
    radius: string

}
class SearchService {
    private saveUrl = 'http://localhost:8080/proxy/search/sendSaveSearchRequest';
    private getUrl = 'http://localhost:8080/proxy/search/sendGetAllRequest';
    private deleteUrl = 'http://localhost:8080/proxy/search/sendDeleteRequest';

    async getAllSearches():Promise<SearchEntityDto[]> {
        const response = await fetch(this.getUrl);

        if(!response.ok) {
            throw new Error("Fehler beim Holen der Suchaufträge")
        }
        return response.json();
    }
}
export const searchService = new SearchService();