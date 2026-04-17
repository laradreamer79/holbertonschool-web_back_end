#!/usr/bin/env python3
"""Define a typed utility function for getting the length of list of strings"""
from typing import Iterable, List, Sequence, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """Return a list of tuples containing each sequence and its length."""
    return [(i, len(i)) for i in lst]
