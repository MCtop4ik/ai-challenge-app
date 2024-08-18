import { handleClientScriptLoad } from "next/script";
import StorageApi from "./storage.api";

export default class HistoryApi {

    static getHistoryCards() {
        let historyData = StorageApi.get('historyData') || [];
        return historyData;
    }

    static addHistoryCard(historyCard) {
        let historyData = StorageApi.get('historyData') || [];
        historyData.push(historyCard);
        StorageApi.set('historyData', historyData);
    }

    static clearAllHistory() {
        StorageApi.remove('historyData');
    }
}