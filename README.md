# Coding Challenges

This repository contains coding challenges from [Coding Challenges](https://codingchallenges.fyi/).

## Challenge 1: Build Your Own `wc` Tool

In this challenge, the goal is to create a custom version of the Unix `wc` (word count) command, called `ccwc` (Coding Challenges Word Count).  

### Features Implemented

- `-c` : Outputs the number of bytes in a file  
- `-l` : Outputs the number of lines in a file  
- `-w` : Outputs the number of words in a file  
- `-m` : Outputs the number of characters in a file  
- **Default (no option)** : Outputs lines, words, bytes

### Usage Example

```bash
# Count bytes
node challenge_one.js -c test.txt

# Count lines
node challenge_one.js -l test.txt

# Count words
node challenge_one.js -w test.txt

# Count characters
node challenge_one.js -m test.txt

# Default (all counts)
node challenge_one.js test.txt
