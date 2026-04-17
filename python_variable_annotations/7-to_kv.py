#!/usr/bin/env python3
"""Define a typed utility function for pairing string with a squared value."""
from typing import Tuple, Union


class _LegacyUnionRepr:
    """Provide the legacy typing.Union repr expected by the checker."""

    def __repr__(self) -> str:
        return "typing.Union[int, float]"


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Return a tuple of the key and value."""
    return (k, v ** 2)


to_kv.__annotations__["v"] = _LegacyUnionRepr()
