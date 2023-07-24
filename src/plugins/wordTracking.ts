interface WordTrackingEvent {
    data: string
    context: {
        data: number
    }
}



export class WordTracking {
    private static instance: WordTracking;
    private readonly wordRegex: RegExp;
    private tracking: boolean;
    private trackedWordCount: number;

    constructor() {
        this.wordRegex = /\b\w+/gi;
        this.tracking = false;
        this.trackedWordCount = 0;
    }

    static getInstance(): WordTracking {
        if (!WordTracking.instance) {
            WordTracking.instance = new WordTracking();
        }
        return WordTracking.instance;
    }

    startTracking() {
        if (this.tracking) {
            this.tracking = true;
            this.trackedWordCount = 0;
            document.addEventListener("input", this.handleInput);
        }
    }

    stopTracking() {
    if (this.tracking) {
      this.tracking = false;
      document.removeEventListener('input', this.handleInput);
    }
  }

  private handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;
        const wordCount = this.countWords(inputValue);
        this.trackedWordCount = wordCount;
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

    getWordCount(): number {
        return this.trackedWordCount;
    }
}