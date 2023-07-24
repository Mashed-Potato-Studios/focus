
---

# Focusing

Focusing Library is a JavaScript library that helps track the number of words typed by the user and set target goals for word count or time spent on a task. It also provides basic user profile information based on the user's computer.

## Features

- Word count tracking: Track the number of words typed by the user in a text input.
- Time tracking: Measure the time spent on a task using a timer.
- Goal setting: Set target goals for word count or time spent on a task.
- User profile: Access basic user profile information based on the user's computer.

## Installation

You can install Your Focusing Library via npm:

```bash
npm install focusing
```

## Usage

### Word Count Tracking

To track the number of words typed by the user, you can use the `countWords` function. It takes the text as input and returns the word count:

```javascript
import { countWords } from 'focusing';

const inputText = "This is an example sentence with some words.";
const wordCount = countWords(inputText);
console.log("Word count:", wordCount); // Output: Word count: 9
```

### Time Tracking

To measure the time spent on a task, you can use the `startTimer` and `stopTimer` functions. The `getElapsedTime` function returns the time duration in seconds:

```javascript
import { startTimer, stopTimer, getElapsedTime } from 'focusing';

startTimer();

// Perform the task...

stopTimer();

const elapsedTime = getElapsedTime();
console.log("Time spent:", elapsedTime, "seconds");
```

```javascript
import { WordTracking } from 'focusing';

// Initialize the WordTracking instance with custom word boundary characters
const wordBoundaryChars = [' ', '-', '_'];
const wordTracker = WordTracking.getInstance(wordBoundaryChars);

// Start tracking user input
wordTracker.startTracking();

// Wait for a few seconds (or as the user types)

// Get the current word count using the default counting mode ('all')
const allWordsCount = wordTracker.getWordCount();
console.log(allWordsCount); // Output: The number of all words typed by the user

// Get the current word count using the 'unique' counting mode
const uniqueWordsCount = wordTracker.getWordCount(CountingMode.UniqueWords);
console.log(uniqueWordsCount); // Output: The number of unique words typed by the user

// Get the current word count using the 'specific' counting mode
const specificWordOccurrencesCount = wordTracker.getWordCount(CountingMode.SpecificWordOccurrences);
console.log(specificWordOccurrencesCount); // Output: The total occurrences of specific words typed by the user

// Stop tracking user input (if necessary)
wordTracker.stopTracking();
```

### Goal Setting

You can set target goals for word count or time spent on a task using the `setWordGoal` and `setTimeGoal` functions:

```javascript
import { setWordGoal, setTimeGoal } from 'focusing';

setWordGoal(500); // Set a goal of typing 500 words
setTimeGoal(1800); // Set a goal of spending 1800 seconds (30 minutes) on the task
```

### User Profile

To access basic user profile information, you can use the `getUserProfile` function:

```javascript
import { getUserProfile } from 'focusing';

const userProfile = getUserProfile();
console.log("User Profile:", userProfile);
```

## Contributing

Contributions are welcome! If you have any bug fixes, new features, or improvements to the library, please submit a pull request.

Before contributing, please read our [Contributing Guidelines](CONTRIBUTING.md).

## License

Focusing Library is open-source software licensed under the [MIT License](LICENSE).

