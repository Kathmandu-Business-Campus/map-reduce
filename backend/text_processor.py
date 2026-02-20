"""
Text processing utilities for word extraction and normalization.
"""
import re
import logging
from typing import List

logger = logging.getLogger(__name__)


class TextProcessor:
    """Handles text preprocessing and tokenization."""
    
    # Regex pattern for word extraction (alphanumeric only)
    WORD_PATTERN = r'\b[a-z0-9]+\b'
    
    @staticmethod
    def extract_words(text: str) -> List[str]:
        """
        Extract words from text with normalization.
        
        Converts to lowercase and extracts alphanumeric words.
        
        Args:
            text: Input text to process
            
        Returns:
            List of normalized words
        """
        # Convert to lowercase for case-insensitive counting
        normalized_text = text.lower()
        
        # Extract words using regex
        words = re.findall(TextProcessor.WORD_PATTERN, normalized_text)
        
        logger.info(f"TextProcessor extracted {len(words)} words from input")
        return words
