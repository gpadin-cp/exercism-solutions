from dataclasses import dataclass

# Modular so that is the conditions of how we compare words were to change, it could be applied once in the test case initialization, or if we need to expose another trait for comparison
@dataclass
class AnagramTestCase:
    def __init__(self, word : str):
        self.word : str = word
        self.lower : str = word.lower()
        self.test_case : list[str] = sorted(self.lower)

def find_anagrams(word : str, candidates: list[str]):
    # holds anagrams found and is returned when all candidates are evaluated
    anagrams : list[str] = []

    # we need both the lower case original word and the sorted version of that to determine if there is an anagram or not
    # that's why they are separate variables instead of just sorted(word.lower())
    base_word = AnagramTestCase(word)

    for item in candidates:
        # avoids doing a format unnecessarily, lenght is a constant time look up and a mismatch immediately means no need to do the expensive sort and lower
        if len(item) != len(word):
            continue

        test_word = AnagramTestCase(item)
        if base_word.lower != test_word.lower and test_word.test_case == base_word.test_case:
            anagrams.append(item)

    return anagrams
