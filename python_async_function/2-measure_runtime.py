#!/usr/bin/env python3
"""Measure the average runtime of running wait_n concurrently."""

import asyncio
import time

wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Measure the average execution time of wait_n.

    Args:
        n: Number of coroutines to run.
        max_delay: Maximum random delay for each coroutine.

    Returns:
        The average time required to complete one coroutine.
    """
    start_time = time.time()
    asyncio.run(wait_n(n, max_delay))
    total_time = time.time() - start_time
    return total_time / n
