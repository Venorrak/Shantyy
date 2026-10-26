import YTMusic, { SearchResult } from "ytmusic-api";

class YoutubeApiService {
    private ytmusic = new YTMusic()

    constructor() {
        this.ytmusic.initialize();
    }

    async getVideoList(query: string) : Promise<SearchResult[]> {
        const results = await this.ytmusic.search(query);
        return results;
    }
}
export const youtubeApiService = new YoutubeApiService();