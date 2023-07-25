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

type WordCountChangeListener = (count: number) => void

/**
 * @name WordTracking
 * @description Tracks the number of words in a given string
 * @example WordTracking.getInstance().getWordCount()
 *
 */
export class WordTracking {
    private static instance: WordTracking;
    private readonly wordRegex: RegExp;
    private tracking: boolean;
    // private trackedWordCount: number;
    private wordCountMap: Map<string,number>;
    private listeners: WordCountChangeListener[];

    private constructor(wordBoundaryChars: string[] = [' ', '-', '_']) {
    const wordBoundaryCharsPattern = wordBoundaryChars.map((char) => `\\${char}`).join('');
    this.wordRegex = new RegExp(`\\b\\w+[${wordBoundaryCharsPattern}]?`, 'gi');
    this.tracking = false;
    this.wordCountMap = new Map<string, number>();
    this.listeners = [];
  }


    static getInstance(wordBoundaryChars?: string[]): WordTracking {
        if (!WordTracking.instance) {
            WordTracking.instance = new WordTracking(wordBoundaryChars);
        }
        return WordTracking.instance;
    }

    /**
     * @name startTracking
     * @description Starts tracking the number of words in a given string
     * @example WordTracking.getInstance().startTracking()
     */
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

      // Notify listeners about a change in word count
      this.notifyListeners(this.wordCountMap.get(inputValue.toLowerCase()) || 0);
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

    subscribe(listener: WordCountChangeListener) {
        this.listeners.push(listener);
    }

    unsubscribe(listener: WordCountChangeListener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    private notifyListeners(count: number) {
        this.listeners.forEach((listener) => listener(count));
    }
}