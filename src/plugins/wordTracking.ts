export enum CountingMode {
    AllWords ='all',
    UniqueWords = 'unique',
    SpecificWordOccurences = 'specific',
}

export interface WordTrackingEvent {
    data: string
    context: {
        data: number
    }
}


export class WordTracking {
    private static instance: WordTracking;
    private readonly wordRegex: RegExp;
    private tracking: boolean;
    // private trackedWordCount: number;
    private wordCountMap: Map<string,number>;

    private constructor(wordBoundaryChars: string[] = [' ', '-', '_']) {
    const wordBoundaryCharsPattern = wordBoundaryChars.map((char) => `\\${char}`).join('');
    this.wordRegex = new RegExp(`\\b\\w+[${wordBoundaryCharsPattern}]?`, 'gi');
    this.tracking = false;
    this.wordCountMap = new Map<string, number>();
  }

    static getInstance(wordBoundaryChars?: string[]): WordTracking {
        if (!WordTracking.instance) {
            WordTracking.instance = new WordTracking(wordBoundaryChars);
        }
        return WordTracking.instance;
    }

    startTracking() {
        if (this.tracking) {
            this.tracking = true;
            this.wordCountMap.clear()
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
        const wordCount = this.countWords(inputValue, CountingMode.AllWords); // Default to all words
      this.wordCountMap.clear()
        this.wordCountMap.set(inputValue.toLowerCase(), wordCount)
  }

    private countWords(text: string, mode: CountingMode): number {
        const matches = text.match(this.wordRegex);
        if (!matches) return 0;

        switch (mode) {
            case CountingMode.AllWords:
                return matches.length;
            case CountingMode.UniqueWords:
                const uniqueWords = new Set(matches.map((word) => word.toLowerCase()));
                return uniqueWords.size;
            case CountingMode.SpecificWordOccurences:
                this.updateWordCountMap(matches.map((word) => word.toLowerCase()));
                return this.calculateTotalWordOccurences();
            default:
                throw new Error(`Invalid counting mode: ${mode}`);
        }
    }

    private updateWordCountMap(words: string[]) {
        words.forEach((word) => {
            const count = this.wordCountMap.get(word) || 0;
            this.wordCountMap.set(word, count + 1);
        });
    }

    private calculateTotalWordOccurences(): number {
        let totalOccurences = 0;
        this.wordCountMap.forEach((count) => {
            totalOccurences += count;
        }
        );
        return totalOccurences;
    }

    // @ts-ignore
    updateWordCount(event: WordTrackingEvent, wordCount: number) {
        // @ts-ignore
        const wordCount = this.countWords(event.data)
        // @ts-ignore
        event.context.data = wordCount

    }

    getWordCount(mode: CountingMode = CountingMode.AllWords): number {
        return this.countWords([...this.wordCountMap.keys()].join(' '), mode);
    }
}