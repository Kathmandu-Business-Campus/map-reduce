"""
Map-Reduce based word frequency analyzer.
"""
from collections import defaultdict
from typing import List, Tuple, Dict, Any
import logging

from text_processor import TextProcessor

logger = logging.getLogger(__name__)


class MapReduceAnalyzer:
    """Implements the Map-Reduce pattern for word frequency analysis."""
    
    def __init__(self):
        """Initialize the analyzer with a text processor."""
        self.text_processor = TextProcessor()
    
    def map_phase(self, words: List[str]) -> List[Tuple[str, int]]:
        """
        MAP PHASE: Transform words into (word, 1) pairs.
        
        Args:
            words: List of words to map
            
        Returns:
            List of (word, 1) tuples
        """
        word_pairs = [(word, 1) for word in words]
        logger.info(f"Map phase created {len(word_pairs)} key-value pairs")
        return word_pairs
    
    def shuffle_and_sort(self, word_pairs: List[Tuple[str, int]]) -> Dict[str, List[int]]:
        """
        SHUFFLE AND SORT PHASE: Group values by keys.
        
        Args:
            word_pairs: List of (word, count) tuples
            
        Returns:
            Dictionary mapping words to lists of counts
        """
        grouped = defaultdict(list)
        
        for word, count in word_pairs:
            grouped[word].append(count)
        
        result = dict(grouped)
        logger.info(f"Shuffle phase grouped data into {len(result)} keys")
        return result
    
    def reduce_phase(self, grouped_data: Dict[str, List[int]]) -> Dict[str, int]:
        """
        REDUCE PHASE: Sum counts for each word.
        
        Args:
            grouped_data: Dictionary with words as keys and lists of counts as values
            
        Returns:
            Dictionary mapping words to total counts
        """
        word_counts = {}
        
        for word, counts in grouped_data.items():
            word_counts[word] = sum(counts)
        
        logger.info(f"Reduce phase produced {len(word_counts)} final results")
        return word_counts
    
    def analyze(self, text: str) -> Dict[str, Any]:
        """
        Execute the complete Map-Reduce pipeline.
        
        Args:
            text: Input text to analyze
            
        Returns:
            Dictionary with analysis results including unique words,
            repeated words, and word counts
        """
        try:
            # Extract words
            words = self.text_processor.extract_words(text)
            
            # Execute Map-Reduce pipeline
            word_pairs = self.map_phase(words)
            grouped_data = self.shuffle_and_sort(word_pairs)
            word_counts = self.reduce_phase(grouped_data)
            
            # Categorize results
            unique_words = sorted([w for w, c in word_counts.items() if c == 1])
            repeated_words = sorted(
                [(w, c) for w, c in word_counts.items() if c > 1],
                key=lambda x: x[1],
                reverse=True
            )
            
            return {
                'unique': unique_words,
                'repeated': repeated_words,
                'counts': word_counts,
                'totalWords': len(words),
                'uniqueWordCount': len(unique_words),
                'repeatedWordCount': len(repeated_words)
            }
        
        except Exception as e:
            logger.error(f"Error during analysis: {str(e)}")
            raise
