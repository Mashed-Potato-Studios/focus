interface WordTrackingEvent {
    data: string
    context: {
        data: number
    }
}
export class WordTracking {
    private static instance: WordTracking;
    private readonly wordRegex: RegExp;

    constructor() {
        this.wordRegex = /\b\w+/gi;
    }

    static getInstance(): WordTracking {
        if (!WordTracking.instance) {
            WordTracking.instance = new WordTracking();
        }
        return WordTracking.instance;
    }

    countWords(text: string): number {
        const matches = text.match(this.wordRegex);
        return matches ? matches.length : 0;

    }
    // @ts-ignore
    updateWordCount(event: WordTrackingEvent, wordCount: number) {
        // @ts-ignore
        const wordCount = this.countWords(event.data)
        // @ts-ignore
        event.context.data = wordCount

    }
}