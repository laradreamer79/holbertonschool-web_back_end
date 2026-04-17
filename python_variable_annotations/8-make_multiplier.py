#!/usr/bin/env python3
"""Define a typed utility function for concatenating two strings."""
from typing import Callable, Tuple


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Return a function that multiplies its input by the given multiplier."""
    def multiply(x: float) -> float:
        return x * multiplier
    return multiply
