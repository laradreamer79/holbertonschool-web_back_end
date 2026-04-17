#!/usr/bin/env python3
"""Concurrent coroutine helpers for measuring asynchronous delays."""

import asyncio
from typing import List
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Run wait_random concurrently n times and return sorted delays.

    Args:
        n: Number of coroutines to run.
        max_delay: Maximum random delay for each coroutine.

    Returns:
        A list of delay values ordered from smallest to largest.
    """
    tasks = [asyncio.create_task(wait_random(max_delay)) for _ in range(n)]

    delays = []
    for finished_task in asyncio.as_completed(tasks):
        delay = await finished_task
        delays.append(delay)

    return delays
